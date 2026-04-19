import Header from "@/app/components/landing/Header"
import Footer from "../../components/layout/Footer"
export default function MainLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
      <div className="sticky top-0 z-50">
        <Header/>
      </div>
      {children}
      <Footer/>
    </>
  )
}