defmodule OnsorWeb.Schema.PartnerTypes do
  use Absinthe.Schema.Notation
  use Absinthe.Relay.Schema.Notation, :modern

  connection(node_type: :material)

  @desc "A Vendor"
  object :vendor do
    field :id, :string
    field :name, :string

    connection field :materials, node_type: :material do
      resolve(fn
        pagination_args, %{source: vendor} ->
          vendor = Onsor.Repo.preload(vendor, :materials)
          Absinthe.Relay.Connection.from_list(vendor.materials, pagination_args)
      end)
    end
  end
end
