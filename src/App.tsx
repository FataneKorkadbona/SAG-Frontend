import {Route, Routes, useLocation} from 'react-router-dom';
import HomePage from './pages/homepage/Home.tsx';
import Suggestion from './pages/suggestionspage/suggestion.tsx';
import Accepting from './pages/acceptingpage/accepting.tsx';
import Verify from './components/verify/verify.tsx';
import ProtectedRoute from './ProtectedRoute.tsx';
import LoginPage from './pages/loginpage/login.tsx';
import Unathorized from "./pages/unathorized/unathorized.tsx";
import ProtRoute from './components/ProtectedRoute.tsx';
import {AuthProvider} from './context/AuthContext';
import NavBar from "./NavBar.tsx";
import Footer from "./Footer.tsx";
import './App.scss';

export default function Router() {
    const location = useLocation();
    const hideFooterPaths = ['/login'];
    return (
        <AuthProvider>
            <NavBar/>
            <Routes>
                <Route path="/" element={<HomePage/>}/>
                <Route path="/login" element={<LoginPage/>}/>
                <Route path="/verify/:token" element={<Verify/>}/>
                <Route path="/unauthorized" element={<Unathorized/>}/>
                <Route element={<ProtectedRoute/>}>
                    <Route path="/suggestions" element={<Suggestion/>}/>
                    <Route element={<ProtRoute/>}>
                        <Route path="/accepting" element={<Accepting/>}/>
                    </Route>
                </Route>
            </Routes>
            {!hideFooterPaths.includes(location.pathname) && <Footer />}
        </AuthProvider>
    );
}