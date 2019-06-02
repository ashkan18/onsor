defmodule OnsorWeb.Resolvers.UserResolver do
  alias OnsorWeb.Guardian
  alias Onsor.{Inquiries, Email}

  def create(%{material_id: material_id}, %{context: %{current_user: current_user}}) do
    {:ok, inquiry} = Inquiries.create_inquiry(material_id: material_id, user_id: current_user.id)
    Email.inquiry(inquiry)
    {:ok, inquiry}
  end

  def create(_args, _context), do: {:error, "Not Authorized"}
end
