defmodule OnsorWeb.AuthErrorHandler do
  @moduledoc false

  def auth_error(conn, {_type, _reason}, _opts) do
    IO.inspect(_type)
    IO.inspect(_reason)
    conn
    |> Phoenix.Controller.redirect(to: "/login")
  end
end
