import { createRoot } from "react-dom/client";
import { BrowserRouter, Route, Routes, useLocation } from "react-router-dom";
import Login from "./components/Login";
import MainPage from "./components/MainPage";
import UpdateProfile from "./components/UpdateProfile";
import Register from "./components/Register";
import { UserProvider } from "./provider/UserProvider";
// eslint-disable-next-line import/no-unresolved
import "/index.css";
import MessagePanel from "./components/MessagePanel";

const RoutePages = () => {
  const location = useLocation();

  return (
    <Routes location={location} key={location.pathname}>
      <Route path="/" element={<MainPage />} />
      <Route path="/register" element={<Register />} />
      <Route path="/login" element={<Login />} />
      <Route path="/update-profile" element={<UpdateProfile />} />
      <Route path="/messages" element={<MessagePanel />} />
      <Route path="*" element={<Login />} />
    </Routes>
  );
};

const App = () => {
  return (
    <div className="m-0 box-border w-screen bg-gray-50 p-0 font-roboto">
      <UserProvider>
        <BrowserRouter>
          <RoutePages />
        </BrowserRouter>
      </UserProvider>
    </div>
  );
};

const container = document.getElementById("root");
const root = createRoot(container as HTMLElement);
root.render(<App />);
