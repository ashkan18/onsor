defmodule Onsor.Repo.Migrations.AddPhotosToMaterial do
  use Ecto.Migration

  def change do
    alter table(:materials) do
      add :photos, :jsonb, null: false, default: "[]"
    end
  end
end
