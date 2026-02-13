export function Footer() {
  return (
    <footer className="border-t border-brand-border py-8">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row justify-between gap-4 text-sm text-slate-700 font-medium">
        <div>
          <p className="font-bold text-brand-dark">teachmeai</p>
          <p>© {new Date().getFullYear()} Irfan Khalid. All rights reserved.</p>
        </div>
        <div className="flex gap-4 font-bold">
          <a href="mailto:reachirfan@gmail.com" className="hover:text-brand-primary transition-all duration-150">Contact</a>
          <a href="https://www.linkedin.com/in/irfankhalid" target="_blank" rel="noopener noreferrer" className="hover:text-brand-primary transition-all duration-150">LinkedIn</a>
          <a href="/privacy" className="hover:text-brand-primary transition-all duration-150">Privacy</a>
          <a href="/terms" className="hover:text-brand-primary transition-all duration-150">Terms</a>
        </div>
      </div>
    </footer>
  )
}
