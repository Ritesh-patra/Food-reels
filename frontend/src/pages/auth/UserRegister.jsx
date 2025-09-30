import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const UserRegister = () => {
    
  const [fullname, setfullname] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault(); 
    setError('');
    setSuccess('');

    if (!fullname || !email || !password) {
      setError('Please fill all required fields.');
      return;
    }

    if (password.length < 6) {
      setError('Password must be at least 6 characters.');
      return;
    }

    setLoading(true);
    
    try {
  const res = await axios.post('https://food-reels-omega.vercel.app/api/auth/user/register', {
        fullName :fullname,
        email,
        password, 
        
      },{
        withCredentials: true
      });

      navigate('/')

      setSuccess('Account created successfully!');
      setfullname('');
      setEmail('');
      setPassword('');
     
    } catch (err) {
      setError(err.response?.data?.message || 'Registration failed.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="h-[90vh] p-3 py-6 flex items-center justify-center bg-background">
      <div className="w-full max-w-md rounded-xl border bg-card text-card-foreground shadow">
        <header className="flex items-center justify-between gap-4 border-b px-6 py-5">
          <div>
            <h1 className="text-pretty text-lg font-semibold">Create your account</h1>
            <p className="text-sm text-muted-foreground">Join to order delicious food.</p>
          </div>
          <div className="text-sm text-muted-foreground">
            <span className="mr-1">Switch:</span>
            <Link to="/user/register" className="text-foreground underline underline-offset-4">
              User
            </Link>
            <span className="mx-1">·</span>
            <Link to="/food-partner/register" className="underline-offset-4 text-white hover:text-foreground">
              Food partner
            </Link>
          </div>
        </header>

        <form onSubmit={handleRegister} className="p-6 space-y-4">
          {error && <p className="text-sm text-red-500">{error}</p>}
          {success && <p className="text-sm text-green-500">{success}</p>}

          <div className="grid gap-2">
            <label htmlFor="fullname" className="text-sm font-medium">
              Full name
            </label>
            <input
              id="fullname"
              name="fullname"
              placeholder="John Doe"
              autoComplete="name"
              value={fullname}
              onChange={(e) => setfullname(e.target.value)}
              required
              className="w-full rounded-md border bg-background px-3 py-2 text-sm outline-none placeholder:text-muted-foreground focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 ring-offset-background"
            />
          </div>

          <div className="grid gap-2">
            <label htmlFor="email" className="text-sm font-medium">
              Email
            </label>
            <input
              id="email"
              name="email"
              type="email"
              placeholder="you@example.com"
              autoComplete="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full rounded-md border bg-background px-3 py-2 text-sm outline-none placeholder:text-muted-foreground focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 ring-offset-background"
            />
          </div>

          <div className="grid gap-2">
            <label htmlFor="password" className="text-sm font-medium">
              Password
            </label>
            <input
              id="password"
              name="password"
              type="password"
              placeholder="Create password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              minLength={6}
              required
              className="w-full rounded-md border bg-background px-3 py-2 text-sm outline-none placeholder:text-muted-foreground focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 ring-offset-background"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:opacity-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 ring-offset-background disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? 'Creating...' : 'Create account'}
          </button>
        </form>

        <footer className="border-t px-6 py-5 flex flex-col gap-3">
          <p className="text-sm text-muted-foreground text-center">
            Already have an account?{' '}
            <Link to="/user/login" className="underline underline-offset-4 hover:text-foreground">
              Sign in
            </Link>
          </p>
        </footer>
      </div>
    </main>
  );
};

export default UserRegister;
