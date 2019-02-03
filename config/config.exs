# This file is responsible for configuring your application
# and its dependencies with the aid of the Mix.Config module.
#
# This configuration file is loaded before any dependency and
# is restricted to this project.

# General application configuration
use Mix.Config

config :onsor,
  ecto_repos: [Onsor.Repo]

# Configures the endpoint
config :onsor, OnsorWeb.Endpoint,
  url: [host: "localhost"],
  secret_key_base: "nRWYl9HC8+xHwBC4/+yT7rkh31e0t6Kckl+toX5ZE6OVSTCVDW1L/4R3/8cQ09GZ",
  render_errors: [view: OnsorWeb.ErrorView, accepts: ~w(html json)],
  pubsub: [name: Onsor.PubSub, adapter: Phoenix.PubSub.PG2]

# Configures Elixir's Logger
config :logger, :console,
  format: "$time $metadata[$level] $message\n",
  metadata: [:request_id]

# Use Jason for JSON parsing in Phoenix
config :phoenix, :json_library, Jason

# Import environment specific config. This must remain at the bottom
# of this file so it overrides the configuration defined above.
import_config "#{Mix.env()}.exs"
