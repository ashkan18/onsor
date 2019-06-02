defmodule OnsorWeb.Resolvers.InquiryResolver do
  alias OnsorWeb.Guardian
  alias Onsor.{Inquiries, Email, Mailer}

  def create(%{material_id: material_id}, %{context: %{current_user: current_user}}) do
    with {:ok, inquiry} <- Inquiries.create_inquiry(%{material_id: material_id, user_id: current_user.id}) do
      Email.inquiry(inquiry)
        |> Mailer.deliver_now()
      {:ok, inquiry}
    else
      _ -> {:error, "Could Not Inquiry"}
    end
  end

  def create(_args, _context), do: {:error, "Not Authorized"}
end
