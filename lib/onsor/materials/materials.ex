defmodule Onsor.Materials do
  @moduledoc """
  The Materials context.
  """

  import Ecto.Query, warn: false
  alias Onsor.Repo

  alias Onsor.Materials.Material

  @doc """
  Returns the list of materials based on input filters.

  ## Examples

      iex> filter_search_materials()
      [%Material{}, ...]

  """
  def filter_search_materials(args) do
    Material
    |> filter_by_types(args)
    |> filter_by_textures(args)
    |> filter_by_finishes(args)
    |> Repo.all
  end

  defp filter_by_types(query, %{types: []}), do: query
  defp filter_by_types(query, %{types: types}) do
    from material in query,
    where: material.type in ^types
  end
  defp filter_by_types(query, _), do: query


  defp filter_by_textures(query, %{textures: []}), do: query
  defp filter_by_textures(query, %{textures: textures}) do
    from material in query,
    where: material.type in ^textures
  end
  defp filter_by_textures(query, _), do: query

  defp filter_by_finishes(query, %{finishes: []}), do: query
  defp filter_by_finishes(query, %{finishes: finishes}) do
    from material in query,
    where: material.type in ^finishes
  end
  defp filter_by_finishes(query, _), do: query


  def add_material_photo(material, photo_url, default \\ false) do
    with {:ok, file} <- Onsor.MaterialPhoto.store({photo_url, material}),
          all_photos <-  [%{
                          original: Onsor.MaterialPhoto.url({file, material}, :original),
                          small: Onsor.MaterialPhoto.url({file, material}, :small),
                          medium: Onsor.MaterialPhoto.url({file, material}, :medium),
                          large: Onsor.MaterialPhoto.url({file, material}, :large),
                          default: default
                        }]
                        |> Enum.into(material.photos || [])
                        |> IO.inspect,
        {:ok, material} <- update_material(material, %{photos: all_photos}) do
      material
    else
      error -> IO.inspect(error)
    end
  end

  @doc """
  Gets a single material.

  Raises `Ecto.NoResultsError` if the Material does not exist.

  ## Examples

      iex> get_material!(123)
      %Material{}

      iex> get_material!(456)
      ** (Ecto.NoResultsError)

  """
  def get_material!(id), do: Repo.get!(Material, id)

  @doc """
  Creates a material.

  ## Examples

      iex> create_material(%{field: value})
      {:ok, %Material{}}

      iex> create_material(%{field: bad_value})
      {:error, %Ecto.Changeset{}}

  """
  def create_material(attrs \\ %{}) do
    %Material{}
    |> Material.changeset(attrs)
    |> Repo.insert()
  end

  @doc """
  Updates a material.

  ## Examples

      iex> update_material(material, %{field: new_value})
      {:ok, %Material{}}

      iex> update_material(material, %{field: bad_value})
      {:error, %Ecto.Changeset{}}

  """
  def update_material(%Material{} = material, attrs) do
    material
    |> Material.changeset(attrs)
    |> IO.inspect()
    |> Repo.update()
  end

  @doc """
  Deletes a Material.

  ## Examples

      iex> delete_material(material)
      {:ok, %Material{}}

      iex> delete_material(material)
      {:error, %Ecto.Changeset{}}

  """
  def delete_material(%Material{} = material) do
    Repo.delete(material)
  end

  @doc """
  Returns an `%Ecto.Changeset{}` for tracking material changes.

  ## Examples

      iex> change_material(material)
      %Ecto.Changeset{source: %Material{}}

  """
  def change_material(%Material{} = material) do
    Material.changeset(material, %{})
  end
end
