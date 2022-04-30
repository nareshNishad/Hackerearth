import React, { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import styled from "styled-components";

import Modal from "./helper/Modal";
import { calculateResults } from "../store/actions/actions";

import toast, { Toaster } from "react-hot-toast";
import Input from "./helper/Input";

const StyledSubmitButton = styled.button`
  border: solid #000 2px;
  border-radius: 50px;
  padding: 10px 0;
  background: #000;
  color: #fff;
  font-weight: bold;
  transition: 0.5s;
  width: 100px;
`;

const DashBoardTable = (props) => {
  const [show, setShow] = useState(false);
  const [withdraw, setWithdraw] = useState(false);
  const [error, setError] = useState(false);
  const [amount, setAmount] = useState(0);
  const [id, setId] = useState("");

  const handleModal = () => {
    setShow(!show);
  };

  const handleTransaction = (e, data) => {
    handleModal();
    setId(data.id);
    if (e.target.innerText === "Deposit") {
      setWithdraw(false);
    } else {
      setWithdraw(true);
    }
  };

  const handleAmount = (e, data) => {
    if (
      (withdraw && data.amount < amount) ||
      (!withdraw && data.amount - parseInt(amount) < 0)
    ) {
      setError(true);
    }
    const newAmount = withdraw
      ? data.amount + parseInt(amount)
      : data.amount - parseInt(amount);
    axios
      .patch(`${process.env.REACT_APP_URL}/api/${id}/${newAmount}`)
      .then(() => {
        setShow(!show);
        toast("Loan updated");
        props.update(!props.state);
      })
      .catch((err) => toast("Loan updated error"));
  };

  const handleData = (e, data) => {
    const { amount, interest, duration } = data;
    props.setAmount(amount);
    props.setInterest(interest);
    props.setTenure(duration);
    props.onCalculate(amount, interest, duration);
  };

  return (
    <div className="reporttable">
      <h2>Monthly Report</h2>

      <table className="table table-striped table-hover">
        <tbody id="monthlyReport">
          <tr>
            <th>Principal (P)</th>
            <th>Interest (I)</th>
            <th>Duration (years)</th>
            <th>action</th>
            <th>Emi info</th>
          </tr>

          {props.reportData?.map((data, i) => (
            <tr key={data.id}>
              <td> {data.amount}</td>
              <td> {data.interest}</td>
              <td> {data.duration}</td>
              <td>
                <Modal show={show} handleClose={handleModal}>
                  <div style={{ width: "50%", margin: "auto" }}>
                    <Input
                      label={
                        withdraw
                          ? "Enter withdraw Amount"
                          : "Enter Deposit Amount"
                      }
                      initialValue={amount}
                      onChange={(e) => setAmount(e.target.value)}
                      required={true}
                    />
                    {error ? (
                      <p>Amount cannot be greater than sanstion amount</p>
                    ) : (
                      ""
                    )}
                    <StyledSubmitButton onClick={(e) => handleAmount(e, data)}>
                      submit
                    </StyledSubmitButton>
                  </div>
                </Modal>
                <StyledSubmitButton onClick={(e) => handleTransaction(e, data)}>
                  Withdraw
                </StyledSubmitButton>
                <StyledSubmitButton onClick={(e) => handleTransaction(e, data)}>
                  Deposit
                </StyledSubmitButton>
              </td>
              <td>
                <button className="link" onClick={(e) => handleData(e, data)}>
                  <Link to="/details">Details</Link>
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <Toaster />
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
    setAmount: (value) => dispatch({ type: "SET_AMOUNT", amount: value }),
    setInterest: (value) => dispatch({ type: "SET_INTEREST", interest: value }),
    setTenure: (value) => dispatch({ type: "SET_TENURE", tenure: value }),
    onCalculate: (amount, interest, tenure) =>
      dispatch(calculateResults(amount, interest, tenure)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(DashBoardTable);
