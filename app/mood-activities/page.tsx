"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Slider } from "@/components/ui/slider"
import { Label } from "@/components/ui/label"
import {
  ArrowLeft,
  Brain,
  Smile,
  Frown,
  Meh,
  Heart,
  Zap,
  Moon,
  Sun,
  Activity,
  Music,
  Book,
  Coffee,
  Sparkles,
} from "lucide-react"

interface ActivitySuggestion {
  id: number
  title: string
  description: string
  duration: string
  category: string
  energyLevel: "low" | "medium" | "high"
  icon: any
  benefits: string[]
}

export default function MoodActivitiesPage() {
  const [mood, setMood] = useState(3)
  const [energy, setEnergy] = useState([5])
  const [timeAvailable, setTimeAvailable] = useState([30])
  const [activities, setActivities] = useState<ActivitySuggestion[]>([])
  const [loading, setLoading] = useState(false)

  const moodEmojis = [
    {
      value: 1,
      icon: Frown,
      label: "Very Sad",
      color: "text-red-400",
      bgColor: "from-red-500/20 to-pink-600/20",
      borderColor: "border-red-400/30",
      description: "Feeling down and need comfort",
    },
    {
      value: 2,
      icon: Frown,
      label: "Sad",
      color: "text-orange-400",
      bgColor: "from-orange-500/20 to-red-600/20",
      borderColor: "border-orange-400/30",
      description: "A bit low but manageable",
    },
    {
      value: 3,
      icon: Meh,
      label: "Neutral",
      color: "text-yellow-400",
      bgColor: "from-yellow-500/20 to-orange-600/20",
      borderColor: "border-yellow-400/30",
      description: "Feeling okay, neither up nor down",
    },
    {
      value: 4,
      icon: Smile,
      label: "Happy",
      color: "text-green-400",
      bgColor: "from-green-500/20 to-emerald-600/20",
      borderColor: "border-green-400/30",
      description: "Feeling good and positive",
    },
    {
      value: 5,
      icon: Smile,
      label: "Very Happy",
      color: "text-blue-400",
      bgColor: "from-blue-500/20 to-cyan-600/20",
      borderColor: "border-blue-400/30",
      description: "Feeling amazing and energetic",
    },
  ]

  const generateActivities = () => {
    setLoading(true)

    // Simulate AI recommendation based on mood and energy
    setTimeout(() => {
      let suggestedActivities: ActivitySuggestion[] = []

      if (mood <= 2) {
        // Low mood activities
        suggestedActivities = [
          {
            id: 1,
            title: "AI-Guided Breathing Exercise",
            description: "Personalized breathing techniques to help calm your mind and reduce stress",
            duration: "5-10 min",
            category: "Mindfulness",
            energyLevel: "low",
            icon: Moon,
            benefits: ["Reduces anxiety", "Improves focus", "Promotes relaxation"],
          },
          {
            id: 2,
            title: "Therapeutic Music Session",
            description: "AI-curated playlist of soothing music to lift your spirits",
            duration: "15-30 min",
            category: "Entertainment",
            energyLevel: "low",
            icon: Music,
            benefits: ["Mood enhancement", "Stress relief", "Emotional regulation"],
          },
          {
            id: 3,
            title: "Mindful Journaling",
            description: "Write down your thoughts and feelings to process emotions",
            duration: "10-20 min",
            category: "Self-care",
            energyLevel: "low",
            icon: Book,
            benefits: ["Emotional clarity", "Stress reduction", "Self-awareness"],
          },
          {
            id: 4,
            title: "Relaxation Ritual",
            description: "Take time for self-care with a relaxing warm bath",
            duration: "15-30 min",
            category: "Self-care",
            energyLevel: "low",
            icon: Heart,
            benefits: ["Muscle relaxation", "Improved mood", "Better sleep"],
          },
        ]
      } else if (mood === 3) {
        // Neutral mood activities
        suggestedActivities = [
          {
            id: 5,
            title: "Nature Walk Therapy",
            description: "A gentle walk in nature to boost your mood and energy",
            duration: "15-30 min",
            category: "Exercise",
            energyLevel: "medium",
            icon: Sun,
            benefits: ["Vitamin D", "Mood boost", "Light exercise"],
          },
          {
            id: 6,
            title: "Creative Expression",
            description: "Try drawing, painting, or any creative hobby you enjoy",
            duration: "20-45 min",
            category: "Creative",
            energyLevel: "medium",
            icon: Activity,
            benefits: ["Self-expression", "Mindfulness", "Skill development"],
          },
          {
            id: 7,
            title: "Social Connection",
            description: "Connect with someone you care about for social support",
            duration: "15-30 min",
            category: "Social",
            energyLevel: "medium",
            icon: Heart,
            benefits: ["Social connection", "Emotional support", "Mood improvement"],
          },
          {
            id: 8,
            title: "Mindful Organization",
            description: "Tidy up your space for a sense of accomplishment",
            duration: "10-20 min",
            category: "Productivity",
            energyLevel: "medium",
            icon: Coffee,
            benefits: ["Sense of control", "Productivity", "Mental clarity"],
          },
        ]
      } else {
        // High mood activities
        suggestedActivities = [
          {
            id: 9,
            title: "High-Energy Workout",
            description: "Channel your positive energy into an invigorating exercise session",
            duration: "30-60 min",
            category: "Exercise",
            energyLevel: "high",
            icon: Zap,
            benefits: ["Endorphin release", "Physical fitness", "Energy boost"],
          },
          {
            id: 10,
            title: "Learning Adventure",
            description: "Start a new online course or tutorial in something you're interested in",
            duration: "30-60 min",
            category: "Learning",
            energyLevel: "high",
            icon: Book,
            benefits: ["Skill development", "Mental stimulation", "Personal growth"],
          },
          {
            id: 11,
            title: "Social Gathering",
            description: "Meet up with friends or join a group activity",
            duration: "60+ min",
            category: "Social",
            energyLevel: "high",
            icon: Heart,
            benefits: ["Social bonding", "Fun and enjoyment", "Shared experiences"],
          },
          {
            id: 12,
            title: "Creative Project",
            description: "Start or continue a creative project you're passionate about",
            duration: "45-90 min",
            category: "Creative",
            energyLevel: "high",
            icon: Activity,
            benefits: ["Self-expression", "Flow state", "Accomplishment"],
          },
        ]
      }

      // Filter by energy level and time available
      const filteredActivities = suggestedActivities.filter((activity) => {
        const activityDuration = Number.parseInt(activity.duration.split("-")[0])
        return activityDuration <= timeAvailable[0]
      })

      setActivities(filteredActivities.slice(0, 4))
      setLoading(false)
    }, 1500)
  }

  const currentMoodEmoji = moodEmojis.find((m) => m.value === mood) || moodEmojis[2]

  const getCategoryColor = (category: string) => {
    switch (category) {
      case "Mindfulness":
        return "from-purple-500 to-pink-600"
      case "Exercise":
        return "from-green-500 to-emerald-600"
      case "Creative":
        return "from-blue-500 to-cyan-600"
      case "Social":
        return "from-orange-500 to-red-600"
      case "Entertainment":
        return "from-indigo-500 to-purple-600"
      case "Self-care":
        return "from-pink-500 to-rose-600"
      case "Productivity":
        return "from-teal-500 to-cyan-600"
      case "Learning":
        return "from-yellow-500 to-orange-600"
      default:
        return "from-gray-500 to-gray-600"
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-cyan-400/20 to-blue-600/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-br from-purple-400/20 to-pink-600/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-8 relative z-10">
        {/* Header */}
        <div className="flex items-center mb-8">
          <Link href="/dashboard">
            <Button variant="ghost" size="sm" className="mr-4 text-gray-300 hover:text-white">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Dashboard
            </Button>
          </Link>
          <div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-white to-cyan-200 bg-clip-text text-transparent flex items-center">
              Mood-Based Activities
              <Sparkles className="ml-2 h-8 w-8 text-yellow-400" />
            </h1>
            <p className="text-gray-400 text-lg">Get personalized activity suggestions powered by AI</p>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Mood Assessment - Redesigned */}
          <div className="lg:col-span-1">
            <Card
              className={`bg-gradient-to-br ${currentMoodEmoji.bgColor} border ${currentMoodEmoji.borderColor} backdrop-blur-xl shadow-2xl hover:shadow-purple-500/20 transition-all duration-500 transform hover:scale-105`}
            >
              <CardHeader className="text-center">
                <CardTitle className="text-purple-300 flex items-center justify-center">
                  <div className="p-3 bg-gradient-to-r from-purple-400 to-pink-500 rounded-full mr-3">
                    <Brain className="h-6 w-6 text-white" />
                  </div>
                  How are you feeling?
                </CardTitle>
                <CardDescription className="text-gray-400">
                  Tell us about your current mood and energy level
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-8">
                {/* Current Mood Display */}
                <div className="text-center p-6 bg-white/5 rounded-2xl backdrop-blur-sm border border-white/10">
                  <div
                    className={`inline-flex items-center justify-center w-20 h-20 rounded-full bg-gradient-to-br ${currentMoodEmoji.bgColor} border-2 ${currentMoodEmoji.borderColor} mb-4`}
                  >
                    <currentMoodEmoji.icon className={`h-10 w-10 ${currentMoodEmoji.color}`} />
                  </div>
                  <div className={`text-2xl font-bold ${currentMoodEmoji.color} mb-2`}>{currentMoodEmoji.label}</div>
                  <p className="text-sm text-gray-400">{currentMoodEmoji.description}</p>
                </div>

                {/* Mood Selection */}
                <div className="space-y-4">
                  <Label className="text-gray-200 text-lg font-semibold">Select Your Mood</Label>
                  <div className="grid grid-cols-5 gap-2">
                    {moodEmojis.map((moodOption) => {
                      const IconComponent = moodOption.icon
                      return (
                        <Button
                          key={moodOption.value}
                          variant="ghost"
                          size="sm"
                          onClick={() => setMood(moodOption.value)}
                          className={`flex flex-col items-center p-4 h-auto transition-all duration-300 transform hover:scale-110 rounded-xl ${
                            mood === moodOption.value
                              ? `bg-gradient-to-br ${moodOption.bgColor} border ${moodOption.borderColor} shadow-lg`
                              : "border border-white/10 text-gray-400 hover:bg-white/10 hover:text-white hover:border-white/20"
                          }`}
                        >
                          <IconComponent
                            className={`h-6 w-6 mb-1 ${mood === moodOption.value ? moodOption.color : "text-gray-400"}`}
                          />
                          <span className="text-xs font-medium">{moodOption.value}</span>
                        </Button>
                      )
                    })}
                  </div>
                </div>

                {/* Energy Level */}
                <div className="space-y-4">
                  <Label className="text-cyan-200 text-lg font-semibold">Energy Level: {energy[0]}/10</Label>
                  <div className="p-4 bg-white/5 rounded-xl backdrop-blur-sm border border-cyan-400/20">
                    <Slider
                      value={energy}
                      onValueChange={setEnergy}
                      max={10}
                      min={1}
                      step={1}
                      className="w-full [&_[role=slider]]:bg-gradient-to-r [&_[role=slider]]:from-cyan-400 [&_[role=slider]]:to-blue-500 [&_[role=slider]]:border-0 [&_[role=slider]]:w-6 [&_[role=slider]]:h-6"
                    />
                    <div className="flex justify-between text-xs text-gray-400 mt-2">
                      <span>Low</span>
                      <span>Medium</span>
                      <span>High</span>
                    </div>
                  </div>
                </div>

                {/* Time Available */}
                <div className="space-y-4">
                  <Label className="text-green-200 text-lg font-semibold">
                    Time Available: {timeAvailable[0]} minutes
                  </Label>
                  <div className="p-4 bg-white/5 rounded-xl backdrop-blur-sm border border-green-400/20">
                    <Slider
                      value={timeAvailable}
                      onValueChange={setTimeAvailable}
                      max={120}
                      min={5}
                      step={5}
                      className="w-full [&_[role=slider]]:bg-gradient-to-r [&_[role=slider]]:from-green-400 [&_[role=slider]]:to-emerald-500 [&_[role=slider]]:border-0 [&_[role=slider]]:w-6 [&_[role=slider]]:h-6"
                    />
                    <div className="flex justify-between text-xs text-gray-400 mt-2">
                      <span>5 min</span>
                      <span>60 min</span>
                      <span>120 min</span>
                    </div>
                  </div>
                </div>

                <Button
                  onClick={generateActivities}
                  className="w-full bg-gradient-to-r from-purple-500 to-pink-600 hover:from-purple-600 hover:to-pink-700 text-white shadow-lg hover:shadow-xl hover:shadow-purple-500/25 transition-all duration-300 transform hover:scale-105 py-4 text-lg font-semibold"
                  disabled={loading}
                >
                  {loading ? (
                    <>
                      <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-3"></div>
                      Finding Activities...
                    </>
                  ) : (
                    <>
                      <Sparkles className="mr-3 h-5 w-5" />
                      Get AI Activity Suggestions
                    </>
                  )}
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Activity Suggestions */}
          <div className="lg:col-span-2">
            <div className="mb-6">
              <h2 className="text-3xl font-bold bg-gradient-to-r from-white to-cyan-200 bg-clip-text text-transparent mb-2">
                Recommended Activities
              </h2>
              <p className="text-gray-400 text-lg">AI-powered suggestions tailored to your current state</p>
            </div>

            {loading ? (
              <div className="grid md:grid-cols-2 gap-6">
                {[1, 2, 3, 4].map((i) => (
                  <Card
                    key={i}
                    className="animate-pulse bg-gradient-to-br from-gray-800/50 to-blue-800/50 backdrop-blur-xl border-cyan-500/20"
                  >
                    <CardHeader>
                      <div className="h-4 bg-gradient-to-r from-cyan-400/30 to-blue-400/30 rounded w-3/4"></div>
                      <div className="h-3 bg-gradient-to-r from-purple-400/30 to-pink-400/30 rounded w-1/2"></div>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-2">
                        <div className="h-3 bg-gradient-to-r from-green-400/30 to-emerald-400/30 rounded"></div>
                        <div className="h-3 bg-gradient-to-r from-yellow-400/30 to-orange-400/30 rounded w-5/6"></div>
                        <div className="h-3 bg-gradient-to-r from-blue-400/30 to-cyan-400/30 rounded w-4/6"></div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : activities.length > 0 ? (
              <div className="grid md:grid-cols-2 gap-6">
                {activities.map((activity) => {
                  const IconComponent = activity.icon
                  const categoryGradient = getCategoryColor(activity.category)
                  return (
                    <Card
                      key={activity.id}
                      className="bg-gradient-to-br from-gray-800/50 to-blue-800/50 backdrop-blur-xl border-cyan-500/20 hover:shadow-2xl hover:shadow-cyan-500/20 transition-all duration-500 transform hover:scale-105 hover:-translate-y-2"
                    >
                      <CardHeader>
                        <CardTitle className="flex items-center text-white">
                          <div className={`p-2 bg-gradient-to-r ${categoryGradient} rounded-lg mr-3`}>
                            <IconComponent className="h-5 w-5 text-white" />
                          </div>
                          {activity.title}
                        </CardTitle>
                        <CardDescription className="flex items-center justify-between text-gray-400">
                          <span>{activity.duration}</span>
                          <Badge className={`bg-gradient-to-r ${categoryGradient} text-white border-0`}>
                            {activity.category}
                          </Badge>
                        </CardDescription>
                      </CardHeader>
                      <CardContent>
                        <p className="text-gray-300 mb-4">{activity.description}</p>

                        <div className="mb-4">
                          <Badge
                            className={
                              activity.energyLevel === "low"
                                ? "bg-gradient-to-r from-blue-500 to-cyan-600 text-white border-0"
                                : activity.energyLevel === "medium"
                                  ? "bg-gradient-to-r from-yellow-500 to-orange-600 text-white border-0"
                                  : "bg-gradient-to-r from-red-500 to-pink-600 text-white border-0"
                            }
                          >
                            {activity.energyLevel} energy
                          </Badge>
                        </div>

                        <div>
                          <h4 className="font-semibold mb-2 text-white">Benefits:</h4>
                          <ul className="text-sm text-gray-300 space-y-1">
                            {activity.benefits.map((benefit, index) => (
                              <li key={index} className="flex items-center">
                                <div className="w-1 h-1 bg-cyan-400 rounded-full mr-2"></div>
                                {benefit}
                              </li>
                            ))}
                          </ul>
                        </div>
                      </CardContent>
                    </Card>
                  )
                })}
              </div>
            ) : (
              <Card className="text-center py-12 bg-gradient-to-br from-gray-800/50 to-blue-800/50 backdrop-blur-xl border-cyan-500/20">
                <CardContent>
                  <div className="p-4 bg-gradient-to-r from-purple-400 to-pink-500 rounded-full w-fit mx-auto mb-4">
                    <Brain className="h-12 w-12 text-white" />
                  </div>
                  <h3 className="text-lg font-semibold text-white mb-2">No activities yet</h3>
                  <p className="text-gray-400 mb-4">
                    Share your current mood and energy level to get personalized AI suggestions
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
