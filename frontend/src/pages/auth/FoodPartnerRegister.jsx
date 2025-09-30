import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const FoodPartnerRegister = () => {
  const [businessName, setBusinessName] = useState("");
  const [contactName, setContactName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [address, setAddress] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (!businessName || !contactName || !email || !password) {
      setError("Please fill all required fields.");
      return;
    }

    if (password.length < 6) {
      setError("Password must be at least 6 characters.");
      return;
    }

    setLoading(true);
    try {
  const res = await axios.post("https://food-reels-omega.vercel.app/api/auth/food-partner/register", {
        name :businessName,
        contactName,
        phone,
        email,
        password,
        address,
      },
    {
        withCredentials: true
      });

      setSuccess("Partner account created successfully!");
      setBusinessName("");
      setContactName("");
      setPhone("");
      setEmail("");
      setPassword("");
      setAddress("");

      

      // Redirect after successful registration
      navigate("/create-food");
    } catch (err) {
      setError(err.response?.data?.message || "Registration failed.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-[100vh] p-3 py-6 flex items-center justify-center bg-background">
      <div className="w-full max-w-md rounded-xl border bg-card text-card-foreground shadow">
        <header className="flex items-center justify-between gap-4 border-b px-6 py-5">
          <div>
            <h1 className="text-pretty text-lg font-semibold">Partner sign up</h1>
            <p className="text-sm text-muted-foreground">Grow your business with our platform.</p>
          </div>
          <div className="text-sm text-muted-foreground">
            <span className="mr-1">Switch:</span>
            <Link to="/user/register" className="underline-offset-4 hover:text-foreground">
              User
            </Link>
            <span className="mx-1">·</span>
            <Link to="/food-partner/register" className="underline text-foreground">
              Food-partner
            </Link>
          </div>
        </header>

        <form onSubmit={handleRegister} className="p-6 space-y-4">
          {error && <p className="text-sm text-red-500">{error}</p>}
          {success && <p className="text-sm text-green-500">{success}</p>}

          <div className="grid gap-2">
            <label htmlFor="businessName" className="text-sm font-medium">
              Business name
            </label>
            <input
              id="businessName"
              name="businessName"
              placeholder="Tasty Bites"
              autoComplete="organization"
              value={businessName}
              onChange={(e) => setBusinessName(e.target.value)}
              required
              className="w-full rounded-md border bg-background px-3 py-2 text-sm outline-none placeholder:text-muted-foreground focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 ring-offset-background"
            />
          </div>

          <div className="grid gap-2">
            <label htmlFor="contactName" className="text-sm font-medium">
              Contact name
            </label>
            <input
              id="contactName"
              name="contactName"
              placeholder="Jane Doe"
              autoComplete="name"
              value={contactName}
              onChange={(e) => setContactName(e.target.value)}
              required
              className="w-full rounded-md border bg-background px-3 py-2 text-sm outline-none placeholder:text-muted-foreground focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 ring-offset-background"
            />
          </div>

          <div className="grid gap-2">
            <label htmlFor="phone" className="text-sm font-medium">
              Phone
            </label>
            <input
              id="phone"
              name="phone"
              placeholder="+1 555 123 4567"
              autoComplete="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
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
              placeholder="business@example.com"
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

          <div className="grid gap-2">
            <label htmlFor="address" className="text-sm font-medium">
              Address
            </label>
            <input
              id="address"
              name="address"
              placeholder="123 Market Street"
              autoComplete="street-address"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              className="w-full rounded-md border bg-background px-3 py-2 text-sm outline-none placeholder:text-muted-foreground focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 ring-offset-background"
            />
            <p className="text-xs text-muted-foreground">
              Full address helps customers find you faster.
            </p>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:opacity-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 ring-offset-background disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? "Creating..." : "Create Partner Account"}
          </button>
        </form>

        <footer className="border-t px-6 py-5 flex flex-col gap-3">
          <p className="text-sm text-muted-foreground text-center">
            Already a partner?{" "}
            <Link to="/food-partner/login" className="underline underline-offset-4 hover:text-foreground">
              Sign in
            </Link>
          </p>
        </footer>
      </div>
    </main>
  );
};

export default FoodPartnerRegister;
