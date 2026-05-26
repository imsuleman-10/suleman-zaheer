import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import ScrollToTop from './components/ScrollToTop';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import AboutPage from './pages/AboutPage';
import ProjectsPage from './pages/ProjectsPage';
import ContactPage from './pages/ContactPage';
import CVPage from './pages/CVPage';
import AdminLogin from './pages/AdminLogin';
import AdminDashboard from './pages/AdminDashboard';
import Preloader from './components/Preloader';
import NotFoundPage from './pages/NotFoundPage';

const Layout = ({ children }) => {
  const location = useLocation();
  const isCVPage = location.pathname === '/cv';
  const isAdminPage = location.pathname === '/admin' || location.pathname === '/login';

  return (
    <div className="min-h-screen bg-neutral-950 text-white selection:bg-primary/30 selection:text-primary relative">
      {!isCVPage && !isAdminPage && <Navbar />}
      <main>
        {children}
      </main>
      {!isCVPage && !isAdminPage && <Footer />}
    </div>
  );
};

function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Determine how long to show the preloader based on load event
    const handleLoad = () => {
      // Add a slight delay to ensure smooth transition
      setTimeout(() => setLoading(false), 800);
    };

    if (document.readyState === 'complete') {
      handleLoad();
    } else {
      window.addEventListener('load', handleLoad);
      // Fallback timer just in case load is hanging
      setTimeout(() => setLoading(false), 3000);
    }

    return () => window.removeEventListener('load', handleLoad);
  }, []);

  return (
    <>
      <AnimatePresence>
        {loading && <Preloader />}
      </AnimatePresence>
      
      {!loading && (
        <Router>
          <ScrollToTop />
          <Layout>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<AboutPage />} />
              <Route path="/projects" element={<ProjectsPage />} />
              <Route path="/contact" element={<ContactPage />} />
              <Route path="/cv" element={<CVPage />} />
              <Route path="/login" element={<AdminLogin />} />
              <Route path="/admin" element={<AdminDashboard />} />
              <Route path="*" element={<NotFoundPage />} />
            </Routes>
          </Layout>
        </Router>
      )}
    </>
  );
}

export default App;
