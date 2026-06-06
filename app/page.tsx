export default function FontTestingPage() {
  return (
    <div className="min-h-screen bg-default text-primary flex flex-col justify-between">
      {/* 1. Header / Navigation Mockup */}
      <header className="border-b border-gray-100 bg-white px-8 py-4 flex justify-between items-center">
        <span className="text-xl font-bold tracking-tight text-primary">
          HopeConnect
        </span>
        <nav className="flex space-x-6 text-sm font-medium text-text-muted">
          <span className="text-primary font-semibold">Campaigns</span>
          <span>Volunteers</span>
          <span>Impact Stories</span>
        </nav>
      </header>

      {/* 2. Full Hero Test Section */}
      <main className="flex-1 max-w-5xl mx-auto px-6 py-16 flex flex-col justify-center space-y-12">
        <div className="space-y-4 text-center max-w-3xl mx-auto">
          {/* Tagline using Inter implicitly via body inherited styles */}
          <p className="text-secondary font-semibold uppercase tracking-wider text-sm">
            Urgent Campaign Request
          </p>

          {/* Heavy Editorial Title - Testing Merriweather */}
          <h1 className="text-5xl md:text-6xl font-black tracking-tight leading-tight text-trust">
            Empowering Communities Through Transparent Action.
          </h1>

          {/* Clean UI Paragraph - Testing Inter */}
          <p className="text-lg text-text-muted max-w-xl mx-auto leading-relaxed">
            Every contribution builds a direct bridge toward clean water access,
            educational tools, and sustainable healthcare programs for displaced
            families.
          </p>
        </div>

        {/* 3. Stats Block - Testing numbers in both serif and sans-serif styles */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto w-full py-8 border-y border-gray-100">
          <div className="text-center">
            <h2 className="text-4xl font-bold text-accent">$124,500</h2>
            <p className="text-sm text-text-muted uppercase tracking-medium mt-1">
              Funds Disbursed
            </p>
          </div>
          <div className="text-center">
            <h2 className="text-4xl font-bold text-primary">4,820</h2>
            <p className="text-sm text-text-muted uppercase tracking-medium mt-1">
              Active Volunteers
            </p>
          </div>
          <div className="text-center">
            <h2 className="text-4xl font-bold text-trust">32</h2>
            <p className="text-sm text-text-muted uppercase tracking-medium mt-1">
              Global Partners
            </p>
          </div>
        </div>

        {/* 4. Action Buttons Mockup */}
        <div className="flex flex-col sm:flex-row justify-center gap-4 pt-4">
          <button className="px-8 py-4 bg-primary text-white font-semibold rounded-lg shadow-professional hover:opacity-95 transition-all">
            Donate to Active Campaigns
          </button>
          <button className="px-8 py-4 bg-background-muted text-text-primary border border-gray-200 font-semibold rounded-lg hover:bg-gray-100 transition-all">
            Become a Volunteer
          </button>
        </div>
      </main>

      {/* 5. Footer */}
      <footer className="bg-background-muted py-6 border-t border-gray-100 text-center text-xs text-text-muted">
        © 2026 HopeConnect Platform Initialization Matrix. All global variables
        active.
      </footer>
    </div>
  );
}
