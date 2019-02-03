defmodule OnsorWeb.Schema do
  use Absinthe.Schema

  import_types OnsorWeb.Schema.PartnerTypes

  alias OnsorWeb.Resolvers


  query do
    @desc "Get all vendors"
    field :vendors, list_of(:vendor) do
      resolve &Resolvers.Partner.vendors/3
    end
  end
end