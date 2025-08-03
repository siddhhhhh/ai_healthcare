"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import {
  Heart,
  Utensils,
  Calculator,
  Brain,
  Users,
  Activity,
  Menu,
  X,
  LogOut,
  User,
  Sparkles,
  Zap,
  NotebookIcon as Lotus,
} from "lucide-react"

interface UserData {
  name: string
  email: string
  age: string
  gender: string
  height: string
  weight: string
  isLoggedIn: boolean
}

export default function DashboardPage() {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [userData, setUserData] = useState<UserData | null>(null)

  useEffect(() => {
    // Get user data from localStorage
    const storedUser = localStorage.getItem("healthai_user")
    if (storedUser) {
      setUserData(JSON.parse(storedUser))
    }
  }, [])

  const navigationItems = [
    { name: "Dashboard", href: "/dashboard", icon: Activity, current: true, color: "text-cyan-400" },
    { name: "Diet Planner", href: "/diet-planner", icon: Utensils, current: false, color: "text-green-400" },
    { name: "BMI Calculator", href: "/bmi-calculator", icon: Calculator, current: false, color: "text-blue-400" },
    { name: "Mood Activities", href: "/mood-activities", icon: Brain, current: false, color: "text-purple-400" },
    { name: "Yoga & Meditation", href: "/yoga-meditation", icon: Lotus, current: false, color: "text-pink-400" },
    { name: "Community", href: "/community", icon: Users, current: false, color: "text-orange-400" },
  ]

  const handleLogout = () => {
    localStorage.removeItem("healthai_user")
    window.location.href = "/"
  }

  const firstName = userData?.name?.split(" ")[0] || "User"

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900">
      {/* Mobile sidebar overlay */}
      {sidebarOpen && (
        <div className="fixed inset-0 z-40 lg:hidden">
          <div className="fixed inset-0 bg-gray-600 bg-opacity-75" onClick={() => setSidebarOpen(false)} />
          <div className="relative flex w-full max-w-xs flex-1 flex-col bg-gradient-to-b from-gray-900 to-blue-900 backdrop-blur-xl">
            <div className="absolute top-0 right-0 -mr-12 pt-2">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setSidebarOpen(false)}
                className="ml-1 flex h-10 w-10 items-center justify-center rounded-full focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
              >
                <X className="h-6 w-6 text-white" />
              </Button>
            </div>
            <div className="flex flex-shrink-0 items-center px-4 py-4">
              <Heart className="h-8 w-8 text-cyan-400" />
              <span className="ml-2 text-xl font-bold bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
                HealthAI
              </span>
            </div>
            <nav className="mt-5 flex-1 space-y-1 px-2">
              {navigationItems.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`group flex items-center px-2 py-2 text-base font-medium rounded-md transition-all duration-300 ${
                    item.current
                      ? "bg-gradient-to-r from-cyan-500/20 to-blue-500/20 text-cyan-300 shadow-lg"
                      : "text-gray-300 hover:bg-white/10 hover:text-white transform hover:scale-105"
                  }`}
                >
                  <item.icon className={`mr-4 h-6 w-6 ${item.current ? "text-cyan-400" : item.color}`} />
                  {item.name}
                </Link>
              ))}
            </nav>
          </div>
        </div>
      )}

      {/* Desktop sidebar */}
      <div className="hidden lg:fixed lg:inset-y-0 lg:flex lg:w-64 lg:flex-col">
        <div className="flex min-h-0 flex-1 flex-col bg-gradient-to-b from-gray-900/95 to-blue-900/95 backdrop-blur-xl border-r border-cyan-500/20">
          <div className="flex flex-1 flex-col pt-5 pb-4 overflow-y-auto">
            <div className="flex items-center flex-shrink-0 px-4 mb-8">
              <div className="relative">
                <Heart className="h-8 w-8 text-cyan-400" />
                <Sparkles className="absolute -top-1 -right-1 h-3 w-3 text-yellow-400 animate-pulse" />
              </div>
              <span className="ml-2 text-xl font-bold bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
                HealthAI
              </span>
            </div>
            <nav className="mt-5 flex-1 space-y-2 px-2">
              {navigationItems.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`group flex items-center px-3 py-3 text-sm font-medium rounded-xl transition-all duration-300 ${
                    item.current
                      ? "bg-gradient-to-r from-cyan-500/20 to-blue-500/20 text-cyan-300 shadow-lg border border-cyan-500/30"
                      : "text-gray-300 hover:bg-white/10 hover:text-white transform hover:scale-105 hover:shadow-lg"
                  }`}
                >
                  <item.icon
                    className={`mr-3 h-5 w-5 ${item.current ? "text-cyan-400" : item.color} group-hover:scale-110 transition-transform`}
                  />
                  {item.name}
                </Link>
              ))}
            </nav>
          </div>
          <div className="flex-shrink-0 flex border-t border-cyan-500/20 p-4 bg-gradient-to-r from-gray-800/50 to-blue-800/50">
            <div className="flex items-center">
              <div className="p-2 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full">
                <User className="h-4 w-4 text-white" />
              </div>
              <div className="ml-3">
                <p className="text-sm font-medium text-white">{userData?.name || "User"}</p>
                <p className="text-xs text-gray-400">{userData?.email || "user@example.com"}</p>
              </div>
              <Button
                variant="ghost"
                size="sm"
                className="ml-auto text-gray-400 hover:text-white"
                onClick={handleLogout}
              >
                <LogOut className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="lg:pl-64 flex flex-col flex-1">
        <div className="sticky top-0 z-10 bg-gradient-to-r from-gray-900/95 to-blue-900/95 backdrop-blur-xl pl-1 pt-1 sm:pl-3 sm:pt-3 lg:hidden border-b border-cyan-500/20">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setSidebarOpen(true)}
            className="-ml-0.5 -mt-0.5 h-12 w-12 inline-flex items-center justify-center rounded-md text-gray-300 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-cyan-500"
          >
            <Menu className="h-6 w-6" />
          </Button>
        </div>

        <main className="flex-1 p-4 lg:p-8">
          <div className="mb-8">
            <h1 className="text-4xl font-bold bg-gradient-to-r from-white to-cyan-200 bg-clip-text text-transparent mb-2">
              Welcome back, {firstName}!
              <Zap className="inline-block ml-2 h-8 w-8 text-yellow-400" />
            </h1>
            <p className="text-gray-400 text-lg">Here's your health overview for today</p>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <Card className="bg-gradient-to-br from-green-500/10 to-emerald-600/10 border-green-400/30 backdrop-blur-sm hover:shadow-2xl hover:shadow-green-500/20 transition-all duration-500 transform hover:scale-105 hover:-translate-y-1">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-green-300">Daily Calories</CardTitle>
                <div className="p-2 bg-gradient-to-r from-green-400 to-emerald-500 rounded-lg">
                  <Utensils className="h-4 w-4 text-white" />
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-green-200">1,847</div>
                <p className="text-xs text-green-400">+12% from yesterday</p>
                <Progress value={73} className="mt-2 bg-green-900/30" />
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-blue-500/10 to-cyan-600/10 border-blue-400/30 backdrop-blur-sm hover:shadow-2xl hover:shadow-blue-500/20 transition-all duration-500 transform hover:scale-105 hover:-translate-y-1">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-blue-300">BMI Status</CardTitle>
                <div className="p-2 bg-gradient-to-r from-blue-400 to-cyan-500 rounded-lg">
                  <Calculator className="h-4 w-4 text-white" />
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-blue-200">22.5</div>
                <p className="text-xs text-blue-400">Normal weight</p>
                <Progress value={65} className="mt-2 bg-blue-900/30" />
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-purple-500/10 to-pink-600/10 border-purple-400/30 backdrop-blur-sm hover:shadow-2xl hover:shadow-purple-500/20 transition-all duration-500 transform hover:scale-105 hover:-translate-y-1">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-purple-300">Mood Score</CardTitle>
                <div className="p-2 bg-gradient-to-r from-purple-400 to-pink-500 rounded-lg">
                  <Brain className="h-4 w-4 text-white" />
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-purple-200">8.2</div>
                <p className="text-xs text-purple-400">Great mood today!</p>
                <Progress value={82} className="mt-2 bg-purple-900/30" />
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-orange-500/10 to-red-600/10 border-orange-400/30 backdrop-blur-sm hover:shadow-2xl hover:shadow-orange-500/20 transition-all duration-500 transform hover:scale-105 hover:-translate-y-1">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-orange-300">Community</CardTitle>
                <div className="p-2 bg-gradient-to-r from-orange-400 to-red-500 rounded-lg">
                  <Users className="h-4 w-4 text-white" />
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-orange-200">24</div>
                <p className="text-xs text-orange-400">New messages</p>
                <Progress value={40} className="mt-2 bg-orange-900/30" />
              </CardContent>
            </Card>
          </div>

          {/* Quick Actions */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Card className="bg-gradient-to-br from-green-500/10 to-emerald-600/10 border-green-400/20 backdrop-blur-sm hover:shadow-2xl hover:shadow-green-500/20 transition-all duration-500 transform hover:scale-105 hover:-translate-y-2 cursor-pointer">
              <Link href="/diet-planner">
                <CardHeader>
                  <CardTitle className="flex items-center text-green-300">
                    <div className="p-2 bg-gradient-to-r from-green-400 to-emerald-500 rounded-lg mr-3">
                      <Utensils className="h-6 w-6 text-white" />
                    </div>
                    Plan Your Meals
                  </CardTitle>
                  <CardDescription className="text-gray-400">
                    Get personalized meal suggestions based on your nutritional needs
                  </CardDescription>
                </CardHeader>
              </Link>
            </Card>

            <Card className="bg-gradient-to-br from-blue-500/10 to-cyan-600/10 border-blue-400/20 backdrop-blur-sm hover:shadow-2xl hover:shadow-blue-500/20 transition-all duration-500 transform hover:scale-105 hover:-translate-y-2 cursor-pointer">
              <Link href="/bmi-calculator">
                <CardHeader>
                  <CardTitle className="flex items-center text-blue-300">
                    <div className="p-2 bg-gradient-to-r from-blue-400 to-cyan-500 rounded-lg mr-3">
                      <Calculator className="h-6 w-6 text-white" />
                    </div>
                    Check Your BMI
                  </CardTitle>
                  <CardDescription className="text-gray-400">
                    Calculate your Body Mass Index with personalized insights
                  </CardDescription>
                </CardHeader>
              </Link>
            </Card>

            <Card className="bg-gradient-to-br from-purple-500/10 to-pink-600/10 border-purple-400/20 backdrop-blur-sm hover:shadow-2xl hover:shadow-purple-500/20 transition-all duration-500 transform hover:scale-105 hover:-translate-y-2 cursor-pointer">
              <Link href="/mood-activities">
                <CardHeader>
                  <CardTitle className="flex items-center text-purple-300">
                    <div className="p-2 bg-gradient-to-r from-purple-400 to-pink-500 rounded-lg mr-3">
                      <Brain className="h-6 w-6 text-white" />
                    </div>
                    Mood Activities
                  </CardTitle>
                  <CardDescription className="text-gray-400">
                    Discover activities that match your current mood and energy
                  </CardDescription>
                </CardHeader>
              </Link>
            </Card>

            <Card className="bg-gradient-to-br from-pink-500/10 to-rose-600/10 border-pink-400/20 backdrop-blur-sm hover:shadow-2xl hover:shadow-pink-500/20 transition-all duration-500 transform hover:scale-105 hover:-translate-y-2 cursor-pointer">
              <Link href="/yoga-meditation">
                <CardHeader>
                  <CardTitle className="flex items-center text-pink-300">
                    <div className="p-2 bg-gradient-to-r from-pink-400 to-rose-500 rounded-lg mr-3">
                      <Lotus className="h-6 w-6 text-white" />
                    </div>
                    Yoga & Meditation
                  </CardTitle>
                  <CardDescription className="text-gray-400">
                    Find inner peace with guided yoga and meditation sessions
                  </CardDescription>
                </CardHeader>
              </Link>
            </Card>

            <Card className="bg-gradient-to-br from-orange-500/10 to-red-600/10 border-orange-400/20 backdrop-blur-sm hover:shadow-2xl hover:shadow-orange-500/20 transition-all duration-500 transform hover:scale-105 hover:-translate-y-2 cursor-pointer">
              <Link href="/community">
                <CardHeader>
                  <CardTitle className="flex items-center text-orange-300">
                    <div className="p-2 bg-gradient-to-r from-orange-400 to-red-500 rounded-lg mr-3">
                      <Users className="h-6 w-6 text-white" />
                    </div>
                    Join Community
                  </CardTitle>
                  <CardDescription className="text-gray-400">
                    Connect with others on their health and wellness journey
                  </CardDescription>
                </CardHeader>
              </Link>
            </Card>
          </div>
        </main>
      </div>
    </div>
  )
}
