defmodule OnsorWeb.ApiAuthErrorHandler do
  @moduledoc false

  def auth_error(conn, {_type, _reason}, _opts) do
    IO.inspect(_type)
    IO.inspect(_reason)

    conn
    |> Plug.Conn.resp(403, "Not found")
    |> Plug.Conn.send_resp()
  end
end
