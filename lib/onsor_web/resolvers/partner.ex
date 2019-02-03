defmodule OnsorWeb.Resolvers.Partner do
  def vendors(_parent, _arts, _resolution) do
    {:ok, Onsor.Partners.list_vendors()}
  end
end