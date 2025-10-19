import { lazy } from "react";
import "./App.css";
import { Routes, Route, HashRouter } from "react-router-dom";

const Header = lazy(() => import("./components/subParts/header"));
import Home from './components/home';
const Login = lazy(() => import('./components/login'))

function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </>
  );
}

export default App;
