import Header from "@/app/components/landing/Header"
import Footer from "@/app/components/layout/Footer"

export default function MainLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen flex flex-col">
      <div className="sticky top-0 z-50">
        <Header />
      </div>

      {/* THIS is the key fix */}
      <main className="flex-1">
        {children}
      </main>

      <Footer />
    </div>
  )
}