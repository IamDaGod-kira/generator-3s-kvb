import { lazy } from "react";
import "./App.css";
import { Routes, Route, HashRouter } from "react-router-dom";

const Header = lazy(() => import("./components/subParts/header"));
const Home = lazy(() => import("./components/home"));

function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
      </Routes>
    </>
  );
}

export default App;
