import Header from "../components/landing/Header"

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
    </>
  )
}