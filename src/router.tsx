// src/router.tsx
import {Route, Routes} from 'react-router-dom';
import HomePage from './pages/homepage/Home.tsx';
import Suggestion from './pages/suggestionspage/suggestion.tsx';
import Accepting from './pages/acceptingpage/accepting.tsx';
import Verify from './components/verify/verify.tsx';
import PrivateRoute from './components/private/PrivateRoute';

export default function Router() {
    return (
        <>
            <Routes>
                <Route path="/" element={<HomePage/>}/>
                <Route
                    path="/suggestions"
                    element={
                        <PrivateRoute>
                            <Suggestion/>
                        </PrivateRoute>
                    }
                />
                <Route
                    path="/accepting"
                    element={
                        <PrivateRoute>
                            <Accepting/>
                        </PrivateRoute>
                    }
                />
                <Route path="/verify/:token" element={<Verify/>}/>
            </Routes>
        </>
    );
}