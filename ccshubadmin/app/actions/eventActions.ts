
import { collection, addDoc, getDoc, doc, deleteDoc, updateDoc, getDocs, Timestamp } from "firebase/firestore";
import { ref, deleteObject } from "firebase/storage"
import { db, storage } from "@/lib/firebase";
import { Event } from "@/types/events";

type CreateEventResult =
  | { success: true; id: string }
  | { success: false; error: string }

export async function createEvents(formData: FormData): Promise<CreateEventResult> {
  try {
    const title = String(formData.get('title') || '')
    const description = String(formData.get('description') || '')
    const date = String(formData.get('date') || '')
    const start = String(formData.get('start_time') || '')
    const end = String(formData.get('end_time') || '')
    const price = Number(formData.get('price') || 0)
    const department = String(formData.get('department') || 'All')
    const participantType = String(formData.get('participant_type') || 'All')
    const location = String(formData.get('location') || '')
    const requirements = String(formData.get('requirements') || '')
    const attendeesLimitRaw = formData.get('attendees_limit')
    const attendeesLimit = attendeesLimitRaw ? Number(attendeesLimitRaw) : 0
    const schoolYearId = String(formData.get('school_year_id') || '')

    const schoolYearRef = schoolYearId
      ? doc(db, 'school_year', schoolYearId)
      : null

    if (!title || !description || !date || !start || !end) {
      return { success: false, error: "Missing required fields" }
    }


    const imageUrl = String(formData.get('imageUrl') || '')

    const eventData: any = {
      title,
      description,
      date,
      start_time: start,
      end_time: end,
      imageUrl,
      price,
      department,
      participant_type: participantType,
      location,
      requirements,
      attendeesLimit,
      status: "Upcoming",
      createdAt: Timestamp.now()
    }

    if (schoolYearRef) {
      eventData.school_year_ref = schoolYearRef
      eventData.school_year_id = schoolYearId
    }

    const docRef = await addDoc(collection(db, "events"), eventData)

    return {
      success: true,
      id: docRef.id
    }
  } catch (error) {
    console.error("Create event error:", error)

    return {
      success: false,
      error: "Unexpected server error"
    }
  }
}

export async function getEventById(id: string): Promise<Event | null> {

  const snapshot = await getDoc(doc(db, 'events', id))

  if (!snapshot.exists()) {
    return null;
  }

  const data = snapshot.data();

  return {
    id: snapshot.id,
    title: data.title ?? '',
    description: data.description ?? '',
    date: data.date ?? '',
    start_time: data.start_time ?? '',
    end_time: data.end_time ?? '',
    imageUrl: data.imageUrl ?? '',
    price: data.price ?? 0,
    department: data.department ?? '',
    participant_type: data.participant_type ?? '',
    location: data.location ?? '',
    requirements: data.requirements ?? '',
    attendeesLimit: data.attendeesLimit ?? null,
    status: data.status ?? 'Upcoming',
    createdAt: data.createdAt?.toDate?.().toISOString?.() ?? null,
    school_year_ref: data.school_year_ref ?? null,
    school_year_id: data.school_year_id ?? data.school_year_ref?.id ?? null
  }
}

export async function deleteEvent(id: string, imageUrl?: string) {
  try {
    // 🔥 delete image (optional but recommended)
    if (imageUrl) {
      try {
        const imageRef = ref(storage, imageUrl)
        await deleteObject(imageRef)
      } catch (err) {
        console.warn("Image delete failed (ignored):", err)
      }
    }

    // delete firestore doc
    await deleteDoc(doc(db, "events", id))

    return { success: true }
  } catch (error) {
    console.error(error)
    return { success: false, error: "Failed to delete event" }
  }
}

export async function updateEvent(
  formData: FormData
) {
  try {
    const id = String(formData.get("id"))

    // 🔹 Get form values
    const title = formData.get("title") as string
    const description = formData.get("description") as string
    const date = formData.get("date") as string
    const start_time = formData.get("start_time") as string
    const end_time = formData.get("end_time") as string
    const location = formData.get("location") as string
    const requirements = formData.get("requirements") as string
    const department = formData.get("department") as string
    const participant_type = formData.get("participant_type") as string
    const price = Number(formData.get("price"))
    const imageUrl = formData.get("imageUrl")
    const schoolYearId = String(formData.get("school_year_id") || '')
    const schoolYearRef = schoolYearId
      ? doc(db, 'school_year', schoolYearId)
      : null


    // 🔹 Build update object
    const updateData: any = {
      title,
      description,
      date,
      start_time,
      end_time,
      location,
      requirements,
      department,
      participant_type,
      price,
      updatedAt: new Date(),
    }

    if (formData.has("school_year_id")) {
      if (schoolYearId) {
        updateData.school_year_ref = schoolYearRef
        updateData.school_year_id = schoolYearId
      }
    }

    // Only update image if new one exists
    if (imageUrl) {
      updateData.imageUrl = imageUrl
    }

    // 🔹 Update Firestore
    await updateDoc(doc(db, "events", id), updateData)

    return { success: true }
  } catch (error) {
    console.error(error)
    return { success: false, error: "Update failed" }
  }
}

export async function getAllEvents() {
  const snapshot = await getDocs(collection(db, "events"))

  const events: Event[] = snapshot.docs.map(doc => {
    const data = doc.data()

    return {
      id: doc.id,
      title: data.title ?? '',
      description: data.description ?? '',
      date: data.date ?? '',
      start_time: data.start_time ?? '',
      end_time: data.end_time ?? '',
      imageUrl: data.imageUrl ?? '',
      price: data.price ?? 0,
      department: data.department ?? '',
      participant_type: data.participant_type ?? '',
      location: data.location ?? '',
      requirements: data.requirements ?? '',
      attendeesLimit: data.attendeesLimit ?? null,
      status: data.status ?? 'Upcoming',
      school_year_ref: data.school_year_ref ?? null,
      school_year_id: data.school_year_id ?? data.school_year_ref?.id ?? null,

      // ✅ FIX HERE
      createdAt: data.createdAt instanceof Timestamp
        ? data.createdAt.toDate().toISOString()
        : null
    }
  })

  return events;
}