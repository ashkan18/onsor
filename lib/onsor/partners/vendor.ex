defmodule Onsor.Partners.Vendor do
  use Ecto.Schema
  import Ecto.Changeset


  schema "vendors" do
    field :name, :string
    many_to_many :materials, Onsor.Materials.Material, join_through: Onsor.VendorMaterial

    timestamps()
  end

  @doc false
  def changeset(vendor, attrs) do
    vendor
    |> cast(attrs, [:name])
    |> validate_required([:name])
  end
end
