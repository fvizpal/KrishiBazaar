import { BrowserRouter, Routes, Route } from "react-router-dom";

import Layout from "scenes/layout";
import AuthPage from "scenes/authPage";
import Dashboard from "scenes/dashboard";

function App() {
    return (
        <div className="App">
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<AuthPage />} />
                    <Route element={<Layout />}>
                        <Route path="/dashboard" element={<Dashboard />} />
                    </Route>
                </Routes>
            </BrowserRouter>
        </div>
    );
}

export default App;
