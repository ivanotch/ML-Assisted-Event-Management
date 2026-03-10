export const allEvents = {
    "scope": "all_events",

    "kpi": {
        "totalEventsHosted": 8,
        "totalRegistrations": 1420,
        "totalAttendees": 1095,
        "attendanceRate": 77.11,
        "averageEventRating": 4.3,
        "totalFeedbackSubmitted": 620,
        "attendanceGrowthPercent": 12.5
    },

    "sentimentDistribution": {
        "positive": 420,
        "neutral": 130,
        "negative": 70
    },

    "sentimentTrend": [
        { "event": "Tech Talk 2025", "date": "2025-10-01", "sentimentScore": 0.72 },
        { "event": "Hackathon 2025", "date": "2025-11-15", "sentimentScore": 0.81 },
        { "event": "Cybersecurity Seminar", "date": "2026-01-12", "sentimentScore": 0.64 },
        { "event": "AI Workshop", "date": "2026-02-10", "sentimentScore": 0.78 },
        { "event": "Leadership Summit", "date": "2026-03-02", "sentimentScore": 0.83 }
    ],

    "keywordExtraction": {
        "positiveKeywords": [
            { "word": "organized", "count": 88 },
            { "word": "informative", "count": 75 },
            { "word": "engaging", "count": 61 },
            { "word": "fun", "count": 55 }
        ],
        "negativeKeywords": [
            { "word": "late", "count": 32 },
            { "word": "crowded", "count": 21 },
            { "word": "audio", "count": 18 }
        ]
    },

    "feedbackVsAttendance": [
        { "event": "Tech Talk 2025", "attendees": 180, "feedback": 90 },
        { "event": "Hackathon 2025", "attendees": 220, "feedback": 140 },
        { "event": "Cybersecurity Seminar", "attendees": 160, "feedback": 70 },
        { "event": "AI Workshop", "attendees": 210, "feedback": 150 },
        { "event": "Leadership Summit", "attendees": 325, "feedback": 170 }
    ],

    "attendancePredictionAccuracy": [
        {
            "event": "AI Workshop",
            "predicted": 200,
            "actual": 210
        },
        {
            "event": "Leadership Summit",
            "predicted": 310,
            "actual": 325
        }
    ],

    "riskFactorSummary": [
        { "factor": "Schedule Conflict", "count": 3 },
        { "factor": "Exam Week", "count": 2 },
        { "factor": "Low Promotion", "count": 2 }
    ],

    "historicalAttendance": [
        { "year": "2025", "event": "Tech Talk", "attendance": 180 },
        { "year": "2025", "event": "Hackathon", "attendance": 220 },
        { "year": "2026", "event": "Cybersecurity Seminar", "attendance": 160 },
        { "year": "2026", "event": "AI Workshop", "attendance": 210 },
        { "year": "2026", "event": "Leadership Summit", "attendance": 325 }
    ],

    "topEvents": [
        { "event": "Leadership Summit", "performanceScore": 92 },
        { "event": "AI Workshop", "performanceScore": 88 },
        { "event": "Hackathon", "performanceScore": 85 }
    ]
}

export const singleEvent = {
    "scope": "single_event",

    "event": {
        "eventId": "evt_004",
        "eventName": "AI Workshop 2026",
        "date": "2026-02-10",
        "category": "Workshop"
    },

    "kpi": {
        "registrations": 240,
        "attendees": 210,
        "attendanceRate": 87.5,
        "averageRating": 4.6,
        "feedbackCount": 150
    },

    "sentimentDistribution": {
        "positive": 110,
        "neutral": 30,
        "negative": 10
    },

    "sentimentTrend": [
        { "time": "09:00", "score": 0.72 },
        { "time": "11:00", "score": 0.75 },
        { "time": "13:00", "score": 0.82 },
        { "time": "15:00", "score": 0.80 }
    ],

    "keywordExtraction": {
        "positiveKeywords": [
            { "word": "clear", "count": 35 },
            { "word": "interesting", "count": 28 },
            { "word": "informative", "count": 26 }
        ],
        "negativeKeywords": [
            { "word": "fast", "count": 8 },
            { "word": "limited seats", "count": 5 }
        ]
    },

    "feedbackVsAttendance": {
        "attendees": 210,
        "feedbackSubmitted": 150
    },

    "attendancePrediction": {
        "predictedAttendance": 200,
        "actualAttendance": 210,
        "confidence": 0.87
    },

    "attendanceRisk": {
        "riskLevel": "LOW",
        "probabilityOfLowTurnout": 0.18
    },

    "riskFactors": [
        {
            "factor": "Exam Week",
            "impact": "Medium"
        },
        {
            "factor": "Weather",
            "impact": "Low"
        }
    ],

    "historicalComparison": [
        {
            "event": "AI Workshop 2025",
            "attendance": 180
        },
        {
            "event": "AI Workshop 2024",
            "attendance": 150
        }
    ],

    "performanceScore": {
        "score": 88,
        "grade": "Excellent"
    }
}

export const eventDropdown = [
    { "id": "all", "name": "All Events" },
    { "id": "evt_001", "name": "Tech Talk 2025" },
    { "id": "evt_002", "name": "Hackathon 2025" },
    { "id": "evt_003", "name": "Cybersecurity Seminar" },
    { "id": "evt_004", "name": "AI Workshop 2026" },
    { "id": "evt_005", "name": "Leadership Summit" }
]