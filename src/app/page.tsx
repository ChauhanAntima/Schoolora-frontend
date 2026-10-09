"use client";

import { useState } from "react";
import Link from "next/link";

const popularAreas = [
  "Baner",
  "Wakad",
  "Hinjawadi",
  "Kothrud",
  "Hadapsar",
  "Viman Nagar",
];

const schoolTypes = [
  { title: "Pre-Schools", subtitle: "Early learning", icon: "🧸" },
  { title: "Primary Schools", subtitle: "Classes 1–5", icon: "📚" },
  { title: "Secondary Schools", subtitle: "Classes 6–10", icon: "🎓" },
  { title: "International Schools", subtitle: "Global curriculum", icon: "🌍" },
];

export default function HomePage() {
  const [query, setQuery] = useState("");
  const [area, setArea] = useState("All Pune");
  const [board, setBoard] = useState("All Boards");

  function searchSchools() {
    const params = new URLSearchParams();
    if (query.trim()) params.set("q", query.trim());
    if (area !== "All Pune") params.set("area", area);
    if (board !== "All Boards") params.set("board", board);

    window.location.href = `/schools?${params.toString()}`;
  }

  return (
    <main className="min-h-screen bg-white text-slate-800">
      <header className="border-b border-slate-100 bg-white">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-5 py-4">
          <Link href="/" className="text-2xl font-extrabold tracking-tight text-blue-700">
            Schoolora<span className="text-orange-500">.</span>
          </Link>

          <nav className="hidden items-center gap-7 text-sm font-medium md:flex">
            <Link href="/schools" className="hover:text-blue-700">Find Schools</Link>
            <Link href="/compare" className="hover:text-blue-700">Compare</Link>
            <Link href="/shortlist" className="hover:text-blue-700">Shortlist</Link>
            <Link href="/counselling" className="hover:text-blue-700">Counselling</Link>
          </nav>

          <Link
            href="/schools"
            className="rounded-lg bg-blue-700 px-4 py-2.5 text-sm font-semibold text-white hover:bg-blue-800"
          >
            Explore Schools
          </Link>
        </div>
      </header>

      <section className="relative overflow-hidden bg-gradient-to-br from-blue-50 via-white to-orange-50">
        <div className="mx-auto grid max-w-7xl items-center gap-10 px-5 py-16 md:grid-cols-2 md:py-24">
          <div>
            <span className="inline-flex rounded-full bg-blue-100 px-4 py-2 text-sm font-semibold text-blue-800">
              Find the right school for your child
            </span>

            <h1 className="mt-6 text-4xl font-extrabold leading-tight tracking-tight text-slate-900 md:text-6xl">
              Your child&apos;s future starts with the{" "}
              <span className="text-blue-700">right school.</span>
            </h1>

            <p className="mt-5 max-w-xl text-base leading-7 text-slate-600 md:text-lg">
              Discover schools in Pune, compare fee structures, explore
              facilities and make a confident admission decision.
            </p>

            <div className="mt-8 flex flex-wrap gap-3 text-sm text-slate-600">
              <span>✓ Explore schools</span>
              <span>✓ Compare options</span>
              <span>✓ Plan admissions</span>
            </div>
          </div>

          <div className="rounded-3xl border border-white bg-white p-5 shadow-xl shadow-blue-100/60 md:p-7">
            <h2 className="text-xl font-bold text-slate-900">
              Find your ideal school
            </h2>
            <p className="mt-2 text-sm text-slate-500">
              Start with a location, school name or board.
            </p>

            <form
              className="mt-6 space-y-4"
              onSubmit={(event) => {
                event.preventDefault();
                searchSchools();
              }}
            >
              <label className="block">
                <span className="mb-2 block text-sm font-semibold">Location</span>
                <select
                  value={area}
                  onChange={(event) => setArea(event.target.value)}
                  className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 outline-none focus:border-blue-500"
                >
                  <option>All Pune</option>
                  {popularAreas.map((item) => (
                    <option key={item}>{item}</option>
                  ))}
                </select>
              </label>

              <label className="block">
                <span className="mb-2 block text-sm font-semibold">
                  School name or keyword
                </span>
                <input
                  value={query}
                  onChange={(event) => setQuery(event.target.value)}
                  placeholder="e.g. English medium school"
                  className="w-full rounded-xl border border-slate-200 px-4 py-3 outline-none focus:border-blue-500"
                />
              </label>

              <label className="block">
                <span className="mb-2 block text-sm font-semibold">
                  Education board
                </span>
                <select
                  value={board}
                  onChange={(event) => setBoard(event.target.value)}
                  className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 outline-none focus:border-blue-500"
                >
                  <option>All Boards</option>
                  <option>CBSE</option>
                  <option>ICSE</option>
                  <option>State Board</option>
                  <option>IB</option>
                  <option>Cambridge</option>
                </select>
              </label>

              <button
                type="submit"
                className="w-full rounded-xl bg-orange-500 px-5 py-3.5 font-bold text-white transition hover:bg-orange-600"
              >
                Search Schools →
              </button>
            </form>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 py-14">
        <div className="mb-7">
          <p className="text-sm font-bold uppercase tracking-wider text-blue-700">
            Explore by location
          </p>
          <h2 className="mt-2 text-2xl font-extrabold md:text-3xl">
            Popular areas in Pune
          </h2>
          <p className="mt-2 text-slate-500">
            Start exploring schools near your preferred neighbourhood.
          </p>
        </div>

        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-6">
          {popularAreas.map((item) => (
            <Link
              key={item}
              href={`/schools?area=${encodeURIComponent(item)}`}
              className="rounded-xl border border-slate-200 px-4 py-5 text-center font-semibold transition hover:border-blue-400 hover:bg-blue-50 hover:text-blue-700"
            >
              <span className="mb-2 block text-xl">📍</span>
              {item}
            </Link>
          ))}
        </div>
      </section>

      <section className="bg-slate-50 py-14">
        <div className="mx-auto max-w-7xl px-5">
          <p className="text-sm font-bold uppercase tracking-wider text-blue-700">
            Find the right fit
          </p>
          <h2 className="mt-2 text-2xl font-extrabold md:text-3xl">
            Explore schools by category
          </h2>

          <div className="mt-7 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {schoolTypes.map((item) => (
              <Link
                href="/schools"
                key={item.title}
                className="rounded-2xl border border-slate-100 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-lg"
              >
                <span className="text-4xl">{item.icon}</span>
                <h3 className="mt-5 font-bold text-slate-900">{item.title}</h3>
                <p className="mt-2 text-sm text-slate-500">{item.subtitle}</p>
                <span className="mt-5 inline-block text-sm font-bold text-blue-700">
                  Explore schools →
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 py-14">
        <div className="flex flex-col justify-between gap-5 rounded-3xl bg-blue-700 p-8 text-white md:flex-row md:items-center md:p-12">
          <div>
            <h2 className="text-2xl font-extrabold md:text-3xl">
              Need help choosing a school?
            </h2>
            <p className="mt-3 max-w-xl text-blue-100">
              Explore your options and prepare for your child&apos;s admission journey.
            </p>
          </div>
          <Link
            href="/counselling"
            className="inline-flex shrink-0 justify-center rounded-xl bg-white px-6 py-3 font-bold text-blue-700 hover:bg-blue-50"
          >
            Get Guidance →
          </Link>
        </div>
      </section>

      <footer className="border-t border-slate-200 bg-white">
        <div className="mx-auto flex max-w-7xl flex-col gap-3 px-5 py-7 text-sm text-slate-500 sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} Schoolora. Your school discovery partner.</p>
          <p>School discovery made simpler for families.</p>
        </div>
      </footer>
    </main>
  );
}