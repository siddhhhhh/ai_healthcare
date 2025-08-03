"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import { ArrowLeft, Calculator, TrendingUp, Heart, AlertCircle, Sparkles, Zap } from "lucide-react"

interface BMIResult {
  bmi: number
  category: string
  healthyRange: string
  recommendations: string[]
  color: string
}

export default function BMICalculatorPage() {
  const [maleData, setMaleData] = useState({ height: "", weight: "", age: "" })
  const [femaleData, setFemaleData] = useState({ height: "", weight: "", age: "" })
  const [maleResult, setMaleResult] = useState<BMIResult | null>(null)
  const [femaleResult, setFemaleResult] = useState<BMIResult | null>(null)

  const calculateBMI = (height: number, weight: number, gender: "male" | "female", age: number): BMIResult => {
    const bmi = weight / (height / 100) ** 2
    let category = ""
    let color = ""
    let healthyRange = ""
    let recommendations: string[] = []

    // Gender and age-specific BMI categories
    if (bmi < 18.5) {
      category = "Underweight"
      color = "text-blue-300"
      healthyRange = "18.5 - 24.9"
      recommendations = [
        "Consider increasing caloric intake with nutrient-dense foods",
        "Include strength training to build muscle mass",
        "Consult with a healthcare provider for personalized advice",
      ]
    } else if (bmi >= 18.5 && bmi < 25) {
      category = "Normal weight"
      color = "text-green-300"
      healthyRange = "18.5 - 24.9"
      recommendations = [
        "Maintain your current healthy lifestyle",
        "Continue regular physical activity",
        "Focus on balanced nutrition",
      ]
    } else if (bmi >= 25 && bmi < 30) {
      category = "Overweight"
      color = "text-yellow-300"
      healthyRange = "18.5 - 24.9"
      recommendations = [
        "Consider a balanced diet with portion control",
        "Increase physical activity to 150+ minutes per week",
        "Focus on sustainable lifestyle changes",
      ]
    } else {
      category = "Obese"
      color = "text-red-300"
      healthyRange = "18.5 - 24.9"
      recommendations = [
        "Consult with a healthcare provider for a comprehensive plan",
        "Consider working with a registered dietitian",
        "Start with gradual lifestyle changes",
      ]
    }

    // Adjust recommendations based on gender and age
    if (gender === "female" && age >= 50) {
      recommendations.push("Consider bone density screening and calcium intake")
    }
    if (gender === "male" && age >= 40) {
      recommendations.push("Monitor cardiovascular health regularly")
    }

    return { bmi, category, healthyRange, recommendations, color }
  }

  const handleMaleCalculation = () => {
    if (maleData.height && maleData.weight && maleData.age) {
      const result = calculateBMI(
        Number.parseFloat(maleData.height),
        Number.parseFloat(maleData.weight),
        "male",
        Number.parseInt(maleData.age),
      )
      setMaleResult(result)
    }
  }

  const handleFemaleCalculation = () => {
    if (femaleData.height && femaleData.weight && femaleData.age) {
      const result = calculateBMI(
        Number.parseFloat(femaleData.height),
        Number.parseFloat(femaleData.weight),
        "female",
        Number.parseInt(femaleData.age),
      )
      setFemaleResult(result)
    }
  }

  const BMIForm = ({
    data,
    setData,
    onCalculate,
    result,
    gender,
  }: {
    data: any
    setData: any
    onCalculate: () => void
    result: BMIResult | null
    gender: string
  }) => (
    <div className="space-y-6">
      <div className="grid md:grid-cols-3 gap-4">
        <div className="space-y-2">
          <Label htmlFor={`${gender}-height`} className="text-gray-200">
            Height (cm)
          </Label>
          <Input
            id={`${gender}-height`}
            type="number"
            placeholder="170"
            value={data.height}
            onChange={(e) => setData((prev: any) => ({ ...prev, height: e.target.value }))}
            className="bg-white/10 border-white/20 text-white placeholder:text-gray-400 focus:border-cyan-400 focus:ring-cyan-400/20"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor={`${gender}-weight`} className="text-gray-200">
            Weight (kg)
          </Label>
          <Input
            id={`${gender}-weight`}
            type="number"
            placeholder="70"
            value={data.weight}
            onChange={(e) => setData((prev: any) => ({ ...prev, weight: e.target.value }))}
            className="bg-white/10 border-white/20 text-white placeholder:text-gray-400 focus:border-cyan-400 focus:ring-cyan-400/20"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor={`${gender}-age`} className="text-gray-200">
            Age
          </Label>
          <Input
            id={`${gender}-age`}
            type="number"
            placeholder="30"
            value={data.age}
            onChange={(e) => setData((prev: any) => ({ ...prev, age: e.target.value }))}
            className="bg-white/10 border-white/20 text-white placeholder:text-gray-400 focus:border-cyan-400 focus:ring-cyan-400/20"
          />
        </div>
      </div>

      <Button
        onClick={onCalculate}
        className="w-full bg-gradient-to-r from-blue-500 to-cyan-600 hover:from-blue-600 hover:to-cyan-700 text-white shadow-lg hover:shadow-xl hover:shadow-blue-500/25 transition-all duration-300 transform hover:scale-105"
      >
        <Calculator className="h-4 w-4 mr-2" />
        Calculate BMI
      </Button>

      {result && (
        <Card className="mt-6 bg-gradient-to-br from-gray-800/50 to-blue-800/50 backdrop-blur-xl border-cyan-500/20 shadow-2xl">
          <CardHeader>
            <CardTitle className="flex items-center text-white">
              <div className="p-2 bg-gradient-to-r from-red-400 to-pink-500 rounded-lg mr-3">
                <Heart className="h-5 w-5 text-white" />
              </div>
              Your BMI Results
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-center mb-6">
              <div className="text-5xl font-bold mb-2 bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
                {result.bmi.toFixed(1)}
              </div>
              <div className={`text-xl font-semibold ${result.color}`}>{result.category}</div>
              <div className="text-sm text-gray-400">Healthy range: {result.healthyRange}</div>
            </div>

            <div className="mb-6">
              <div className="flex justify-between text-sm mb-2 text-gray-300">
                <span>BMI Scale</span>
                <span>{result.bmi.toFixed(1)}</span>
              </div>
              <Progress value={Math.min((result.bmi / 40) * 100, 100)} className="h-3 bg-gray-700" />
              <div className="flex justify-between text-xs text-gray-500 mt-1">
                <span>Underweight</span>
                <span>Normal</span>
                <span>Overweight</span>
                <span>Obese</span>
              </div>
            </div>

            <div>
              <h4 className="font-semibold mb-3 flex items-center text-white">
                <TrendingUp className="h-4 w-4 mr-2 text-cyan-400" />
                Personalized Recommendations
              </h4>
              <ul className="space-y-2">
                {result.recommendations.map((rec, index) => (
                  <li key={index} className="flex items-start">
                    <AlertCircle className="h-4 w-4 text-blue-400 mr-2 mt-0.5 flex-shrink-0" />
                    <span className="text-sm text-gray-300">{rec}</span>
                  </li>
                ))}
              </ul>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-cyan-400/20 to-blue-600/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-br from-purple-400/20 to-pink-600/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-8 relative z-10">
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
              BMI Calculator
              <Sparkles className="ml-2 h-8 w-8 text-yellow-400" />
            </h1>
            <p className="text-gray-400 text-lg">Calculate your Body Mass Index with gender-specific insights</p>
          </div>
        </div>

        {/* BMI Information */}
        <Card className="mb-8 bg-gradient-to-br from-gray-800/50 to-blue-800/50 backdrop-blur-xl border-cyan-500/20 shadow-2xl">
          <CardHeader>
            <CardTitle className="text-white flex items-center">
              <Zap className="mr-2 h-5 w-5 text-yellow-400" />
              Understanding BMI
            </CardTitle>
            <CardDescription className="text-gray-300">
              Body Mass Index (BMI) is a measure of body fat based on height and weight. Our calculator provides gender
              and age-specific recommendations for better accuracy.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-4 gap-4 text-center">
              <div className="p-4 bg-gradient-to-br from-blue-500/20 to-cyan-600/20 rounded-lg border border-blue-400/30 hover:shadow-lg hover:shadow-blue-500/20 transition-all duration-300 transform hover:scale-105">
                <div className="font-semibold text-blue-300">Underweight</div>
                <div className="text-sm text-gray-400">Below 18.5</div>
              </div>
              <div className="p-4 bg-gradient-to-br from-green-500/20 to-emerald-600/20 rounded-lg border border-green-400/30 hover:shadow-lg hover:shadow-green-500/20 transition-all duration-300 transform hover:scale-105">
                <div className="font-semibold text-green-300">Normal</div>
                <div className="text-sm text-gray-400">18.5 - 24.9</div>
              </div>
              <div className="p-4 bg-gradient-to-br from-yellow-500/20 to-orange-600/20 rounded-lg border border-yellow-400/30 hover:shadow-lg hover:shadow-yellow-500/20 transition-all duration-300 transform hover:scale-105">
                <div className="font-semibold text-yellow-300">Overweight</div>
                <div className="text-sm text-gray-400">25.0 - 29.9</div>
              </div>
              <div className="p-4 bg-gradient-to-br from-red-500/20 to-pink-600/20 rounded-lg border border-red-400/30 hover:shadow-lg hover:shadow-red-500/20 transition-all duration-300 transform hover:scale-105">
                <div className="font-semibold text-red-300">Obese</div>
                <div className="text-sm text-gray-400">30.0 and above</div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Gender-specific Calculators */}
        <Tabs defaultValue="male" className="w-full">
          <TabsList className="grid w-full grid-cols-2 bg-gray-800/50 backdrop-blur-sm border border-cyan-500/20">
            <TabsTrigger
              value="male"
              className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-500 data-[state=active]:to-cyan-600 data-[state=active]:text-white text-gray-300"
            >
              Male Calculator
            </TabsTrigger>
            <TabsTrigger
              value="female"
              className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-pink-500 data-[state=active]:to-purple-600 data-[state=active]:text-white text-gray-300"
            >
              Female Calculator
            </TabsTrigger>
          </TabsList>

          <TabsContent value="male">
            <Card className="bg-gradient-to-br from-blue-500/10 to-cyan-600/10 border-blue-400/30 backdrop-blur-xl shadow-2xl">
              <CardHeader>
                <CardTitle className="text-blue-300">Male BMI Calculator</CardTitle>
                <CardDescription className="text-gray-400">
                  Tailored BMI calculation with male-specific health recommendations
                </CardDescription>
              </CardHeader>
              <CardContent>
                <BMIForm
                  data={maleData}
                  setData={setMaleData}
                  onCalculate={handleMaleCalculation}
                  result={maleResult}
                  gender="male"
                />
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="female">
            <Card className="bg-gradient-to-br from-pink-500/10 to-purple-600/10 border-pink-400/30 backdrop-blur-xl shadow-2xl">
              <CardHeader>
                <CardTitle className="text-pink-300">Female BMI Calculator</CardTitle>
                <CardDescription className="text-gray-400">
                  Tailored BMI calculation with female-specific health recommendations
                </CardDescription>
              </CardHeader>
              <CardContent>
                <BMIForm
                  data={femaleData}
                  setData={setFemaleData}
                  onCalculate={handleFemaleCalculation}
                  result={femaleResult}
                  gender="female"
                />
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
