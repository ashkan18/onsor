defmodule OnsorWeb.Admin.AuthErrorHandler do
  @moduledoc false

  import Plug.Conn

  def auth_error(conn, {type, _reason}, _opts) do
    conn
    |> Phoenix.Controller.redirect(to: "/admin/login")
  end
end