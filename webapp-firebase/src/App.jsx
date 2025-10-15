import "./App.css";
import Header from "./components/subParts/header";
import { Routes, Route } from "react-router-dom";

function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Header />} />
      </Routes>
    </>
  );
}

export default App;
