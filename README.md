# Kavrol - Safe, Hands-Free Bill Timing Protection

Kavrol is a premium bill timing protection application featuring a real-time, premium 3D glassmorphism visual pipeline that demonstrates how payroll deposits flow through your checking account and settle shortfalls automatically with zero interest.

This project is built using **React**, **Vite**, **TypeScript**, **Tailwind CSS**, **Motion (Framer Motion)**, and **Supabase** for secure, real-time waitlist submissions.

---

## 🛠️ Getting Started Locally

Follow these steps to run the application on your local machine:

### 1. Install Dependencies

Install the required npm packages:

```bash
npm install
```

### 2. Configure Environment Variables

Create a `.env.local` file in the root directory of the project:

```bash
cp .env.example .env.local
```

Open `.env.local` and add your real Supabase credentials:

```env
VITE_SUPABASE_URL=your_supabase_project_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_public_key
```

### 3. Set Up your Supabase Table

In your Supabase SQL Editor, run the following SQL queries to create the `early_access` table with the correct schema and Row-Level Security (RLS) policies:

```sql
-- Create the early_access table
create table public.early_access (
  id uuid default gen_random_uuid() primary key,
  first_name text not null,
  email text not null unique,
  phone text,
  payment_frequency text,
  most_stressful_bill text,
  overdraft_experience text,
  referral_source text,
  story text,
  why_kavrol text,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Enable Row Level Security (RLS)
alter table public.early_access enable row level security;

-- Create policy allowing anonymous inserts
CREATE POLICY "Allow anonymous insert"
ON public.early_access
FOR INSERT
TO anon
WITH CHECK (true);
```

### 4. Run Locally

Start the Vite development server:

```bash
npm run dev
```

The application will run locally, and you can access it in your browser.

---

## 🚀 Deployment

The project is fully pre-configured for a smooth and seamless deployment to **Vercel** or other cloud platforms.

### Deploying to Vercel

1. **Push your code** to GitHub, GitLab, or Bitbucket.
2. **Import your repository** inside your Vercel Dashboard.
3. Under **Environment Variables**, add the production keys matching your `.env.local`:
   - `VITE_SUPABASE_URL`
   - `VITE_SUPABASE_ANON_KEY`
4. Click **Deploy**. The custom `vercel.json` will automatically configure routing redirects for Single Page Application support.

---

## 🔒 Security & Best Practices

- All environment keys are loaded strictly through Vite's client-side environment engine (`import.meta.env`).
- Key variables are defined in `.env.example` and `.env.local`, which are ignored by Git in `.gitignore` to prevent secret exposure.
- Safe-initialization fallback inside `src/lib/supabase.ts` ensures the application never crashes during build-time even if env variables are temporarily unconfigured.
