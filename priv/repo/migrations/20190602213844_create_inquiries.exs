defmodule Onsor.Repo.Migrations.CreateInquiries do
  use Ecto.Migration

  def change do
    create table(:inquiries) do
      add :from_id, references(:users, on_delete: :nothing)
      add :on_material_id, references(:materials, on_delete: :nothing)

      timestamps()
    end

    create index(:inquiries, [:from_id])
    create index(:inquiries, [:on_material_id])
  end
end
