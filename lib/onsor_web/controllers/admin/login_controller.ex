defmodule OnsorWeb.Admin.LoginController do
  use OnsorWeb, :controller

  def create(conn, params) do
    case find_the_user_and_verify_them_from_params(params) do
      {:ok, user} ->
        # Use access tokens.
        conn
        |> Guardian.Plug.sign_in(user, :access)
        |> respond_somehow()

      {:error, reason} ->
        nil
        # handle not verifying the user's credentials
    end
  end

  def delete(conn, params) do
    conn
    |> Guardian.Plug.sign_out()
    |> respond_somehow()
  end
end
