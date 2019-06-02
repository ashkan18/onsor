defmodule Onsor.Email do
  import Bamboo.Email

  def inquiry(inquiry) do
    new_email(
      to: inquiry.material.vendor.inquiry_email,
      from: "inquiry@materialist.com",
      subject: "You just received an inquiry on #{inquiry.material.name}",
      html_body: "There you have it",
      text_body: "There you have it"
    )
  end
end
