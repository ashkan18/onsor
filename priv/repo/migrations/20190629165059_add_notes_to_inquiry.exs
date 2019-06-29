defmodule Onsor.Repo.Migrations.AddNotesToInquiry do
  use Ecto.Migration

  def change do
    alter table(:inquiries) do
      add :initial_message, :string
      add :quantity, :integer
    end
  end
end
