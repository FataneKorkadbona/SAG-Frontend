import Router from './router.tsx'
import NavBar from "./NavBar.tsx";
import Footer from "./Footer.tsx";

import './App.scss'

function App() {

    return (
        <>
            <NavBar/>
            <Router/>
            <Footer/>
        </>
    )
}

export default App