defmodule OnsorWeb.Email do
  use Bamboo.Phoenix, view: OnsorWeb.EmailView

  def inquiry(inquiry) do
    base_email
    |> to(inquiry.material.vendor.inquiry_email)
    |> subject("You just received an inquiry on #{inquiry.material.name}")
    |> assign(:inquiry, inquiry)
    |> render(:inquiry)
  end

  defp base_email do
    new_email
    |> from("No-Reply<inquiry@materialist.com>")
    |> put_header("Reply-To", "editors@changelog.com")
    # This will use the "email.html.eex" file as a layout when rendering html emails.
    # Plain text emails will not use a layout unless you use `put_text_layout`
    |> put_html_layout({OnsorWeb.LayoutView, "email.html"})
  end
end
