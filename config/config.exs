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

config :onsor, OnsorWeb.Guardian,
  issuer: "onsor",
  secret_key: System.get_env("HMAC_SECRET"),
  ttl: {30, :days}

# Configures Elixir's Logger
config :logger, :console,
  format: "$time $metadata[$level] $message\n",
  metadata: [:request_id]

config :arc,
  # or Arc.Storage.Local
  storage: Arc.Storage.S3,
  # if using Amazon S3
  bucket: {:system, "AWS_S3_BUCKET"}

config :ex_aws,
  access_key_id: [{:system, "AWS_ACCESS_KEY_ID"}, :instance_role],
  secret_access_key: [{:system, "AWS_SECRET_ACCESS_KEY"}, :instance_role]

# Use Jason for JSON parsing in Phoenix
config :phoenix, :json_library, Jason

# In your config/config.exs file
config :onsor, Onsor.Mailer,
  adapter: Bamboo.SMTPAdapter,
  server: System.get_env("SMTP_DOMAIN"),
  port: 1025,
  username: System.get_env("SMTP_USERNAME"),
  password: System.get_env("SMTP_PASSWORD"),
  tls: :if_available, # can be `:always` or `:never`
  ssl: false, # can be `true`
  retries: 1


# Import environment specific config. This must remain at the bottom
# of this file so it overrides the configuration defined above.
import_config "#{Mix.env()}.exs"
