import {Route, Routes} from 'react-router-dom';
import HomePage from './pages/homepage/Home.tsx';
import Suggestion from './pages/suggestionspage/suggestion.tsx';
import Accepting from './pages/acceptingpage/accepting.tsx';
import Verify from './components/verify/verify.tsx';
import ProtectedRoute from './ProtectedRoute.tsx';
import LoginPage from './pages/loginpage/login.tsx';
import Unathorized from "./pages/unathorized/unathorized.tsx";
import ProtRoute from './components/ProtectedRoute.tsx';

export default function Router() {
    return (
        <>
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
        </>
    );
}