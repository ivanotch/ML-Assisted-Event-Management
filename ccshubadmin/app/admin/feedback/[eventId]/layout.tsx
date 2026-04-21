import { getEventById } from "@/app/actions/eventActions"

export default async function Layout({
    children,
    params,
}: {
    children: React.ReactNode
    params: Promise<{ eventId: string }>
}) {
    const {eventId} = await params
    const event = await getEventById(eventId)

    if (!event) return <div>Event not found</div>

    return (
        <div className="p-6 max-w-7xl mx-auto space-y-6 font-[inter]">
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6 pb-6">
                {/* Left: Title + Date */}
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">{event.title}</h1>
                    <p className="text-sm text-gray-500 mt-1">
                        {event.date
                            ? new Date(event.date).toLocaleDateString('en-US', {
                                weekday: 'long',
                                month: 'long',
                                day: 'numeric',
                                year: 'numeric',
                            })
                            : 'No date available'}
                    </p>
                </div>

                {/* Right: Event Meta */}
                <div className="grid grid-cols-2 gap-x-8 gap-y-2 text-sm text-gray-600">
                    <div>
                        <span className="block text-gray-400 text-xs">Department</span>
                        <span className="font-medium">{event.department}</span>
                    </div>

                    <div>
                        <span className="block text-gray-400 text-xs">Participants</span>
                        <span className="font-medium">{event.participant_type}</span>
                    </div>

                    <div>
                        <span className="block text-gray-400 text-xs">Time</span>
                        <span className="font-medium">
                            {event.start_time} – {event.end_time}
                        </span>
                    </div>

                    <div>
                        <span className="block text-gray-400 text-xs">Location</span>
                        <span className="font-medium">{event.location}</span>
                    </div>
                </div>
            </div>

            {children}
        </div>
    )
}