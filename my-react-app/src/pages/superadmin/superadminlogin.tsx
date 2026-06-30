import {useNavigate} from 'react-router-dom'
import {useState} from 'react'
import { Mail, Lock, Eye, EyeOff, LogIn } from 'lucide-react';
import logo1 from '../../assets/logos/logo1.png'

export default function Superadminlogin() {
    const navigate = useNavigate();
const [email, setEmail] = useState('');
const [password, setPassword] = useState('');
const [showPw, setShowPw] = useState(false);
const [loading, setLoading] = useState(false);
const [error, setError] = useState('');

const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  setLoading(true);
  setError('');

  await new Promise(r => setTimeout(r, 800));

  if (email === 'superadmin@example.com' && password === '123456') {
    const user = {
        id: "SA001",
        firstname: "Super",
        lastname: "Admin",
        email: "superadmin@example.com",
        role: "SUPER_ADMIN",
    };
    localStorage.setItem('superadmin', JSON.stringify(user));
    navigate('/superadmin');
  } else {
    setError('Invalid Email or Password');
  }
  setLoading(false);
}

return (
  <div className="min-h-screen bg-gradient-to-br from-slate-100 via-blue-50 to-slate-200 flex items-center justify-center p-6">
    <div className="w-full max-w-6xl bg-white rounded-3xl shadow-2xl overflow-hidden grid lg:grid-cols-2">
      <div className="hidden lg:flex flex-col justify-between bg-gradient-to-br from-[#0F172A] via-[#1A3C5E] to-[#2E86AB] text-white p-12">
        <div>
          <img src={logo1} alt="StayEasy" className="h-14 mb-8" />

          <h1 className="text-4xl font-bold leading-tight">
            StayEasy
          </h1>

          <p className="mt-2 text-blue-100 text-lg">
            SuperAdmin Portal
          </p>

          <p className="mt-6 text-blue-200 leading-7">
            Securely manage the entire StayEasy platform from one place.
            Monitor tenants, subscriptions, analytics and system health.
          </p>
        </div>

        <div className="space-y-5">

          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-full bg-white/10 flex items-center justify-center">
              ✓
            </div>
            <span>Tenant Management</span>
          </div>

          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-full bg-white/10 flex items-center justify-center">
              ✓
            </div>
            <span>Platform Analytics</span>
          </div>

          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-full bg-white/10 flex items-center justify-center">
              ✓
            </div>
            <span>Billing & Subscriptions</span>
          </div>

          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-full bg-white/10 flex items-center justify-center">
              ✓
            </div>
            <span>Reports & Monitoring</span>
          </div>
        </div>
      </div>

      <div className="p-10 lg:p-14">

        <div className="lg:hidden flex justify-center mb-8">
          <img src={logo1} alt="StayEasy" className="h-12" />
        </div>

        <h2 className="text-3xl font-bold text-[#1A3C5E]">
          Welcome Back
        </h2>

        <p className="text-gray-500 mt-2">
          Sign in to access the SuperAdmin Dashboard.
        </p>

        {error && (
          <div className="mt-6 rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-700">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="mt-8 space-y-6">

        <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Email Address
            </label>

            <div className="relative">

              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />

              <input type="email" value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="admin@stayeasy.io"
                required
                className="w-full rounded-xl border border-gray-300 pl-12 pr-4 py-3 focus:border-[#2E86AB] focus:ring-4 focus:ring-[#2E86AB]/20 outline-none"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Password</label>
            <div className="relative">

              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type={showPw ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                required
                className="w-full rounded-xl border border-gray-300 pl-12 pr-12 py-3 focus:border-[#2E86AB] focus:ring-4 focus:ring-[#2E86AB]/20 outline-none"
              />

              <button
                type="button"
                onClick={() => setShowPw(!showPw)}
                className="absolute right-4 top-1/2 -translate-y-1/2"
              >
                {showPw ? (
                  <EyeOff className="w-5 h-5 text-gray-500" />
                ) : (
                  <Eye className="w-5 h-5 text-gray-500" />
                )}
              </button>

            </div>

          </div>

          <div className="flex justify-between items-center text-sm">

            <label className="flex items-center gap-2">
              <input type="checkbox" className="rounded"/>
              Remember me
            </label>

            <button type="button" className="text-[#2E86AB] hover:underline">
              Forgot Password?
            </button>

          </div>
          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-xl bg-gradient-to-r from-[#1A3C5E] to-[#2E86AB] py-3 text-white font-semibold hover:scale-[1.02] transition-all shadow-lg"
          >
            {loading ? (
              <span className="flex justify-center">
                <span className="h-5 w-5 border-2 border-white/40 border-t-white rounded-full animate-spin"></span>
              </span>
            ) : (
              "Secure Sign In"
            )}
          </button>

        </form>

        <div className="mt-8 rounded-2xl border bg-slate-50 p-5">

          <h3 className="font-semibold text-[#1A3C5E]">
            Demo Credentials
          </h3>

          <div className="mt-3 space-y-1 text-sm text-gray-600">

            <p>
              <span className="font-semibold">
                Email:
              </span>{" "}superadmin@example.com</p>

            <p>
              <span className="font-semibold">
                Password:
              </span>{" "}
              123456
            </p>

          </div>

        </div>

      </div>

    </div>
  </div>
);
}


