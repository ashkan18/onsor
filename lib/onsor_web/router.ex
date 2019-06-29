defmodule OnsorWeb.Router do
  use OnsorWeb, :router

  pipeline :maybe_browser_auth do
    plug Guardian.Plug.Pipeline,
      module: OnsorWeb.Guardian,
      error_handler: OnsorWeb.Admin.AuthErrorHandler

    plug(Guardian.Plug.VerifySession, claims: %{"typ" => "access"})
    plug(Guardian.Plug.VerifyHeader, realm: "Bearer")
    plug(Guardian.Plug.LoadResource, allow_blank: true)
  end

  pipeline :ensure_admin_authed_access do
    plug(Guardian.Plug.EnsureAuthenticated,
      claims: %{"typ" => "access"},
      error_handler: OnsorWeb.Admin.AuthErrorHandler
    )
  end

  pipeline :browser do
    plug :accepts, ["html"]
    plug :fetch_session
    plug :fetch_flash
    plug :protect_from_forgery
    plug :put_secure_browser_headers
  end

  pipeline :admin_layout do
    plug :put_layout, {OnsorWeb.LayoutView, :admin}
  end

  scope "/admin", OnsorWeb, as: :admin do
    pipe_through([:browser, :maybe_browser_auth, :admin_layout])

    get("/login", Admin.LoginController, :index)
    post("/login", Admin.LoginController, :login)
    get("/logout", Admin.LoginController, :logout)
    resources("/user", Admin.UserController, only: [:create, :new])

    pipe_through :ensure_admin_authed_access
    resources "/vendors", Admin.VendorController

    resources "/materials", Admin.MaterialController do
      put "/upload", Admin.MaterialController, :upload, as: :upload
    end

    resources "/", Admin.DashboardController, only: [:index]
  end

  pipeline :api do
    plug Plug.Parsers,
      parsers: [:urlencoded, :multipart, :json, Absinthe.Plug.Parser],
      pass: ["*/*"],
      json_decoder: Poison

    plug Guardian.Plug.Pipeline,
      module: OnsorWeb.Guardian,
      error_handler: OnsorWeb.ApiAuthErrorHandler

    plug(Guardian.Plug.VerifyHeader, realm: "Bearer")
    plug(Guardian.Plug.LoadResource, allow_blank: true)
  end

  pipeline :graphql do
    plug OnsorWeb.GraphQLContextPlug
  end

  # Other scopes may use custom stacks.
  scope "/api" do
    pipe_through [:api, :graphql]

    forward "/graphiql", Absinthe.Plug.GraphiQL, schema: OnsorWeb.Schema
    forward "/", Absinthe.Plug, schema: OnsorWeb.Schema
  end

  scope "/", OnsorWeb.Materialist do
    pipe_through :browser
    get "/*path", HomeController, :index
  end
end
