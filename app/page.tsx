import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Heart, Brain, Users, Calculator, Utensils, Activity, Sparkles, Zap, Shield } from "lucide-react"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-cyan-400/20 to-blue-600/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-br from-purple-400/20 to-pink-600/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-br from-teal-400/10 to-green-600/10 rounded-full blur-3xl animate-pulse delay-500"></div>
      </div>

      {/* Header */}
      <header className="relative z-10 border-b border-white/10 bg-white/5 backdrop-blur-xl sticky top-0">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center space-x-3 group">
            <div className="relative">
              <Heart className="h-10 w-10 text-cyan-400 group-hover:text-pink-400 transition-colors duration-300" />
              <Sparkles className="absolute -top-1 -right-1 h-4 w-4 text-yellow-400 animate-pulse" />
            </div>
            <span className="text-3xl font-bold bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 bg-clip-text text-transparent">
              HealthAI
            </span>
          </div>
          <div className="flex space-x-4">
            <Link href="/auth/login">
              <Button
                variant="outline"
                className="border-cyan-400/50 text-cyan-400 hover:bg-cyan-400/10 hover:border-cyan-400 transition-all duration-300 hover:shadow-lg hover:shadow-cyan-400/25 bg-transparent"
              >
                Login
              </Button>
            </Link>
            <Link href="/auth/signup">
              <Button className="bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white shadow-lg hover:shadow-xl hover:shadow-cyan-500/25 transition-all duration-300 transform hover:scale-105">
                Get Started
              </Button>
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative z-10 py-20 px-4">
        <div className="container mx-auto text-center">
          <div className="mb-8 animate-fade-in">
            <div className="inline-flex items-center space-x-2 bg-gradient-to-r from-cyan-500/10 to-purple-500/10 backdrop-blur-sm border border-cyan-400/20 rounded-full px-6 py-2 mb-6">
              <Zap className="h-4 w-4 text-yellow-400" />
              <span className="text-cyan-300 text-sm font-medium">Powered by Advanced AI</span>
            </div>
          </div>
          <h1 className="text-6xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-white via-cyan-200 to-blue-200 bg-clip-text text-transparent leading-tight">
            Your AI-Powered
            <br />
            <span className="bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
              Health Companion
            </span>
          </h1>
          <p className="text-xl text-gray-300 mb-8 max-w-3xl mx-auto leading-relaxed">
            Transform your wellness journey with personalized diet plans, mood-based activities, and a supportive
            community powered by cutting-edge artificial intelligence.
          </p>
          <Link href="/auth/signup">
            <Button
              size="lg"
              className="text-lg px-12 py-4 bg-gradient-to-r from-cyan-500 via-blue-500 to-purple-600 hover:from-cyan-600 hover:via-blue-600 hover:to-purple-700 text-white shadow-2xl hover:shadow-cyan-500/25 transition-all duration-300 transform hover:scale-105 hover:-translate-y-1"
            >
              <Sparkles className="mr-2 h-5 w-5" />
              Start Your Health Journey
            </Button>
          </Link>
        </div>
      </section>

      {/* Features Section */}
      <section className="relative z-10 py-16 px-4">
        <div className="container mx-auto">
          <h2 className="text-4xl font-bold text-center mb-4 bg-gradient-to-r from-white to-cyan-200 bg-clip-text text-transparent">
            Comprehensive Health Tools
          </h2>
          <p className="text-center text-gray-400 mb-12 text-lg">Powered by AI to give you personalized insights</p>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card className="group bg-gradient-to-br from-green-500/10 to-emerald-600/10 border-green-400/20 hover:border-green-400/40 backdrop-blur-sm hover:shadow-2xl hover:shadow-green-500/20 transition-all duration-500 transform hover:scale-105 hover:-translate-y-2">
              <CardHeader className="text-center">
                <div className="mx-auto mb-4 p-4 bg-gradient-to-br from-green-400 to-emerald-500 rounded-2xl w-fit group-hover:rotate-12 transition-transform duration-300">
                  <Utensils className="h-8 w-8 text-white" />
                </div>
                <CardTitle className="text-green-300 group-hover:text-green-200 transition-colors">
                  AI Diet Planner
                </CardTitle>
                <CardDescription className="text-gray-400 group-hover:text-gray-300 transition-colors">
                  Personalized meal suggestions based on your nutritional needs and preferences
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="group bg-gradient-to-br from-blue-500/10 to-cyan-600/10 border-blue-400/20 hover:border-blue-400/40 backdrop-blur-sm hover:shadow-2xl hover:shadow-blue-500/20 transition-all duration-500 transform hover:scale-105 hover:-translate-y-2">
              <CardHeader className="text-center">
                <div className="mx-auto mb-4 p-4 bg-gradient-to-br from-blue-400 to-cyan-500 rounded-2xl w-fit group-hover:rotate-12 transition-transform duration-300">
                  <Calculator className="h-8 w-8 text-white" />
                </div>
                <CardTitle className="text-blue-300 group-hover:text-blue-200 transition-colors">
                  Smart BMI Calculator
                </CardTitle>
                <CardDescription className="text-gray-400 group-hover:text-gray-300 transition-colors">
                  Gender-specific BMI calculations with personalized health insights
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="group bg-gradient-to-br from-purple-500/10 to-pink-600/10 border-purple-400/20 hover:border-purple-400/40 backdrop-blur-sm hover:shadow-2xl hover:shadow-purple-500/20 transition-all duration-500 transform hover:scale-105 hover:-translate-y-2">
              <CardHeader className="text-center">
                <div className="mx-auto mb-4 p-4 bg-gradient-to-br from-purple-400 to-pink-500 rounded-2xl w-fit group-hover:rotate-12 transition-transform duration-300">
                  <Brain className="h-8 w-8 text-white" />
                </div>
                <CardTitle className="text-purple-300 group-hover:text-purple-200 transition-colors">
                  Mood Activities
                </CardTitle>
                <CardDescription className="text-gray-400 group-hover:text-gray-300 transition-colors">
                  AI-powered activity suggestions based on your current mood and energy levels
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="group bg-gradient-to-br from-orange-500/10 to-red-600/10 border-orange-400/20 hover:border-orange-400/40 backdrop-blur-sm hover:shadow-2xl hover:shadow-orange-500/20 transition-all duration-500 transform hover:scale-105 hover:-translate-y-2">
              <CardHeader className="text-center">
                <div className="mx-auto mb-4 p-4 bg-gradient-to-br from-orange-400 to-red-500 rounded-2xl w-fit group-hover:rotate-12 transition-transform duration-300">
                  <Users className="h-8 w-8 text-white" />
                </div>
                <CardTitle className="text-orange-300 group-hover:text-orange-200 transition-colors">
                  Community Forum
                </CardTitle>
                <CardDescription className="text-gray-400 group-hover:text-gray-300 transition-colors">
                  Connect with others on similar health journeys and share experiences
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="group bg-gradient-to-br from-teal-500/10 to-cyan-600/10 border-teal-400/20 hover:border-teal-400/40 backdrop-blur-sm hover:shadow-2xl hover:shadow-teal-500/20 transition-all duration-500 transform hover:scale-105 hover:-translate-y-2">
              <CardHeader className="text-center">
                <div className="mx-auto mb-4 p-4 bg-gradient-to-br from-teal-400 to-cyan-500 rounded-2xl w-fit group-hover:rotate-12 transition-transform duration-300">
                  <Activity className="h-8 w-8 text-white" />
                </div>
                <CardTitle className="text-teal-300 group-hover:text-teal-200 transition-colors">
                  Progress Dashboard
                </CardTitle>
                <CardDescription className="text-gray-400 group-hover:text-gray-300 transition-colors">
                  Track your health metrics and see your improvement over time
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="group bg-gradient-to-br from-pink-500/10 to-rose-600/10 border-pink-400/20 hover:border-pink-400/40 backdrop-blur-sm hover:shadow-2xl hover:shadow-pink-500/20 transition-all duration-500 transform hover:scale-105 hover:-translate-y-2">
              <CardHeader className="text-center">
                <div className="mx-auto mb-4 p-4 bg-gradient-to-br from-pink-400 to-rose-500 rounded-2xl w-fit group-hover:rotate-12 transition-transform duration-300">
                  <Shield className="h-8 w-8 text-white" />
                </div>
                <CardTitle className="text-pink-300 group-hover:text-pink-200 transition-colors">
                  Wellness Insights
                </CardTitle>
                <CardDescription className="text-gray-400 group-hover:text-gray-300 transition-colors">
                  AI-driven recommendations to optimize your health and well-being
                </CardDescription>
              </CardHeader>
            </Card>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative z-10 bg-gradient-to-r from-gray-900/50 to-black/50 backdrop-blur-xl border-t border-white/10 text-white py-12 px-4">
        <div className="container mx-auto text-center">
          <div className="flex items-center justify-center space-x-2 mb-4">
            <Heart className="h-6 w-6 text-cyan-400" />
            <span className="text-xl font-bold bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
              HealthAI
            </span>
          </div>
          <p className="text-gray-400">Empowering your health journey with AI technology</p>
        </div>
      </footer>
    </div>
  )
}
