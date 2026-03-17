import {
  Calendar,
  Users,
  UserCheck,
  Percent,
  Star,
  MessageSquare,
  TrendingUp
} from "lucide-react";

export const kpiConfig = {
  totalEventsHosted: {
    label: "Total Events",
    icon: Calendar
  },
  totalRegistrations: {
    label: "Registrations",
    icon: Users
  },
  totalAttendees: {
    label: "Attendees",
    icon: UserCheck
  },
  attendanceRate: {
    label: "Attendance Rate",
    icon: Percent
  },
  averageEventRating: {
    label: "Avg Rating",
    icon: Star
  },
  totalFeedbackSubmitted: {
    label: "Feedback",
    icon: MessageSquare
  },
  attendanceGrowthPercent: {
    label: "Growth",
    icon: TrendingUp
  }
};