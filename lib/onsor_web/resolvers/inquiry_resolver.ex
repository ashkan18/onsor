defmodule OnsorWeb.Resolvers.InquiryResolver do
  alias Onsor.Inquiries

  def create(%{material_id: material_id, quantity: quantity, initial_message: initial_message}, %{
        context: %{current_user: current_user}
      }) do
    Inquiries.process_inquiry(current_user.id, material_id, quantity, initial_message)
  end

  def create(_args, _context), do: {:error, "Not Authorized"}
end
