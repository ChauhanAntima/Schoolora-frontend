import { Suspense } from "react";
import Link from "next/link";
import SiteHeader from "@/components/SiteHeader";
import EnquiryForm from "@/components/EnquiryForm";
import { schools } from "@/data/schools";
type Props={params:Promise<{schoolId:string}>};
export function generateStaticParams(){return schools.flatMap(school=>[{schoolId:school._id},{schoolId:school.slug}])}
export default function ApplyPage({params}:Props){return <Suspense fallback={<main className="simple-page"><SiteHeader/><div className="wrap apply-layout"><p>Loading school enquiry…</p></div></main>}><ApplyContent params={params}/></Suspense>}

async function ApplyContent({params}:Props){const{schoolId}=await params;const school=schools.find(s=>s._id===schoolId||s.slug===schoolId)||schools[0];return <main className="simple-page"><SiteHeader/><div className="apply-layout wrap"><div className="apply-copy"><div className="breadcrumbs"><Link href="/">Home</Link><span>›</span><Link href={`/schools/${school.slug}`}>{school.name}</Link><span>›</span><span>Enquire</span></div><span className="section-kicker">A GREAT NEXT STEP</span><h1>Start a conversation with <em>{school.name}.</em></h1><p>Share a few details and the admissions team will get back to you with information about availability, fees and visiting the campus.</p><div className="apply-school-mini"><span className="apply-school-icon">🏫</span><div><strong>{school.name}</strong><small>⌖ {school.area}, {school.city} · {school.board}</small></div></div><div className="apply-points"><span>✓ No application fee</span><span>✓ Your details stay private</span><span>✓ No obligation to apply</span></div></div><div className="form-panel"><span className="section-kicker">SCHOOL ENQUIRY</span><h2>Tell us about your family</h2><p>We&apos;ll pass your enquiry along to the school.</p><EnquiryForm endpoint="applications" schoolId={school._id}/></div></div></main>}
