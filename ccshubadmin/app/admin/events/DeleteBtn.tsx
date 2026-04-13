'use client'

import { Trash2 } from "lucide-react"
import { deleteEvent } from "@/app/actions/eventActions"
import { useRouter } from "next/navigation"

export default function DeleteButton({
  id,
  imageUrl,
  className = "",
  iconClassName = ""
}: {
  id: string
  imageUrl: string
  className?: string
  iconClassName?: string
}) {
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
      onClick={(e) => {
        e.preventDefault()
        e.stopPropagation()
        handleDelete()
      }}
      className={` ${className}`}
    >
      <Trash2 className={`${iconClassName}`} />
    </button>
  )
}