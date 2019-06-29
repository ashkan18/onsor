defmodule Onsor.Inquiries.Inquiry do
  use Ecto.Schema
  import Ecto.Changeset

  schema "inquiries" do
    field :quantity, :integer
    field :initial_message, :string

    belongs_to :user, Onsor.Accounts.User
    belongs_to :material, Onsor.Materials.Material

    timestamps()
  end

  @required_fields ~w(user_id material_id quantity)a
  @optional_fields ~w(initial_message)a
  @doc false
  def changeset(inquiry, attrs) do
    inquiry
    |> cast(attrs, @required_fields ++ @optional_fields)
    |> validate_required(@required_fields)
  end
end
