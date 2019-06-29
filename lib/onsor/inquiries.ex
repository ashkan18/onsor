defmodule Onsor.Inquiries do
  @moduledoc """
  The Inquiries context.
  """

  import Ecto.Query, warn: false

  alias Onsor.Inquiries.Inquiry
  alias Onsor.{Mailer, Repo}
  alias OnsorWeb.Email

  @doc """
  Returns the list of inquiries.

  ## Examples

      iex> list_inquiries()
      [%Inquiry{}, ...]

  """
  def list_inquiries do
    Repo.all(Inquiry)
  end

  @doc """
  Gets a single inquiry.

  Raises `Ecto.NoResultsError` if the Inquiry does not exist.

  ## Examples

      iex> get_inquiry!(123)
      %Inquiry{}

      iex> get_inquiry!(456)
      ** (Ecto.NoResultsError)

  """
  def get_inquiry!(id), do: Repo.get!(Inquiry, id)

  def process_inquiry(user_id, material_id, quantity, initial_message \\ "") do
    with {:ok, inquiry} <-
           create_inquiry(%{
             material_id: material_id,
             user_id: user_id,
             quantity: quantity,
             initial_message: initial_message
           }) do
      inquiry
      |> Repo.preload(material: [:vendor], user: [])
      |> Email.inquiry()
      |> Mailer.deliver_now()

      {:ok, inquiry}
    else
      _ -> {:error, "Could Not Inquiry"}
    end
  end

  @doc """
  Creates a inquiry.

  ## Examples

      iex> create_inquiry(%{field: value})
      {:ok, %Inquiry{}}

      iex> create_inquiry(%{field: bad_value})
      {:error, %Ecto.Changeset{}}

  """
  def create_inquiry(attrs \\ %{}) do
    %Inquiry{}
    |> Inquiry.changeset(attrs)
    |> Repo.insert()
  end

  @doc """
  Updates a inquiry.

  ## Examples

      iex> update_inquiry(inquiry, %{field: new_value})
      {:ok, %Inquiry{}}

      iex> update_inquiry(inquiry, %{field: bad_value})
      {:error, %Ecto.Changeset{}}

  """
  def update_inquiry(%Inquiry{} = inquiry, attrs) do
    inquiry
    |> Inquiry.changeset(attrs)
    |> Repo.update()
  end

  @doc """
  Deletes a Inquiry.

  ## Examples

      iex> delete_inquiry(inquiry)
      {:ok, %Inquiry{}}

      iex> delete_inquiry(inquiry)
      {:error, %Ecto.Changeset{}}

  """
  def delete_inquiry(%Inquiry{} = inquiry) do
    Repo.delete(inquiry)
  end

  @doc """
  Returns an `%Ecto.Changeset{}` for tracking inquiry changes.

  ## Examples

      iex> change_inquiry(inquiry)
      %Ecto.Changeset{source: %Inquiry{}}

  """
  def change_inquiry(%Inquiry{} = inquiry) do
    Inquiry.changeset(inquiry, %{})
  end
end
