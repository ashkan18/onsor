defmodule Onsor.Repo.Migrations.AddPriceFieldsToMaterial do
  use Ecto.Migration

  def change do
    alter table(:materials) do
      add :price_cents, :integer
      add :price_currency, :string, size: 3
    end
  end
end
