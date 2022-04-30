import React, { useRef, useEffect } from "react";
import styled from "styled-components";
import { connect } from "react-redux";

import { calculateResults } from "../store/actions/actions";
import { Link } from "react-router-dom";
import Input from "./helper/Input";
import Result from "./helper/Result";

const StyledCalculator = styled.div`
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: space-evenly;
  background: rgb(255, 139, 38);
  text-align: center;

  @media (max-width: 450px) {
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

const EmiForm = (props) => {
  const { amount, interest, tenure, emiMonthly, emiAmount, emiExtra } = props;

  const myRef = useRef(null);

  useEffect(() => {
    props.onCalculate(amount, interest, tenure);
    return () => {};
  }, []);

  const submitForm = (e) => {
    e.preventDefault();
    myRef.current.scrollIntoView({ behavior: "smooth" });
    props.onCalculate(amount, interest, tenure);
  };

  return (
    <div>
      <StyledCalculator>
        <div>
          <StyledBox>
            <h1 className="mb-5">EMI Calculator</h1>
            <form onSubmit={submitForm}>
              <Input
                label="Amount"
                initialValue={amount}
                onChange={(e) => props.setAmount(e)}
              />
              <Input
                label="Interest"
                initialValue={interest}
                onChange={(e) => props.setInterest(e)}
              />
              <Input
                label="Tenure (In years)"
                initialValue={tenure}
                onChange={(e) => props.setTenure(e)}
              />
              <StyledSubmitButton type="submit" value="CALCULATE" />
            </form>
          </StyledBox>
          <div className="container">
            <div className="nav">
              <Link to="/apply" className="link">
                Apply for loan
              </Link>
              <Link to="/dashboard" className="link">
                Go to your dashboard
              </Link>
            </div>
          </div>
        </div>
        <div ref={myRef} className="result__area">
          <Result
            emiMonthly={emiMonthly}
            emiExtra={emiExtra}
            emiAmount={emiAmount}
          />
        </div>
      </StyledCalculator>
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

export default connect(mapStateToProps, mapDispatchToProps)(EmiForm);
