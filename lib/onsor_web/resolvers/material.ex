defmodule OnsorWeb.Resolvers.Material do
  def get_all(_parent, _arts, _resolution) do
    {:ok, Onsor.Materials.list_materials()}
  end
end