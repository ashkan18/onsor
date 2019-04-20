defmodule Onsor.Accounts.User do
  use Ecto.Schema
  import Ecto.Changeset
  import Comeonin.Bcrypt, only: [hashpwsalt: 1]

  schema "users" do
    field :encrypted_password, :string
    field :name, :string
    field :username, :string

    # virtual fields
    field :password, :string, virtual: true
    field :password_confirmation, :string, virtual: true

    timestamps()
  end

  @doc false
  def changeset(user, attrs) do
    user
    |> cast(attrs, [:username, :name, :password, :password_confirmation])
    |> validate_required([:username, :name, :password, :password_confirmation])
    # Check that email is valid
    |> validate_format(:username, ~r/@/)
    # Check that password length is >= 8
    |> validate_length(:password, min: 8)
    # Check that password === password_confirmation
    |> validate_confirmation(:password)
    |> unique_constraint(:username)
    # Add put_password_hash to changeset pipeline
    |> put_password_hash
  end

  defp put_password_hash(changeset) do
    case changeset do
      %Ecto.Changeset{valid?: true, changes: %{password: pass}} ->
        put_change(changeset, :encrypted_password, hashpwsalt(pass))

      _ ->
        changeset
    end
  end
end
