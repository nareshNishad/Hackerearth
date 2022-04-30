import React from "react";
import PropTypes from "prop-types";
import ResultTiles from "./helper/ResultTiles";

const LoanResult = (props) => {
  const { emiMonthly, emiExtra, emiAmount, tenure } = props;

  return (
    <div className="result__dashboard">
      <h1 className="text-center">Result</h1>
      <div className="">
        <div className="result__left text-center">
          <ResultTiles name="Loan EMI" value={`&#8377;` + emiMonthly + ``} />
          <ResultTiles
            name="Monthly Interest"
            value={`&#8377;` + (emiExtra / (tenure * 12)).toFixed(1) + ``}
          />
          <ResultTiles
            name="Total (Principal + Interest)"
            value={`&#8377;` + emiAmount + ``}
          />
        </div>
      </div>
    </div>
  );
};

export default LoanResult;
