import React from "react"
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import EmailEditor from "./components/EmailEditor"
import TemplatePreview from "./components/TemplatePreview"
import TemplateList from "./components/TemplateList"

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<TemplateList />} />
        <Route path="/editor" element={<EmailEditor />} />
        <Route path="/editor/:id" element={<EmailEditor />} />
        <Route path="/preview/:id" element={<TemplatePreview />} />
      </Routes>
    </Router>
  )
}

export default App

