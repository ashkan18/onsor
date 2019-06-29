defmodule OnsorWeb.Schema.InquiryTypes do
  use Absinthe.Schema.Notation
  import Absinthe.Resolution.Helpers, only: [dataloader: 1]

  @desc "An inquiry"
  object :inquiry do
    field :id, :string
    field :material, :material, resolve: dataloader(Material)
    field :user, :user, resolve: dataloader(User)
    field :quantity, :integer
    field :initial_message, :string
  end
end
