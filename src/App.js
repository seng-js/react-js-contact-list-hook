import './App.css';
import { Route, Routes } from "react-router-dom"
import Contact from "./routes/Contact";
import ImportCSV from "./routes/ImportCSV";
import Navbar from "./components/Navbar";

function App() {
    return (
        <>
            <Navbar />
            <Routes>
                <Route path="/" element={<Contact />} />
                <Route path="/import-csv" element={<ImportCSV />} />
            </Routes>
        </>
    );
}

export default App;
