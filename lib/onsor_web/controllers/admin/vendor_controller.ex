defmodule OnsorWeb.Admin.VendorController do
  use OnsorWeb, :controller

  alias Onsor.Partners
  alias Onsor.Partners.Vendor

  def index(conn, _params) do
    vendors = Partners.list_vendors()
    render(conn, "index.html", vendors: vendors)
  end

  def new(conn, _params) do
    changeset = Partners.change_vendor(%Vendor{})
    render(conn, "new.html", changeset: changeset)
  end

  def create(conn, %{"vendor" => vendor_params}) do
    case Partners.create_vendor(vendor_params) do
      {:ok, vendor} ->
        conn
        |> put_flash(:info, "Vendor created successfully.")
        |> redirect(to: Routes.admin_vendor_path(conn, :show, vendor))

      {:error, %Ecto.Changeset{} = changeset} ->
        render(conn, "new.html", changeset: changeset)
    end
  end

  def show(conn, %{"id" => id}) do
    vendor = Partners.get_vendor!(id)
    render(conn, "show.html", vendor: vendor)
  end

  def edit(conn, %{"id" => id}) do
    vendor = Partners.get_vendor!(id)
    changeset = Partners.change_vendor(vendor)
    render(conn, "edit.html", vendor: vendor, changeset: changeset)
  end

  def update(conn, %{"id" => id, "vendor" => vendor_params}) do
    vendor = Partners.get_vendor!(id)

    case Partners.update_vendor(vendor, vendor_params) do
      {:ok, vendor} ->
        conn
        |> put_flash(:info, "Vendor updated successfully.")
        |> redirect(to: Routes.admin_vendor_path(conn, :show, vendor))

      {:error, %Ecto.Changeset{} = changeset} ->
        render(conn, "edit.html", vendor: vendor, changeset: changeset)
    end
  end

  def delete(conn, %{"id" => id}) do
    vendor = Partners.get_vendor!(id)
    {:ok, _vendor} = Partners.delete_vendor(vendor)

    conn
    |> put_flash(:info, "Vendor deleted successfully.")
    |> redirect(to: Routes.admin_vendor_path(conn, :index))
  end
end
