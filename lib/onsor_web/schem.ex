defmodule OnsorWeb.Schema do
  use Absinthe.Schema

  import_types OnsorWeb.Schema.JSON
  import_types OnsorWeb.Schema.PartnerTypes
  import_types OnsorWeb.Schema.MaterialTypes

  alias OnsorWeb.Resolvers


  query do
    @desc "Get all vendors"
    field :vendors, list_of(:vendor) do
      resolve &Resolvers.Partner.vendors/3
    end

    @desc "Get All Materials"
    field :materials, list_of(:material) do
      resolve &Resolvers.Material.get_all/3
    end

    @desc "Find material by id"
    field :material, :material do
      arg :id, non_null(:id)
      resolve &Resolvers.Material.find_material/3
    end
  end
end