defmodule OnsorWeb.Admin.MaterialController do
  use OnsorWeb, :controller

  alias Onsor.Materials
  alias Onsor.Materials.Material

  def index(conn, _params) do
    materials = Materials.filter_search_materials()
    render(conn, "index.html", materials: materials)
  end

  def new(conn, _params) do
    changeset = Materials.change_material(%Material{})
    render(conn, "new.html", changeset: changeset, vendors: Onsor.Partners.list_vendors())
  end

  def create(conn, %{"material" => material_params}) do
    case Materials.create_material(material_params) do
      {:ok, _material} ->
        conn
        |> put_flash(:info, "Material created successfully.")
        |> redirect(to: Routes.admin_material_path(conn, :index))

      {:error, %Ecto.Changeset{} = changeset} ->
        render(conn, "new.html", changeset: changeset)
    end
  end

  def upload(conn, %{
        "material_id" => material_id,
        "material" => %{"photo_url" => photo_url, "is_default" => is_default}
      }) do
    with material <- Onsor.Materials.get_material!(material_id),
         _ <- Onsor.Materials.add_material_photo(material, photo_url, is_default) do
      conn
      |> put_flash(:info, "Photo Uploaded.")
      |> redirect(to: Routes.admin_material_path(conn, :show, material))
    end
  end

  def show(conn, %{"id" => id}) do
    material = Materials.get_material!(id)
    render(conn, "show.html", material: material)
  end

  def edit(conn, %{"id" => id}) do
    material = Materials.get_material!(id)
    changeset = Materials.change_material(material)
    render(conn, "edit.html", material: material, changeset: changeset)
  end

  def update(conn, %{"id" => id, "material" => material_params}) do
    material = Materials.get_material!(id)

    case Materials.update_material(material, material_params) do
      {:ok, material} ->
        conn
        |> put_flash(:info, "Material updated successfully.")
        |> redirect(to: Routes.admin_material_path(conn, :show, material))

      {:error, %Ecto.Changeset{} = changeset} ->
        render(conn, "edit.html", material: material, changeset: changeset)
    end
  end

  def delete(conn, %{"id" => id}) do
    material = Materials.get_material!(id)
    {:ok, _material} = Materials.delete_material(material)

    conn
    |> put_flash(:info, "Material deleted successfully.")
    |> redirect(to: Routes.admin_material_path(conn, :index))
  end
end
