'use server'
import { collection, addDoc, getDoc, doc, deleteDoc, updateDoc } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL, deleteObject } from "firebase/storage"
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

        if (!title || !description || !date || !start || !end) {
            return { success: false, error: "Missing required fields" }
        }

        const imageUrl = String(formData.get('imageUrl') || '')

        const docRef = await addDoc(collection(db, "events"), {
            title,
            description,
            date,
            start_time: start,
            end_time: end,
            imageUrl, // ✅ stored URL only
            price,
            department,
            participant_type: participantType,
            location,
            requirements,
            attendeesLimit,
            status: "Upcoming",
            createdAt: new Date(),
        })

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
    const start_time = formData.get("start_in") as string
    const end_time = formData.get("end_in") as string
    const location = formData.get("location") as string
    const requirements = formData.get("requirements") as string
    const department = formData.get("department") as string
    const participant_type = formData.get("participant_type") as string
    const price = Number(formData.get("price"))
    const imageUrl = formData.get("imageUrl")

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