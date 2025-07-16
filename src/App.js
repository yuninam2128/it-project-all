import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Detail from "./Routes/Detail";
import Home from "./Routes/Home";
import LandingPage from "./Routes/LandingPage";
import SignupPage from "./Routes/SignupPage";
import LoginPage from "./Routes/LoginPage";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/home" element={<Home />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/project/:id" element={<Detail />}/>
      </Routes>
    </Router>
  );
}

export default App;
