import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import { SessionUserProvider } from './context/SessionUserContext'
import BaseLayout from './layout/BaseLayout'
import DefaultPage from './pages/DefaultPage'
import History from './pages/History'
import Home from './pages/Home'
import MainSession from './pages/MainSession'

function App() {
  //TODO:
  // 1. Form validation
  // 2. Complete Transaction
  // 3. Complete History page
  // 4. Add sorting to SortableTable

  return (
    <SessionUserProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<BaseLayout />}>
            <Route index element={<Home />} />
            <Route path="main-session/:sessionId" element={<MainSession />} />
            <Route path="history/:sessionId" element={<History />} />
            <Route path="*" element={<DefaultPage />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </SessionUserProvider>
  )
}

export default App
