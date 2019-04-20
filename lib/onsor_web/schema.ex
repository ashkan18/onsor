defmodule OnsorWeb.Schema do
  use Absinthe.Schema

  import_types(OnsorWeb.Schema.JSON)
  import_types(OnsorWeb.Schema.PartnerTypes)
  import_types(OnsorWeb.Schema.MaterialTypes)

  alias OnsorWeb.Resolvers

  query do
    @desc "Get all vendors"
    field :vendors, list_of(:vendor) do
      resolve(&Resolvers.Partner.vendors/3)
    end

    @desc "Get types"
    field :types, list_of(:string) do
      resolve(&Resolvers.Material.types/3)
    end

    @desc "Get textures"
    field :textures, list_of(:string) do
      resolve(&Resolvers.Material.textures/3)
    end

    @desc "Get finishes"
    field :finishes, list_of(:string) do
      resolve(&Resolvers.Material.finishes/3)
    end

    @desc "Get All Materials"
    field :materials, list_of(:material) do
      # fabric/wood/
      arg(:type, list_of(:string))
      # polyester
      arg(:composition, :string)
      # matt/glossy
      arg(:texture, list_of(:string))
      # texture
      arg(:finish, list_of(:string))
      arg(:color, :color_input)
      resolve(&Resolvers.Material.search_filter/3)
    end

    @desc "Find material by id"
    field :material, :material do
      arg(:id, non_null(:id))
      resolve(&Resolvers.Material.find_material/3)
    end
  end
end
