defmodule OnsorWeb.Schema.InquiryTypes do
  use Absinthe.Schema.Notation

  @desc "An inquiry"
  object :inquiry do
    field :id, :string
    field :material, :material
    field :user, :user
  end
end
