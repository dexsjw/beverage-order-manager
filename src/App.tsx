import { useState } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import BaseLayout from './layout/BaseLayout'
import History from './pages/History'
import Home from './pages/Home'
import MainOrder from './pages/MainOrder'

function App() {
  const [count, setCount] = useState(0)

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<BaseLayout />}>
          <Route index element={<Home />} />
          <Route path="main-order/:sessionId" element={<MainOrder />} />
          <Route path="history/:sessionId" element={<History />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
