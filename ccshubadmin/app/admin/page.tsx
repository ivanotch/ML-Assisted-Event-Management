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
import { useState, useEffect } from "react"
import { Input } from "@/components/ui/input"
import SentimentBar from "@/component/graphs/SentimentBar"
import SentimentLineChart from "@/component/graphs/SentimentTrend"
import WordCloudSentiment from "@/component/graphs/WordCloud"
import FeedbackVsAttendance from "@/component/graphs/FeedbackVsAttendance"
import RiskFactorPie from "@/component/graphs/RiskPie"
import AttendancePredictionTable from "@/component/graphs/AttendancePrediction"
import HistoricalAttendance from "@/component/graphs/HistoricalAttendance"
import TopEventsTable from "@/component/graphs/EventPerformance"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { doc, setDoc, serverTimestamp, collection, addDoc } from "firebase/firestore"
import { db } from "@/lib/firebase"
import { getAuth } from 'firebase/auth';

const initialForm = {
  name: "",
  email: "",
  password: "",
  birthday: "",
  role: "student",
  studentNumber: "",
  department: "",
  section: "",
};

export default function Dashboard() {
  const [selected, setSelected] = useState("all")
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    birthday: "",
    role: "student",
    studentNumber: "",
    department: "",
    section: "",
  });

  const data = selected === "all" ? allEvents : singleEvent

  const topKPI = data.kpi.slice(0, 3)
  const bottomKPI = data.kpi.slice(3, 7)

  const handleCreateAccount = async () => {
    if (!form.email || !form.password) return;

    setLoading(true);

    try {
      const res = await fetch('/api/createUser', {
        method: 'POST',
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: form.email,
          password: form.password,
          role: form.role,
          name: form.name
        })
      });

      if (!res.ok) {
        throw new Error("Failed to create user");
      }

      const data = await res.json();
      const uid = data.uid;

      // ✅ Base user document (single source of truth)
      await setDoc(doc(db, 'user', uid), {
        birthday: form.birthday,
        created_at: serverTimestamp(),
        email: form.email,
        name: form.name,
        type: form.role,
      });

      // ✅ Role-specific collections
      if (form.role === 'student') {
        setDoc(doc(db, 'students', uid), {
          section_id: form.section,
          student_number: form.studentNumber,
          user_id: uid,
        });
      }

      if (form.role === 'student_committee') {
        setDoc(doc(db, 'student_committee', uid), {
          section_id: form.section,
          student_number: form.studentNumber,
          user_id: uid,
        });
      }
      console.log("User created successfully");
      setForm(initialForm)
      setLoading(false)
      setOpen(false)

    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }

    
  };

  const handleChange = (key: string, value: string) => {
    setForm((prev) => ({
      ...prev,
      [key]: value
    }))
  }

  useEffect(() => {
    if (form.role === "admin") {
      setForm(prev => ({
        ...prev,
        department: "",
        section: "",
        studentNumber: "",
      }));
    }

    if (form.role === "student_committee") {
      setForm(prev => ({
        ...prev,
        department: "",
        section: "",
        studentNumber: "",
      }));
    }

    if (form.role === "faculty") {
      setForm(prev => ({
        ...prev,
        section: "",
        studentNumber: "",
      }));
    }
  }, [form.role]);

  return (
    <main className="p-6 space-y-6">

      {/* Header */}
      <div className="flex justify-between items-center">
        <h1 className="text-xl font-semibold">Dashboard</h1>

        <div className="flex gap-5 font-[inter]">
          <div>
            <Button onClick={() => setOpen(true)}>Add an Account</Button>
          </div>
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

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="max-w-lg" aria-describedby="create an account">
          <DialogHeader>
            <DialogTitle>Create Account</DialogTitle>
          </DialogHeader>

          <div className="space-y-4">
            {/* Basic Fields */}
            <Input placeholder="Full Name" value={form.name} onChange={(e) => handleChange('name', e.target.value)} />
            <Input placeholder="Email" type="email" value={form.email} onChange={(e) => handleChange('email', e.target.value)} />
            <Input placeholder="Password" type="password" value={form.password} onChange={(e) => handleChange('password', e.target.value)} />
            <Input type="date" value={form.birthday} onChange={(e) => handleChange('birthday', e.target.value)} />

            {/* Role Select */}
            <Select value={form.role} onValueChange={(val) => handleChange('role', val)}>
              <SelectTrigger>
                <SelectValue placeholder="Select Role" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="student">Student</SelectItem>
                <SelectItem value="student_committee">Student Committee</SelectItem>
                <SelectItem value="faculty">Faculty</SelectItem>
                <SelectItem value="admin">Admin</SelectItem>
              </SelectContent>
            </Select>

            {/* STUDENT FIELDS */}
            {form.role === "student" && (
              <>
                <Input placeholder="Student Number" value={form.studentNumber} onChange={(e) => handleChange('studentNumber', e.target.value)} />

                <Select onValueChange={(e) => handleChange('department', e)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Department" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="ccs">CCS</SelectItem>
                    <SelectItem value="cas">CAS</SelectItem>
                    <SelectItem value="cit">CIT</SelectItem>
                  </SelectContent>
                </Select>

                <Select onValueChange={(e) => handleChange('section', e)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Section" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="fwWItCYBMtSXUBETjIkT">Section A</SelectItem>
                    <SelectItem value="hGlNnaE8TEmqkOwUiLsY">Section B</SelectItem>
                  </SelectContent>
                </Select>
              </>
            )}

            {form.role === "student_committee" && (
              <>
                <Input placeholder="Student Number" value={form.studentNumber} onChange={(e) => handleChange('studentNumber', e.target.value)} />

                <Select onValueChange={(e) => handleChange('department', e)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Department" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="ccs">CCS</SelectItem>
                    <SelectItem value="cas">CAS</SelectItem>
                    <SelectItem value="cit">CIT</SelectItem>
                  </SelectContent>
                </Select>

                <Select onValueChange={(e) => handleChange('section', e)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Section" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="fwWItCYBMtSXUBETjIkT">Section A</SelectItem>
                    <SelectItem value="hGlNnaE8TEmqkOwUiLsY">Section B</SelectItem>
                  </SelectContent>
                </Select>
              </>
            )}

            {/* FACULTY FIELDS */}
            {form.role === "faculty" && (
              <Select onValueChange={(e) => handleChange('department', e)}>
                <SelectTrigger>
                  <SelectValue placeholder="Department" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="ccs">CCS</SelectItem>
                  <SelectItem value="cas">CAS</SelectItem>
                  <SelectItem value="cit">CIT</SelectItem>
                </SelectContent>
              </Select>
            )}

            {/* ACTION */}
            <Button disabled={loading} onClick={handleCreateAccount} className="w-full">
              {loading ? "Loading..." : "Create Account"}
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </main>
  )
}