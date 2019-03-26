defmodule OnsorWeb.Admin.AuthErrorHandler do
  @moduledoc false

  import Plug.Conn

  def auth_error(conn, {type, _reason}, _opts) do
    conn
    |> redirect(to: Routes.admin_login_path(conn, :new))
  end
end