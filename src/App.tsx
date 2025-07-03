import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import BaseLayout from './layout/BaseLayout'
import History from './pages/History'
import Home from './pages/Home'
import MainSession from './pages/MainSession'
import DefaultPage from './pages/DefaultPage'
import { SessionProvider } from './context/SessionContext'
import { SessionUserProvider } from './context/SessionUserContext'

function App() {

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
