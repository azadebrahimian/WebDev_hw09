defmodule EventAppWeb.InviteeController do
  use EventAppWeb, :controller

  alias EventApp.Invitees
  alias EventApp.Invitees.Invitee

  action_fallback EventAppWeb.FallbackController

  def index(conn, _params) do
    invitees = Invitees.list_invitees()
    render(conn, "index.json", invitees: invitees)
  end

  def create(conn, %{"invitee" => invitee_params}) do
    with {:ok, %Invitee{} = invitee} <- Invitees.create_invitee(invitee_params) do
      conn
      |> put_status(:created)
      |> put_resp_header("location", Routes.invitee_path(conn, :show, invitee))
      |> render("show.json", invitee: invitee)
    end
  end

  def show(conn, %{"id" => id}) do
    invitee = Invitees.get_invitee!(id)
    render(conn, "show.json", invitee: invitee)
  end

  def update(conn, %{"id" => id, "invitee" => invitee_params}) do
    invitee = Invitees.get_invitee!(id)

    with {:ok, %Invitee{} = invitee} <- Invitees.update_invitee(invitee, invitee_params) do
      render(conn, "show.json", invitee: invitee)
    end
  end

  def delete(conn, %{"id" => id}) do
    invitee = Invitees.get_invitee!(id)

    with {:ok, %Invitee{}} <- Invitees.delete_invitee(invitee) do
      send_resp(conn, :no_content, "")
    end
  end
end
