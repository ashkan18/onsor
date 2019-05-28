defmodule OnsorWeb.Schema do
  use Absinthe.Schema
  use Absinthe.Relay.Schema, :modern

  import_types(OnsorWeb.Schema.JSON)
  import_types(OnsorWeb.Schema.PartnerTypes)
  import_types(OnsorWeb.Schema.MaterialTypes)
  import_types(OnsorWeb.Schema.AccountTypes)

  alias OnsorWeb.Resolvers

  query do
    @desc "Get vendor details by id"
    field :vendor, :vendor do
      arg(:id, non_null(:id))
      resolve(&Resolvers.Partner.vendor_detail/3)
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

    @desc "My user info"
    field :me, :user do
      resolve(&Resolvers.UserResolver.current_user/3)
    end
  end

  mutation do
    @desc "SignUp for an account"
    field :create_user, type: :session do
      arg(:name, non_null(:string))
      arg(:username, non_null(:string))
      arg(:password, non_null(:string))
      arg(:password_confirmation, non_null(:string))

      resolve(&Resolvers.UserResolver.create/2)
    end

    @desc "Login"
    field :login, type: :session do
      arg(:username, non_null(:string))
      arg(:password, non_null(:string))

      resolve(&Resolvers.UserResolver.login/2)
    end
  end
end
