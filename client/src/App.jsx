import { Routes, Route, useNavigate } from "react-router-dom";
import Login from "./components/Login.jsx";
import Main from "./components/Main.jsx";
import SignUp from "./components/SignUp.jsx";
import ContactForm from "./components/ContactForm.jsx";
import Courses from "./components/Courses.jsx";
import Trending from "./components/Trending.jsx";
import Home from "./container/Home";
import NavbarMain from "./components/NavbarMain";
import { GoogleOAuthProvider } from "@react-oauth/google";
// Import css files
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

function App() {
  return (
    <GoogleOAuthProvider
      clientId={`{process.env.NEXT_PUBLIC_GOOGLE_API_TOKEN}`}
    >
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/Home" element={<Home />} />
        <Route path="courses" element={<Courses />} />
        <Route path="contactform" element={<ContactForm />} />
        <Route path="trending" element={<Trending />} />
      </Routes>
    </GoogleOAuthProvider>
  );
}

export default App;
