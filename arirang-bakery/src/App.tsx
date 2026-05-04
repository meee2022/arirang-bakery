import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { LanguageProvider } from "./contexts/LanguageContext";
import { AuthProvider, useAuth } from "./contexts/AuthContext";
import { PublicLayout } from "./layouts/PublicLayout";
import { AdminLayout } from "./layouts/AdminLayout";
import Home from "./pages/public/Home";
import Products from "./pages/public/Products";
import About from "./pages/public/About";
import Team from "./pages/public/Team";
import TeamMemberProfile from "./pages/public/TeamMemberProfile";
import Branches from "./pages/public/Branches";
import Corporate from "./pages/public/Corporate";
import Gallery from "./pages/public/Gallery";
import Contact from "./pages/public/Contact";
import Login from "./pages/admin/Login";
import Dashboard from "./pages/admin/Dashboard";
import AdminProducts from "./pages/admin/AdminProducts";
import AdminCategories from "./pages/admin/AdminCategories";
import AdminTeam from "./pages/admin/AdminTeam";
import AdminBranches from "./pages/admin/AdminBranches";
import AdminGallery from "./pages/admin/AdminGallery";
import AdminCorporate from "./pages/admin/AdminCorporate";
import AdminMessages from "./pages/admin/AdminMessages";
import AdminSettings from "./pages/admin/AdminSettings";
import AdminUsers from "./pages/admin/AdminUsers";

function AuthGuard({ children }: { children: React.ReactNode }) {
  const { isAuthenticated } = useAuth();
  if (!isAuthenticated) return <Navigate to="/admin/login" replace />;
  return <>{children}</>;
}

export default function App() {
  return (
    <LanguageProvider>
      <AuthProvider>
        <BrowserRouter>
          <Routes>
            {/* Public */}
            <Route element={<PublicLayout />}>
              <Route path="/" element={<Home />} />
              <Route path="/products" element={<Products />} />
              <Route path="/about" element={<About />} />
              <Route path="/team" element={<Team />} />
              <Route path="/team/:id" element={<TeamMemberProfile />} />
              <Route path="/branches" element={<Branches />} />
              <Route path="/corporate" element={<Corporate />} />
              <Route path="/gallery" element={<Gallery />} />
              <Route path="/contact" element={<Contact />} />
            </Route>

            {/* Admin Login (no layout) */}
            <Route path="/admin/login" element={<Login />} />

            {/* Admin (protected) */}
            <Route
              path="/admin"
              element={<AuthGuard><AdminLayout /></AuthGuard>}
            >
              <Route index element={<Dashboard />} />
              <Route path="products" element={<AdminProducts />} />
              <Route path="categories" element={<AdminCategories />} />
              <Route path="team" element={<AdminTeam />} />
              <Route path="branches" element={<AdminBranches />} />
              <Route path="gallery" element={<AdminGallery />} />
              <Route path="corporate" element={<AdminCorporate />} />
              <Route path="messages" element={<AdminMessages />} />
              <Route path="settings" element={<AdminSettings />} />
              <Route path="users" element={<AdminUsers />} />
            </Route>

            {/* Fallback */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </LanguageProvider>
  );
}
