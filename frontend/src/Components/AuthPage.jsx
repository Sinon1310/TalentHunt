import React, { useState } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { Eye, EyeOff, CheckCircle, AlertCircle } from 'lucide-react';
import { useUser } from '../Contexts/UserContext';
import { authAPI } from '../api/auth';
import { auth, googleProvider } from '../firebase';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
} from 'firebase/auth';

const AuthPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { login } = useUser();

  const [activeTab, setActiveTab] = useState(location.state?.activeTab || 'login');
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    name: '',
    confirmPassword: '',
    role: 'student'
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [loginSuccess, setLoginSuccess] = useState(false);
  const [signupSuccess, setSignupSuccess] = useState(false);
  const [serverError, setServerError] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));

    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Invalid email format';
    }

    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }

    if (activeTab === 'signup') {
      if (!formData.name) {
        newErrors.name = 'Name is required';
      }
      if (!formData.confirmPassword) {
        newErrors.confirmPassword = 'Please confirm your password';
      } else if (formData.password !== formData.confirmPassword) {
        newErrors.confirmPassword = 'Passwords do not match';
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsSubmitting(true);
    setServerError('');

    try {
      if (activeTab === 'signup') {
        // Register with backend
        const response = await authAPI.register({
          name: formData.name,
          email: formData.email,
          password: formData.password,
          role: formData.role
        });

        setSignupSuccess(true);
        setTimeout(() => {
          setActiveTab('login');
          setSignupSuccess(false);
        }, 2000);

      } else {
        // Login with backend
        const response = await authAPI.login({
          email: formData.email,
          password: formData.password
        });

        // Store token and user data
        localStorage.setItem('token', response.token);
        login(response.user);

        setLoginSuccess(true);

        // Redirect based on role and return path
        const redirectPath = location.state?.from || 
          (response.user.role === 'mentor' ? '/mentor/dashboard' : '/dashboard');
        
        setTimeout(() => {
          navigate(redirectPath);
        }, 1500);
      }
    } catch (error) {
      console.error('Auth Error:', error);
      const errorMessage = error.response?.data?.message || 'Authentication failed. Please try again.';
      
      if (error.response?.data?.errors) {
        // Handle validation errors
        const validationErrors = {};
        error.response.data.errors.forEach(err => {
          validationErrors[err.path || err.param] = err.msg;
        });
        setErrors(validationErrors);
      } else {
        setServerError(errorMessage);
      }
    }

    setIsSubmitting(false);
  };

  const handleGoogleSignIn = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      const firebaseUser = result.user;

      const userData = {
        name: firebaseUser.displayName || firebaseUser.email.split('@')[0],
        email: firebaseUser.email,
        role: 'student',
        profileImage: firebaseUser.photoURL || null,
        joinedDate: new Date().toISOString()
      };

      login(userData);
      setLoginSuccess(true);

      setTimeout(() => {
        navigate('/dashboard');
      }, 1500);
    } catch (error) {
      console.error('Google Sign-In Error:', error);
      setErrors({ email: 'Google Sign-In failed. Try again.' });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-purple-100 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="bg-white shadow-2xl rounded-2xl overflow-hidden transition-transform duration-300 hover:scale-105 relative">
          <div className="absolute inset-0 bg-gradient-to-r from-indigo-500 to-purple-600 opacity-10 pointer-events-none" />

          <div className="px-8 pt-8 pb-4 text-center">
            <div className="mx-auto w-16 h-16 mb-4 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-full flex items-center justify-center">
              <span className="text-white text-2xl font-bold">TH</span>
            </div>
            <h2 className="text-3xl font-extrabold text-gray-900">
              {activeTab === 'login' ? 'Welcome Back' : 'Create Account'}
            </h2>
            <p className="mt-2 text-sm text-gray-600">
              {activeTab === 'login'
                ? 'Sign in to continue to your account'
                : 'Join our community today'}
            </p>
          </div>

          <div className="flex border-b border-gray-200 px-8">
            <button
              className={`flex-1 py-3 font-semibold transition-colors ${
                activeTab === 'login'
                  ? 'text-indigo-600 border-b-2 border-indigo-600'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
              onClick={() => setActiveTab('login')}
            >
              Login
            </button>
            <button
              className={`flex-1 py-3 font-semibold transition-colors ${
                activeTab === 'signup'
                  ? 'text-indigo-600 border-b-2 border-indigo-600'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
              onClick={() => setActiveTab('signup')}
            >
              Sign Up
            </button>
          </div>

          <form onSubmit={handleSubmit} className="px-8 pt-6 pb-8">
            {(loginSuccess || signupSuccess) && (
              <div className="mb-4 p-3 bg-green-100 text-green-800 rounded-lg flex items-center animate-bounce">
                <CheckCircle size={20} className="mr-2" />
                {loginSuccess ? 'Login successful!' : signupSuccess && activeTab === 'signup' 
                  ? 'Account created! Please check your email to verify your account.' 
                  : 'Registration complete! You can now log in.'}
              </div>
            )}

            {serverError && (
              <div className="mb-4 p-3 bg-red-100 text-red-800 rounded-lg flex items-center">
                <AlertCircle size={20} className="mr-2" />
                {serverError}
              </div>
            )}

            {activeTab === 'signup' && (
              <div className="mb-4">
                <label className="block text-sm font-bold mb-2 text-gray-700">Full Name</label>
                <input
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 ${
                    errors.name ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 focus:ring-indigo-500'
                  }`}
                  placeholder="Your full name"
                />
                {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
              </div>
            )}

            <div className="mb-4">
              <label className="block text-sm font-bold mb-2 text-gray-700">Email</label>
              <input
                name="email"
                value={formData.email}
                onChange={handleChange}
                className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 ${
                  errors.email ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 focus:ring-indigo-500'
                }`}
                placeholder="you@example.com"
              />
              {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
            </div>

            <div className="mb-4">
              <label className="block text-sm font-bold mb-2 text-gray-700">Password</label>
              <div className="relative">
                <input
                  name="password"
                  type={showPassword ? 'text' : 'password'}
                  value={formData.password}
                  onChange={handleChange}
                  className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 pr-10 ${
                    errors.password ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 focus:ring-indigo-500'
                  }`}
                  placeholder="••••••••"
                />
                <button
                  type="button"
                  className="absolute inset-y-0 right-0 px-3 flex items-center"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
              {errors.password && <p className="text-red-500 text-xs mt-1">{errors.password}</p>}
            </div>

            {activeTab === 'signup' && (
              <div className="mb-4">
                <label className="block text-sm font-bold mb-2 text-gray-700">Confirm Password</label>
                <input
                  name="confirmPassword"
                  type="password"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 ${
                    errors.confirmPassword ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 focus:ring-indigo-500'
                  }`}
                  placeholder="Confirm password"
                />
                {errors.confirmPassword && (
                  <p className="text-red-500 text-xs mt-1">{errors.confirmPassword}</p>
                )}
              </div>
            )}

            <div className="mb-4">
              <div className="flex space-x-4">
                <label className="inline-flex items-center">
                  <input
                    type="radio"
                    name="role"
                    value="student"
                    checked={formData.role === 'student'}
                    onChange={handleChange}
                    className="form-radio text-indigo-600"
                  />
                  <span className="ml-2">Student</span>
                </label>
                <label className="inline-flex items-center">
                  <input
                    type="radio"
                    name="role"
                    value="mentor"
                    checked={formData.role === 'mentor'}
                    onChange={handleChange}
                    className="form-radio text-indigo-600"
                  />
                  <span className="ml-2">Mentor</span>
                </label>
              </div>
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-gradient-to-r from-indigo-500 to-purple-600 text-white py-3 rounded-lg hover:from-indigo-600 hover:to-purple-700 transition-all duration-300 flex items-center justify-center"
            >
              {isSubmitting ? 'Processing...' : activeTab === 'login' ? 'Sign In' : 'Create Account'}
            </button>

            {activeTab === 'login' && (
              <div className="mb-4 text-center">
                <Link
                  to="/auth/forgot-password"
                  className="text-indigo-600 hover:text-indigo-800 text-sm font-medium"
                >
                  Forgot your password?
                </Link>
              </div>
            )}

            <div className="mt-4 text-center">
              <p className="text-sm text-gray-500 mb-2">or sign in with</p>
              <button
                type="button"
                onClick={handleGoogleSignIn}
                className="w-full bg-white border border-gray-300 py-2 rounded-lg flex items-center justify-center hover:bg-gray-100 transition-all duration-300"
              >
                <img
                  src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg"
                  alt="Google"
                  className="h-5 w-5 mr-3"
                />
                <span className="text-gray-700 font-medium">Continue with Google</span>
              </button>
            </div>
          </form>

          {/* Forgot Password Link - Only show on login tab */}
          {activeTab === 'login' && (
            <div className="px-8 pb-2 text-center">
              <Link
                to="/auth/forgot-password"
                className="text-sm text-indigo-600 hover:text-indigo-800 font-medium"
              >
                Forgot your password?
              </Link>
            </div>
          )}

          <div className="px-8 pb-6 text-center text-sm">
            {activeTab === 'login' ? (
              <>
                Don’t have an account?{' '}
                <button
                  onClick={() => setActiveTab('signup')}
                  className="text-indigo-600 hover:text-indigo-800 font-semibold"
                >
                  Sign Up
                </button>
              </>
            ) : (
              <>
                Already have an account?{' '}
                <button
                  onClick={() => setActiveTab('login')}
                  className="text-indigo-600 hover:text-indigo-800 font-semibold"
                >
                  Log In
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthPage;
