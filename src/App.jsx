import { BrowserRouter, Routes, Route } from 'react-router-dom'
import RootLayout     from './layout/RootLayout'
import HomePage       from './pages/HomePage'
import AboutPage      from './pages/AboutPage'
import ServicesPage   from './pages/ServicesPage'
import IndustriesPage from './pages/IndustriesPage'
import JobsPage       from './pages/JobsPage'
import EmployersPage  from './pages/EmployersPage'
import CandidatesPage from './pages/CandidatesPage'
import ContactPage    from './pages/ContactPage'
import SubmitResumePage from './pages/SubmitResumePage'


export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<RootLayout />}>
          <Route index             element={<HomePage />}       />
          <Route path="about"      element={<AboutPage />}      />
          <Route path="services"   element={<ServicesPage />}   />
          <Route path="industries" element={<IndustriesPage />} />
          <Route path="jobs"       element={<JobsPage />}       />
          <Route path="employers"  element={<EmployersPage />}  />
          <Route path="candidates" element={<CandidatesPage />} />
          <Route path="contact"    element={<ContactPage />}    />
          <Route path="submit-resume" element={<SubmitResumePage />} />
         
          <Route path="*" element={
            <div className="min-h-[60vh] flex items-center justify-center">
              <div className="text-center">
                <p className="font-display text-8xl font-bold text-forest-200 mb-4">404</p>
                <h1 className="font-display text-2xl font-bold text-forest-900 mb-2">Page Not Found</h1>
                <p className="font-body text-sm text-forest-600 mb-6">The page you're looking for doesn't exist.</p>
                <a href="/" className="btn-primary">Back to Home</a>
              </div>
            </div>
          } />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}
