import { Link } from 'react-router-dom';
import { ArrowRight, CheckCircle, Play, Users, Brain, Zap, BarChart3, Shield, Clock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import heroImage from '@/assets/hero-image.jpg';

const Landing = () => {
  const features = [
    {
      icon: Brain,
      title: 'AI-Powered Evaluation',
      description: 'Advanced AI analyzes code quality, problem-solving approach, and communication skills in real-time.',
    },
    {
      icon: Users,
      title: 'Consistent Assessment',
      description: 'Eliminate interviewer bias with standardized evaluation criteria across all candidates.',
    },
    {
      icon: Zap,
      title: 'Real-time Feedback',
      description: 'Get instant insights and suggestions during interviews to make better hiring decisions.',
    },
    {
      icon: BarChart3,
      title: 'Detailed Analytics',
      description: 'Comprehensive reports and analytics to track hiring performance and candidate progress.',
    },
    {
      icon: Shield,
      title: 'Secure & Compliant',
      description: 'Enterprise-grade security with full compliance to data protection regulations.',
    },
    {
      icon: Clock,
      title: 'Save Time',
      description: 'Reduce interview time by 50% while maintaining high-quality candidate assessment.',
    },
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative pt-20 pb-16 md:pt-28 md:pb-24 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-hero opacity-10"></div>
        <div className="absolute inset-0" style={{ backgroundImage: `url(${heroImage})`, backgroundSize: 'cover', backgroundPosition: 'center', opacity: 0.05 }}></div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8 animate-fade-in">
              <div className="space-y-4">
                <h1 className="text-4xl md:text-6xl font-bold leading-tight">
                  Revolutionize{' '}
                  <span className="bg-gradient-primary bg-clip-text text-transparent">
                    Technical Interviews
                  </span>{' '}
                  with AI
                </h1>
                <p className="text-xl text-muted-foreground max-w-2xl">
                  Transform your hiring process with AI-powered technical interviews. 
                  Get consistent, unbiased evaluations and make better hiring decisions faster.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <Link to="/register">
                  <Button size="lg" className="bg-gradient-primary hover:opacity-90 text-lg px-8 py-4 group">
                    Start Your AI Interview
                    <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </Link>
                <Button 
                  variant="outline" 
                  size="lg" 
                  className="text-lg px-8 py-4 group hover:shadow-md transition-all"
                >
                  <Play className="mr-2 h-5 w-5 group-hover:scale-110 transition-transform" />
                  Watch Demo
                </Button>
              </div>

              <div className="flex items-center space-x-6 text-sm text-muted-foreground">
                <div className="flex items-center space-x-2">
                  <CheckCircle className="h-4 w-4 text-success" />
                  <span>Free 14-day trial</span>
                </div>
                <div className="flex items-center space-x-2">
                  <CheckCircle className="h-4 w-4 text-success" />
                  <span>No credit card required</span>
                </div>
              </div>
            </div>

            <div className="relative animate-slide-up animation-delay-300">
              <div className="relative bg-gradient-card rounded-2xl p-8 shadow-lg">
                <img 
                  src={heroImage} 
                  alt="CodeSage AI Interview Platform" 
                  className="w-full h-auto rounded-lg shadow-md"
                />
                <div className="absolute -top-4 -right-4 bg-gradient-primary rounded-full p-4 shadow-glow">
                  <Brain className="h-8 w-8 text-primary-foreground" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-16 md:py-24 bg-background-subtle">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Why Choose <span className="bg-gradient-primary bg-clip-text text-transparent">CodeSage</span>?
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Our AI-powered platform transforms technical interviews with cutting-edge technology 
              and unbiased evaluation methods.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <Card 
                key={feature.title} 
                className="border-card-border hover:shadow-lg transition-all duration-300 group animate-scale-in"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <CardHeader>
                  <div className="mb-4">
                    <div className="inline-flex p-3 bg-accent rounded-lg group-hover:bg-gradient-primary group-hover:text-primary-foreground transition-all duration-300">
                      <feature.icon className="h-6 w-6" />
                    </div>
                  </div>
                  <CardTitle className="text-xl">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-base leading-relaxed">
                    {feature.description}
                  </CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 md:py-24 bg-gradient-hero relative overflow-hidden">
        <div className="absolute inset-0 bg-primary/10"></div>
        <div className="relative max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold text-primary-foreground mb-6">
            Ready to Transform Your Hiring Process?
          </h2>
          <p className="text-xl text-primary-foreground/80 mb-8 max-w-2xl mx-auto">
            Join hundreds of companies already using CodeSage to make better hiring decisions 
            with AI-powered technical interviews.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/register">
              <Button 
                size="lg" 
                variant="secondary"
                className="text-lg px-8 py-4 bg-card hover:bg-card/90 text-foreground group"
              >
                Get Started Free
                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
            <Button 
              variant="outline" 
              size="lg"
              className="text-lg px-8 py-4 border-primary-foreground/20 text-primary-foreground hover:bg-primary-foreground/10"
            >
              Schedule Demo
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Landing;