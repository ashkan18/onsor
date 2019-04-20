defmodule Onsor.Partners.Vendor do
  use Ecto.Schema
  import Ecto.Changeset

  schema "vendors" do
    field :name, :string

    timestamps()
  end

  @doc false
  def changeset(vendor, attrs) do
    vendor
    |> cast(attrs, [:name])
    |> validate_required([:name])
  end
end
