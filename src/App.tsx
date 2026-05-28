import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import HomePage from './pages/HomePage';
import StudentDashboard from './pages/student/Dashboard';
import Catalog from './pages/student/Catalog';
import ProductDetail from './pages/student/ProductDetail';
import VendorDashboard from './pages/vendor/Dashboard';
import SuperAdminDashboard from './pages/admin/Dashboard';
import DashboardLayout from './components/layout/DashboardLayout';
import { DemoProvider } from './context/DemoContext';
import SaaSSimulatorBar from './components/SaaSSimulatorBar';

function App() {
  return (
    <DemoProvider>
      <Router>
        <SaaSSimulatorBar />
        <Routes>
          <Route path="/" element={<HomePage />} />
          
          {/* Student Routes */}
          <Route path="/student/dashboard" element={<DashboardLayout><StudentDashboard /></DashboardLayout>} />
          <Route path="/student/catalog" element={<DashboardLayout><Catalog /></DashboardLayout>} />
          <Route path="/student/catalog/:id" element={<DashboardLayout><ProductDetail /></DashboardLayout>} />
          
          {/* Vendor Routes */}
          <Route path="/vendor/dashboard" element={<DashboardLayout><VendorDashboard /></DashboardLayout>} />
          
          {/* Super Admin Routes */}
          <Route path="/admin/dashboard" element={<DashboardLayout><SuperAdminDashboard /></DashboardLayout>} />
          
          {/* Fallbacks */}
          <Route path="/admin" element={<Navigate to="/admin/dashboard" />} />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </Router>
    </DemoProvider>
  );
}

export default App;
