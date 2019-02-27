defmodule OnsorWeb.Schema.MaterialTypes do
  use Absinthe.Schema.Notation
  use Absinthe.Relay.Schema.Notation, :modern
  import Ecto.Query, warn: false

  connection node_type: :vendor do
    edge do
      field :price_cents, :integer
      field :price_currency, :string
    end
  end

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
    connection field :vendors, node_type: :vendor do
      resolve fn pagination_args, %{source: material} ->
          Onsor.VendorMaterial
          |> from
          |> where([vm], vm.vendor_id == ^material.id)
          |> join(:left, [vm], v in assoc(vm, :vendor))
          |> select([vm, v], {v, map(vm, [:price_cents, :price_currency])})
          |> Absinthe.Relay.Connection.from_query(&Onsor.Repo.all/1, pagination_args)
      end
    end
  end

  input_object :color_input do
    field :r, non_null(:integer)
    field :g, non_null(:integer)
    field :b, non_null(:integer)
    field :a, non_null(:integer)
  end
end
