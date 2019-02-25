defmodule Onsor.Repo.Migrations.CreateVendorMaterials do
  use Ecto.Migration

  def change do
    create table(:vendor_materials) do
      add :price_cents, :integer
      add :price_currency, :string
      add :vendor_id, references(:vendors, on_delete: :nothing)
      add :material_id, references(:materials, on_delete: :nothing)

      timestamps()
    end

    create index(:vendor_materials, [:vendor_id])
    create index(:vendor_materials, [:material_id])
  end
end
