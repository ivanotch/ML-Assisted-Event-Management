export type Event = {
  id: string
  title: string
  description: string

  date: string | null
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

  // ✅ Firestore reference removed
  school_year_id: string | null
}