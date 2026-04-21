'use client'

import { useRouter } from "next/navigation"

type Section = {
  id: string
  name: string
  program_id: string | null
  school_year_id: string | null
  year_level: number
  program_name: string
}

export default function SectionClient({
  eventId,
  sections,
}: {
  eventId: string
  sections: Section[]
}) {
  const router = useRouter()

  return (
    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {sections.map((section) => (
        <div
          key={section.id}
          onClick={() =>
            router.push(`/admin/feedback/${eventId}/${section.id}`)
          }
          className="cursor-pointer rounded-2xl border bg-white p-5 shadow-sm hover:shadow-md transition-all hover:border-indigo-500"
        >
          {/* Section Name */}
          <h2 className="text-lg font-semibold text-gray-900">
            {section.year_level} - {section.name}
          </h2>

          {/* Program */}
          <p className="text-sm text-gray-500 mt-1">
            {section.program_name}
          </p>

          {/* Divider */}
          <div className="my-3 border-t" />

          {/* Details */}
          <div className="space-y-1 text-sm text-gray-600">
            <div>
              <span className="text-gray-400">Year Level: </span>
              <span className="font-medium">{section.year_level}</span>
            </div>

            <div>
              <span className="text-gray-400">Program: </span>
              <span className="font-medium">{section.program_name}</span>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}