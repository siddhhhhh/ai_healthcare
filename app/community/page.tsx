"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { ArrowLeft, Users, MessageCircle, Heart, Share2, Plus, Search, Reply, Send, Sparkles } from "lucide-react"

interface Comment {
  id: number
  author: {
    name: string
    avatar: string
    initials: string
  }
  content: string
  timestamp: string
  likes: number
  isLiked: boolean
}

interface Post {
  id: number
  author: {
    name: string
    avatar: string
    initials: string
  }
  title: string
  content: string
  category: string
  timestamp: string
  likes: number
  replies: number
  isLiked: boolean
  tags: string[]
  comments: Comment[]
  showComments: boolean
}

export default function CommunityPage() {
  const [posts, setPosts] = useState<Post[]>([
    {
      id: 1,
      author: {
        name: "Sarah Johnson",
        avatar: "/placeholder.svg?height=40&width=40",
        initials: "SJ",
      },
      title: "My 30-day fitness journey results!",
      content:
        "Just completed my first 30-day fitness challenge and I'm amazed by the results! Lost 8 pounds and gained so much energy. The key was consistency and using the AI diet planner here. Anyone else doing fitness challenges?",
      category: "Fitness",
      timestamp: "2 hours ago",
      likes: 24,
      replies: 8,
      isLiked: false,
      tags: ["fitness", "weight-loss", "motivation"],
      comments: [
        {
          id: 1,
          author: { name: "Mike Chen", avatar: "/placeholder.svg?height=32&width=32", initials: "MC" },
          content: "Congratulations! That's amazing progress. What was your favorite part of the challenge?",
          timestamp: "1 hour ago",
          likes: 3,
          isLiked: false,
        },
        {
          id: 2,
          author: { name: "Emma Wilson", avatar: "/placeholder.svg?height=32&width=32", initials: "EW" },
          content: "So inspiring! I'm starting my own 30-day challenge tomorrow. Any tips?",
          timestamp: "45 minutes ago",
          likes: 1,
          isLiked: true,
        },
      ],
      showComments: false,
    },
    {
      id: 2,
      author: {
        name: "Mike Chen",
        avatar: "/placeholder.svg?height=40&width=40",
        initials: "MC",
      },
      title: "Healthy meal prep ideas for busy professionals",
      content:
        "As someone who works 60+ hours a week, meal prep has been a game changer. Here are my top 5 quick and healthy meal prep ideas that take less than 2 hours on Sunday...",
      category: "Nutrition",
      timestamp: "5 hours ago",
      likes: 31,
      replies: 12,
      isLiked: true,
      tags: ["meal-prep", "nutrition", "busy-lifestyle"],
      comments: [],
      showComments: false,
    },
    {
      id: 3,
      author: {
        name: "Emma Wilson",
        avatar: "/placeholder.svg?height=40&width=40",
        initials: "EW",
      },
      title: "Dealing with stress and anxiety - what works for you?",
      content:
        "I've been struggling with work stress lately and it's affecting my sleep and eating habits. The mood activities feature suggested some great breathing exercises. What are your go-to stress management techniques?",
      category: "Mental Health",
      timestamp: "1 day ago",
      likes: 18,
      replies: 15,
      isLiked: false,
      tags: ["stress", "mental-health", "self-care"],
      comments: [],
      showComments: false,
    },
  ])

  const [newPost, setNewPost] = useState({ title: "", content: "", category: "General" })
  const [showNewPost, setShowNewPost] = useState(false)
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("All")
  const [commentInputs, setCommentInputs] = useState<{ [key: number]: string }>({})

  const categories = ["All", "Fitness", "Nutrition", "Mental Health", "General"]

  const handleLike = (postId: number) => {
    setPosts(
      posts.map((post) =>
        post.id === postId
          ? { ...post, likes: post.isLiked ? post.likes - 1 : post.likes + 1, isLiked: !post.isLiked }
          : post,
      ),
    )
  }

  const handleCommentLike = (postId: number, commentId: number) => {
    setPosts(
      posts.map((post) =>
        post.id === postId
          ? {
              ...post,
              comments: post.comments.map((comment) =>
                comment.id === commentId
                  ? {
                      ...comment,
                      likes: comment.isLiked ? comment.likes - 1 : comment.likes + 1,
                      isLiked: !comment.isLiked,
                    }
                  : comment,
              ),
            }
          : post,
      ),
    )
  }

  const toggleComments = (postId: number) => {
    setPosts(posts.map((post) => (post.id === postId ? { ...post, showComments: !post.showComments } : post)))
  }

  const handleAddComment = (postId: number) => {
    const commentText = commentInputs[postId]
    if (!commentText?.trim()) return

    const newComment: Comment = {
      id: Date.now(),
      author: { name: "You", avatar: "/placeholder.svg?height=32&width=32", initials: "YU" },
      content: commentText,
      timestamp: "Just now",
      likes: 0,
      isLiked: false,
    }

    setPosts(
      posts.map((post) =>
        post.id === postId
          ? {
              ...post,
              comments: [...post.comments, newComment],
              replies: post.replies + 1,
              showComments: true,
            }
          : post,
      ),
    )

    setCommentInputs({ ...commentInputs, [postId]: "" })
  }

  const handleNewPost = () => {
    if (newPost.title && newPost.content) {
      const post: Post = {
        id: posts.length + 1,
        author: {
          name: "You",
          avatar: "/placeholder.svg?height=40&width=40",
          initials: "YU",
        },
        title: newPost.title,
        content: newPost.content,
        category: newPost.category,
        timestamp: "Just now",
        likes: 0,
        replies: 0,
        isLiked: false,
        tags: [],
        comments: [],
        showComments: false,
      }
      setPosts([post, ...posts])
      setNewPost({ title: "", content: "", category: "General" })
      setShowNewPost(false)
    }
  }

  const filteredPosts = posts.filter((post) => {
    const matchesSearch =
      post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      post.content.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = selectedCategory === "All" || post.category === selectedCategory
    return matchesSearch && matchesCategory
  })

  const getCategoryColor = (category: string) => {
    switch (category) {
      case "Fitness":
        return "bg-gradient-to-r from-green-500 to-emerald-600"
      case "Nutrition":
        return "bg-gradient-to-r from-blue-500 to-cyan-600"
      case "Mental Health":
        return "bg-gradient-to-r from-purple-500 to-pink-600"
      default:
        return "bg-gradient-to-r from-gray-500 to-gray-600"
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900">
      <div className="max-w-6xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center">
            <Link href="/dashboard">
              <Button variant="ghost" size="sm" className="mr-4 text-gray-300 hover:text-white">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Dashboard
              </Button>
            </Link>
            <div>
              <h1 className="text-4xl font-bold bg-gradient-to-r from-white to-cyan-200 bg-clip-text text-transparent flex items-center">
                Community Forum
                <Sparkles className="ml-2 h-8 w-8 text-yellow-400" />
              </h1>
              <p className="text-gray-400 text-lg">Connect with others on their health and wellness journey</p>
            </div>
          </div>
          <Button
            onClick={() => setShowNewPost(true)}
            className="bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white shadow-lg hover:shadow-xl hover:shadow-cyan-500/25 transition-all duration-300 transform hover:scale-105"
          >
            <Plus className="h-4 w-4 mr-2" />
            New Post
          </Button>
        </div>

        {/* Search and Filter */}
        <div className="flex flex-col sm:flex-row gap-4 mb-8">
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                placeholder="Search posts..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 bg-white/10 border-white/20 text-white placeholder:text-gray-400 focus:border-cyan-400 focus:ring-cyan-400/20"
              />
            </div>
          </div>
          <div className="flex gap-2 flex-wrap">
            {categories.map((category) => (
              <Button
                key={category}
                variant={selectedCategory === category ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedCategory(category)}
                className={
                  selectedCategory === category
                    ? "bg-gradient-to-r from-cyan-500 to-blue-600 text-white border-0"
                    : "border-white/20 text-gray-300 hover:bg-white/10 hover:text-white"
                }
              >
                {category}
              </Button>
            ))}
          </div>
        </div>

        {/* New Post Modal */}
        {showNewPost && (
          <Card className="mb-8 bg-gradient-to-br from-gray-800/50 to-blue-800/50 backdrop-blur-xl border-cyan-500/20 shadow-2xl">
            <CardHeader>
              <CardTitle className="text-white">Create New Post</CardTitle>
              <CardDescription className="text-gray-300">
                Share your thoughts, questions, or experiences with the community
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Input
                  placeholder="Post title..."
                  value={newPost.title}
                  onChange={(e) => setNewPost({ ...newPost, title: e.target.value })}
                  className="bg-white/10 border-white/20 text-white placeholder:text-gray-400 focus:border-cyan-400 focus:ring-cyan-400/20"
                />
              </div>
              <div>
                <Textarea
                  placeholder="What's on your mind?"
                  value={newPost.content}
                  onChange={(e) => setNewPost({ ...newPost, content: e.target.value })}
                  rows={4}
                  className="bg-white/10 border-white/20 text-white placeholder:text-gray-400 focus:border-cyan-400 focus:ring-cyan-400/20"
                />
              </div>
              <div className="flex justify-between items-center">
                <select
                  value={newPost.category}
                  onChange={(e) => setNewPost({ ...newPost, category: e.target.value })}
                  className="px-3 py-2 border border-white/20 rounded-md bg-white/10 text-white focus:border-cyan-400"
                >
                  <option value="General" className="bg-gray-800">
                    General
                  </option>
                  <option value="Fitness" className="bg-gray-800">
                    Fitness
                  </option>
                  <option value="Nutrition" className="bg-gray-800">
                    Nutrition
                  </option>
                  <option value="Mental Health" className="bg-gray-800">
                    Mental Health
                  </option>
                </select>
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    onClick={() => setShowNewPost(false)}
                    className="border-white/20 text-gray-300 hover:bg-white/10"
                  >
                    Cancel
                  </Button>
                  <Button
                    onClick={handleNewPost}
                    className="bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700"
                  >
                    Post
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Posts */}
        <div className="space-y-6">
          {filteredPosts.map((post) => (
            <Card
              key={post.id}
              className="bg-gradient-to-br from-gray-800/50 to-blue-800/50 backdrop-blur-xl border-cyan-500/20 hover:shadow-2xl hover:shadow-cyan-500/20 transition-all duration-500 transform hover:scale-[1.02]"
            >
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex items-center space-x-3">
                    <Avatar className="ring-2 ring-cyan-400/50">
                      <AvatarImage src={post.author.avatar || "/placeholder.svg"} />
                      <AvatarFallback className="bg-gradient-to-r from-cyan-500 to-blue-600 text-white">
                        {post.author.initials}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <div className="font-semibold text-white">{post.author.name}</div>
                      <div className="text-sm text-gray-400">{post.timestamp}</div>
                    </div>
                  </div>
                  <Badge className={`${getCategoryColor(post.category)} text-white border-0`}>{post.category}</Badge>
                </div>
                <CardTitle className="text-xl text-white">{post.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-300 mb-4">{post.content}</p>

                {post.tags.length > 0 && (
                  <div className="flex flex-wrap gap-2 mb-4">
                    {post.tags.map((tag, index) => (
                      <Badge key={index} variant="outline" className="text-xs border-cyan-400/30 text-cyan-300">
                        #{tag}
                      </Badge>
                    ))}
                  </div>
                )}

                <div className="flex items-center justify-between pt-4 border-t border-white/10">
                  <div className="flex items-center space-x-4">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleLike(post.id)}
                      className={`transition-all duration-300 ${post.isLiked ? "text-red-400 hover:text-red-300" : "text-gray-400 hover:text-white"}`}
                    >
                      <Heart
                        className={`h-4 w-4 mr-1 transition-transform hover:scale-110 ${post.isLiked ? "fill-current" : ""}`}
                      />
                      {post.likes}
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => toggleComments(post.id)}
                      className="text-gray-400 hover:text-white transition-colors"
                    >
                      <MessageCircle className="h-4 w-4 mr-1 transition-transform hover:scale-110" />
                      {post.replies}
                    </Button>
                    <Button variant="ghost" size="sm" className="text-gray-400 hover:text-white transition-colors">
                      <Share2 className="h-4 w-4 mr-1 transition-transform hover:scale-110" />
                      Share
                    </Button>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => toggleComments(post.id)}
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    <Reply className="h-4 w-4 mr-1 transition-transform hover:scale-110" />
                    Reply
                  </Button>
                </div>

                {/* Comments Section */}
                {post.showComments && (
                  <div className="mt-6 space-y-4 border-t border-white/10 pt-4">
                    {/* Add Comment */}
                    <div className="flex space-x-3">
                      <Avatar className="ring-2 ring-cyan-400/50">
                        <AvatarFallback className="bg-gradient-to-r from-cyan-500 to-blue-600 text-white">
                          YU
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex-1 flex space-x-2">
                        <Input
                          placeholder="Write a comment..."
                          value={commentInputs[post.id] || ""}
                          onChange={(e) => setCommentInputs({ ...commentInputs, [post.id]: e.target.value })}
                          className="bg-white/10 border-white/20 text-white placeholder:text-gray-400 focus:border-cyan-400 focus:ring-cyan-400/20"
                          onKeyPress={(e) => e.key === "Enter" && handleAddComment(post.id)}
                        />
                        <Button
                          onClick={() => handleAddComment(post.id)}
                          size="sm"
                          className="bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 transition-all duration-300 transform hover:scale-105"
                        >
                          <Send className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>

                    {/* Comments List */}
                    {post.comments.map((comment) => (
                      <div key={comment.id} className="flex space-x-3 bg-white/5 rounded-lg p-3 backdrop-blur-sm">
                        <Avatar className="ring-2 ring-cyan-400/30">
                          <AvatarImage src={comment.author.avatar || "/placeholder.svg"} />
                          <AvatarFallback className="bg-gradient-to-r from-purple-500 to-pink-600 text-white text-xs">
                            {comment.author.initials}
                          </AvatarFallback>
                        </Avatar>
                        <div className="flex-1">
                          <div className="flex items-center space-x-2 mb-1">
                            <span className="font-semibold text-white text-sm">{comment.author.name}</span>
                            <span className="text-xs text-gray-400">{comment.timestamp}</span>
                          </div>
                          <p className="text-gray-300 text-sm mb-2">{comment.content}</p>
                          <div className="flex items-center space-x-2">
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => handleCommentLike(post.id, comment.id)}
                              className={`text-xs transition-all duration-300 ${comment.isLiked ? "text-red-400 hover:text-red-300" : "text-gray-500 hover:text-white"}`}
                            >
                              <Heart
                                className={`h-3 w-3 mr-1 transition-transform hover:scale-110 ${comment.isLiked ? "fill-current" : ""}`}
                              />
                              {comment.likes}
                            </Button>
                            <Button
                              variant="ghost"
                              size="sm"
                              className="text-xs text-gray-500 hover:text-white transition-colors"
                            >
                              <Reply className="h-3 w-3 mr-1" />
                              Reply
                            </Button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredPosts.length === 0 && (
          <Card className="text-center py-12 bg-gradient-to-br from-gray-800/50 to-blue-800/50 backdrop-blur-xl border-cyan-500/20">
            <CardContent>
              <Users className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-white mb-2">No posts found</h3>
              <p className="text-gray-400 mb-4">
                {searchTerm || selectedCategory !== "All"
                  ? "Try adjusting your search or filter criteria"
                  : "Be the first to start a conversation!"}
              </p>
              {!searchTerm && selectedCategory === "All" && (
                <Button
                  onClick={() => setShowNewPost(true)}
                  className="bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 transition-all duration-300 transform hover:scale-105"
                >
                  <Plus className="h-4 w-4 mr-2" />
                  Create First Post
                </Button>
              )}
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  )
}
