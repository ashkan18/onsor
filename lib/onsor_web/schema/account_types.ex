defmodule OnsorWeb.Schema.AccountTypes do
  use Absinthe.Schema.Notation

  @desc "A User"
  object :user do
    field :id, :string
    field :name, :string
  end

  @desc "A Session"
  object :session do
    field :token, :string
  end
end
