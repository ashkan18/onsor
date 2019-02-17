defmodule Onsor.Materials.Material do
  use Ecto.Schema
  import Ecto.Changeset

  def types(), do: ~w(ceramic glass coatings conceretes metals natural_stones plastics wood)
  def finishes(), do: ~w(glossy matte satin variable)
  def textures(), do: ~w(coarse medium smooth variable)
  def size_units(), do: ~w(cm in)

  schema "materials" do
    field :compositions, :map
    field :description, :string
    field :name, :string
    field :size_unit, :string
    field :type, :string
    field :colors, :map
    field :finish, :string
    field :texture, :string

    timestamps()
  end

  @required_fields ~w(name type size_unit finish texture)a
  @optional_fields ~w(description compositions colors)a
  @doc false
  def changeset(material, attrs) do
    material
    |> cast(attrs, @required_fields, @optional_fields)
    |> validate_required(@required_fields)
  end
end
