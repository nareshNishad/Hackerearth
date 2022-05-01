import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Header from "./Components/Header";
import Footer from "./Components/Footer";
import Main from "./Components/Main";
import Add from "./Components/Add";
import Delete from "./Components/Delete";
import Update from "./Components/Update";
function App() {
  return (
    <>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="/add" element={<Add />} />
          <Route path="/remove/:id" element={<Delete />} />
          <Route path="/update/:id" element={<Update />} />
          <Route path="*" element={<Main />} />
        </Routes>
      </BrowserRouter>
      <Footer />
    </>
  );
}

export default App;
