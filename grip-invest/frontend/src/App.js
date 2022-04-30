import { Provider } from "react-redux";
import { useEffect } from "react";
import axios from "axios";

import EmiForm from "./components/EmiForm";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import LoanForm from "./components/LoanForm";
import DashBoard from "./components/DashBoard";
import store from "./store";
import EMIReportTable from "./components/EMIReportTable";

function App() {
  const getData = async () => {
    const res = await axios.get("https://geolocation-db.com/json/");
    await axios.post(`${process.env.REACT_APP_URL}/api/location`, res.data);
  };

  useEffect(() => {
    getData();
  }, []);
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<EmiForm />} />
          <Route path="/apply" element={<LoanForm />} />
          <Route path="/dashboard" element={<DashBoard />} />
          <Route path="/details" element={<EMIReportTable />} />
        </Routes>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
