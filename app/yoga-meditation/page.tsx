"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Slider } from "@/components/ui/slider"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  ArrowLeft,
  NotebookIcon as Lotus,
  Clock,
  Users,
  Play,
  Pause,
  RotateCcw,
  Brain,
  Sparkles,
  Zap,
  Moon,
  Sun,
  Wind,
  Waves,
  Mountain,
  Leaf,
} from "lucide-react"

interface Session {
  id: number
  title: string
  type: "yoga" | "meditation" | "breathing"
  duration: string
  difficulty: "beginner" | "intermediate" | "advanced"
  instructor: string
  description: string
  benefits: string[]
  icon: any
  isPlaying?: boolean
}

export default function YogaMeditationPage() {
  const [selectedType, setSelectedType] = useState("all")
  const [selectedDifficulty, setSelectedDifficulty] = useState("all")
  const [sessionDuration, setSessionDuration] = useState([30])
  const [sessions, setSessions] = useState<Session[]>([
    {
      id: 1,
      title: "Morning Sun Salutation",
      type: "yoga",
      duration: "20 min",
      difficulty: "beginner",
      instructor: "Sarah Chen",
      description: "Start your day with energizing sun salutations to awaken your body and mind",
      benefits: ["Increases flexibility", "Boosts energy", "Improves circulation"],
      icon: Sun,
      isPlaying: false,
    },
    {
      id: 2,
      title: "Mindful Breathing Meditation",
      type: "meditation",
      duration: "15 min",
      difficulty: "beginner",
      instructor: "Dr. Michael Torres",
      description: "Learn the fundamentals of mindful breathing to reduce stress and anxiety",
      benefits: ["Reduces stress", "Improves focus", "Calms nervous system"],
      icon: Wind,
      isPlaying: false,
    },
    {
      id: 3,
      title: "Deep Relaxation Yoga Nidra",
      type: "meditation",
      duration: "45 min",
      difficulty: "intermediate",
      instructor: "Priya Sharma",
      description: "Experience profound relaxation through guided yoga nidra practice",
      benefits: ["Deep relaxation", "Better sleep", "Stress relief"],
      icon: Moon,
      isPlaying: false,
    },
    {
      id: 4,
      title: "Power Vinyasa Flow",
      type: "yoga",
      duration: "35 min",
      difficulty: "advanced",
      instructor: "Jake Williams",
      description: "Dynamic flowing sequences to build strength and flexibility",
      benefits: ["Builds strength", "Increases flexibility", "Improves balance"],
      icon: Zap,
      isPlaying: false,
    },
    {
      id: 5,
      title: "4-7-8 Breathing Technique",
      type: "breathing",
      duration: "10 min",
      difficulty: "beginner",
      instructor: "Dr. Lisa Park",
      description: "Master the 4-7-8 breathing pattern for instant calm and better sleep",
      benefits: ["Instant calm", "Better sleep", "Anxiety relief"],
      icon: Waves,
      isPlaying: false,
    },
    {
      id: 6,
      title: "Mountain Meditation",
      type: "meditation",
      duration: "25 min",
      difficulty: "intermediate",
      instructor: "Emma Rodriguez",
      description: "Find inner stability and peace through mountain meditation visualization",
      benefits: ["Inner stability", "Mental clarity", "Emotional balance"],
      icon: Mountain,
      isPlaying: false,
    },
    {
      id: 7,
      title: "Gentle Yin Yoga",
      type: "yoga",
      duration: "40 min",
      difficulty: "beginner",
      instructor: "Anna Thompson",
      description: "Slow, passive poses held for longer periods to release deep tension",
      benefits: ["Deep stretching", "Stress relief", "Joint mobility"],
      icon: Leaf,
      isPlaying: false,
    },
    {
      id: 8,
      title: "Box Breathing for Focus",
      type: "breathing",
      duration: "12 min",
      difficulty: "intermediate",
      instructor: "Captain James Miller",
      description: "Military-grade breathing technique for enhanced focus and performance",
      benefits: ["Enhanced focus", "Stress management", "Mental clarity"],
      icon: Brain,
      isPlaying: false,
    },
  ])

  const [activeTimer, setActiveTimer] = useState<number | null>(null)
  const [timeRemaining, setTimeRemaining] = useState(0)

  const filteredSessions = sessions.filter((session) => {
    const typeMatch = selectedType === "all" || session.type === selectedType
    const difficultyMatch = selectedDifficulty === "all" || session.difficulty === selectedDifficulty
    const durationMatch = Number.parseInt(session.duration) <= sessionDuration[0]
    return typeMatch && difficultyMatch && durationMatch
  })

  const toggleSession = (sessionId: number) => {
    setSessions(
      sessions.map((session) =>
        session.id === sessionId ? { ...session, isPlaying: !session.isPlaying } : { ...session, isPlaying: false },
      ),
    )

    const session = sessions.find((s) => s.id === sessionId)
    if (session && !session.isPlaying) {
      setActiveTimer(sessionId)
      setTimeRemaining(Number.parseInt(session.duration) * 60) // Convert to seconds
    } else {
      setActiveTimer(null)
      setTimeRemaining(0)
    }
  }

  const getTypeColor = (type: string) => {
    switch (type) {
      case "yoga":
        return "from-pink-500 to-rose-600"
      case "meditation":
        return "from-purple-500 to-indigo-600"
      case "breathing":
        return "from-cyan-500 to-blue-600"
      default:
        return "from-gray-500 to-gray-600"
    }
  }

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "beginner":
        return "from-green-500 to-emerald-600"
      case "intermediate":
        return "from-yellow-500 to-orange-600"
      case "advanced":
        return "from-red-500 to-pink-600"
      default:
        return "from-gray-500 to-gray-600"
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-pink-400/20 to-rose-600/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-br from-purple-400/20 to-indigo-600/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-br from-cyan-400/10 to-blue-600/10 rounded-full blur-3xl animate-pulse delay-500"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8 relative z-10">
        {/* Header */}
        <div className="flex items-center mb-8">
          <Link href="/dashboard">
            <Button variant="ghost" size="sm" className="mr-4 text-gray-300 hover:text-white">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Dashboard
            </Button>
          </Link>
          <div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-white to-pink-200 bg-clip-text text-transparent flex items-center">
              Yoga & Meditation
              <Sparkles className="ml-2 h-8 w-8 text-yellow-400" />
            </h1>
            <p className="text-gray-400 text-lg">Find inner peace with guided sessions and mindful practices</p>
          </div>
        </div>

        <div className="grid lg:grid-cols-4 gap-8">
          {/* Filters Sidebar */}
          <div className="lg:col-span-1">
            <Card className="bg-gradient-to-br from-pink-500/10 to-purple-600/10 border-pink-400/30 backdrop-blur-xl shadow-2xl hover:shadow-pink-500/20 transition-all duration-500">
              <CardHeader>
                <CardTitle className="text-pink-300 flex items-center">
                  <div className="p-2 bg-gradient-to-r from-pink-400 to-rose-500 rounded-lg mr-3">
                    <Lotus className="h-5 w-5 text-white" />
                  </div>
                  Customize Your Practice
                </CardTitle>
                <CardDescription className="text-gray-400">
                  Filter sessions based on your preferences and available time
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <Label className="text-gray-200">Session Type</Label>
                  <Select value={selectedType} onValueChange={setSelectedType}>
                    <SelectTrigger className="bg-white/10 border-white/20 text-white focus:border-pink-400 focus:ring-pink-400/20">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="bg-gray-900 border-gray-700">
                      <SelectItem value="all" className="text-white hover:bg-gray-800">
                        All Types
                      </SelectItem>
                      <SelectItem value="yoga" className="text-white hover:bg-gray-800">
                        Yoga
                      </SelectItem>
                      <SelectItem value="meditation" className="text-white hover:bg-gray-800">
                        Meditation
                      </SelectItem>
                      <SelectItem value="breathing" className="text-white hover:bg-gray-800">
                        Breathing
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label className="text-gray-200">Difficulty Level</Label>
                  <Select value={selectedDifficulty} onValueChange={setSelectedDifficulty}>
                    <SelectTrigger className="bg-white/10 border-white/20 text-white focus:border-pink-400 focus:ring-pink-400/20">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="bg-gray-900 border-gray-700">
                      <SelectItem value="all" className="text-white hover:bg-gray-800">
                        All Levels
                      </SelectItem>
                      <SelectItem value="beginner" className="text-white hover:bg-gray-800">
                        Beginner
                      </SelectItem>
                      <SelectItem value="intermediate" className="text-white hover:bg-gray-800">
                        Intermediate
                      </SelectItem>
                      <SelectItem value="advanced" className="text-white hover:bg-gray-800">
                        Advanced
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-3">
                  <Label className="text-purple-200">Max Duration: {sessionDuration[0]} minutes</Label>
                  <div className="p-4 bg-white/5 rounded-xl backdrop-blur-sm border border-purple-400/20">
                    <Slider
                      value={sessionDuration}
                      onValueChange={setSessionDuration}
                      max={60}
                      min={5}
                      step={5}
                      className="w-full [&_[role=slider]]:bg-gradient-to-r [&_[role=slider]]:from-purple-400 [&_[role=slider]]:to-pink-500 [&_[role=slider]]:border-0 [&_[role=slider]]:w-6 [&_[role=slider]]:h-6"
                    />
                    <div className="flex justify-between text-xs text-gray-400 mt-2">
                      <span>5 min</span>
                      <span>30 min</span>
                      <span>60 min</span>
                    </div>
                  </div>
                </div>

                {/* Active Session Timer */}
                {activeTimer && (
                  <div className="p-4 bg-gradient-to-br from-cyan-500/20 to-blue-600/20 rounded-xl border border-cyan-400/30">
                    <div className="text-center">
                      <div className="text-2xl font-bold text-cyan-300 mb-2">
                        {Math.floor(timeRemaining / 60)}:{(timeRemaining % 60).toString().padStart(2, "0")}
                      </div>
                      <p className="text-sm text-gray-400">Session in progress</p>
                      <Button
                        onClick={() => {
                          setActiveTimer(null)
                          setTimeRemaining(0)
                          setSessions(sessions.map((s) => ({ ...s, isPlaying: false })))
                        }}
                        variant="outline"
                        size="sm"
                        className="mt-2 border-cyan-400/30 text-cyan-300 hover:bg-cyan-400/10"
                      >
                        <RotateCcw className="h-4 w-4 mr-1" />
                        Reset
                      </Button>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Sessions Grid */}
          <div className="lg:col-span-3">
            <div className="mb-6">
              <h2 className="text-3xl font-bold bg-gradient-to-r from-white to-pink-200 bg-clip-text text-transparent mb-2">
                Available Sessions
              </h2>
              <p className="text-gray-400 text-lg">Choose from our curated collection of wellness practices</p>
            </div>

            <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">
              {filteredSessions.map((session) => {
                const IconComponent = session.icon
                const typeGradient = getTypeColor(session.type)
                const difficultyGradient = getDifficultyColor(session.difficulty)

                return (
                  <Card
                    key={session.id}
                    className="bg-gradient-to-br from-gray-800/50 to-blue-800/50 backdrop-blur-xl border-cyan-500/20 hover:shadow-2xl hover:shadow-cyan-500/20 transition-all duration-500 transform hover:scale-105 hover:-translate-y-2"
                  >
                    <CardHeader>
                      <div className="flex items-center justify-between mb-2">
                        <Badge className={`bg-gradient-to-r ${typeGradient} text-white border-0 capitalize`}>
                          {session.type}
                        </Badge>
                        <Badge className={`bg-gradient-to-r ${difficultyGradient} text-white border-0 capitalize`}>
                          {session.difficulty}
                        </Badge>
                      </div>
                      <CardTitle className="flex items-center text-white">
                        <div className={`p-2 bg-gradient-to-r ${typeGradient} rounded-lg mr-3`}>
                          <IconComponent className="h-5 w-5 text-white" />
                        </div>
                        {session.title}
                      </CardTitle>
                      <CardDescription className="flex items-center space-x-4 text-gray-400">
                        <span className="flex items-center">
                          <Clock className="h-4 w-4 mr-1 text-cyan-400" />
                          {session.duration}
                        </span>
                        <span className="flex items-center">
                          <Users className="h-4 w-4 mr-1 text-purple-400" />
                          {session.instructor}
                        </span>
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <p className="text-gray-300 mb-4">{session.description}</p>

                      <div className="mb-4">
                        <h4 className="font-semibold mb-2 text-white">Benefits:</h4>
                        <ul className="text-sm text-gray-300 space-y-1">
                          {session.benefits.map((benefit, index) => (
                            <li key={index} className="flex items-center">
                              <div className="w-1 h-1 bg-pink-400 rounded-full mr-2"></div>
                              {benefit}
                            </li>
                          ))}
                        </ul>
                      </div>

                      <Button
                        onClick={() => toggleSession(session.id)}
                        className={`w-full transition-all duration-300 transform hover:scale-105 ${
                          session.isPlaying
                            ? "bg-gradient-to-r from-red-500 to-pink-600 hover:from-red-600 hover:to-pink-700"
                            : `bg-gradient-to-r ${typeGradient} hover:shadow-lg`
                        }`}
                      >
                        {session.isPlaying ? (
                          <>
                            <Pause className="h-4 w-4 mr-2" />
                            Pause Session
                          </>
                        ) : (
                          <>
                            <Play className="h-4 w-4 mr-2" />
                            Start Session
                          </>
                        )}
                      </Button>
                    </CardContent>
                  </Card>
                )
              })}
            </div>

            {filteredSessions.length === 0 && (
              <Card className="text-center py-12 bg-gradient-to-br from-gray-800/50 to-blue-800/50 backdrop-blur-xl border-cyan-500/20">
                <CardContent>
                  <div className="p-4 bg-gradient-to-r from-pink-400 to-rose-500 rounded-full w-fit mx-auto mb-4">
                    <Lotus className="h-12 w-12 text-white" />
                  </div>
                  <h3 className="text-lg font-semibold text-white mb-2">No sessions found</h3>
                  <p className="text-gray-400 mb-4">
                    Try adjusting your filters to find sessions that match your preferences
                  </p>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
