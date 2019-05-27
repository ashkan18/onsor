defmodule OnsorWeb.Resolvers.UserResolver do
  alias Onsor.{Accounts, Accounts.User}
  alias OnsorWeb.Guardian

  def create(params, _info) do
    with {:ok, %User{} = user} <- Accounts.create_user(params),
         {:ok, jwt, _} <- Guardian.encode_and_sign(user) do
      {:ok, %{token: jwt}}
    else
      {:error, %Ecto.Changeset{errors: errors}} ->
        {:error,
         errors
         |> Keyword.keys()
         |> Enum.map(fn k -> %{message: "Invalid #{k}"} end)}
    end
  end

  def login(%{username: username, password: password}, _info) do
    with {:ok, %User{} = user} <- Accounts.authenticate_user(username, password),
         {:ok, jwt, _} <- Guardian.encode_and_sign(user, token_type: :access) do
      {:ok, %{token: jwt}}
    end
  end

  def current_user(_parent, _args, %{context: %{current_user: current_user}}), do: {:ok, current_user}
end
