defmodule OnsorWeb.Admin.LoginController do
  use OnsorWeb, :controller
  alias Onsor.{Accounts, Accounts.User}

  def index(conn, _params) do
    changeset = Accounts.change_user(%User{})
    maybe_user = Guardian.Plug.current_resource(conn)
    message = if maybe_user != nil do
      "Someone is logged in"
    else
      "No one is logged in"
    end
    conn
      |> put_flash(:info, message)
      |> render("index.html", changeset: changeset, action: Routes.admin_login_path(conn, :login), maybe_user: maybe_user)
  end

  def login(conn, %{"username" => username, "password" => password}) do
    case Accounts.authenticate_user(username, password) do
      {:ok, user} ->
        # Use access tokens.
        conn
        |> Guardian.Plug.sign_in(user, :access)
        |> redirect(to: Routes.admin_dashboard_path(conn, :index))

      {:error, _reason} ->
        conn
        |> put_flash(:error, "Username or Password didn't match, please try again.")
        |> redirect(to: Routes.admin_login_path(conn, :index))
        # handle not verifying the user's credentials
    end
  end

  def logout(conn, params) do
    conn
    |> Guardian.Plug.sign_out()
    |> redirect(to: Routes.admin_dashboard_path(conn, :index))
  end
end
