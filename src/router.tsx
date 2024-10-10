import { Route, Routes } from 'react-router-dom';
import HomePage from "./pages/homepage/Home.tsx";
import Suggestion from "./pages/suggestionspage/suggestion.tsx";
import Accepting from "./pages/acceptingpage/accepting.tsx";

export default function Router(){
    return(
        <>
            <Routes>
                <Route path="/" element={<HomePage />}/>
                <Route path="/suggestions" element={<Suggestion />}/>
                <Route path="/accepting" element={<Accepting />}/>
            </Routes>
        </>
    )
}