import type { Metadata } from "next";
import { MatrixTable } from "@/components/matrix-table";
import { PageHeader } from "@/components/page-header";
import { PositioningMap } from "@/components/positioning-map";
import { eyebrowFor } from "@/lib/nav";

export const metadata: Metadata = { title: "Matrix & map" };

export default function Page() {
  return (
    <>
      <PageHeader
        eyebrow={eyebrowFor("/matrix")}
        title="Comparison matrix and positioning map"
        lede="The matrix answers 'can they do X?' for each buyer. The map shows who each product is built for and what it costs."
        sample
      />

      <section>
        <h2 className="text-xl font-semibold tracking-tight">Capability matrix</h2>
        <p className="mt-1 max-w-2xl text-sm text-pretty text-muted">
          Grouped by what each buyer cares about. Every claim links to the page it came from. Cells we haven&apos;t
          verified say &quot;Not checked&quot; instead of guessing.
        </p>
        <div className="mt-4">
          <MatrixTable />
        </div>
      </section>

      <section className="mt-14">
        <h2 className="text-xl font-semibold tracking-tight">Positioning map</h2>
        <p className="mt-1 max-w-2xl text-sm text-pretty text-muted">
          Who each product is built for on one axis, and where its list price sits on the other. Prices are sourced; the
          placement is my point of view, so it&apos;s labeled that way.
        </p>
        <div className="mt-4">
          <PositioningMap />
        </div>
      </section>
    </>
  );
}
