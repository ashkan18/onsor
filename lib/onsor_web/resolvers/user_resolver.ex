defmodule OnsorWeb.Resolvers.UserResolver do
  alias Onsor.{Accounts, Accounts.User}
  alias OnsorWeb.Guardian

  def create(params, _info) do
    with {:ok, %User{} = user} <- Accounts.create_user(params),
         {:ok, jwt, _} <- Guardian.encode_and_sign(user) do
      {:ok, %{token: jwt}}
    end
  end

  def login(%{username: username, password: password}, _info) do
    with {:ok, %User{} = user} <- Accounts.authenticate_user(username, password),
         {:ok, jwt, _} <- Guardian.encode_and_sign(user) do
      {:ok, %{token: jwt}}
    end
  end
end
