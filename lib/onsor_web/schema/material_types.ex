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
    field :photos, :json
    field :vendor, :vendor
    field :price_cents, :integer
    field :price_currency, :string
  end

  input_object :color_input do
    field :r, non_null(:integer)
    field :g, non_null(:integer)
    field :b, non_null(:integer)
    field :a, non_null(:integer)
  end
end
