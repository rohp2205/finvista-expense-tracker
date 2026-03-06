export default function Footer() {
  return (
    <footer className="bg-slate-950 text-slate-200">
      <div className="max-w-7xl mx-auto px-6 py-12 grid gap-10 md:grid-cols-3">
        <div>
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-indigo-500 to-sky-500 flex items-center justify-center text-white font-bold">
              FV
            </div>
            <div>
              <h3 className="text-lg font-semibold">FinVista</h3>
              <p className="text-sm text-slate-300">Expense tracking with insight-driven budgeting and charts.</p>
            </div>
          </div>
        </div>

        <div>
          <h4 className="text-sm font-semibold tracking-wide text-slate-300 uppercase">Product</h4>
          <ul className="mt-4 space-y-2 text-sm text-slate-200">
            <li>
              <a href="/dashboard" className="hover:text-white transition">Dashboard</a>
            </li>
            <li>
              <a href="/add-expense" className="hover:text-white transition">Add Expense</a>
            </li>
          </ul>
        </div>

        <div>
          <h4 className="text-sm font-semibold tracking-wide text-slate-300 uppercase">Company</h4>
          <ul className="mt-4 space-y-2 text-sm text-slate-200">
            <li>
              <a href="#" className="hover:text-white transition">
                Privacy Policy
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-white transition">
                Terms of Service
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-slate-800">
        <div className="max-w-7xl mx-auto px-6 py-6 flex flex-col gap-3 md:flex-row md:items-center md:justify-between text-sm text-slate-400">
          <p>© {new Date().getFullYear()} FinVista. All rights reserved.</p>
          <p>
            Built with <span className="font-semibold text-slate-200">Next.js</span> &amp; <span className="font-semibold text-slate-200">Supabase</span>
          </p>
        </div>
      </div>
    </footer>
  )
}
