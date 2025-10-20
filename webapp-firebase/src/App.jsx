import { lazy } from "react";
import "./App.css";
import { Routes, Route, HashRouter } from "react-router-dom";

const Header = lazy(() => import("./components/subParts/header"));
import Home from "./components/home";
const Login = lazy(() => import("./components/login"));
const Createacc = lazy(() => import("./components/createacc"));

function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/createacc" element={<Createacc />} />
      </Routes>
    </>
  );
}

export default App;
