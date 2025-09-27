import { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Code2, 
  Clock, 
  Trophy, 
  Target, 
  Play, 
  BarChart3, 
  Calendar, 
  CheckCircle,
  Star,
  TrendingUp,
  BookOpen,
  Users
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { useAuth } from '@/contexts/AuthContext';

const CandidateDashboard = () => {
  const { user } = useAuth();
  const [practiceCategory] = useState('algorithms');

  // Mock data
  const stats = {
    interviewsCompleted: 12,
    averageScore: 85,
    percentileRank: 78,
    practiceProblems: 45
  };

  const upcomingInterview = {
    company: 'TechCorp Inc.',
    position: 'Senior Frontend Developer',
    date: 'Tomorrow at 2:00 PM',
    difficulty: 'Medium',
    estimatedTime: '45 minutes',
    interviewer: 'Sarah Johnson'
  };

  const practiceCategories = [
    { name: 'Arrays & Strings', completed: 15, total: 20, progress: 75 },
    { name: 'Trees & Graphs', completed: 8, total: 15, progress: 53 },
    { name: 'Dynamic Programming', completed: 5, total: 12, progress: 42 },
    { name: 'System Design', completed: 3, total: 8, progress: 38 }
  ];

  const achievements = [
    { name: 'First Interview', icon: Star, completed: true },
    { name: 'Perfect Score', icon: Trophy, completed: true },
    { name: '5 Day Streak', icon: Target, completed: false },
    { name: 'Algorithm Master', icon: Code2, completed: false }
  ];

  const recentActivity = [
    { action: 'Completed interview with DataFlow Systems', time: '2 hours ago', score: 92 },
    { action: 'Practiced Binary Tree problems', time: '1 day ago', score: null },
    { action: 'Joined interview with CloudTech', time: '3 days ago', score: 78 },
    { action: 'Completed System Design practice', time: '1 week ago', score: null }
  ];

  return (
    <div className="min-h-screen bg-background-subtle">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">
            Welcome back, {user?.name}! 👋
          </h1>
          <p className="text-muted-foreground">
            Ready to ace your next technical interview?
          </p>
        </div>

        {/* Stats Row */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Interviews</CardTitle>
              <CheckCircle className="h-4 w-4 text-success" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.interviewsCompleted}</div>
              <p className="text-xs text-muted-foreground">
                +2 from last month
              </p>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Average Score</CardTitle>
              <BarChart3 className="h-4 w-4 text-primary" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.averageScore}%</div>
              <p className="text-xs text-success">
                +5% from last month
              </p>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Rank</CardTitle>
              <TrendingUp className="h-4 w-4 text-warning" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.percentileRank}th</div>
              <p className="text-xs text-muted-foreground">
                percentile
              </p>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Practice</CardTitle>
              <BookOpen className="h-4 w-4 text-accent-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.practiceProblems}</div>
              <p className="text-xs text-muted-foreground">
                problems solved
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column */}
          <div className="lg:col-span-2 space-y-6">
            {/* Upcoming Interview */}
            <Card className="border-primary/20 bg-gradient-card shadow-lg">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="flex items-center space-x-2">
                    <Calendar className="h-5 w-5 text-primary" />
                    <span>Upcoming Interview</span>
                  </CardTitle>
                  <Badge variant="secondary">{upcomingInterview.difficulty}</Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <h3 className="font-semibold text-lg">{upcomingInterview.company}</h3>
                  <p className="text-muted-foreground">{upcomingInterview.position}</p>
                </div>
                
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div className="flex items-center space-x-2">
                    <Clock className="h-4 w-4 text-muted-foreground" />
                    <span>{upcomingInterview.date}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Users className="h-4 w-4 text-muted-foreground" />
                    <span>{upcomingInterview.interviewer}</span>
                  </div>
                </div>

                <div className="flex space-x-3">
                  <Button className="bg-gradient-primary hover:opacity-90 flex-1">
                    <Play className="mr-2 h-4 w-4" />
                    Join Interview
                  </Button>
                  <Button variant="outline">
                    Reschedule
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Practice Mode */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Code2 className="h-5 w-5 text-primary" />
                  <span>Practice Mode</span>
                </CardTitle>
                <CardDescription>
                  Sharpen your skills with curated coding problems
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {practiceCategories.map((category) => (
                  <div key={category.name} className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="font-medium">{category.name}</span>
                      <span className="text-muted-foreground">
                        {category.completed}/{category.total}
                      </span>
                    </div>
                    <Progress value={category.progress} className="h-2" />
                  </div>
                ))}
                
                <Button className="w-full mt-4" variant="outline">
                  <Target className="mr-2 h-4 w-4" />
                  Start Practice Session
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Right Column */}
          <div className="space-y-6">
            {/* Achievements */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Trophy className="h-5 w-5 text-warning" />
                  <span>Achievements</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {achievements.map((achievement) => (
                  <div 
                    key={achievement.name}
                    className={`flex items-center space-x-3 p-3 rounded-lg ${
                      achievement.completed 
                        ? 'bg-success/10 border border-success/20' 
                        : 'bg-muted/50 border border-muted'
                    }`}
                  >
                    <achievement.icon 
                      className={`h-5 w-5 ${
                        achievement.completed ? 'text-success' : 'text-muted-foreground'
                      }`} 
                    />
                    <span className={`text-sm ${
                      achievement.completed ? 'text-success' : 'text-muted-foreground'
                    }`}>
                      {achievement.name}
                    </span>
                    {achievement.completed && (
                      <CheckCircle className="h-4 w-4 text-success ml-auto" />
                    )}
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Recent Activity */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Clock className="h-5 w-5 text-primary" />
                  <span>Recent Activity</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {recentActivity.map((activity, index) => (
                  <div key={index} className="flex items-start space-x-3 pb-3 border-b border-muted last:border-0">
                    <div className="w-2 h-2 bg-primary rounded-full mt-2"></div>
                    <div className="flex-1 space-y-1">
                      <p className="text-sm font-medium">{activity.action}</p>
                      <div className="flex items-center justify-between">
                        <p className="text-xs text-muted-foreground">{activity.time}</p>
                        {activity.score && (
                          <Badge variant={activity.score >= 80 ? 'default' : 'secondary'}>
                            {activity.score}%
                          </Badge>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CandidateDashboard;