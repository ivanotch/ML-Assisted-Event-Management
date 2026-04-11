'use client'

import { Trash2 } from "lucide-react"
import { deleteEvent } from "@/app/actions/eventActions"
import { useRouter } from "next/navigation"

export default function DeleteButton({ id, imageUrl }: { id: string, imageUrl: string }) {
  const router = useRouter()

  const handleDelete = async () => {
    const confirmDelete = confirm("Are you sure you want to delete this event?")
    if (!confirmDelete) return

    const res = await deleteEvent(id, imageUrl)

    if (res.success) {
      router.push("/admin/events")
    } else {
      alert(res.error)
    }
  }

  return (
    <button
      onClick={handleDelete}
      className="border rounded-lg p-1 hover:bg-red-50 transition"
    >
      <Trash2 className="text-red-700" />
    </button>
  )
}