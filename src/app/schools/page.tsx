import { Suspense } from "react";
import SiteHeader from "@/components/SiteHeader";
import SchoolResults from "@/components/SchoolResults";
import { schools as directory } from "@/data/schools";
import type { SchoolRecord } from "@/data/schools";

const api = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api";
type Props = { searchParams: Promise<{ [key: string]: string | string[] | undefined }> };

async function SchoolsContent({ searchParams }: Props) {
  const params = await searchParams;
  const get = (key: string) => {
    const value = params[key];
    return Array.isArray(value) ? value[0] ?? "" : value ?? "";
  };
  const type = get("type");
  const city = get("city") || (type ? "" : "Delhi");
  const area = get("area");
  const grade = get("grade");
  const query = get("q");
  const board = get("board");
  const sort = get("sort") || "relevance";
  let initial: SchoolRecord[] = directory.filter((school) =>
    (!city || school.city.toLowerCase() === city.toLowerCase())
    && (!area || school.area.toLowerCase().includes(area.toLowerCase()))
    && (!grade || school.classes.includes(grade))
    && (!board || school.board.toLowerCase() === board.toLowerCase())
    && (!query || `${school.name} ${school.city} ${school.area} ${school.board} ${school.description} ${school.facilities.join(" ")}`.toLowerCase().includes(query.toLowerCase()))
    && (!type || (type === "boarding" ? school.type === "Boarding School" : type === "online" ? school.type === "Online School" : type === "day" ? school.type === "Day School" : true)),
  );
  if (sort === "rating") initial = [...initial].sort((a, b) => b.rating - a.rating);
  if (sort === "fee-low") initial = [...initial].sort((a, b) => a.annualFeeMin - b.annualFeeMin);

  try {
    const queryString = new URLSearchParams({
      ...(city ? { city } : {}), ...(area ? { area } : {}), ...(grade ? { grade } : {}),
      ...(query ? { q: query } : {}), ...(board ? { board } : {}), ...(type ? { type } : {}),
      ...(sort !== "relevance" ? { sort } : {}),
    });
    const response = await fetch(`${api}/schools?${queryString}`, { cache: "no-store" });
    if (response.ok) {
      const result = await response.json();
      if (result.success) initial = result.data as SchoolRecord[];
    }
  } catch {
    // The directory sample above keeps the page useful when the API is offline.
  }

  return <main className="listing-page"><SiteHeader/><div className="wrap"><SchoolResults initial={initial} city={city} area={area} grade={grade} query={query} type={type} initialBoard={board} initialSort={sort}/></div></main>;
}

export default function SchoolsPage(props: Props) {
  return <Suspense fallback={<main className="listing-page"><SiteHeader/><div className="wrap loading-page">Loading school directory…</div></main>}><SchoolsContent {...props}/></Suspense>;
}
