defmodule OnsorWeb.Resolvers.Material do
  def search_filter(_parent, args, _resolution) do
    IO.inspect(args)
    {:ok, Onsor.Materials.filter_search_materials(args)}
  end

  def find_material(_parent, %{id: id}, _resolution) do
    {:ok, Onsor.Materials.get_material!(id)}
  end

  def types(_, _, _), do: {:ok, Onsor.Materials.Material.types()}
  def textures(_, _, _), do: {:ok, Onsor.Materials.Material.textures()}
  def finishes(_, _, _), do: {:ok, Onsor.Materials.Material.finishes()}
end