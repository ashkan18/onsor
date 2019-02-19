defmodule Onsor.MaterialPhoto do
  use Arc.Definition

  # Include ecto support (requires package arc_ecto installed):
  # use Arc.Ecto.Definition

  # To add a thumbnail version:
  @versions [:original, :medium, :small, :large]

  # Override the bucket on a per definition basis:
  # def bucket do
  #   :custom_bucket_name
  # end

  # Whitelist file extensions:
  def validate({file, _}) do
    ~w(.jpg .jpeg .gif .png) |> Enum.member?(String.downcase(Path.extname(file.file_name)))
  end

  # Define a thumbnail transformation:
  def transform(:medium, _) do
    {:convert, "-strip -thumbnail 250x250^ -gravity center -extent 250x250 -format png", :png}
  end

  def transform(:large, _) do
    {:convert, "-strip -thumbnail 800x800^ -gravity center -extent 800x800 -format jpeg", :jpeg}
  end

  # Define a thumbnail transformation:
  def transform(:small, _) do
    {:convert, "-strip -thumbnail 50x50^ -gravity center -extent 50x50 -format jpeg", :jpeg}
  end

  # Override the persisted filenames:
  def filename(version, {file, _scope}) do
    "#{file.file_name}_#{version}"
  end

  # Override the storage directory:
  def storage_dir(_version, {_file, scope}) do
    "uploads/materials/#{scope.id}/"
  end

  # Provide a default URL if there hasn't been a file uploaded
  def default_url(version, _scope) do
    "/images/materials/default_#{version}.png"
  end

  def s3_object_headers(_version, {file, _scope}) do
    [content_type: MIME.from_path(file.file_name)]
  end

  def acl(:small, _), do: :public_read
  def acl(:medium, _), do: :public_read
  def acl(:large, _), do: :public_read
end
