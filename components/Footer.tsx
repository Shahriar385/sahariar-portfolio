export default function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="w-full border-t border-border bg-background snap-end">
      <div className="mx-auto max-w-[1100px] px-6 py-8 md:py-12">
        <div className="flex flex-col items-center justify-between gap-6 sm:flex-row">
          <p className="text-sm text-muted-foreground">
            © {currentYear} Sahariar Hossain. All rights reserved.
          </p>
          <p className="text-sm text-muted-foreground">
            Built with Next.js and deployed on Vercel
          </p>
        </div>
      </div>
    </footer>
  )
}
