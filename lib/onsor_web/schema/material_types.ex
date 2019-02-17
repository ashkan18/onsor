defmodule OnsorWeb.Schema.MaterialTypes do
  use Absinthe.Schema.Notation

  @desc "A Material"
  object :material do
    field :id, :string
    field :name, :string
    field :composition, :json
    field :description, :string
    field :size_unit, :string
    field :type, :string
    field :colors, :json
    field :finish, :string
    field :texture, :string
  end
end
