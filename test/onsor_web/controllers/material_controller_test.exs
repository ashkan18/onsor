defmodule OnsorWeb.MaterialControllerTest do
  use OnsorWeb.ConnCase

  alias Onsor.Materials

  @create_attrs %{
    compositions: %{},
    description: "some description",
    name: "some name",
    unit: "some unit"
  }
  @update_attrs %{
    compositions: %{},
    description: "some updated description",
    name: "some updated name",
    unit: "some updated unit"
  }
  @invalid_attrs %{compositions: nil, description: nil, name: nil, unit: nil}

  def fixture(:material) do
    {:ok, material} = Materials.create_material(@create_attrs)
    material
  end

  describe "index" do
    test "lists all materials", %{conn: conn} do
      conn = get(conn, Routes.admin_material_path(conn, :index))
      assert html_response(conn, 200) =~ "Listing Materials"
    end
  end

  describe "new material" do
    test "renders form", %{conn: conn} do
      conn = get(conn, Routes.admin_material_path(conn, :new))
      assert html_response(conn, 200) =~ "New Material"
    end
  end

  describe "create material" do
    test "redirects to show when data is valid", %{conn: conn} do
      conn = post(conn, Routes.admin_material_path(conn, :create), material: @create_attrs)

      assert %{id: id} = redirected_params(conn)
      assert redirected_to(conn) == Routes.admin_material_path(conn, :show, id)

      conn = get(conn, Routes.admin_material_path(conn, :show, id))
      assert html_response(conn, 200) =~ "Show Material"
    end

    test "renders errors when data is invalid", %{conn: conn} do
      conn = post(conn, Routes.admin_material_path(conn, :create), material: @invalid_attrs)
      assert html_response(conn, 200) =~ "New Material"
    end
  end

  describe "edit material" do
    setup [:create_material]

    test "renders form for editing chosen material", %{conn: conn, material: material} do
      conn = get(conn, Routes.admin_material_path(conn, :edit, material))
      assert html_response(conn, 200) =~ "Edit Material"
    end
  end

  describe "update material" do
    setup [:create_material]

    test "redirects when data is valid", %{conn: conn, material: material} do
      conn =
        put(conn, Routes.admin_material_path(conn, :update, material), material: @update_attrs)

      assert redirected_to(conn) == Routes.admin_material_path(conn, :show, material)

      conn = get(conn, Routes.admin_material_path(conn, :show, material))
      assert html_response(conn, 200) =~ "some updated description"
    end

    test "renders errors when data is invalid", %{conn: conn, material: material} do
      conn =
        put(conn, Routes.admin_material_path(conn, :update, material), material: @invalid_attrs)

      assert html_response(conn, 200) =~ "Edit Material"
    end
  end

  describe "delete material" do
    setup [:create_material]

    test "deletes chosen material", %{conn: conn, material: material} do
      conn = delete(conn, Routes.admin_material_path(conn, :delete, material))
      assert redirected_to(conn) == Routes.admin_material_path(conn, :index)

      assert_error_sent 404, fn ->
        get(conn, Routes.admin_material_path(conn, :show, material))
      end
    end
  end

  defp create_material(_) do
    material = fixture(:material)
    {:ok, material: material}
  end
end
