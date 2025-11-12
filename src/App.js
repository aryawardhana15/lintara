import { Routes, Route } from 'react-router-dom'
import { LandingPage } from './pages/LandingPage'
import { Login } from './pages/Login'
import { DashboardLayout } from './components/layout/DashboardLayout'
import { DashboardOverview } from './pages/DashboardOverview'
import { G2GIntegration } from './pages/G2GIntegration'
import { G2BIntegration } from './pages/G2BIntegration'
import { B2BIntegration } from './pages/B2BIntegration'
import { APIMarketplace } from './pages/APIMarketplace'
import { AuditLog } from './pages/AuditLog'
import { Settings } from './pages/Settings'
import { NotFound } from './pages/NotFound'

const App = () => (
  <Routes>
    <Route path="/" element={<LandingPage />} />
    <Route path="/login" element={<Login />} />
    <Route path="/dashboard" element={<DashboardLayout />}>
      <Route index element={<DashboardOverview />} />
      <Route path="g2g" element={<G2GIntegration />} />
      <Route path="g2b" element={<G2BIntegration />} />
      <Route path="b2b" element={<B2BIntegration />} />
      <Route path="api-marketplace" element={<APIMarketplace />} />
      <Route path="audit" element={<AuditLog />} />
      <Route path="settings" element={<Settings />} />
      <Route path="*" element={<NotFound />} />
    </Route>
    <Route path="*" element={<NotFound />} />
  </Routes>
)

export default App
