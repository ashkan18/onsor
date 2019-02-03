defmodule OnsorWeb.VendorControllerTest do
  use OnsorWeb.ConnCase

  alias Onsor.Partners

  @create_attrs %{name: "some name"}
  @update_attrs %{name: "some updated name"}
  @invalid_attrs %{name: nil}

  def fixture(:vendor) do
    {:ok, vendor} = Partners.create_vendor(@create_attrs)
    vendor
  end

  describe "index" do
    test "lists all vendors", %{conn: conn} do
      conn = get(conn, Routes.vendor_path(conn, :index))
      assert html_response(conn, 200) =~ "Listing Vendors"
    end
  end

  describe "new vendor" do
    test "renders form", %{conn: conn} do
      conn = get(conn, Routes.vendor_path(conn, :new))
      assert html_response(conn, 200) =~ "New Vendor"
    end
  end

  describe "create vendor" do
    test "redirects to show when data is valid", %{conn: conn} do
      conn = post(conn, Routes.vendor_path(conn, :create), vendor: @create_attrs)

      assert %{id: id} = redirected_params(conn)
      assert redirected_to(conn) == Routes.vendor_path(conn, :show, id)

      conn = get(conn, Routes.vendor_path(conn, :show, id))
      assert html_response(conn, 200) =~ "Show Vendor"
    end

    test "renders errors when data is invalid", %{conn: conn} do
      conn = post(conn, Routes.vendor_path(conn, :create), vendor: @invalid_attrs)
      assert html_response(conn, 200) =~ "New Vendor"
    end
  end

  describe "edit vendor" do
    setup [:create_vendor]

    test "renders form for editing chosen vendor", %{conn: conn, vendor: vendor} do
      conn = get(conn, Routes.vendor_path(conn, :edit, vendor))
      assert html_response(conn, 200) =~ "Edit Vendor"
    end
  end

  describe "update vendor" do
    setup [:create_vendor]

    test "redirects when data is valid", %{conn: conn, vendor: vendor} do
      conn = put(conn, Routes.vendor_path(conn, :update, vendor), vendor: @update_attrs)
      assert redirected_to(conn) == Routes.vendor_path(conn, :show, vendor)

      conn = get(conn, Routes.vendor_path(conn, :show, vendor))
      assert html_response(conn, 200) =~ "some updated name"
    end

    test "renders errors when data is invalid", %{conn: conn, vendor: vendor} do
      conn = put(conn, Routes.vendor_path(conn, :update, vendor), vendor: @invalid_attrs)
      assert html_response(conn, 200) =~ "Edit Vendor"
    end
  end

  describe "delete vendor" do
    setup [:create_vendor]

    test "deletes chosen vendor", %{conn: conn, vendor: vendor} do
      conn = delete(conn, Routes.vendor_path(conn, :delete, vendor))
      assert redirected_to(conn) == Routes.vendor_path(conn, :index)
      assert_error_sent 404, fn ->
        get(conn, Routes.vendor_path(conn, :show, vendor))
      end
    end
  end

  defp create_vendor(_) do
    vendor = fixture(:vendor)
    {:ok, vendor: vendor}
  end
end
