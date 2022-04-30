import React, { useRef, useState } from "react";
import styled from "styled-components";
import { connect } from "react-redux";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";

import { calculateResults } from "../store/actions/actions";
import LoanResult from "./LoanResult";
import EMIReportTable from "./EMIReportTable";
import Input from "./helper/Input";

const StyledCalculator = styled.div`
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: space-evenly;
  background: rgb(255, 139, 38);
  text-align: center;

  @media (max-width: 550px) {
    display: block;
  }
`;

const StyledBox = styled.div`
  width: 450px;
  padding: 20px;
  max-width: 90%;
  margin: auto;
  border-radius: 10px;
  background: #fff;
  box-shadow: 0 0 50px rgba(0, 0, 0, 0.1);
`;

const StyledSubmitButton = styled.input`
  width: 80%;
  border: solid #000 2px;
  border-radius: 50px;
  padding: 10px 0;
  background: #000;
  color: #fff;
  font-weight: bold;
  transition: 0.5s;
`;

const LoanForm = (props) => {
  const [aadharNum, setAadharNum] = useState();
  const { amount, interest, tenure, emiMonthly, emiAmount, emiExtra } = props;
  const apiUrl = process.env.REACT_APP_URL;

  const myRef = useRef(null);

  const submitForm = (e) => {
    e.preventDefault();
    myRef.current.scrollIntoView({ behavior: "smooth" });
    props.onCalculate(amount, 10, tenure);
    axios
      .post(`${apiUrl}/api/`, {
        userId: aadharNum,
        amount: amount,
        duration: tenure,
        interest: 10,
      })
      .then(() =>
        toast.success("loan applied succesfully check your dashboard")
      )
      .catch((err) => toast.error("loan applied failed try again"));
  };

  return (
    <div>
      <StyledCalculator>
        <div>
          <StyledBox>
            <h1 className="mb-5">Apply for Loan</h1>
            <form onSubmit={submitForm}>
              <Input
                label="Aadhar number"
                initialValue={aadharNum}
                onChange={(e) => setAadharNum(e.target.value)}
                required={true}
              />
              <Input
                label="Amount"
                initialValue={amount}
                onChange={(e) => props.setAmount(e)}
              />
              <Input
                label="Interest 10% fixed"
                initialValue={10}
                disabled={true}
              />
              <Input
                label="Tenure (In years)"
                initialValue={tenure}
                onChange={(e) => props.setTenure(e)}
              />
              <StyledSubmitButton type="submit" value="APPLY" />
            </form>
          </StyledBox>
        </div>
        <div ref={myRef} className="result__area">
          <LoanResult
            emiMonthly={emiMonthly}
            emiExtra={emiExtra}
            emiAmount={emiAmount}
            tenure={tenure}
          />
        </div>
        <Toaster />
      </StyledCalculator>

      <div className="container">
        <div className="table">
          <EMIReportTable />
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => {
  const { amount, interest, tenure } = state.input;
  const { emiMonthly, emiAmount, emiExtra } = state.result;
  return {
    amount,
    interest,
    tenure,
    emiMonthly,
    emiAmount,
    emiExtra,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    setAmount: (e) => dispatch({ type: "SET_AMOUNT", amount: e.target.value }),
    setInterest: (e) =>
      dispatch({ type: "SET_INTEREST", interest: e.target.value }),
    setTenure: (e) => dispatch({ type: "SET_TENURE", tenure: e.target.value }),
    onCalculate: (amount, interest, tenure) =>
      dispatch(calculateResults(amount, interest, tenure)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(LoanForm);
