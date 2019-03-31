defmodule OnsorWeb.Admin.UserController do
  use OnsorWeb, :controller
  alias Onsor.{Accounts, Accounts.User}
  alias OnsorWeb.Guardian

  def new(conn, _params) do
    changeset = Accounts.change_user(%User{})
    if Guardian.Plug.current_resource(conn) != nil do
      conn
      |> redirect(to: Routes.admin_dashboard_path(conn, :index))
    else
      conn
      |> render("new.html", changeset: changeset, action: Routes.admin_user_path(conn, :create))
    end
  end

  def create(conn, %{"user" => user_params}) do
    with {:ok, %User{} = user} <- Accounts.create_user(user_params) do
      conn
      |> Guardian.Plug.sign_in(user)
      |> put_status(:created)
      |> redirect(to: Routes.admin_dashboard_path(conn, :index))
    else
      errors ->
        conn
        |> put_flash(:error, "There was an issue creating your account.")
        |> redirect(to: Routes.admin_user_path(conn, :new))
    end
  end
end
