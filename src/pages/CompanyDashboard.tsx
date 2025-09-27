import { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Users, 
  Calendar, 
  BarChart3, 
  Plus, 
  Play, 
  FileText,
  Filter,
  Download,
  Clock,
  CheckCircle,
  XCircle,
  Eye,
  Search
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { useAuth } from '@/contexts/AuthContext';

const CompanyDashboard = () => {
  const { user } = useAuth();
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

  // Mock data
  const stats = {
    activeInterviews: 8,
    totalCandidates: 156,
    avgScore: 82,
    completionRate: 94
  };

  const liveInterviews = [
    {
      id: 1,
      candidate: 'Alex Johnson',
      position: 'Senior React Developer',
      interviewer: 'Sarah Wilson',
      startTime: '2:30 PM',
      progress: 65,
      score: 85
    },
    {
      id: 2,
      candidate: 'Maria Garcia',
      position: 'Backend Engineer',
      interviewer: 'Mike Chen',
      startTime: '3:00 PM',
      progress: 40,
      score: 78
    }
  ];

  const candidates = [
    {
      id: 1,
      name: 'John Smith',
      email: 'john@email.com',
      position: 'Frontend Developer',
      status: 'completed',
      score: 88,
      date: '2024-01-15',
      interviewer: 'Sarah Wilson'
    },
    {
      id: 2,
      name: 'Emma Davis',
      email: 'emma@email.com',
      position: 'Full Stack Developer',
      status: 'scheduled',
      score: null,
      date: '2024-01-18',
      interviewer: 'Mike Chen'
    },
    {
      id: 3,
      name: 'David Brown',
      email: 'david@email.com',
      position: 'Backend Engineer',
      status: 'in-progress',
      score: null,
      date: '2024-01-16',
      interviewer: 'Lisa Park'
    },
    {
      id: 4,
      name: 'Sophie Wilson',
      email: 'sophie@email.com',
      position: 'DevOps Engineer',
      status: 'completed',
      score: 92,
      date: '2024-01-14',
      interviewer: 'Tom Anderson'
    }
  ];

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'completed':
        return <Badge className="bg-success/10 text-success border-success/20">Completed</Badge>;
      case 'in-progress':
        return <Badge className="bg-warning/10 text-warning border-warning/20">In Progress</Badge>;
      case 'scheduled':
        return <Badge className="bg-primary/10 text-primary border-primary/20">Scheduled</Badge>;
      default:
        return <Badge variant="secondary">{status}</Badge>;
    }
  };

  const filteredCandidates = candidates.filter(candidate => {
    const matchesSearch = candidate.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         candidate.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         candidate.position.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || candidate.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="min-h-screen bg-background-subtle">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">
            {user?.company || 'Company'} Dashboard
          </h1>
          <p className="text-muted-foreground">
            Manage your technical interviews and track candidate performance
          </p>
        </div>

        {/* Stats Row */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Active Interviews</CardTitle>
              <Play className="h-4 w-4 text-primary" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.activeInterviews}</div>
              <p className="text-xs text-muted-foreground">
                Happening now
              </p>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Candidates</CardTitle>
              <Users className="h-4 w-4 text-success" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.totalCandidates}</div>
              <p className="text-xs text-success">
                +12 this week
              </p>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Average Score</CardTitle>
              <BarChart3 className="h-4 w-4 text-warning" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.avgScore}%</div>
              <p className="text-xs text-muted-foreground">
                All candidates
              </p>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Completion Rate</CardTitle>
              <CheckCircle className="h-4 w-4 text-success" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.completionRate}%</div>
              <p className="text-xs text-success">
                +2% from last month
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column */}
          <div className="lg:col-span-2 space-y-6">
            {/* Quick Actions */}
            <Card>
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
                <CardDescription>
                  Common tasks and actions for interview management
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <Button className="bg-gradient-primary hover:opacity-90 h-20 flex-col space-y-2">
                    <Plus className="h-6 w-6" />
                    <span>Schedule Interview</span>
                  </Button>
                  <Button variant="outline" className="h-20 flex-col space-y-2">
                    <FileText className="h-6 w-6" />
                    <span>View Reports</span>
                  </Button>
                  <Button variant="outline" className="h-20 flex-col space-y-2">
                    <Download className="h-6 w-6" />
                    <span>Export Data</span>
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Candidate Pipeline */}
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>Candidate Pipeline</CardTitle>
                    <CardDescription>
                      Track and manage all candidates in your interview process
                    </CardDescription>
                  </div>
                  <Button size="sm">
                    <Plus className="mr-2 h-4 w-4" />
                    Add Candidate
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Filters */}
                <div className="flex space-x-4">
                  <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      placeholder="Search candidates..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                  <Select value={statusFilter} onValueChange={setStatusFilter}>
                    <SelectTrigger className="w-40">
                      <SelectValue placeholder="Filter by status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Status</SelectItem>
                      <SelectItem value="scheduled">Scheduled</SelectItem>
                      <SelectItem value="in-progress">In Progress</SelectItem>
                      <SelectItem value="completed">Completed</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Candidates Table */}
                <div className="border rounded-lg">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Candidate</TableHead>
                        <TableHead>Position</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Score</TableHead>
                        <TableHead>Date</TableHead>
                        <TableHead>Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredCandidates.map((candidate) => (
                        <TableRow key={candidate.id}>
                          <TableCell>
                            <div>
                              <div className="font-medium">{candidate.name}</div>
                              <div className="text-sm text-muted-foreground">{candidate.email}</div>
                            </div>
                          </TableCell>
                          <TableCell>{candidate.position}</TableCell>
                          <TableCell>{getStatusBadge(candidate.status)}</TableCell>
                          <TableCell>
                            {candidate.score ? (
                              <Badge variant={candidate.score >= 80 ? 'default' : 'secondary'}>
                                {candidate.score}%
                              </Badge>
                            ) : (
                              <span className="text-muted-foreground">-</span>
                            )}
                          </TableCell>
                          <TableCell>{candidate.date}</TableCell>
                          <TableCell>
                            <div className="flex space-x-2">
                              <Button size="sm" variant="outline">
                                <Eye className="h-4 w-4" />
                              </Button>
                              {candidate.status === 'in-progress' && (
                                <Button size="sm">
                                  <Play className="h-4 w-4" />
                                </Button>
                              )}
                            </div>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Right Column */}
          <div className="space-y-6">
            {/* Live Interviews */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Play className="h-5 w-5 text-success" />
                  <span>Live Interviews</span>
                </CardTitle>
                <CardDescription>
                  Monitor ongoing interviews in real-time
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {liveInterviews.map((interview) => (
                  <div key={interview.id} className="p-4 border rounded-lg bg-success/5 border-success/20">
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <h4 className="font-medium">{interview.candidate}</h4>
                        <Badge className="bg-success/10 text-success border-success/20">
                          Live
                        </Badge>
                      </div>
                      
                      <div className="text-sm text-muted-foreground">
                        <div>{interview.position}</div>
                        <div>with {interview.interviewer}</div>
                        <div>Started at {interview.startTime}</div>
                      </div>

                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span>Progress</span>
                          <span>{interview.progress}%</span>
                        </div>
                        <div className="w-full bg-muted rounded-full h-2">
                          <div 
                            className="bg-success h-2 rounded-full transition-all duration-500"
                            style={{ width: `${interview.progress}%` }}
                          ></div>
                        </div>
                      </div>

                      <Button size="sm" variant="outline" className="w-full">
                        <Eye className="mr-2 h-4 w-4" />
                        Monitor Interview
                      </Button>
                    </div>
                  </div>
                ))}

                {liveInterviews.length === 0 && (
                  <div className="text-center py-8 text-muted-foreground">
                    <Clock className="h-12 w-12 mx-auto mb-4 opacity-50" />
                    <p>No live interviews at the moment</p>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Quick Stats */}
            <Card>
              <CardHeader>
                <CardTitle>This Week</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Interviews Completed</span>
                  <span className="font-medium">24</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Average Duration</span>
                  <span className="font-medium">42 min</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Top Performer</span>
                  <span className="font-medium">Sophie Wilson (92%)</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Pass Rate</span>
                  <span className="font-medium text-success">87%</span>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CompanyDashboard;