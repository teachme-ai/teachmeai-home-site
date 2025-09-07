import Link from "next/link"

export function Footer() {
  return (
    <footer className="bg-muted py-8 px-4">
      <div className="container mx-auto max-w-6xl">
        <div className="grid md:grid-cols-3 gap-8">
          <div>
            <h3 className="font-semibold mb-4">TeachMeAI</h3>
            <p className="text-sm text-muted-foreground">
              Building real AI capability without the hype.
            </p>
          </div>
          
          <div>
            <h4 className="font-medium mb-4">Contact</h4>
            <p className="text-sm text-muted-foreground mb-2">
              Email: irfan@teachmeai.in
            </p>
            <a 
              href="https://linkedin.com/in/irfankhalid" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-sm text-primary hover:underline"
            >
              LinkedIn
            </a>
          </div>
          
          <div>
            <h4 className="font-medium mb-4">Legal</h4>
            <div className="space-y-2">
              <Link href="/privacy" className="block text-sm text-muted-foreground hover:text-foreground">
                Privacy Policy
              </Link>
              <Link href="/terms" className="block text-sm text-muted-foreground hover:text-foreground">
                Terms of Service
              </Link>
            </div>
          </div>
        </div>
        
        <div className="border-t mt-6 pt-6 text-center text-sm text-muted-foreground">
          © 2024 TeachMeAI. All rights reserved.
        </div>
      </div>
    </footer>
  )
}