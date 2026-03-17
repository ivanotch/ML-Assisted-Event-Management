export const allEvents = {
  scope: "all_events",

  kpi: [
    { key: "totalEventsHosted", label: "Total Events", value: 8 },
    { key: "totalRegistrations", label: "Registrations", value: 1420 },
    { key: "totalAttendees", label: "Attendees", value: 1095 },
    { key: "attendanceRate", label: "Attendance Rate", value: 77.11 },
    { key: "averageEventRating", label: "Avg Rating", value: 4.3 },
    { key: "totalFeedbackSubmitted", label: "Feedback", value: 620 },
    { key: "attendanceGrowthPercent", label: "Growth", value: 12.5 }
  ],

  sentimentDistribution: [
    { type: "positive", value: 420 },
    { type: "neutral", value: 130 },
    { type: "negative", value: 70 }
  ],

  sentimentTrend: [
    { event: "Tech Talk 2025", date: "2025-10-01", sentimentScore: 0.72 },
    { event: "Hackathon 2025", date: "2025-11-15", sentimentScore: 0.81 },
    { event: "Cybersecurity Seminar", date: "2026-01-12", sentimentScore: 0.64 },
    { event: "AI Workshop", date: "2026-02-10", sentimentScore: 0.78 },
    { event: "Leadership Summit", date: "2026-03-02", sentimentScore: 0.83 }
  ],

  keywordExtraction: [
    { type: "positive", text: "organized", value: 880 },
    { type: "positive", text: "informative", value: 750 },
    { type: "positive", text: "engaging", value: 610 },
    { type: "positive", text: "fun", value: 550 },
    { type: "negative", text: "late", value: 320 },
    { type: "negative", text: "crowded", value: 210 },
    { type: "negative", text: "audio", value: 180 }
  ],

  feedbackVsAttendance: [
    { event: "Tech Talk 2025", attendees: 180, feedback: 90 },
    { event: "Hackathon 2025", attendees: 220, feedback: 140 },
    { event: "Cybersecurity Seminar", attendees: 160, feedback: 70 },
    { event: "AI Workshop", attendees: 210, feedback: 150 },
    { event: "Leadership Summit", attendees: 325, feedback: 170 }
  ],

  attendancePredictionAccuracy: [
    { event: "AI Workshop", predicted: 200, actual: 210 },
    { event: "Leadership Summit", predicted: 310, actual: 325 }
  ],

  riskFactorSummary: [
    { factor: "Schedule Conflict", count: 3 },
    { factor: "Exam Week", count: 2 },
    { factor: "Low Promotion", count: 2 }
  ],

  historicalAttendance: [
    { year: "2025", event: "Tech Talk", attendance: 180 },
    { year: "2025", event: "Hackathon", attendance: 220 },
    { year: "2026", event: "Cybersecurity Seminar", attendance: 160 },
    { year: "2026", event: "AI Workshop", attendance: 210 },
    { year: "2026", event: "Leadership Summit", attendance: 325 }
  ],

  topEvents: [
    { event: "Leadership Summit", performanceScore: 92 },
    { event: "AI Workshop", performanceScore: 88 },
    { event: "Hackathon", performanceScore: 85 }
  ]
};

export const singleEvent = {
  scope: "single_event",

  event: [
    { label: "Event Name", value: "AI Workshop 2026" },
    { label: "Date", value: "2026-02-10" },
    { label: "Category", value: "Workshop" }
  ],

  kpi: [
    { key: "registrations", label: "Registrations", value: 240 },
    { key: "attendees", label: "Attendees", value: 210 },
    { key: "attendanceRate", label: "Attendance Rate", value: 87.5 },
    { key: "averageRating", label: "Avg Rating", value: 4.6 },
    { key: "feedbackCount", label: "Feedback", value: 150 }
  ],

  sentimentDistribution: [
    { type: "positive", value: 110 },
    { type: "neutral", value: 30 },
    { type: "negative", value: 10 }
  ],

  sentimentTrend: [
    { time: "09:00", score: 0.72 },
    { time: "11:00", score: 0.75 },
    { time: "13:00", score: 0.82 },
    { time: "15:00", score: 0.80 }
  ],

  keywordExtraction: [
    { type: "positive", word: "clear", count: 35 },
    { type: "positive", word: "interesting", count: 28 },
    { type: "positive", word: "informative", count: 26 },
    { type: "negative", word: "fast", count: 8 },
    { type: "negative", word: "limited seats", count: 5 }
  ],

  feedbackVsAttendance: [
    { label: "Attendees", value: 210 },
    { label: "Feedback", value: 150 }
  ],

  attendancePrediction: [
    { label: "Predicted", value: 200 },
    { label: "Actual", value: 210 },
    { label: "Confidence", value: 0.87 }
  ],

  attendanceRisk: [
    { label: "Risk Level", value: "LOW" },
    { label: "Probability", value: 0.18 }
  ],

  riskFactors: [
    { factor: "Exam Week", impact: "Medium" },
    { factor: "Weather", impact: "Low" }
  ],

  historicalComparison: [
    { event: "AI Workshop 2025", attendance: 180 },
    { event: "AI Workshop 2024", attendance: 150 }
  ],

  performanceScore: [
    { label: "Score", value: 88 },
    { label: "Grade", value: "Excellent" }
  ]
};