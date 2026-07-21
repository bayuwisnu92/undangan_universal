import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import TemplateCatalog from './pages/TemplateCatalog';
import InvitationLoader from './pages/InvitationLoader';
import CheckoutPage from './pages/CheckoutPage';
import PaymentPendingPage from './pages/PaymentPendingPage';
import SetupWeddingPage from './pages/SetupWeddingPage';
import AdminDashboard from './pages/AdminDashboard';

function App() {
  return (
    <Router>
      <Routes>
        {/* Templates Catalog */}
        <Route path="/templates" element={<TemplateCatalog />} />

        {/* Order placing & purchase checkout */}
        <Route path="/buy/:templateId" element={<CheckoutPage />} />

        {/* Bank transfer payment verification pending */}
        <Route path="/payment-pending/:weddingId" element={<PaymentPendingPage />} />

        {/* Wedding details data setup form onboarding */}
        <Route path="/setup-wedding/:weddingId" element={<SetupWeddingPage />} />

        {/* Admin Dashboard Control Panel */}
        <Route path="/admin" element={<AdminDashboard />} />

        {/* Dynamic invitation render */}
        <Route path="/:slug" element={<InvitationLoader />} />

        {/* Root fallback redirects to catalog */}
        <Route path="/" element={<Navigate to="/templates" replace />} />
      </Routes>
    </Router>
  );
}

export default App;
