defmodule OnsorWeb.Admin.AuthErrorHandler do
  @moduledoc false

  def auth_error(conn, {_type, _reason}, _opts) do
    conn
    |> Phoenix.Controller.redirect(to: "/admin/login")
  end
end
