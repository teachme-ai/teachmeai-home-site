export function Footer() {
  return (
    <footer className="border-t border-brand-border py-8 px-4">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between gap-6 text-sm text-slate-700 font-medium">
        <div className="space-y-1">
          <p className="font-bold text-brand-dark">teachmeai</p>
          <p>© {new Date().getFullYear()} Irfan Khalid. All rights reserved.</p>
        </div>
        <div className="flex flex-wrap gap-x-6 gap-y-2 font-bold">
          <a href="mailto:reachirfan@gmail.com" className="hover:text-brand-primary transition-colors">Contact</a>
          <a href="https://www.linkedin.com/in/irfankhalid" target="_blank" rel="noopener noreferrer" className="hover:text-brand-primary transition-colors">LinkedIn</a>
          <a href="/privacy" className="hover:text-brand-primary transition-colors">Privacy</a>
          <a href="/terms" className="hover:text-brand-primary transition-colors">Terms</a>
        </div>
      </div>
    </footer>
  )
}
