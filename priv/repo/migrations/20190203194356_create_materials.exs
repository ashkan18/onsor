defmodule Onsor.Repo.Migrations.CreateMaterials do
  use Ecto.Migration

  def change do
    create table(:materials) do
      add :name, :string
      add :description, :string
      add :unit, :string
      add :compositions, :map

      timestamps()
    end

  end
end
