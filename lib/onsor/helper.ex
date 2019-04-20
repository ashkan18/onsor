defmodule Onsor.Helper do
  def temp_file_from_url(url) do
    Application.ensure_all_started(:inets)
    :ssl.start()
    {:ok, resp} = :httpc.request(:get, {String.to_charlist(url), []}, [], body_format: :binary)
    {{_, 200, 'OK'}, _headers, body} = resp
    File.write!("/tmp/img", body)
    "/tmp/img"
  end
end
