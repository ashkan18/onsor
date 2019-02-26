defmodule Onsor.Partners do
  @moduledoc """
  The Partners context.
  """

  import Ecto.Query, warn: false
  alias Onsor.Repo

  alias Onsor.Partners.Vendor
  alias Onsor.VendorMaterial

  @doc """
  Returns the list of vendors.

  ## Examples

      iex> list_vendors()
      [%Vendor{}, ...]

  """
  def list_vendors do
    Vendor
    |> Repo.all
  end

  @doc """
  Gets a single vendor.

  Raises `Ecto.NoResultsError` if the Vendor does not exist.

  ## Examples

      iex> get_vendor!(123)
      %Vendor{}

      iex> get_vendor!(456)
      ** (Ecto.NoResultsError)

  """
  def get_vendor!(id), do: Repo.get!(Vendor, id)

  @doc """
  Creates a vendor.

  ## Examples

      iex> create_vendor(%{field: value})
      {:ok, %Vendor{}}

      iex> create_vendor(%{field: bad_value})
      {:error, %Ecto.Changeset{}}

  """
  def create_vendor(attrs \\ %{}) do
    %Vendor{}
    |> Vendor.changeset(attrs)
    |> Repo.insert()
  end

  @doc """
  Updates a vendor.

  ## Examples

      iex> update_vendor(vendor, %{field: new_value})
      {:ok, %Vendor{}}

      iex> update_vendor(vendor, %{field: bad_value})
      {:error, %Ecto.Changeset{}}

  """
  def update_vendor(%Vendor{} = vendor, attrs) do
    vendor
    |> Vendor.changeset(attrs)
    |> Repo.update()
  end

  def add_material(attrs) do
    %VendorMaterial{}
    |> VendorMaterial.changeset(attrs)
    |> Repo.insert()
  end

  @doc """
  Deletes a Vendor.

  ## Examples

      iex> delete_vendor(vendor)
      {:ok, %Vendor{}}

      iex> delete_vendor(vendor)
      {:error, %Ecto.Changeset{}}

  """
  def delete_vendor(%Vendor{} = vendor) do
    Repo.delete(vendor)
  end

  @doc """
  Returns an `%Ecto.Changeset{}` for tracking vendor changes.

  ## Examples

      iex> change_vendor(vendor)
      %Ecto.Changeset{source: %Vendor{}}

  """
  def change_vendor(%Vendor{} = vendor) do
    Vendor.changeset(vendor, %{})
  end
end
