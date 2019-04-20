defmodule Onsor.Repo.Migrations.CreateMaterials do
  use Ecto.Migration

  def change do
    create table(:materials) do
      add :name, :string
      add :description, :string
      add :size_unit, :string
      add :type, :string
      add :colors, :jsonb, null: false, default: "[]"
      add :texture, :string
      add :finish, :string
      add :compositions, :map

      timestamps()
    end
  end
end
