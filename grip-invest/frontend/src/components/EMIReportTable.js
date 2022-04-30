import React from "react";
import useReport from "../utils/useReport";

const EMIReportTable = () => {
  const reportData = useReport();
  return (
    <div className="reporttable">
      <h2>Monthly Report</h2>
      <table className="table table-striped table-hover">
        <tbody id="monthlyReport">
          <tr>
            <th>Month</th>
            <th>Principal (P)</th>
            <th>Interest (I)</th>
            <th>Total (P + I)</th>
            <th>Balance</th>
            <th>Loan Paid Till Date (%) </th>
          </tr>

          {reportData?.map((data, i) => {
            return [
              <tr key={i}>
                <td>{data.month}</td>
                <td>&#8377; {data.amount.toFixed(1)}</td>
                <td>&#8377; {data.interest.toFixed(1)}</td>
                <td>&#8377; {(data.amount + data.interest).toFixed(1)}</td>
                <td>&#8377; {data.balance.toFixed(1)}</td>
                <td>{data.loan_paid.toFixed(2)} </td>
              </tr>,
            ];
          })}
        </tbody>
      </table>
    </div>
  );
};

export default EMIReportTable;
