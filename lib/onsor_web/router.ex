defmodule OnsorWeb.Router do
  use OnsorWeb, :router

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

  scope "/admin", OnsorWeb do
    pipe_through :browser

    get "/", Admin.DashboardController, :index
    resources "/vendors", Admin.VendorController
    resources "/materials", Admin.MaterialController
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
