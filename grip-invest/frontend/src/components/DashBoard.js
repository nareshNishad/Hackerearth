import axios from "axios";
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import DashBoardTable from "./DashBoardTable";
import Input from "./helper/Input";

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

const StyledSubmitButton = styled.button`
  width: 80%;
  border: solid #000 2px;
  border-radius: 50px;
  padding: 10px 0;
  background: #000;
  color: #fff;
  font-weight: bold;
  transition: 0.5s;
`;

const DashBoard = () => {
  const [aadharNum, setAadharNum] = useState();
  const [loanData, setLoanData] = useState([]);
  const [refresh, setRefresh] = useState(false);
  const apiUrl = process.env.REACT_APP_URL;

  useEffect(() => {
    submitForm();
  }, [refresh]);

  const submitForm = () => {
    if (aadharNum) {
      axios
        .get(`${apiUrl}/api/${aadharNum}`)
        .then((res) => setLoanData([...res.data]))
        .catch((err) => console.warn(err));
    }
  };

  return (
    <div>
      <StyledCalculator>
        <div>
          <StyledBox>
            <h1 className="mb-5">DashBoard</h1>
            <Input
              label="Enter Aadhar number"
              initialValue={aadharNum}
              onChange={(e) => setAadharNum(e.target.value)}
              required={true}
            />
            <StyledSubmitButton onClick={submitForm}>
              Find My Loan{" "}
            </StyledSubmitButton>
          </StyledBox>
        </div>
        <DashBoardTable
          reportData={loanData}
          update={setRefresh}
          state={refresh}
        />
      </StyledCalculator>
    </div>
  );
};

export default DashBoard;
