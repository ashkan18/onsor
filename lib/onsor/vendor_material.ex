defmodule Onsor.VendorMaterial do
  use Ecto.Schema
  import Ecto.Changeset


  schema "vendor_materials" do
    field :price_cents, :integer
    field :price_currency, :string
    belongs_to :vendor, Onsor.Partners.Vendor
    belongs_to :material, Onsor.Materials.Material

    timestamps()
  end

  @doc false
  def changeset(vendor_material, attrs) do
    vendor_material
    |> cast(attrs, [:price_cents, :price_currency, :vendor_id, :material_id])
    |> validate_required([:vendor_id, :material_id])
  end
end
