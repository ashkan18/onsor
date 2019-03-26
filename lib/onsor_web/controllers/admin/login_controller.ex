defmodule OnsorWeb.Admin.LoginController do
  use OnsorWeb, :controller
  alias OnsorWeb.Accounts

  def new(conn, _params) do
    render(conn, "new.html")
  end

  def create(conn, %{"username" => username, "password" => password}) do
    case Accounts.authenticate_user(username, password) do
      {:ok, user} ->
        # Use access tokens.
        conn
        |> Guardian.Plug.sign_in(user, :access)
        |> redirect(to: Routes.admin_dashboard_path(conn, :index))

      {:error, _reason} ->
        conn
        |> put_flash(:error, "Username or Password didn't match, please try again.")
        |> render("new.html")
        # handle not verifying the user's credentials
    end
  end

  def delete(conn, params) do
    conn
    |> Guardian.Plug.sign_out()
    |> redirect(to: Routes.admin_dashboard_path(conn, :index))
  end
end
