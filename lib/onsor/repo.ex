defmodule Onsor.Repo do
  use Ecto.Repo,
    otp_app: :onsor,
    adapter: Ecto.Adapters.Postgres
end
