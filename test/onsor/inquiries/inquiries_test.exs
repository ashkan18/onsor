defmodule Onsor.InquiriesTest do
  use Onsor.DataCase

  alias Onsor.Inquiries

  describe "inquiries" do
    alias Onsor.Inquiries.Inquiry

    @valid_attrs %{}
    @update_attrs %{}
    @invalid_attrs %{}

    def inquiry_fixture(attrs \\ %{}) do
      {:ok, inquiry} =
        attrs
        |> Enum.into(@valid_attrs)
        |> Inquiries.create_inquiry()

      inquiry
    end

    test "list_inquiries/0 returns all inquiries" do
      inquiry = inquiry_fixture()
      assert Inquiries.list_inquiries() == [inquiry]
    end

    test "get_inquiry!/1 returns the inquiry with given id" do
      inquiry = inquiry_fixture()
      assert Inquiries.get_inquiry!(inquiry.id) == inquiry
    end

    test "create_inquiry/1 with valid data creates a inquiry" do
      assert {:ok, %Inquiry{} = inquiry} = Inquiries.create_inquiry(@valid_attrs)
    end

    test "create_inquiry/1 with invalid data returns error changeset" do
      assert {:error, %Ecto.Changeset{}} = Inquiries.create_inquiry(@invalid_attrs)
    end

    test "update_inquiry/2 with valid data updates the inquiry" do
      inquiry = inquiry_fixture()
      assert {:ok, %Inquiry{} = inquiry} = Inquiries.update_inquiry(inquiry, @update_attrs)
    end

    test "update_inquiry/2 with invalid data returns error changeset" do
      inquiry = inquiry_fixture()
      assert {:error, %Ecto.Changeset{}} = Inquiries.update_inquiry(inquiry, @invalid_attrs)
      assert inquiry == Inquiries.get_inquiry!(inquiry.id)
    end

    test "delete_inquiry/1 deletes the inquiry" do
      inquiry = inquiry_fixture()
      assert {:ok, %Inquiry{}} = Inquiries.delete_inquiry(inquiry)
      assert_raise Ecto.NoResultsError, fn -> Inquiries.get_inquiry!(inquiry.id) end
    end

    test "change_inquiry/1 returns a inquiry changeset" do
      inquiry = inquiry_fixture()
      assert %Ecto.Changeset{} = Inquiries.change_inquiry(inquiry)
    end
  end
end
