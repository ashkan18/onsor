defmodule Onsor.Materials.Material do
  use Ecto.Schema
  import Ecto.Changeset


  schema "materials" do
    field :compositions, :map
    field :description, :string
    field :name, :string
    field :unit, :string

    timestamps()
  end

  @doc false
  def changeset(material, attrs) do
    material
    |> cast(attrs, [:name, :description, :unit, :compositions])
    |> validate_required([:name, :description, :unit])
  end
end
