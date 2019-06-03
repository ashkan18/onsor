defmodule Onsor.Repo.Migrations.CreateInquiries do
  use Ecto.Migration

  def change do
    create table(:inquiries) do
      add :user_id, references(:users, on_delete: :nothing)
      add :material_id, references(:materials, on_delete: :nothing)

      timestamps()
    end

    create index(:inquiries, [:user_id])
    create index(:inquiries, [:material_id])
  end
end
