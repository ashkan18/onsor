defmodule Onsor.Partners.Vendor do
  use Ecto.Schema
  import Ecto.Changeset

  schema "vendors" do
    field :name, :string
    field :inquiry_email, :string
    has_many :materials, Onsor.Materials.Material

    timestamps()
  end

  @doc false
  def changeset(vendor, attrs) do
    vendor
    |> cast(attrs, [:name, :inquiry_email])
    |> validate_required([:name, :inquiry_email])
  end
end
