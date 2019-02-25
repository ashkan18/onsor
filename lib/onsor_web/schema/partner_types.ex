defmodule OnsorWeb.Schema.PartnerTypes do
  use Absinthe.Schema.Notation

  @desc "A Vendor"
  object :vendor do
    field :id, :string
    field :name, :string
    field :materials, list_of(:material)
  end

  @desc "A Vendor Material"
  object :vendor_material do
    field :vendor, :vendor
    field :material, :material
  end
end
