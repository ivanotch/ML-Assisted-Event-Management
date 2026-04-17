'use client'

import { useState } from 'react'
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

export default function FeedbackPage() {
    const [form, setForm] = useState<any>({})

    const handleChange = (key: string, value: any) => {
        setForm((prev: any) => ({ ...prev, [key]: value }))
    }

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        console.log(form)
    }

    const Rating = ({ label, field }: { label: string, field: string }) => (
        <div className="flex flex-col gap-2">
            <span className="text-sm text-gray-600">{label}</span>
            <div className="flex gap-2">
                {[1, 2, 3, 4, 5].map(n => (
                    <button
                        type="button"
                        key={n}
                        onClick={() => handleChange(field, n)}
                        className={`w-10 h-10 rounded-full border transition ${form[field] === n ? 'bg-indigo-600 text-white' : 'hover:bg-gray-100'}`}
                    >
                        {n}
                    </button>
                ))}
            </div>
        </div>
    )

    return (
        <div className="min-h-screen bg-gray-50 flex items-center justify-center p-6">
            <Card className="w-full max-w-3xl shadow-xl rounded-2xl">
                <CardContent className="p-8 space-y-8">

                    <div>
                        <h1 className="text-2xl font-bold">Event Feedback</h1>
                        <p className="text-gray-500 text-sm">Help us improve future events</p>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-8">

                        {/* Overall Satisfaction */}
                        <Rating label="Overall satisfaction" field="overall" />

                        {/* Ratings */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <Rating label="Organization" field="organization" />
                            <Rating label="Content / Speaker" field="content" />
                            <Rating label="Venue / Platform" field="venue" />
                            <Rating label="Relevance" field="relevance" />
                            <Rating label="Engagement" field="engagement" />
                            <Rating label="Time management" field="time" />
                        </div>

                        {/* Open Feedback */}
                        <div className="space-y-4">
                            <textarea placeholder="What did you like most?" className="w-full border rounded p-3" onChange={(e) => handleChange('likeMost', e.target.value)} />
                            <textarea placeholder="What did you like least?" className="w-full border rounded p-3" onChange={(e) => handleChange('likeLeast', e.target.value)} />
                            <textarea placeholder="Overall experience" className="w-full border rounded p-3" onChange={(e) => handleChange('experience', e.target.value)} />
                            <textarea placeholder="Suggestions" className="w-full border rounded p-3" onChange={(e) => handleChange('suggestions', e.target.value)} />
                        </div>

                        {/* Engagement */}
                        <Rating label="How engaged were you?" field="engagementLevel" />

                        <p className="text-sm text-gray-600 mb-2">Did you actively participate?</p>
                        <div className="flex gap-4">
                            {["Yes", "No"].map(opt => (
                                <button type="button" key={opt} onClick={() => handleChange('participation', opt)} className="border px-4 py-2 rounded hover:bg-gray-100">
                                    {opt}
                                </button>
                            ))}
                        </div>

                        <p className="text-sm text-gray-600 mb-2">Would you attend similar events in the future?</p>
                        <div className="flex gap-4">
                            {["Yes", "Maybe", "No"].map(opt => (
                                <button type="button" key={opt} onClick={() => handleChange('future', opt)} className="border px-4 py-2 rounded hover:bg-gray-100">
                                    {opt}
                                </button>
                            ))}
                        </div>

                        {/* NPS */}
                        <div>
                            <p className="text-sm text-gray-600 mb-2">Recommend (0-10)</p>
                            <div className="flex flex-wrap gap-2">
                                {Array.from({ length: 11 }).map((_, i) => (
                                    <button key={i} type="button" onClick={() => handleChange('nps', i)} className="w-10 h-10 border rounded hover:bg-gray-100">
                                        {i}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Attendance */}
                        <p className="text-sm text-gray-600 mb-2">Did you attend the event fully?</p>
                        <div className="space-y-2">
                            {["Fully attended", "Partially attended", "Did not attend"].map(opt => (
                                <label key={opt} className="flex gap-2">
                                    <input type="radio" name="attendance" onChange={() => handleChange('attendance', opt)} />
                                    {opt}
                                </label>
                            ))}
                        </div>

                        {/* Reasons */}
                        <p className="text-sm text-gray-600 mb-2">If not fully attended, why?</p>
                        <div className="grid grid-cols-2 gap-2">
                            {["Schedule conflict", "Lost interest", "Technical issues", "Poor promotion", "Other"].map(opt => (
                                <label key={opt} className="flex gap-2">
                                    <input type="checkbox" onChange={() => handleChange(opt, true)} />
                                    {opt}
                                </label>
                            ))}
                        </div>

                        {/* Source */}
                        <p className="text-sm text-gray-600 mb-2">How did you hear about this event?</p>
                        <div className="grid grid-cols-2 gap-2">
                            {["Email", "Social Media", "Friends", "Organization", "Other"].map(opt => (
                                <label key={opt} className="flex gap-2">
                                    <input type="radio" name="source" onChange={() => handleChange('source', opt)} />
                                    {opt}
                                </label>
                            ))}
                        </div>

                        <Button type="submit" className="w-full bg-indigo-600 text-white">
                            Submit Feedback
                        </Button>

                    </form>
                </CardContent>
            </Card>
        </div>
    )
}
