import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Eye, EyeOff, Mail, Lock, AlertCircle, Phone } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { ConfirmationResult } from 'firebase/auth';

export const LoginPage: React.FC = () => {
  const [loginMethod, setLoginMethod] = useState<'email' | 'phone'>('email');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [verificationCode, setVerificationCode] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [confirmationResult, setConfirmationResult] = useState<ConfirmationResult | null>(null);
  const [codeSent, setCodeSent] = useState(false);
  
  const { login, loginWithPhone, verifyPhoneCode } = useAuth();
  const navigate = useNavigate();

  const handleEmailLogin = async () => {
    try {
      await login(email, password);
      navigate('/dashboard');
    } catch (err: any) {
      let errorMessage = 'Failed to login';
      if (err.code === 'auth/user-not-found') {
        errorMessage = 'No account found with this email';
      } else if (err.code === 'auth/wrong-password') {
        errorMessage = 'Incorrect password';
      } else if (err.code === 'auth/invalid-email') {
        errorMessage = 'Invalid email address';
      } else if (err.code === 'auth/too-many-requests') {
        errorMessage = 'Too many failed attempts. Please try again later';
      }
      setError(errorMessage);
    }
  };

  const handlePhoneLogin = async () => {
    if (!phoneNumber.startsWith('+')) {
      setError('Phone number must include country code (e.g., +1234567890)');
      return;
    }

    try {
      const confirmation = await loginWithPhone(phoneNumber);
      setConfirmationResult(confirmation);
      setCodeSent(true);
      setError('');
    } catch (err: any) {
      let errorMessage = 'Failed to send verification code';
      if (err.code === 'auth/invalid-phone-number') {
        errorMessage = 'Invalid phone number format';
      } else if (err.code === 'auth/too-many-requests') {
        errorMessage = 'Too many requests. Please try again later';
      }
      setError(errorMessage);
    }
  };

  const handleVerifyCode = async () => {
    if (!confirmationResult) return;

    try {
      await verifyPhoneCode(confirmationResult, verificationCode);
      navigate('/dashboard');
    } catch (err: any) {
      setError('Invalid verification code');
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    if (loginMethod === 'email') {
      await handleEmailLogin();
    } else if (codeSent) {
      await handleVerifyCode();
    } else {
      await handlePhoneLogin();
    }

    setLoading(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <div className="flex justify-center">
            <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-teal-500 rounded-2xl flex items-center justify-center">
              <span className="text-white font-bold text-2xl">V</span>
            </div>
          </div>
          <h2 className="mt-6 text-center text-3xl font-bold text-gray-900">
            Welcome back
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            Don't have an account?{' '}
            <Link to="/signup" className="font-medium text-blue-600 hover:text-blue-500">
              Sign up
            </Link>
          </p>
        </div>

        <div className="mt-8 space-y-6">
          {/* Login Method Toggle */}
          <div className="flex space-x-4">
            <button
              type="button"
              onClick={() => setLoginMethod('email')}
              className={`flex-1 py-2 px-4 rounded-lg border text-sm font-medium ${
                loginMethod === 'email'
                  ? 'bg-blue-600 text-white border-blue-600'
                  : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'
              }`}
            >
              <Mail className="inline w-4 h-4 mr-2" />
              Email
            </button>
            <button
              type="button"
              onClick={() => setLoginMethod('phone')}
              className={`flex-1 py-2 px-4 rounded-lg border text-sm font-medium ${
                loginMethod === 'phone'
                  ? 'bg-blue-600 text-white border-blue-600'
                  : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'
              }`}
            >
              <Phone className="inline w-4 h-4 mr-2" />
              Phone
            </button>
          </div>

          <form onSubmit={handleSubmit}>
            {error && (
              <div className="bg-red-50 border border-red-200 rounded-lg p-4 flex items-center space-x-2">
                <AlertCircle className="text-red-500" size={20} />
                <span className="text-red-700">{error}</span>
              </div>
            )}

            <div className="space-y-4">
              {loginMethod === 'email' && (
                <>
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                      Email address
                    </label>
                    <div className="mt-1 relative">
                      <input
                        id="email"
                        name="email"
                        type="email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="appearance-none relative block w-full px-3 py-2 pl-10 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-lg focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
                        placeholder="Enter your email"
                      />
                      <Mail className="absolute left-3 top-2.5 text-gray-400" size={18} />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                      Password
                    </label>
                    <div className="mt-1 relative">
                      <input
                        id="password"
                        name="password"
                        type={showPassword ? 'text' : 'password'}
                        required
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="appearance-none relative block w-full px-3 py-2 pl-10 pr-10 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-lg focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
                        placeholder="Enter your password"
                      />
                      <Lock className="absolute left-3 top-2.5 text-gray-400" size={18} />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-2.5 text-gray-400 hover:text-gray-600"
                      >
                        {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                      </button>
                    </div>
                  </div>
                </>
              )}

              {loginMethod === 'phone' && !codeSent && (
                <div>
                  <label htmlFor="phoneNumber" className="block text-sm font-medium text-gray-700">
                    Phone number
                  </label>
                  <div className="mt-1 relative">
                    <input
                      id="phoneNumber"
                      name="phoneNumber"
                      type="tel"
                      required
                      value={phoneNumber}
                      onChange={(e) => setPhoneNumber(e.target.value)}
                      className="appearance-none relative block w-full px-3 py-2 pl-10 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-lg focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
                      placeholder="+1234567890"
                    />
                    <Phone className="absolute left-3 top-2.5 text-gray-400" size={18} />
                  </div>
                  <p className="mt-1 text-xs text-gray-500">Include country code (e.g., +1 for US)</p>
                </div>
              )}

              {loginMethod === 'phone' && codeSent && (
                <div>
                  <label htmlFor="verificationCode" className="block text-sm font-medium text-gray-700">
                    Verification code
                  </label>
                  <div className="mt-1 relative">
                    <input
                      id="verificationCode"
                      name="verificationCode"
                      type="text"
                      required
                      value={verificationCode}
                      onChange={(e) => setVerificationCode(e.target.value)}
                      className="appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-lg focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
                      placeholder="Enter 6-digit code"
                    />
                  </div>
                  <p className="mt-1 text-xs text-gray-500">
                    Enter the verification code sent to {phoneNumber}
                  </p>
                </div>
              )}
            </div>

            {loginMethod === 'email' && (
              <div className="flex items-center justify-between">
                <div className="text-sm">
                  <a href="#" className="font-medium text-blue-600 hover:text-blue-500">
                    Forgot your password?
                  </a>
                </div>
              </div>
            )}

            <div>
              <button
                type="submit"
                disabled={loading}
                className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-lg text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? (
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                ) : loginMethod === 'phone' && !codeSent ? (
                  'Send Verification Code'
                ) : loginMethod === 'phone' && codeSent ? (
                  'Verify Code'
                ) : (
                  'Sign in'
                )}
              </button>
            </div>
          </form>

          {/* reCAPTCHA container for phone auth */}
          <div id="recaptcha-container"></div>
        </div>

        <div className="text-center">
          <p className="text-xs text-gray-500">
            By signing in, you agree to our{' '}
            <a href="#" className="text-blue-600 hover:text-blue-500">
              Terms of Service
            </a>{' '}
            and{' '}
            <a href="#" className="text-blue-600 hover:text-blue-500">
              Privacy Policy
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};