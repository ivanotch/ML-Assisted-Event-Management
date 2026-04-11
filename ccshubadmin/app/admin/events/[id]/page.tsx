import { getEventById } from '@/app/actions/eventActions'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowLeft, Calendar, Clock, MapPin, GraduationCap, Users, SquarePen, Trash2 } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import DeleteButton from "./DeleteBtn"

export default async function EventDetails({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params
    const event = await getEventById(id)

    if (!event) return <div className="p-10">Event not found</div>

    return (
        <main className="max-w-5xl mx-auto px-6 py-8 space-y-8 font-[inter]">

            {/* Back */}
            <div className='flex justify-between items-center'>
                <Link href="/admin/events" className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-black transition">
                    <ArrowLeft className="w-4 h-4" />
                    Back to events
                </Link>
                <div className='flex gap-2 justify-center pr-2'>
                    <Link href={`/admin/events/${event.id}/edit`} className="border rounded-lg p-1 hover:bg-blue-50 transition">
                        <SquarePen className='text-blue-700' />
                    </Link>
                    <DeleteButton id={event.id} imageUrl={event.imageUrl} />
                </div>
            </div>

            {/* Hero Image */}
            <div className="relative w-full h-[320px] md:h-[420px] rounded-2xl overflow-hidden shadow-sm">
                <Image
                    src={event.imageUrl}
                    alt={event.title}
                    fill
                    sizes="100vw"
                    className="object-cover"
                    priority
                />

                {/* Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />

                {/* Title + Status */}
                <div className="absolute bottom-6 left-6 right-6 flex items-end justify-between">
                    <h1 className="text-white text-3xl md:text-4xl font-semibold max-w-xl leading-tight">
                        {event.title}
                    </h1>

                    <Badge className="bg-white/90 text-black px-3 py-1 text-xs font-medium">
                        {event.status}
                    </Badge>
                </div>
            </div>

            {/* Content Grid */}
            <div className="grid md:grid-cols-3 gap-8">

                {/* LEFT: Description */}
                <div className="md:col-span-2 space-y-6">

                    <section>
                        <h2 className="text-lg font-semibold mb-2">About this event</h2>
                        <p className="text-gray-600 leading-relaxed text-justify">
                            {event.description}
                        </p>
                    </section>

                    <section>
                        <h2 className="text-lg font-semibold mb-2">Requirements</h2>
                        <div className="border rounded-xl p-4 text-gray-600 bg-gray-50">
                            {event.requirements || "No additional requirements. Bring only your hopes and dreams!"}
                        </div>
                    </section>

                </div>

                {/* RIGHT: Details Card */}
                <div className='gap-5 flex flex-col'>
                    <div className="border rounded-2xl p-5 space-y-4 h-fit shadow-sm bg-white">
                        <h2 className="text-md font-semibold">Event Details</h2>

                        <div className="space-y-3 text-sm text-gray-600">

                            <div className="flex items-center gap-3">
                                <Calendar className="w-4 h-4" />
                                <span>{event.date}</span>
                            </div>

                            <div className="flex items-center gap-3">
                                <Clock className="w-4 h-4" />
                                <span>{event.start_time} - {event.end_time}</span>
                            </div>

                            <div className="flex items-center gap-3">
                                <MapPin className="w-4 h-4" />
                                <span>{event.location}</span>
                            </div>

                            <div className="flex items-center gap-3">
                                <GraduationCap className="w-4 h-4" />
                                <span>{event.department}</span>
                            </div>

                            <div className="flex items-center gap-3">
                                <Users className="w-4 h-4" />
                                <span>{event.participant_type}</span>
                            </div>

                        </div>
                    </div>

                    <div className="border rounded-2xl p-5 space-y-4 h-fit shadow-sm bg-white">
                        Price: {event.price || "Free"}
                    </div>
                </div>
            </div>
        </main>
    )
}