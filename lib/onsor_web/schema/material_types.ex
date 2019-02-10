defmodule OnsorWeb.Schema.MaterialTypes do
  use Absinthe.Schema.Notation

  @desc "A Material"
  object :material do
    field :id, :string
    field :name, :string
    field :composition, :json
    field :description, :string
    field :unit, :string
  end
end
