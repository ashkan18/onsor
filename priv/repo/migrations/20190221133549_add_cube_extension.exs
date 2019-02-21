defmodule Onsor.Repo.Migrations.AddCubeExtension do
  use Ecto.Migration

  def change do
    execute "CREATE EXTENSION IF NOT EXISTS cube"
  end
end
