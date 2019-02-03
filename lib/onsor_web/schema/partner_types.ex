defmodule OnsorWeb.Schema.PartnerTypes do
  use Absinthe.Schema.Notation

  @desc "A Vendor"
  object :vendor do
    field :id, :string
    field :name, :string
  end
end
