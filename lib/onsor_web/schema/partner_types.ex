defmodule OnsorWeb.Schema.PartnerTypes do
  use Absinthe.Schema.Notation
  use Absinthe.Relay.Schema.Notation, :modern
  import Ecto.Query, warn: false


  connection node_type: :material do
    edge do
      field :price_cents, :integer
      field :price_currency, :string
    end
  end

  @desc "A Vendor"
  object :vendor do
    field :id, :string
    field :name, :string
    connection field :materials, node_type: :material do
      resolve fn pagination_args, %{source: vendor} ->
          Onsor.VendorMaterial
          |> from
          |> where([vm], vm.vendor_id == ^vendor.id)
          |> join(:left, [vm], m in assoc(vm, :material))
          |> select([vm, m], {m, map(vm, [:price_cents, :price_currency])})
          |> Absinthe.Relay.Connection.from_query(&Onsor.Repo.all/1, pagination_args)
      end
    end
  end

  @desc "A Vendor Material"
  object :vendor_material do
    field :vendor, :vendor
    field :material, :material
  end
end
