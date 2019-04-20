defmodule Onsor.MaterialsTest do
  use Onsor.DataCase

  alias Onsor.Materials

  describe "materials" do
    alias Onsor.Materials.Material

    @valid_attrs %{
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

    def material_fixture(attrs \\ %{}) do
      {:ok, material} =
        attrs
        |> Enum.into(@valid_attrs)
        |> Materials.create_material()

      material
    end

    test "list_materials/0 returns all materials" do
      material = material_fixture()
      assert Materials.list_materials() == [material]
    end

    test "get_material!/1 returns the material with given id" do
      material = material_fixture()
      assert Materials.get_material!(material.id) == material
    end

    test "create_material/1 with valid data creates a material" do
      assert {:ok, %Material{} = material} = Materials.create_material(@valid_attrs)
      assert material.compositions == %{}
      assert material.description == "some description"
      assert material.name == "some name"
      assert material.unit == "some unit"
    end

    test "create_material/1 with invalid data returns error changeset" do
      assert {:error, %Ecto.Changeset{}} = Materials.create_material(@invalid_attrs)
    end

    test "update_material/2 with valid data updates the material" do
      material = material_fixture()
      assert {:ok, %Material{} = material} = Materials.update_material(material, @update_attrs)
      assert material.compositions == %{}
      assert material.description == "some updated description"
      assert material.name == "some updated name"
      assert material.unit == "some updated unit"
    end

    test "update_material/2 with invalid data returns error changeset" do
      material = material_fixture()
      assert {:error, %Ecto.Changeset{}} = Materials.update_material(material, @invalid_attrs)
      assert material == Materials.get_material!(material.id)
    end

    test "delete_material/1 deletes the material" do
      material = material_fixture()
      assert {:ok, %Material{}} = Materials.delete_material(material)
      assert_raise Ecto.NoResultsError, fn -> Materials.get_material!(material.id) end
    end

    test "change_material/1 returns a material changeset" do
      material = material_fixture()
      assert %Ecto.Changeset{} = Materials.change_material(material)
    end
  end
end
