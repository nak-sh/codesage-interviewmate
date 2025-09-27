import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { UserPlus, Mail, Lock, User, Building, Eye, EyeOff, Loader2, Check, X, Shield } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';

const Register = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    role: undefined as 'candidate' | 'company' | undefined,
    company: '',
    experienceLevel: undefined as 'junior' | 'mid' | 'senior' | undefined,
    skills: [] as string[],
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [skillInput, setSkillInput] = useState('');
  const [passwordStrength, setPasswordStrength] = useState(0);
  const [formProgress, setFormProgress] = useState(0);
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});
  const [fieldFocus, setFieldFocus] = useState<Record<string, boolean>>({});

  const { register } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();

  const skillsSuggestions = [
    'JavaScript', 'TypeScript', 'React', 'Node.js', 'Python', 'Java', 
    'C++', 'Go', 'Rust', 'Docker', 'Kubernetes', 'AWS', 'Git'
  ];

  // Password strength calculation
  const calculatePasswordStrength = (password: string): number => {
    let strength = 0;
    if (password.length >= 8) strength++;
    if (/[a-z]/.test(password)) strength++;
    if (/[A-Z]/.test(password)) strength++;
    if (/[0-9]/.test(password)) strength++;
    if (/[^A-Za-z0-9]/.test(password)) strength++;
    return strength;
  };

  const getPasswordStrengthText = (strength: number): string => {
    const levels = ['Very Weak', 'Weak', 'Fair', 'Good', 'Strong'];
    return levels[strength] || 'Very Weak';
  };

  const getPasswordStrengthColor = (strength: number): string => {
    const colors = ['bg-destructive', 'bg-orange-500', 'bg-yellow-500', 'bg-blue-500', 'bg-green-500'];
    return colors[strength] || 'bg-destructive';
  };

  // Form progress calculation
  const calculateFormProgress = (): number => {
    let progress = 0;
    const totalFields = formData.role === 'candidate' ? 6 : 5; // Different for candidate vs company
    
    if (formData.name.trim()) progress++;
    if (formData.email.trim()) progress++;
    if (formData.password.length >= 8) progress++;
    if (formData.confirmPassword && formData.password === formData.confirmPassword) progress++;
    if (formData.role) progress++;
    
    if (formData.role === 'candidate' && formData.experienceLevel) progress++;
    if (formData.role === 'company' && formData.company.trim()) progress++;
    
    return Math.round((progress / totalFields) * 100);
  };

  // Real-time validation
  const validateField = (field: string, value: string): string => {
    switch (field) {
      case 'name':
        return value.trim().length < 2 ? 'Name must be at least 2 characters' : '';
      case 'email':
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return !emailRegex.test(value) ? 'Please enter a valid email address' : '';
      case 'password':
        if (value.length < 8) return 'Password must be at least 8 characters';
        if (!/[a-z]/.test(value)) return 'Password must contain a lowercase letter';
        if (!/[A-Z]/.test(value)) return 'Password must contain an uppercase letter';
        if (!/[0-9]/.test(value)) return 'Password must contain a number';
        return '';
      case 'confirmPassword':
        return value !== formData.password ? 'Passwords do not match' : '';
      default:
        return '';
    }
  };

  // Update password strength and form progress
  useEffect(() => {
    setPasswordStrength(calculatePasswordStrength(formData.password));
    setFormProgress(calculateFormProgress());
  }, [formData]);

  // Real-time field validation
  useEffect(() => {
    const errors: Record<string, string> = {};
    Object.keys(formData).forEach(field => {
      if (field === 'skills' || field === 'role' || field === 'experienceLevel') return;
      const value = formData[field as keyof typeof formData] as string;
      if (value && fieldFocus[field]) {
        const error = validateField(field, value);
        if (error) errors[field] = error;
      }
    });
    setFieldErrors(errors);
  }, [formData, fieldFocus]);

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleFieldFocus = (field: string) => {
    setFieldFocus(prev => ({ ...prev, [field]: true }));
  };

  const handleFieldBlur = (field: string) => {
    setFieldFocus(prev => ({ ...prev, [field]: false }));
  };

  const addSkill = (skill: string) => {
    if (skill && !formData.skills.includes(skill)) {
      setFormData(prev => ({ ...prev, skills: [...prev.skills, skill] }));
      setSkillInput('');
    }
  };

  const removeSkill = (skillToRemove: string) => {
    setFormData(prev => ({
      ...prev,
      skills: prev.skills.filter(skill => skill !== skillToRemove)
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (formData.password !== formData.confirmPassword) {
      toast({
        title: "Password mismatch",
        description: "Passwords do not match. Please try again.",
        variant: "destructive",
      });
      return;
    }

    if (formData.password.length < 8) {
      toast({
        title: "Password too short",
        description: "Password must be at least 8 characters long.",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);

    try {
      await register({
        name: formData.name,
        email: formData.email,
        password: formData.password,
        role: formData.role!,
        company: formData.company || undefined,
        experienceLevel: formData.experienceLevel || undefined,
        skills: formData.skills.length > 0 ? formData.skills : undefined,
      });

      toast({
        title: "Account created successfully!",
        description: "Welcome to CodeSage. You can now start using the platform.",
      });

      navigate('/candidate-dashboard');
    } catch (error) {
      toast({
        title: "Registration failed",
        description: "Something went wrong. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 bg-background-subtle">
      <div className="max-w-md w-full space-y-8">
        {/* Header */}
        <div className="text-center">
          <div className="mx-auto h-12 w-12 bg-gradient-primary rounded-lg flex items-center justify-center animate-pulse">
            <UserPlus className="h-6 w-6 text-primary-foreground" />
          </div>
          <h2 className="mt-6 text-3xl font-bold text-foreground animate-fade-in">
            Create your account
          </h2>
          <p className="mt-2 text-sm text-muted-foreground animate-fade-in">
            Join CodeSage and revolutionize your interview experience
          </p>
          
          {/* Form Progress Indicator */}
          <div className="mt-4 max-w-xs mx-auto">
            <div className="flex items-center justify-between text-xs text-muted-foreground mb-2">
              <span>Progress</span>
              <span>{formProgress}%</span>
            </div>
            <div className="w-full bg-secondary rounded-full h-2 overflow-hidden">
              <div 
                className="h-full bg-gradient-primary transition-all duration-500 ease-out rounded-full"
                style={{ width: `${formProgress}%` }}
              />
            </div>
          </div>
        </div>

        {/* Registration Form */}
        <Card className="border-card-border shadow-lg">
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl text-center">Sign up</CardTitle>
            <CardDescription className="text-center">
              Fill in your details to get started
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Name */}
              <div className="space-y-2 group">
                <Label htmlFor="name" className="flex items-center gap-2">
                  Full Name
                  {formData.name.trim() && !fieldErrors.name && (
                    <Check className="h-3 w-3 text-green-500 animate-fade-in" />
                  )}
                </Label>
                <div className="relative">
                  <User className={`absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 transition-colors duration-200 ${
                    fieldFocus.name ? 'text-primary' : 'text-muted-foreground'
                  }`} />
                  <Input
                    id="name"
                    type="text"
                    placeholder="Enter your full name"
                    value={formData.name}
                    onChange={(e) => handleInputChange('name', e.target.value)}
                    onFocus={() => handleFieldFocus('name')}
                    onBlur={() => handleFieldBlur('name')}
                    className={`pl-10 transition-all duration-200 ${
                      fieldFocus.name ? 'ring-2 ring-primary/20 border-primary' : ''
                    } ${
                      fieldErrors.name ? 'border-destructive focus-visible:ring-destructive/20' : ''
                    } ${
                      formData.name.trim() && !fieldErrors.name ? 'border-green-500' : ''
                    }`}
                    required
                  />
                  {fieldErrors.name && (
                    <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                      <X className="h-4 w-4 text-destructive animate-fade-in" />
                    </div>
                  )}
                </div>
                {fieldErrors.name && (
                  <p className="text-xs text-destructive animate-fade-in flex items-center gap-1">
                    <X className="h-3 w-3" />
                    {fieldErrors.name}
                  </p>
                )}
              </div>

              {/* Email */}
              <div className="space-y-2 group">
                <Label htmlFor="email" className="flex items-center gap-2">
                  Email
                  {formData.email.trim() && !fieldErrors.email && (
                    <Check className="h-3 w-3 text-green-500 animate-fade-in" />
                  )}
                </Label>
                <div className="relative">
                  <Mail className={`absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 transition-colors duration-200 ${
                    fieldFocus.email ? 'text-primary' : 'text-muted-foreground'
                  }`} />
                  <Input
                    id="email"
                    type="email"
                    placeholder="Enter your email"
                    value={formData.email}
                    onChange={(e) => handleInputChange('email', e.target.value)}
                    onFocus={() => handleFieldFocus('email')}
                    onBlur={() => handleFieldBlur('email')}
                    className={`pl-10 transition-all duration-200 ${
                      fieldFocus.email ? 'ring-2 ring-primary/20 border-primary' : ''
                    } ${
                      fieldErrors.email ? 'border-destructive focus-visible:ring-destructive/20' : ''
                    } ${
                      formData.email.trim() && !fieldErrors.email ? 'border-green-500' : ''
                    }`}
                    required
                  />
                  {fieldErrors.email && (
                    <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                      <X className="h-4 w-4 text-destructive animate-fade-in" />
                    </div>
                  )}
                </div>
                {fieldErrors.email && (
                  <p className="text-xs text-destructive animate-fade-in flex items-center gap-1">
                    <X className="h-3 w-3" />
                    {fieldErrors.email}
                  </p>
                )}
              </div>

              {/* Role Selection */}
              <div className="space-y-2">
                <Label htmlFor="role">I am a</Label>
                <Select
                  value={formData.role}
                  onValueChange={(value) => handleInputChange('role', value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select your role" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="candidate">Job Candidate</SelectItem>
                    <SelectItem value="company">Company / HR</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Company field for HR users */}
              {formData.role === 'company' && (
                <div className="space-y-2">
                  <Label htmlFor="company">Company Name</Label>
                  <div className="relative">
                    <Building className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="company"
                      type="text"
                      placeholder="Enter your company name"
                      value={formData.company}
                      onChange={(e) => handleInputChange('company', e.target.value)}
                      className="pl-10"
                      required
                    />
                  </div>
                </div>
              )}

              {/* Experience Level for candidates */}
              {formData.role === 'candidate' && (
                <>
                  <div className="space-y-2">
                    <Label htmlFor="experience">Experience Level</Label>
                    <Select
                      value={formData.experienceLevel}
                      onValueChange={(value) => handleInputChange('experienceLevel', value)}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select experience level" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="junior">Junior (0-2 years)</SelectItem>
                        <SelectItem value="mid">Mid-level (3-5 years)</SelectItem>
                        <SelectItem value="senior">Senior (5+ years)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Skills */}
                  <div className="space-y-2">
                    <Label htmlFor="skills" className="flex items-center gap-2">
                      Skills (Optional)
                      {formData.skills.length > 0 && (
                        <Badge variant="secondary" className="text-xs animate-fade-in">
                          {formData.skills.length}
                        </Badge>
                      )}
                    </Label>
                    <div className="space-y-3">
                      <div className="relative group">
                        <Input
                          id="skills"
                          type="text"
                          placeholder="Add a skill and press Enter"
                          value={skillInput}
                          onChange={(e) => setSkillInput(e.target.value)}
                          onKeyPress={(e) => {
                            if (e.key === 'Enter') {
                              e.preventDefault();
                              addSkill(skillInput);
                            }
                          }}
                          className="transition-all duration-200 group-hover:border-primary/50"
                        />
                        {skillInput && (
                          <Button
                            type="button"
                            variant="ghost"
                            size="sm"
                            onClick={() => addSkill(skillInput)}
                            className="absolute right-1 top-1/2 transform -translate-y-1/2 h-8 px-2 text-xs opacity-0 group-hover:opacity-100 transition-opacity animate-fade-in"
                          >
                            Add
                          </Button>
                        )}
                      </div>
                      
                      <div className="space-y-2">
                        <p className="text-xs text-muted-foreground">Popular skills:</p>
                        <div className="flex flex-wrap gap-2">
                          {skillsSuggestions.slice(0, 8).map(skill => (
                            <Button
                              key={skill}
                              type="button"
                              variant="outline"
                              size="sm"
                              onClick={() => addSkill(skill)}
                              className={`text-xs transition-all duration-200 hover:scale-105 ${
                                formData.skills.includes(skill) 
                                  ? 'bg-primary/10 border-primary text-primary cursor-default' 
                                  : 'hover:bg-primary/5 hover:border-primary/50'
                              }`}
                              disabled={formData.skills.includes(skill)}
                            >
                              {formData.skills.includes(skill) && (
                                <Check className="h-3 w-3 mr-1" />
                              )}
                              {skill}
                            </Button>
                          ))}
                        </div>
                      </div>
                      
                      {formData.skills.length > 0 && (
                        <div className="space-y-2 animate-fade-in">
                          <p className="text-xs text-muted-foreground">Your skills:</p>
                          <div className="flex flex-wrap gap-2">
                            {formData.skills.map((skill, index) => (
                              <Badge 
                                key={skill} 
                                variant="secondary" 
                                className="px-2 py-1 group hover:bg-destructive/10 transition-all duration-200 animate-fade-in"
                                style={{ animationDelay: `${index * 50}ms` }}
                              >
                                {skill}
                                <button
                                  type="button"
                                  onClick={() => removeSkill(skill)}
                                  className="ml-2 hover:text-destructive transition-colors opacity-60 hover:opacity-100"
                                  aria-label={`Remove ${skill}`}
                                >
                                  ×
                                </button>
                              </Badge>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </>
              )}

              {/* Password */}
              <div className="space-y-2 group">
                <Label htmlFor="password" className="flex items-center gap-2">
                  Password
                  {formData.password && passwordStrength >= 3 && (
                    <Shield className="h-3 w-3 text-green-500 animate-fade-in" />
                  )}
                </Label>
                <div className="relative">
                  <Lock className={`absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 transition-colors duration-200 ${
                    fieldFocus.password ? 'text-primary' : 'text-muted-foreground'
                  }`} />
                  <Input
                    id="password"
                    type={showPassword ? 'text' : 'password'}
                    placeholder="Create a password"
                    value={formData.password}
                    onChange={(e) => handleInputChange('password', e.target.value)}
                    onFocus={() => handleFieldFocus('password')}
                    onBlur={() => handleFieldBlur('password')}
                    className={`pl-10 pr-10 transition-all duration-200 ${
                      fieldFocus.password ? 'ring-2 ring-primary/20 border-primary' : ''
                    } ${
                      fieldErrors.password ? 'border-destructive focus-visible:ring-destructive/20' : ''
                    } ${
                      formData.password && passwordStrength >= 3 ? 'border-green-500' : ''
                    }`}
                    required
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="absolute right-1 top-1/2 transform -translate-y-1/2 h-8 w-8 p-0 hover:bg-muted/50 transition-colors"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? (
                      <EyeOff className="h-4 w-4" />
                    ) : (
                      <Eye className="h-4 w-4" />
                    )}
                  </Button>
                </div>
                
                {/* Password Strength Indicator */}
                {formData.password && (
                  <div className="space-y-2 animate-fade-in">
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-muted-foreground">Password strength:</span>
                      <span className={`font-medium ${
                        passwordStrength <= 1 ? 'text-destructive' :
                        passwordStrength <= 2 ? 'text-orange-500' :
                        passwordStrength <= 3 ? 'text-yellow-500' :
                        passwordStrength <= 4 ? 'text-blue-500' :
                        'text-green-500'
                      }`}>
                        {getPasswordStrengthText(passwordStrength)}
                      </span>
                    </div>
                    <div className="flex gap-1">
                      {[1, 2, 3, 4, 5].map((level) => (
                        <div
                          key={level}
                          className={`h-1 flex-1 rounded-full transition-all duration-300 ${
                            level <= passwordStrength 
                              ? getPasswordStrengthColor(passwordStrength)
                              : 'bg-muted'
                          }`}
                        />
                      ))}
                    </div>
                  </div>
                )}
                
                {fieldErrors.password && (
                  <p className="text-xs text-destructive animate-fade-in flex items-center gap-1">
                    <X className="h-3 w-3" />
                    {fieldErrors.password}
                  </p>
                )}
              </div>

              {/* Confirm Password */}
              <div className="space-y-2 group">
                <Label htmlFor="confirmPassword" className="flex items-center gap-2">
                  Confirm Password
                  {formData.confirmPassword && formData.password === formData.confirmPassword && (
                    <Check className="h-3 w-3 text-green-500 animate-fade-in" />
                  )}
                </Label>
                <div className="relative">
                  <Lock className={`absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 transition-colors duration-200 ${
                    fieldFocus.confirmPassword ? 'text-primary' : 'text-muted-foreground'
                  }`} />
                  <Input
                    id="confirmPassword"
                    type={showConfirmPassword ? 'text' : 'password'}
                    placeholder="Confirm your password"
                    value={formData.confirmPassword}
                    onChange={(e) => handleInputChange('confirmPassword', e.target.value)}
                    onFocus={() => handleFieldFocus('confirmPassword')}
                    onBlur={() => handleFieldBlur('confirmPassword')}
                    className={`pl-10 pr-10 transition-all duration-200 ${
                      fieldFocus.confirmPassword ? 'ring-2 ring-primary/20 border-primary' : ''
                    } ${
                      fieldErrors.confirmPassword ? 'border-destructive focus-visible:ring-destructive/20' : ''
                    } ${
                      formData.confirmPassword && formData.password === formData.confirmPassword ? 'border-green-500' : ''
                    }`}
                    required
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="absolute right-1 top-1/2 transform -translate-y-1/2 h-8 w-8 p-0 hover:bg-muted/50 transition-colors"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  >
                    {showConfirmPassword ? (
                      <EyeOff className="h-4 w-4" />
                    ) : (
                      <Eye className="h-4 w-4" />
                    )}
                  </Button>
                  {fieldErrors.confirmPassword && (
                    <div className="absolute right-12 top-1/2 transform -translate-y-1/2">
                      <X className="h-4 w-4 text-destructive animate-fade-in" />
                    </div>
                  )}
                </div>
                {fieldErrors.confirmPassword && (
                  <p className="text-xs text-destructive animate-fade-in flex items-center gap-1">
                    <X className="h-3 w-3" />
                    {fieldErrors.confirmPassword}
                  </p>
                )}
              </div>

              <Button
                type="submit"
                className={`w-full transition-all duration-300 transform hover:scale-[1.02] ${
                  formProgress === 100 
                    ? 'bg-gradient-primary hover:opacity-90 shadow-lg hover:shadow-xl' 
                    : 'bg-gradient-primary/70 hover:bg-gradient-primary/80'
                }`}
                disabled={isLoading || !formData.role || formProgress < 80}
              >
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Creating account...
                  </>
                ) : (
                  <>
                    <UserPlus className="mr-2 h-4 w-4" />
                    {formProgress === 100 ? 'Create account' : `Complete form (${formProgress}%)`}
                  </>
                )}
              </Button>
            </form>

            <div className="text-center text-sm text-muted-foreground">
              Already have an account?{' '}
              <Link
                to="/login"
                className="text-primary hover:text-primary/80 transition-colors font-medium"
              >
                Sign in here
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Register;