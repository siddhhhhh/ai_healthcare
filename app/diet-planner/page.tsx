"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Slider } from "@/components/ui/slider"
import { ArrowLeft, Utensils, Clock, Users, Sparkles, Zap } from "lucide-react"

interface MealSuggestion {
  id: number
  name: string
  calories: number
  protein: number
  carbs: number
  fat: number
  prepTime: string
  servings: number
  ingredients: string[]
}

export default function DietPlannerPage() {
  const [nutritionGoals, setNutritionGoals] = useState({
    calories: [2000],
    protein: [150],
    carbs: [250],
    fat: [65],
  })
  const [dietType, setDietType] = useState("")
  const [allergies, setAllergies] = useState("")
  const [mealSuggestions, setMealSuggestions] = useState<MealSuggestion[]>([])
  const [loading, setLoading] = useState(false)

  const generateMealPlan = async () => {
    setLoading(true)

    // Get user requirements
    const calories = nutritionGoals.calories[0]
    const protein = nutritionGoals.protein[0]
    const carbs = nutritionGoals.carbs[0]
    const fat = nutritionGoals.fat[0]
    const userAllergies = allergies
      .toLowerCase()
      .split(",")
      .map((a) => a.trim())

    setTimeout(() => {
      let mealDatabase: MealSuggestion[] = []

      // Generate meals based on diet type
      if (dietType === "keto" || dietType === "ketogenic") {
        mealDatabase = [
          {
            id: 1,
            name: "Keto Avocado Salmon Bowl",
            calories: Math.round(calories * 0.25),
            protein: Math.round(protein * 0.3),
            carbs: Math.round(carbs * 0.1),
            fat: Math.round(fat * 0.4),
            prepTime: "20 min",
            servings: 1,
            ingredients: ["Wild salmon", "Avocado", "Spinach", "Olive oil", "Lemon"],
          },
          {
            id: 2,
            name: "Keto Chicken Thigh with Broccoli",
            calories: Math.round(calories * 0.3),
            protein: Math.round(protein * 0.35),
            carbs: Math.round(carbs * 0.08),
            fat: Math.round(fat * 0.45),
            prepTime: "25 min",
            servings: 1,
            ingredients: ["Chicken thigh", "Broccoli", "Butter", "Garlic", "Herbs"],
          },
          {
            id: 3,
            name: "Keto Egg and Cheese Scramble",
            calories: Math.round(calories * 0.2),
            protein: Math.round(protein * 0.25),
            carbs: Math.round(carbs * 0.05),
            fat: Math.round(fat * 0.35),
            prepTime: "10 min",
            servings: 1,
            ingredients: ["Eggs", "Cheddar cheese", "Heavy cream", "Chives", "Butter"],
          },
          {
            id: 4,
            name: "Keto Beef and Cauliflower",
            calories: Math.round(calories * 0.35),
            protein: Math.round(protein * 0.4),
            carbs: Math.round(carbs * 0.12),
            fat: Math.round(fat * 0.5),
            prepTime: "30 min",
            servings: 1,
            ingredients: ["Ground beef", "Cauliflower", "Coconut oil", "Onion", "Spices"],
          },
        ]
      } else if (dietType === "vegetarian") {
        mealDatabase = [
          {
            id: 1,
            name: "Vegetarian Protein Buddha Bowl",
            calories: Math.round(calories * 0.25),
            protein: Math.round(protein * 0.3),
            carbs: Math.round(carbs * 0.3),
            fat: Math.round(fat * 0.25),
            prepTime: "20 min",
            servings: 1,
            ingredients: ["Quinoa", "Chickpeas", "Sweet potato", "Tahini", "Kale"],
          },
          {
            id: 2,
            name: "Vegetarian Lentil Curry",
            calories: Math.round(calories * 0.3),
            protein: Math.round(protein * 0.25),
            carbs: Math.round(carbs * 0.35),
            fat: Math.round(fat * 0.2),
            prepTime: "35 min",
            servings: 1,
            ingredients: ["Red lentils", "Brown rice", "Coconut milk", "Curry spices", "Vegetables"],
          },
          {
            id: 3,
            name: "Vegetarian Tofu Stir-fry",
            calories: Math.round(calories * 0.28),
            protein: Math.round(protein * 0.32),
            carbs: Math.round(carbs * 0.25),
            fat: Math.round(fat * 0.3),
            prepTime: "15 min",
            servings: 1,
            ingredients: ["Firm tofu", "Mixed vegetables", "Soy sauce", "Sesame oil", "Ginger"],
          },
          {
            id: 4,
            name: "Vegetarian Black Bean Bowl",
            calories: Math.round(calories * 0.26),
            protein: Math.round(protein * 0.28),
            carbs: Math.round(carbs * 0.32),
            fat: Math.round(fat * 0.22),
            prepTime: "25 min",
            servings: 1,
            ingredients: ["Black beans", "Brown rice", "Avocado", "Salsa", "Lime"],
          },
        ]
      } else if (dietType === "vegan") {
        mealDatabase = [
          {
            id: 1,
            name: "Vegan Power Smoothie Bowl",
            calories: Math.round(calories * 0.22),
            protein: Math.round(protein * 0.25),
            carbs: Math.round(carbs * 0.35),
            fat: Math.round(fat * 0.2),
            prepTime: "10 min",
            servings: 1,
            ingredients: ["Plant protein powder", "Banana", "Berries", "Almond milk", "Chia seeds"],
          },
          {
            id: 2,
            name: "Vegan Quinoa Stuffed Peppers",
            calories: Math.round(calories * 0.28),
            protein: Math.round(protein * 0.22),
            carbs: Math.round(carbs * 0.38),
            fat: Math.round(fat * 0.18),
            prepTime: "40 min",
            servings: 1,
            ingredients: ["Bell peppers", "Quinoa", "Black beans", "Nutritional yeast", "Vegetables"],
          },
          {
            id: 3,
            name: "Vegan Chickpea Curry",
            calories: Math.round(calories * 0.3),
            protein: Math.round(protein * 0.28),
            carbs: Math.round(carbs * 0.4),
            fat: Math.round(fat * 0.25),
            prepTime: "30 min",
            servings: 1,
            ingredients: ["Chickpeas", "Coconut milk", "Spinach", "Turmeric", "Basmati rice"],
          },
          {
            id: 4,
            name: "Vegan Tempeh Stir-fry",
            calories: Math.round(calories * 0.32),
            protein: Math.round(protein * 0.35),
            carbs: Math.round(carbs * 0.28),
            fat: Math.round(fat * 0.3),
            prepTime: "20 min",
            servings: 1,
            ingredients: ["Tempeh", "Broccoli", "Carrots", "Tamari", "Sesame seeds"],
          },
        ]
      } else if (dietType === "paleo") {
        mealDatabase = [
          {
            id: 1,
            name: "Paleo Grass-fed Beef Bowl",
            calories: Math.round(calories * 0.35),
            protein: Math.round(protein * 0.4),
            carbs: Math.round(carbs * 0.15),
            fat: Math.round(fat * 0.35),
            prepTime: "25 min",
            servings: 1,
            ingredients: ["Grass-fed beef", "Sweet potato", "Asparagus", "Coconut oil", "Herbs"],
          },
          {
            id: 2,
            name: "Paleo Salmon with Vegetables",
            calories: Math.round(calories * 0.3),
            protein: Math.round(protein * 0.38),
            carbs: Math.round(carbs * 0.12),
            fat: Math.round(fat * 0.4),
            prepTime: "20 min",
            servings: 1,
            ingredients: ["Wild salmon", "Zucchini", "Bell peppers", "Avocado oil", "Lemon"],
          },
          {
            id: 3,
            name: "Paleo Chicken and Root Vegetables",
            calories: Math.round(calories * 0.32),
            protein: Math.round(protein * 0.36),
            carbs: Math.round(carbs * 0.18),
            fat: Math.round(fat * 0.32),
            prepTime: "35 min",
            servings: 1,
            ingredients: ["Free-range chicken", "Carrots", "Parsnips", "Olive oil", "Rosemary"],
          },
          {
            id: 4,
            name: "Paleo Egg and Vegetable Hash",
            calories: Math.round(calories * 0.28),
            protein: Math.round(protein * 0.3),
            carbs: Math.round(carbs * 0.16),
            fat: Math.round(fat * 0.38),
            prepTime: "15 min",
            servings: 1,
            ingredients: ["Pastured eggs", "Spinach", "Mushrooms", "Ghee", "Onions"],
          },
        ]
      } else {
        // Balanced diet (default)
        mealDatabase = [
          {
            id: 1,
            name: "Balanced Grilled Chicken Bowl",
            calories: Math.round(calories * 0.26),
            protein: Math.round(protein * 0.3),
            carbs: Math.round(carbs * 0.25),
            fat: Math.round(fat * 0.25),
            prepTime: "25 min",
            servings: 1,
            ingredients: ["Chicken breast", "Quinoa", "Broccoli", "Olive oil", "Garlic"],
          },
          {
            id: 2,
            name: "Balanced Salmon Power Bowl",
            calories: Math.round(calories * 0.28),
            protein: Math.round(protein * 0.32),
            carbs: Math.round(carbs * 0.22),
            fat: Math.round(fat * 0.3),
            prepTime: "20 min",
            servings: 1,
            ingredients: ["Salmon fillet", "Brown rice", "Avocado", "Cucumber", "Sesame seeds"],
          },
          {
            id: 3,
            name: "Balanced Turkey and Sweet Potato",
            calories: Math.round(calories * 0.3),
            protein: Math.round(protein * 0.35),
            carbs: Math.round(carbs * 0.28),
            fat: Math.round(fat * 0.22),
            prepTime: "30 min",
            servings: 1,
            ingredients: ["Ground turkey", "Sweet potato", "Green beans", "Herbs", "Coconut oil"],
          },
          {
            id: 4,
            name: "Balanced Protein Smoothie",
            calories: Math.round(calories * 0.2),
            protein: Math.round(protein * 0.28),
            carbs: Math.round(carbs * 0.3),
            fat: Math.round(fat * 0.15),
            prepTime: "5 min",
            servings: 1,
            ingredients: ["Protein powder", "Banana", "Spinach", "Almond milk", "Chia seeds"],
          },
        ]
      }

      // Filter out meals with allergens
      const filteredMeals = mealDatabase.filter((meal) => {
        if (userAllergies.length === 0 || userAllergies[0] === "") return true

        const ingredientsLower = meal.ingredients.map((ing) => ing.toLowerCase())
        return !userAllergies.some((allergy) => ingredientsLower.some((ingredient) => ingredient.includes(allergy)))
      })

      // Adjust portions based on calorie goals
      const adjustedMeals = filteredMeals.map((meal) => ({
        ...meal,
        name: `AI-Optimized ${meal.name}`,
        calories: Math.max(200, Math.min(800, meal.calories)),
        protein: Math.max(10, Math.min(60, meal.protein)),
        carbs: Math.max(5, Math.min(100, meal.carbs)),
        fat: Math.max(5, Math.min(50, meal.fat)),
      }))

      setMealSuggestions(adjustedMeals.slice(0, 4))
      setLoading(false)
    }, 2000)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900">
      <div className="max-w-7xl mx-auto px-4 py-8">
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
              AI Diet Planner
              <Sparkles className="ml-2 h-8 w-8 text-yellow-400" />
            </h1>
            <p className="text-gray-400 text-lg">Get personalized meal suggestions powered by advanced AI</p>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Nutrition Goals Form */}
          <div className="lg:col-span-1">
            <Card className="bg-gradient-to-br from-green-500/10 to-emerald-600/10 border-green-400/30 backdrop-blur-xl shadow-2xl hover:shadow-green-500/20 transition-all duration-500">
              <CardHeader>
                <CardTitle className="text-green-300 flex items-center">
                  <Zap className="mr-2 h-5 w-5" />
                  Your Nutrition Goals
                </CardTitle>
                <CardDescription className="text-gray-400">Set your daily nutritional targets</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-3">
                  <Label className="text-green-200">Daily Calories: {nutritionGoals.calories[0]}</Label>
                  <Slider
                    value={nutritionGoals.calories}
                    onValueChange={(value) => setNutritionGoals((prev) => ({ ...prev, calories: value }))}
                    max={3000}
                    min={1200}
                    step={50}
                    className="w-full [&_[role=slider]]:bg-gradient-to-r [&_[role=slider]]:from-green-400 [&_[role=slider]]:to-emerald-500 [&_[role=slider]]:border-0"
                  />
                </div>

                <div className="space-y-3">
                  <Label className="text-blue-200">Protein (g): {nutritionGoals.protein[0]}</Label>
                  <Slider
                    value={nutritionGoals.protein}
                    onValueChange={(value) => setNutritionGoals((prev) => ({ ...prev, protein: value }))}
                    max={300}
                    min={50}
                    step={5}
                    className="w-full [&_[role=slider]]:bg-gradient-to-r [&_[role=slider]]:from-blue-400 [&_[role=slider]]:to-cyan-500 [&_[role=slider]]:border-0"
                  />
                </div>

                <div className="space-y-3">
                  <Label className="text-yellow-200">Carbs (g): {nutritionGoals.carbs[0]}</Label>
                  <Slider
                    value={nutritionGoals.carbs}
                    onValueChange={(value) => setNutritionGoals((prev) => ({ ...prev, carbs: value }))}
                    max={400}
                    min={50}
                    step={5}
                    className="w-full [&_[role=slider]]:bg-gradient-to-r [&_[role=slider]]:from-yellow-400 [&_[role=slider]]:to-orange-500 [&_[role=slider]]:border-0"
                  />
                </div>

                <div className="space-y-3">
                  <Label className="text-purple-200">Fat (g): {nutritionGoals.fat[0]}</Label>
                  <Slider
                    value={nutritionGoals.fat}
                    onValueChange={(value) => setNutritionGoals((prev) => ({ ...prev, fat: value }))}
                    max={150}
                    min={20}
                    step={5}
                    className="w-full [&_[role=slider]]:bg-gradient-to-r [&_[role=slider]]:from-purple-400 [&_[role=slider]]:to-pink-500 [&_[role=slider]]:border-0"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="diet-type" className="text-gray-200">
                    Diet Type
                  </Label>
                  <Select onValueChange={setDietType}>
                    <SelectTrigger className="bg-white/10 border-white/20 text-white focus:border-cyan-400 focus:ring-cyan-400/20">
                      <SelectValue placeholder="Select diet type" />
                    </SelectTrigger>
                    <SelectContent className="bg-gray-900 border-gray-700">
                      <SelectItem value="balanced" className="text-white hover:bg-gray-800">
                        Balanced
                      </SelectItem>
                      <SelectItem value="keto" className="text-white hover:bg-gray-800">
                        Ketogenic
                      </SelectItem>
                      <SelectItem value="vegetarian" className="text-white hover:bg-gray-800">
                        Vegetarian
                      </SelectItem>
                      <SelectItem value="vegan" className="text-white hover:bg-gray-800">
                        Vegan
                      </SelectItem>
                      <SelectItem value="paleo" className="text-white hover:bg-gray-800">
                        Paleo
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="allergies" className="text-gray-200">
                    Allergies/Restrictions
                  </Label>
                  <Input
                    id="allergies"
                    placeholder="e.g., nuts, dairy, gluten"
                    value={allergies}
                    onChange={(e) => setAllergies(e.target.value)}
                    className="bg-white/10 border-white/20 text-white placeholder:text-gray-400 focus:border-cyan-400 focus:ring-cyan-400/20"
                  />
                </div>

                <Button
                  onClick={generateMealPlan}
                  className="w-full bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white shadow-lg hover:shadow-xl hover:shadow-green-500/25 transition-all duration-300 transform hover:scale-105"
                  disabled={loading}
                >
                  {loading ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                      Generating...
                    </>
                  ) : (
                    <>
                      <Sparkles className="mr-2 h-4 w-4" />
                      Generate AI Meal Plan
                    </>
                  )}
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Meal Suggestions */}
          <div className="lg:col-span-2">
            <div className="mb-6">
              <h2 className="text-3xl font-bold bg-gradient-to-r from-white to-cyan-200 bg-clip-text text-transparent mb-2">
                Your Meal Suggestions
              </h2>
              <p className="text-gray-400 text-lg">AI-generated meals tailored to your nutritional goals</p>
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
            ) : mealSuggestions.length > 0 ? (
              <div className="grid md:grid-cols-2 gap-6">
                {mealSuggestions.map((meal) => (
                  <Card
                    key={meal.id}
                    className="bg-gradient-to-br from-gray-800/50 to-blue-800/50 backdrop-blur-xl border-cyan-500/20 hover:shadow-2xl hover:shadow-cyan-500/20 transition-all duration-500 transform hover:scale-105 hover:-translate-y-2"
                  >
                    <CardHeader>
                      <CardTitle className="flex items-center text-white">
                        <div className="p-2 bg-gradient-to-r from-green-400 to-emerald-500 rounded-lg mr-3">
                          <Utensils className="h-5 w-5 text-white" />
                        </div>
                        {meal.name}
                      </CardTitle>
                      <CardDescription className="flex items-center space-x-4 text-gray-400">
                        <span className="flex items-center">
                          <Clock className="h-4 w-4 mr-1 text-cyan-400" />
                          {meal.prepTime}
                        </span>
                        <span className="flex items-center">
                          <Users className="h-4 w-4 mr-1 text-purple-400" />
                          {meal.servings} serving
                        </span>
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="grid grid-cols-2 gap-4 mb-4">
                        <div className="text-center p-3 bg-gradient-to-br from-blue-500/20 to-cyan-600/20 rounded-lg border border-blue-400/30">
                          <div className="text-lg font-bold text-blue-300">{meal.calories}</div>
                          <div className="text-xs text-gray-400">Calories</div>
                        </div>
                        <div className="text-center p-3 bg-gradient-to-br from-green-500/20 to-emerald-600/20 rounded-lg border border-green-400/30">
                          <div className="text-lg font-bold text-green-300">{meal.protein}g</div>
                          <div className="text-xs text-gray-400">Protein</div>
                        </div>
                        <div className="text-center p-3 bg-gradient-to-br from-yellow-500/20 to-orange-600/20 rounded-lg border border-yellow-400/30">
                          <div className="text-lg font-bold text-yellow-300">{meal.carbs}g</div>
                          <div className="text-xs text-gray-400">Carbs</div>
                        </div>
                        <div className="text-center p-3 bg-gradient-to-br from-purple-500/20 to-pink-600/20 rounded-lg border border-purple-400/30">
                          <div className="text-lg font-bold text-purple-300">{meal.fat}g</div>
                          <div className="text-xs text-gray-400">Fat</div>
                        </div>
                      </div>
                      <div>
                        <h4 className="font-semibold mb-2 text-white">Ingredients:</h4>
                        <ul className="text-sm text-gray-300 space-y-1">
                          {meal.ingredients.map((ingredient, index) => (
                            <li key={index} className="flex items-center">
                              <div className="w-1 h-1 bg-cyan-400 rounded-full mr-2"></div>
                              {ingredient}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : (
              <Card className="text-center py-12 bg-gradient-to-br from-gray-800/50 to-blue-800/50 backdrop-blur-xl border-cyan-500/20">
                <CardContent>
                  <div className="p-4 bg-gradient-to-r from-green-400 to-emerald-500 rounded-full w-fit mx-auto mb-4">
                    <Utensils className="h-12 w-12 text-white" />
                  </div>
                  <h3 className="text-lg font-semibold text-white mb-2">No meal suggestions yet</h3>
                  <p className="text-gray-400 mb-4">
                    Set your nutrition goals and generate your personalized AI meal plan
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
