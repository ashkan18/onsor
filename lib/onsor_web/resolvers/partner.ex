defmodule OnsorWeb.Resolvers.Partner do
  def vendors(_parent, _args, _resolution) do
    {:ok, Onsor.Partners.list_vendors()}
  end

  def vendor_detail(_parent, %{id: id}, _resolution) do
    {:ok, Onsor.Partners.get_vendor!(id)}
  end
end
