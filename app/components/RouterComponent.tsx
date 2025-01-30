import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import { StoreWrapper } from './Store'

export default function RouterComponent() {
  return (
    <Router>
      <Routes>
        <Route path="/:id" element={<StoreWrapper />} />
        <Route path="/" element={<StoreWrapper />} />
      </Routes>
    </Router>
  )
}