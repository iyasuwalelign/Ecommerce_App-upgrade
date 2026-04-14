import { Route, Routes } from 'react-router-dom'
import Navbar from './components/Navbar.jsx'
import Homepage from './pages/Homepage.jsx'
import Productpage from './pages/Productpage.jsx'

import ProfilePage from './pages/Profilepage.jsx'
import CreatePage from './pages/CreatePage.jsx'
import EditProductPage from './pages/EditProductpage.jsx'

function App() {
  return (
    <div className="min-h-screen bg-base-100">
      <Navbar />
      <main>
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/product/:id" element={<Productpage />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/create" element={<CreatePage />} />
          <Route path="/edit/:id" element={<EditProductPage />} />
        </Routes>
      </main>      
      
    </div>
  )
}

export default App
