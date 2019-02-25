defmodule OnsorWeb.Schema do
  use Absinthe.Schema
  use Absinthe.Relay.Schema, :modern

  import_types OnsorWeb.Schema.JSON
  import_types OnsorWeb.Schema.PartnerTypes
  import_types OnsorWeb.Schema.MaterialTypes

  alias OnsorWeb.Resolvers


  query do
    @desc "Get all vendors"
    field :vendors, list_of(:vendor) do
      resolve &Resolvers.Partner.vendors/3
    end

    @desc "Get types"
    field :types, list_of(:string) do
      resolve &Resolvers.Material.types/3
    end

    @desc "Get textures"
    field :textures, list_of(:string) do
      resolve &Resolvers.Material.textures/3
    end

    @desc "Get finishes"
    field :finishes, list_of(:string) do
      resolve &Resolvers.Material.finishes/3
    end


    @desc "Get All Materials"
    field :materials, list_of(:material) do
      arg :types, list_of(:string) # fabric/wood/
      arg :composition, :string # polyester
      arg :textures, list_of(:string) # matt/glossy
      arg :finishes, list_of(:string) # texture
      arg :color, :color_input
      resolve &Resolvers.Material.search_filter/3
    end

    @desc "Find material by id"
    field :material, :material do
      arg :id, non_null(:id)
      resolve &Resolvers.Material.find_material/3
    end
  end
end