'use client'

import { allEvents, singleEvent } from "@/mock/analyticsData"
import CardKPI from "@/component/CardKPI"
import { kpiConfig } from "@/types/ConfigKPI"
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { useState } from "react"
import SentimentBar from "@/component/graphs/SentimentBar"
import SentimentLineChart from "@/component/graphs/SentimentTrend"
import WordCloudSentiment from "@/component/graphs/WordCloud"
import FeedbackVsAttendance from "@/component/graphs/FeedbackVsAttendance"
import RiskFactorPie from "@/component/graphs/RiskPie"
import AttendancePredictionTable from "@/component/graphs/AttendancePrediction"
import HistoricalAttendance from "@/component/graphs/HistoricalAttendance"
import TopEventsTable from "@/component/graphs/EventPerformance"

export default function Dashboard() {
  const [selected, setSelected] = useState("all")

  const data = selected === "all" ? allEvents : singleEvent

  const topKPI = data.kpi.slice(0, 3)
  const bottomKPI = data.kpi.slice(3, 7)

  return (
    <main className="p-6 space-y-6">

      {/* Header */}
      <div className="flex justify-between items-center">
        <h1 className="text-xl font-semibold">Dashboard</h1>

        <Select value={selected} onValueChange={setSelected}>
          <SelectTrigger className="w-[200px]">
            <SelectValue placeholder="Select Event" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectItem value="all">All Events</SelectItem>
              <SelectItem value="evt_004">AI Workshop 2026</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>

      {/* Main Grid */}
      <div className="grid grid-cols-12 gap-6">

        {/* LEFT: KPI Section */}
        <div className="col-span-8 space-y-6">

          {/* Top KPI (3 cards) */}
          <div className="grid grid-cols-3 gap-4">
            {topKPI.map((item) => {
              const config =
                kpiConfig[item.key as keyof typeof kpiConfig]

              return (
                <CardKPI
                  key={item.key}
                  name={item.label}
                  value={item.value}
                  icon={config.icon}
                />
              )
            })}
          </div>

          {/* Bottom KPI (4 cards) */}
          <div className="grid grid-cols-4 gap-4 ">
            {bottomKPI.map((item) => {
              const config =
                kpiConfig[item.key as keyof typeof kpiConfig]

              return (
                <CardKPI
                  key={item.key}
                  name={item.label}
                  value={item.value}
                  icon={config.icon}
                />
              )
            })}
          </div>
        </div>

        {/* RIGHT: Graph */}
        <div className="col-span-4 h-[350px]">
          <SentimentBar data={data.sentimentDistribution} />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-5 h-[400px]">
        <SentimentLineChart data={allEvents.sentimentTrend} />
        <WordCloudSentiment data={allEvents.keywordExtraction} />
      </div>

      <div className="grid grid-cols-3 gap-3 h-[400px]">
        <FeedbackVsAttendance data={allEvents.feedbackVsAttendance} />
        <RiskFactorPie data={allEvents.riskFactorSummary} />
        <AttendancePredictionTable data={allEvents.attendancePredictionAccuracy} />
      </div>

      <div className="grid grid-cols-2 gap-5 h-[400px]">
        <HistoricalAttendance data={allEvents.historicalAttendance} />
        <TopEventsTable data={allEvents.topEvents} />
      </div>
    </main>
  )
}