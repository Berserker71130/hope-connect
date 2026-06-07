export default function DesignSystemTestPage() {
  return (
    <div className="min-h-screen bg-background-muted p-8 space-y-12">
      {/* Header */}
      <div className="border-b border-text-light/10 pb-6">
        <p className="text-small uppercase tracking-widest text-secondary font-semibold">
          Epic 1 — Ticket #2 Verification
        </p>
        <h1 className="text-hero text-trust mt-2 font-black">
          Design Tokens Active
        </h1>
      </div>

      {/* 1. Typography Scale Showcase */}
      <section className="space-y-4 bg-background-default p-6 rounded-md shadow-sm">
        <h2 className="text-h2 text-primary border-b pb-2 mb-4">
          1. Typography Scale & Hierarchy
        </h2>
        <div className="space-y-3">
          <div>
            <span className="text-xs text-text-muted block font-mono">
              --text-hero (56px) / Merriweather
            </span>
            <span className="text-hero font-bold text-trust">
              Hero Title Style
            </span>
          </div>
          <div>
            <span className="text-xs text-text-muted block font-mono">
              h1 (40px) / Merriweather
            </span>
            <h1>Heading 1 Element</h1>
          </div>
          <div>
            <span className="text-xs text-text-muted block font-mono">
              h2 (32px) / Merriweather
            </span>
            <h2>Heading 2 Element</h2>
          </div>
          <div>
            <span className="text-xs text-text-muted block font-mono">
              h3 (24px) / Merriweather
            </span>
            <h3>Heading 3 Element</h3>
          </div>
          <div>
            <span className="text-xs text-text-muted block font-mono">
              h4 (20px) / Merriweather
            </span>
            <h4>Heading 4 Element</h4>
          </div>
          <div>
            <span className="text-xs text-text-muted block font-mono">
              body (16px) / Inter
            </span>
            <p className="text-body text-text-primary">
              This is standard body text prose. It uses the Inter font family,
              providing exceptional line readability (WCAG AAA contrast criteria
              compliant).
            </p>
          </div>
          <div>
            <span className="text-xs text-text-muted block font-mono">
              --text-small (14px) / Inter
            </span>
            <p className="text-small text-text-muted">
              This is small helper text or secondary metadata details.
            </p>
          </div>
        </div>
      </section>

      {/* 2. Soft Shadows & Border Radius Matrix */}
      <section className="space-y-6">
        <h2 className="text-h2 text-primary">
          2. Shadows (Navy Tint) & Border Radii
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Card 1: Small Curve & Shadow */}
          <div className="bg-background-default p-6 rounded-sm shadow-sm border border-text-light/5">
            <span className="px-2 py-1 bg-background-soft text-primary text-small font-semibold rounded-sm">
              sm tokens
            </span>
            <h3 className="text-h3 mt-4 text-trust">Approachability</h3>
            <p className="text-small text-text-muted mt-2">
              Using{" "}
              <code className="bg-background-muted p-1 rounded font-mono text-xs">
                rounded-sm (8px)
              </code>{" "}
              and{" "}
              <code className="bg-background-muted p-1 rounded font-mono text-xs">
                shadow-sm
              </code>
              .
            </p>
          </div>

          {/* Card 2: Medium Curve & Shadow */}
          <div className="bg-background-default p-6 rounded-md shadow-md border border-text-light/5">
            <span className="px-2 py-1 bg-accent/10 text-accent text-small font-semibold rounded-md">
              md tokens
            </span>
            <h3 className="text-h3 mt-4 text-accent">Impact Growth</h3>
            <p className="text-small text-text-muted mt-2">
              Using{" "}
              <code className="bg-background-muted p-1 rounded font-mono text-xs">
                rounded-md (12px)
              </code>{" "}
              and{" "}
              <code className="bg-background-muted p-1 rounded font-mono text-xs">
                shadow-md
              </code>
              .
            </p>
          </div>

          {/* Card 3: Large Curve & Professional Shadow */}
          <div className="bg-background-default p-6 rounded-lg shadow-professional border border-text-light/5">
            <span className="px-2 py-1 bg-secondary/10 text-secondary text-small font-semibold rounded-lg">
              lg / professional tokens
            </span>
            <h3 className="text-h3 mt-4 text-secondary">Urgency Action</h3>
            <p className="text-small text-text-muted mt-2">
              Using{" "}
              <code className="bg-background-muted p-1 rounded font-mono text-xs">
                rounded-lg (16px)
              </code>{" "}
              and{" "}
              <code className="bg-background-muted p-1 rounded font-mono text-xs">
                shadow-professional
              </code>
              .
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
