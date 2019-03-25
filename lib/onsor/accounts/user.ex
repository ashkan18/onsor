defmodule Onsor.Accounts.User do
  use Ecto.Schema
  import Ecto.Changeset


  schema "users" do
    field :encrypted_password, :string
    field :name, :string
    field :username, :string

    timestamps()
  end

  @doc false
  def changeset(user, attrs) do
    user
    |> cast(attrs, [:username, :encrypted_password, :name])
    |> validate_required([:username, :encrypted_password, :name])
    |> unique_constraint(:username)
  end
end
