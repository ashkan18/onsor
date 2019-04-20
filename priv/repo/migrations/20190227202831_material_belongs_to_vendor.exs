defmodule Onsor.Repo.Migrations.MaterialBelongsToVendor do
  use Ecto.Migration

  def change do
    alter table(:materials) do
      add :vendor_id, references(:vendors, on_delete: :nothing)
    end

    create index(:materials, [:vendor_id])
  end
end
