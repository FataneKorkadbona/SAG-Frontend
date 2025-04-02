import {Route, Routes, useLocation} from 'react-router-dom';
import HomePage from './pages/homepage/Home.tsx';
import Suggestion from './pages/suggestionspage/suggestion.tsx';
import Accepting from './pages/acceptingpage/accepting.tsx';
import ProtectedRoute from './ProtectedRoute.tsx';
import LoginPage from './pages/loginpage/login.tsx';
import Unathorized from "./pages/unathorized/unathorized.tsx";
import ProtRoute from './components/ProtectedRoute.tsx';
import {AuthProvider} from './context/AuthContext';
import NavBar from "./NavBar.tsx";
import Footer from "./Footer.tsx";
import Admin from "./pages/adminpage/admin.tsx";
import HandleUsers from "./pages/adminpage/handleusers.tsx";
import HandleSuggestions from "./pages/adminpage/handlesuggestions.tsx";
import RemoveAddUsers from "./pages/adminpage/removeaddusers.tsx";
import {FooterProvider} from "./context/FooterContext.tsx";
import IntroductionPage from './pages/Introductionpage/Introduction.tsx';
import HandleMoney from './pages/adminpage/handlemoney.tsx';
import HandleEditableStuff from "./pages/adminpage/handleeditablestuff.tsx";
import Monitoring from "./pages/adminpage/monitoring.tsx";
import './App.scss';
import VerifyMagicLink from "./pages/loginpage/login2.tsx";
import AdminLogin from "./pages/adminpage/AdminLogin.tsx";
import {EmailProvider} from './context/EmailContext';
//import Down from "./pages/down/down.tsx";


export default function App() {
    return (
            <AuthProvider>
                <EmailProvider>
                    <Router/>
                </EmailProvider>
            </AuthProvider>
    );
}

function Router() {
    const location = useLocation();
    const hideFooterPaths = ['/login', '/verify', '/unauthorized', '/', '/admin', '/admin/money', '/admin/handleusers', '/admin/suggestions', '/admin/dangerzone', "/verify-magic-link"];

    return (
        <FooterProvider>
            <NavBar/>
            <Routes>
                <Route path="/" element={<IntroductionPage/>}/>
                <Route path="/home" element={<HomePage/>}/>
                <Route path="/login" element={<LoginPage/>}/>
                <Route path="/verify-magic-link" element={<VerifyMagicLink/>}/>
                <Route path="/unauthorized" element={<Unathorized/>}/>
                <Route path="/admin-login" element={<AdminLogin/>}/>
                <Route element={<ProtectedRoute/>}>
                    <Route path="/suggestions" element={<Suggestion/>}/>
                    <Route element={<ProtRoute/>}>
                        <Route path="/accepting" element={<Accepting/>}/>
                        <Route path="/admin" element={<Admin/>}/>
                        <Route path="/admin/handleusers" element={<HandleUsers/>}/>
                        <Route path="/admin/suggestions" element={<HandleSuggestions/>}/>
                        <Route path="/admin/dangerzone" element={<RemoveAddUsers/>}/>
                        <Route path="/admin/money" element={<HandleMoney/>}/>
                        <Route path="/admin/editablestuff" element={<HandleEditableStuff/>}/>
                        <Route path="/admin/monitoring" element={<Monitoring/>}/>
                    </Route>
                </Route>
            </Routes>
            {!hideFooterPaths.includes(location.pathname) && <Footer/>}
        </FooterProvider>
    );
}