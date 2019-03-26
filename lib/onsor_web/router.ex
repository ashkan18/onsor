defmodule OnsorWeb.Router do
  use OnsorWeb, :router


  pipeline :maybe_browser_auth do
    plug(Guardian.Plug.VerifySession)
    plug(Guardian.Plug.VerifyHeader, realm: "Bearer")
    plug(Guardian.Plug.LoadResource)
  end

  pipeline :ensure_admin_authed_access do
    plug(Guardian.Plug.EnsureAuthenticated, %{"typ" => "access", handler: OnsorWeb.Admin.AuthErrorHandler})
  end

  pipeline :browser do
    plug :accepts, ["html"]
    plug :fetch_session
    plug :fetch_flash
    plug :protect_from_forgery
    plug :put_secure_browser_headers
  end

  pipeline :api do
    plug Plug.Parsers,
      parsers: [:urlencoded, :multipart, :json, Absinthe.Plug.Parser],
      pass: ["*/*"],
      json_decoder: Poison
  end

  scope "/admin/accounts", OnsorWeb, as: :admin do
    pipe_through([:browser, :maybe_browser_auth])

    get("/login", Admin.LoginController, :new)
    post("/login", Admin.LoginController, :create)
    post("/logout", Admin.LoginController, :delete)
  end

  scope "/admin", OnsorWeb, as: :admin do
    pipe_through([:browser, :ensure_admin_authed_access])

    resources "/", Admin.DashboardController, only: [:index]
    resources "/vendors", Admin.VendorController
    resources "/materials", Admin.MaterialController do
      put "/upload",  Admin.MaterialController, :upload, as: :upload
    end
  end

  # Other scopes may use custom stacks.
  scope "/api" do
    pipe_through :api

    forward "/graphiql", Absinthe.Plug.GraphiQL, schema: OnsorWeb.Schema
    forward "/", Absinthe.Plug, schema: OnsorWeb.Schema
  end

  scope "/", OnsorWeb.Materialist do
    pipe_through :browser
    get "/*path", HomeController, :index
  end
end
