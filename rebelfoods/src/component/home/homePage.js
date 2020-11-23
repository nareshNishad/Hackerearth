import React, { useState, useEffect } from "react";
import axios from "axios";
import { Grid, TextField } from "@material-ui/core";
import Card from "../card/card";
import Pagination from "@material-ui/lab/Pagination";
import "./homePage.modules.css";

function Home() {
  const [apiData, setApiData] = useState([]);
  const [imageData, setImageData] = useState([]);
  const [inputBox, setInputBox] = useState("");
  const [page, setPage] = useState(1);
  const handleChange = (event, value) => {
    setPage(value);
  };

  const beerData = () => {
    axios
      .get(
        `https://s3-ap-southeast-1.amazonaws.com/he-public-data/beercraft5bac38c.json`
      )
      .then((res) => {
        setApiData(res.data);
      })
      .catch((err) => alert(err));
  };
  const getImageData = () => {
    axios
      .get(
        `https://s3-ap-southeast-1.amazonaws.com/he-public-data/beerimages7e0480d.json`
      )
      .then((res) => {
        setImageData(res.data);
      })
      .catch((err) => alert(err));
  };
  useEffect(() => {
    getImageData();
    beerData();
  }, []);

  return (
    <div className="homepageMain">
      <div className="homepageSearch">
        <Grid container spacing={2}>
          <Grid item xs={12} md={4}>
            <TextField
              id="outlined-basic"
              label="Search beer by name"
              value={inputBox}
              fullWidth
              onChange={(e) => setInputBox(e.target.value)}
              variant="outlined"
            />
          </Grid>
        </Grid>
      </div>
      <div className="homepage_pagination">
        <Pagination
          count={apiData.length}
          variant="outlined"
          shape="rounded"
          page={page}
          onChange={handleChange}
        />
      </div>
      <Grid container spacing={2}>
        {apiData
          .filter((beerObject) =>
            beerObject.name.toLowerCase().includes(inputBox)
          )
          .slice((page - 1) * 20, page * 20)
          .map((beer, index) => (
            <Grid key={beer.id} item xs={12}>
              <Card image={imageData?.[index % 5].image} data={beer} />
            </Grid>
          ))}
      </Grid>
    </div>
  );
}

export default Home;
