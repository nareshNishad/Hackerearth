import React, { useState, useEffect } from "react";
import axios from "axios";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import { useStateValue } from "../../stateProvider";
import Typography from "@material-ui/core/Typography";
import { Button, Grid, TextField } from "@material-ui/core";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 345,
    minWidth: 150,
  },
  media: {
    height: 0,
    paddingTop: "56.25%", // 16:9
  },
  button: {
    marginLeft: "1em",
    marginRight: "1em",
  },
  collections: {
    paddingLeft: "2em",
    paddingTop: "4em",
  },
}));

function Home({ history }) {
  const [apiData, setApiData] = useState([]);
  const [inputBox, setInputBox] = useState("");
  const [{}, dispatch] = useStateValue();
  const [userCategory, setUserCategory] = useState("");
  const classes = useStyles();

  const handleBuyNow = (recipe) => {
    dispatch({
      type: "ADD_ITEM",
      item: recipe,
    });
    history.push(`/buy/${recipe.id}`);
  };

  useEffect(() => {
    (async function getData() {
      axios
        .get(`http://starlord.hackerearth.com/recipe`)
        .then((res) => setApiData([...res.data]))
        .catch((err) => console.log(err));
    })();
  }, []);

  return (
    <div>
      <div>
        <Grid container spacing={2}>
          <Grid item xs={12} md={6}>
            <TextField
              id="outlined-basic"
              label="Search recipe by name"
              value={inputBox}
              fullWidth
              onChange={(e) => setInputBox(e.target.value)}
              variant="outlined"
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <FormControl fullWidth variant="outlined">
              <InputLabel id="demo-simple-select-outlined-label">
                category
              </InputLabel>
              <Select
                labelId="demo-simple-select-outlined-label"
                id="demo-simple-select-outlined"
                value={userCategory}
                onChange={(e) => setUserCategory(e.target.value)}
                label="category"
              >
                <MenuItem value="">
                  <em>All</em>
                </MenuItem>
                <MenuItem value="mains">Mains</MenuItem>
                <MenuItem value="appetizer">Appetizer</MenuItem>
                <MenuItem value="dessert">Dessert</MenuItem>
                <MenuItem value="clone">Clone</MenuItem>
                <MenuItem value="weird">Weird</MenuItem>
              </Select>
            </FormControl>
          </Grid>
        </Grid>
      </div>
      <Grid container spacing={2} className={classes.collections}>
        {apiData
          .filter(
            (recipeObject) =>
              recipeObject.name.toLowerCase().includes(inputBox) &&
              recipeObject.category.includes(userCategory)
          )
          .map((recipe) => (
            <Grid key={recipe.id} item xs={12} sm={4} md={3} ls={3}>
              <Card className={classes.root}>
                <CardHeader title={recipe.name} subheader={recipe.category} />
                <CardMedia
                  className={classes.media}
                  image={recipe.image}
                  title={recipe.label}
                />
                <CardContent>
                  <Typography
                    variant="body2"
                    color="textSecondary"
                    component="p"
                  >
                    {recipe.description}
                  </Typography>
                </CardContent>
                <CardActions disableSpacing>
                  <h3> price:{recipe.price} USD</h3>

                  <Button
                    variant="contained"
                    color="secondary"
                    className={classes.button}
                    onClick={(e) => handleBuyNow(recipe)}
                  >
                    Buy Now
                  </Button>
                </CardActions>
              </Card>
            </Grid>
          ))}
      </Grid>
    </div>
  );
}

export default Home;
