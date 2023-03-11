import { Routes, Route, useNavigate } from "react-router-dom";
import Login from "./components/Login.jsx";
import SignUp from "./components/SignUp.jsx";
import Home from "./container/Home";
import { GoogleOAuthProvider } from "@react-oauth/google";

function App() {
  return (
    <GoogleOAuthProvider
      clientId={`{process.env.NEXT_PUBLIC_GOOGLE_API_TOKEN}`}
    >
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/*" element={<Home />} />
      </Routes>
    </GoogleOAuthProvider>
  );
}

export default App;
