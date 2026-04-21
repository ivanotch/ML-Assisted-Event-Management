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

type EventFeedback = {
  id: string

  event_id: string
  user_id: string

  submitted_at: any // Firestore Timestamp (we'll refine below)

  engagement_feedback: {
    engagement_level: number
    nps_score: number
    participated: boolean
    future_interest: string
  }

  attendance_feedback: {
    attendance_status: string
    reason: string[]
    heard_from: string
  }

  feedback_text: {
    negative_text: string
    experience: string
    positive_text: string
    suggestion: string
  }

  feedback_rating: {
    organization_rate: number
    venue_rate: number
    overall_rate: number
    relevance_rate: number
    engagement_rate: number
    management_rate: number
    content_rate: number
  }
}

export default function SectionClient({
  eventId,
  sections,
  feedback = []
}: {
  eventId: string
  sections: Section[]
  feedback: EventFeedback[]
}) {
  const router = useRouter()

  const totalResponses = feedback.length
  // console.log(feedback)

  const avgOverallRating =
    totalResponses > 0
      ? (
        feedback.reduce(
          (sum, f) => sum + f.feedback_rating.overall_rate,
          0
        ) / totalResponses
      ).toFixed(1)
      : "0"

  const avgNPS =
    totalResponses > 0
      ? (
        feedback.reduce(
          (sum, f) => sum + f.engagement_feedback.nps_score,
          0
        ) / totalResponses
      ).toFixed(1)
      : "0"

  const participationRate =
    totalResponses > 0
      ? (
        (feedback.filter(f => f.engagement_feedback.participated).length /
          totalResponses) *
        100
      ).toFixed(0)
      : "0"

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {/* Total Responses */}
        <div className="bg-white border rounded-xl p-4 shadow-sm">
          <p className="text-xs text-gray-400">Total Responses</p>
          <h2 className="text-xl font-bold text-gray-900">
            {totalResponses}
          </h2>
        </div>

        {/* Avg Rating */}
        <div className="bg-white border rounded-xl p-4 shadow-sm">
          <p className="text-xs text-gray-400">Avg Rating</p>
          <h2 className="text-xl font-bold text-gray-900">
            {avgOverallRating} / 5
          </h2>
        </div>

        {/* NPS */}
        <div className="bg-white border rounded-xl p-4 shadow-sm">
          <p className="text-xs text-gray-400">Avg NPS</p>
          <h2 className="text-xl font-bold text-gray-900">
            {avgNPS} / 10
          </h2>
        </div>

        {/* Participation */}
        <div className="bg-white border rounded-xl p-4 shadow-sm">
          <p className="text-xs text-gray-400">Participation</p>
          <h2 className="text-xl font-bold text-gray-900">
            {participationRate}%
          </h2>
        </div>
      </div>
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
    </div>
  )
}