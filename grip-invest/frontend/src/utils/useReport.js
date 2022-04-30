import { useEffect, useState } from "react";
import store from "../store";

const useReport = () => {
  const [reportData, setReportData] = useState([]);
  const { input, result } = store.getState();
  const { amount, interest, tenure } = input;
  const { emiMonthly, emiAmount, emiExtra } = result;

  const handleReport = (amount, interest, tenure, emiMonthly) => {
    let a = 0;
    let pr = amount,
      intr = interest,
      ten = tenure * 12;
    intr = intr / 12 / 100;

    let reportData = [];

    while (a < ten) {
      let dataObject = {};
      dataObject.month = a + 1;
      dataObject.interest = Math.round(pr * intr);
      dataObject.amount = Math.round(emiMonthly - dataObject.interest);
      dataObject.balance = Math.round(pr - dataObject.amount);
      dataObject.loan_paid = (100 * (amount - dataObject.balance)) / amount;
      pr = dataObject.balance;
      a++;
      reportData.push(dataObject);
    }

    setReportData([...reportData]);
  };
  useEffect(() => {
    handleReport(amount, interest, tenure, emiMonthly);
  }, [emiMonthly]);
  return reportData;
};

export default useReport;
