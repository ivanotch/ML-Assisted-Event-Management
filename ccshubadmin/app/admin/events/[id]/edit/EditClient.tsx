'use client'
import { updateEvent } from "@/app/actions/eventActions"
import { ArrowLeft, Calendar, Clock, MapPin, GraduationCap, Users } from 'lucide-react'
import Link from "next/link"
import Image from "next/image"
import { Badge } from "@/components/ui/badge"
import { ref, uploadBytes, getDownloadURL, deleteObject } from "firebase/storage"
import { storage } from "@/lib/firebase";
import { Event } from "@/types/events"
import { useState } from "react"
import { useRouter } from "next/navigation"

type FormState = {
    success: boolean
    error?: string
}

const initialState: FormState = {
    success: false,
}

export default function EditEventForm({ event }: { event: Event }) {
    const [imageFile, setImageFile] = useState<File | null>(null)
    const router = useRouter();

    return (
        <form
            action={async (formData) => {
                let imageUrl = event.imageUrl
                formData.delete("image")

                // 🔥 if new image selected
                if (imageFile) {
                    // 1. Upload new image
                    const storageRef = ref(
                        storage,
                        `events/${Date.now()}-${imageFile.name}`
                    )

                    await uploadBytes(storageRef, imageFile)
                    const newUrl = await getDownloadURL(storageRef)

                    // 2. Delete OLD image (only after success)
                    if (event.imageUrl) {
                        try {
                            const oldRef = ref(storage, event.imageUrl)
                            await deleteObject(oldRef)
                        } catch (err) {
                            console.warn("Old image delete failed:", err)
                        }
                    }

                    imageUrl = newUrl
                }

                formData.set("imageUrl", imageUrl)

                await updateEvent(formData)

                router.refresh()
                router.push(`/admin/events/${event.id}`)
            }}
            className="max-w-5xl mx-auto px-6 py-8 space-y-8 font-[inter]">

            <input type="hidden" name="id" value={event.id} />

            {/* Header */}
            <div className='flex justify-between items-center'>
                <Link href="/admin/events" className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-black transition">
                    <ArrowLeft className="w-4 h-4" />
                    Back
                </Link>

                <button
                    type="submit"
                    className="bg-blue-700 text-white px-4 py-2 rounded-lg text-sm hover:bg-blue-800 transition"
                >
                    Save Changes
                </button>
            </div>

            {/* Image */}
            <div className="relative w-full h-[320px] md:h-[420px] rounded-2xl overflow-hidden shadow-sm group">

                <Image
                    src={event.imageUrl}
                    alt={event.title}
                    fill
                    sizes="100vw"
                    className="object-cover"
                />

                {/* Overlay */}
                <div className="absolute inset-0 bg-black/40 group-hover:bg-black/50 transition" />

                {/* Upload Button */}
                <label className="absolute inset-0 flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition cursor-pointer">
                    Change Image
                    <input
                        type="file"
                        name="image"
                        className="hidden"
                        onChange={(e) => {
                            const file = e.target.files?.[0]
                            if (file) setImageFile(file)
                        }}
                    />
                </label>

                {/* Editable Title */}
                <div className="absolute bottom-6 left-6 right-6 flex justify-between items-end gap-4">

                    <input
                        name="title"
                        defaultValue={event.title}
                        className="bg-transparent text-white text-3xl md:text-4xl font-semibold w-full outline-none border-b border-white/40 focus:border-white"
                    />

                    <Badge className="bg-white text-black text-xs">
                        {event.status}
                    </Badge>
                </div>
            </div>

            {/* Content */}
            <div className="grid md:grid-cols-3 gap-8">

                {/* LEFT */}
                <div className="md:col-span-2 space-y-6">

                    {/* Description */}
                    <section>
                        <h2 className="text-lg font-semibold mb-2">About this event</h2>
                        <textarea
                            name="description"
                            defaultValue={event.description}
                            className="w-full text-gray-600 bg-transparent border rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            rows={5}
                        />
                    </section>

                    {/* Requirements */}
                    <section>
                        <h2 className="text-lg font-semibold mb-2">Requirements</h2>
                        <textarea
                            name="requirements"
                            defaultValue={event.requirements}
                            className="w-full border rounded-lg p-3 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            rows={4}
                        />
                    </section>

                </div>

                {/* RIGHT */}
                <div className="space-y-5">

                    <div className="border rounded-2xl p-5 space-y-4 shadow-sm bg-white">

                        <h2 className="text-md font-semibold">Event Details</h2>

                        <div className="space-y-3 text-sm text-gray-600">

                            <div className="flex items-center gap-3">
                                <Calendar className="w-4 h-4" />
                                <input
                                    type="date"
                                    name="date"
                                    defaultValue={event.date ?? undefined}
                                    className="bg-transparent outline-none"
                                />
                            </div>

                            <div className="flex items-center gap-3">
                                <Clock className="w-4 h-4" />
                                <input type="time" name="start_in" defaultValue={event.start_time} />
                                <span>-</span>
                                <input type="time" name="end_in" defaultValue={event.end_time} />
                            </div>

                            <div className="flex items-center gap-3">
                                <MapPin className="w-4 h-4" />
                                <input
                                    name="location"
                                    defaultValue={event.location}
                                    className="bg-transparent outline-none w-full"
                                />
                            </div>

                            <div className="flex items-center gap-3">
                                <GraduationCap className="w-4 h-4" />
                                <input
                                    name="department"
                                    defaultValue={event.department}
                                    className="bg-transparent outline-none"
                                />
                            </div>

                            <div className="flex items-center gap-3">
                                <Users className="w-4 h-4" />
                                <input
                                    name="participant_type"
                                    defaultValue={event.participant_type}
                                    className="bg-transparent outline-none"
                                />
                            </div>

                        </div>
                    </div>

                    {/* Price */}
                    <div className="border rounded-2xl p-5 shadow-sm bg-white">
                        <label className="text-sm text-gray-500">Price</label>
                        <input
                            type="number"
                            name="price"
                            defaultValue={event.price}
                            className="w-full mt-2 border rounded p-2"
                        />
                    </div>

                </div>

            </div>
        </form>
    )
}