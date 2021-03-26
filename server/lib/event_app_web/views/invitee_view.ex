defmodule EventAppWeb.InviteeView do
  use EventAppWeb, :view
  alias EventAppWeb.InviteeView

  def render("index.json", %{invitees: invitees}) do
    %{data: render_many(invitees, InviteeView, "invitee.json")}
  end

  def render("show.json", %{invitee: invitee}) do
    %{data: render_one(invitee, InviteeView, "invitee.json")}
  end

  def render("invitee.json", %{invitee: invitee}) do
    %{id: invitee.id,
      response: invitee.response}
  end
end
