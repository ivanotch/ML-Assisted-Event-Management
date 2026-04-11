import { Timestamp } from "firebase/firestore"

export type Event = {
  id: string
  title: string
  description: string
  date: string
  start_time: string
  end_time: string
  imageUrl: string
  price: number
  department: string
  participant_type: string
  location: string
  requirements: string
  attendeesLimit: number | null
  status: string
  createdAt: string | null
} 