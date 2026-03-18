

import MainLayout from "./(main)/layout"
import Home from "./(main)/page"





function page() {
  return (
    <div>
      <MainLayout>
        <Home/>
      </MainLayout>
    </div>
  )
}

export default page