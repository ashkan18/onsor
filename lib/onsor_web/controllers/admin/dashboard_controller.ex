defmodule OnsorWeb.Admin.DashboardController do
  use OnsorWeb, :controller

  def index(conn, _params) do
    render(conn, "index.html")
  end
end
