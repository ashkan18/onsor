defmodule OnsorWeb.Resolvers.Material do
  def get_all(_parent, _arts, _resolution) do
    {:ok, Onsor.Materials.list_materials()}
  end

  def find_material(_parent, %{id: id}, _resolution) do
    {:ok, Onsor.Materials.get_material!(id)}
  end
end