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
  def filter_search_materials(criteria \\ []) do
    IO.inspect(criteria)

    Material
    |> filter_query(criteria)
    |> Repo.all()
    |> Repo.preload(:vendor)
  end

  def filter_query(query, criteria), do: Enum.reduce(criteria, query, &material_query/2)

  defp material_query({key, value}, query) when key in ~w(type texture finish)a do
    from e in query,
      where: field(e, ^key) in ^value
  end

  defp material_query({:color, color}, query) do
    from material in query,
      where: fragment("jsonb_array_length(colors) > 1"),
      where:
        fragment(
          "cube(array[cast(colors->0->>'red' as numeric), cast(colors->0->>'green' as numeric), cast(colors->0->>'blue' as numeric)]) <-> cube(array[?::numeric, ?::numeric, ?::numeric]) < 140",
          ^color.r,
          ^color.g,
          ^color.b
        ) or
          fragment(
            "cube(array[cast(colors->1->>'red' as numeric), cast(colors->1->>'green' as numeric), cast(colors->1->>'blue' as numeric)]) <-> cube(array[?::numeric, ?::numeric, ?::numeric]) < 140",
            ^color.r,
            ^color.g,
            ^color.b
          ) or
          fragment(
            "cube(array[cast(colors->2->>'red' as numeric), cast(colors->2->>'green' as numeric), cast(colors->2->>'blue' as numeric)]) <-> cube(array[?::numeric, ?::numeric, ?::numeric]) < 140",
            ^color.r,
            ^color.g,
            ^color.b
          )
  end

  def add_material_photo(material, photo_url, default \\ false) do
    with {:ok, file} <- Onsor.MaterialPhoto.store({photo_url, material}),
         all_photos <-
           [
             %{
               original: Onsor.MaterialPhoto.url({file, material}, :original),
               small: Onsor.MaterialPhoto.url({file, material}, :small),
               medium: Onsor.MaterialPhoto.url({file, material}, :medium),
               large: Onsor.MaterialPhoto.url({file, material}, :large),
               default: default
             }
           ]
           |> Enum.into(material.photos || []),
         {:ok, material} <- update_material(material, %{photos: all_photos}) do
      Task.async(fn -> analyze_photo(material.id) end)
      material
    else
      error -> IO.inspect(error)
    end
  end

  def analyze_photo(material_id) do
    material = get_material!(material_id)

    analyze_response =
      material.photos
      |> List.first()
      |> Map.get("medium")
      |> Onsor.Helper.temp_file_from_url()
      |> IO.inspect()
      |> Mogrify.open()
      |> Mogrify.histogram()
      |> Enum.sort(fn a, b -> a["count"] > b["count"] end)
      |> Enum.take(5)

    update_material(material, %{colors: analyze_response})
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
