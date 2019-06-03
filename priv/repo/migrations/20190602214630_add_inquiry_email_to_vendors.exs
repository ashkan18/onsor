defmodule Onsor.Repo.Migrations.AddInquiryEmailToVendors do
  use Ecto.Migration

  def change do
    alter table(:vendors) do
      add :inquiry_email, :string
    end
  end
end
