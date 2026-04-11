// app/admin/events/[id]/edit/page.tsx

import { getEventById } from "@/app/actions/eventActions"
import EditEventForm from "./EditClient"

export default async function EditEvent({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const event = await getEventById(id)

  if (!event) return <div>Not found</div>

  return <EditEventForm event={event} />
}