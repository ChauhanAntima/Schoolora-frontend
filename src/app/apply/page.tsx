import Link from "next/link";
import SiteHeader from "@/components/SiteHeader";
import BulkApplication from "@/components/BulkApplication";

export const metadata={title:"Common School Application | Ezyschooling Prototype"};
export default function CommonApplicationPage(){return <main className="simple-page"><SiteHeader/><div className="wrap common-application"><div className="breadcrumbs"><Link href="/">Home</Link><span>›</span><span>Common application</span></div><div className="common-head"><div><span className="section-kicker">ONE FORM, A FEW GOOD OPTIONS</span><h1>Take the next step, <em>together.</em></h1><p>Shortlist schools, share your child&apos;s details once and keep the process clear.</p></div><div className="common-promise"><span>✓</span><strong>100% free</strong><small>for families</small></div></div><BulkApplication/></div></main>}
