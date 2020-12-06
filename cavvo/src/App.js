import "./App.modules.css";
import Card from "./cards";
import { useState, useEffect } from "react";
import axios from "axios";
import Avatar from "react-avatar";

function App() {
  const [apiData, setApiData] = useState([]);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState({ preview: "", raw: "" });
  const [finalArray, setFinalArray] = useState([]);
  const [submitClick, setSubmitClick] = useState(false);

  // logo adding
  const handleChange = (e) => {
    if (e.target.files.length) {
      setImage({
        preview: URL.createObjectURL(e.target.files[0]),
        raw: e.target.files[0],
      });
    }
  };
  // function to add selected card to new array
  const handleArray = (e, user) => {
    let temp = [...finalArray];
    const index = temp.indexOf(user);
    if (index > -1) {
      temp.splice(index, 1);
      setFinalArray([...temp]);
    } else {
      temp.push(user);
      setFinalArray([...temp]);
    }
  };

  const handleSubmit = (e) => {
    setSubmitClick(true);
  };
  // Reset data to initials
  const clearData = () => {
    setSubmitClick(false);
    setName("");
    setDescription("");
    setFinalArray([]);
    setImage({ preview: "", raw: "" });
  };
  // sort for increasing by name
  const handleAscending = () => {
    let temp = [...apiData];
    temp.sort((a, b) => (a.name < b.name ? -1 : a.name > b.name ? 1 : 0));
    setApiData([...temp]);
  };
  // sort for decreasing by name
  const handleDescending = () => {
    let temp = [...apiData];
    temp.sort((a, b) => (a.name > b.name ? -1 : a.name < b.name ? 1 : 0));
    setApiData([...temp]);
  };

  useEffect(() => {
    axios
      .get(
        `https://s3-ap-southeast-1.amazonaws.com/he-public-data/users49b8675.json`
      )
      .then((success) => setApiData(success.data))
      .catch((err) => alert(err));
    clearData();
  }, []);

  return (
    <div className="App">
      <h3>Create Group</h3>
      <div className="App_upper_body">
        <div className="App_group_avatar">
          <Avatar name={name} src={image.preview} />
          <label htmlFor="upload-button">
            <h5>Upload group photo</h5>
          </label>
          <input
            type="file"
            id="upload-button"
            style={{ display: "none" }}
            onChange={handleChange}
          />
        </div>
        <div className="App_upper_body_field">
          <div>
            <span>Name</span>
            <input
              type="text"
              placeholder="group name"
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div>
            <span>Description</span>
            <input
              type="text"
              placeholder="group description"
              onClick={(e) => setDescription(e.target.value)}
            />
          </div>
        </div>
      </div>
      <div className="App_sorting">
        <h4>
          Sort name :
          <span>
            <button onClick={(e) => handleAscending()}>ascending</button>
          </span>
          <span>
            <button onClick={(e) => handleDescending()}>descending</button>
          </span>
        </h4>
      </div>

      <div className="App_body">
        {apiData.map((user) => (
          <div key={user.id} onClick={(e) => handleArray(e, user)}>
            <Card
              info={user}
              clicked={finalArray.indexOf(user) > -1 ? true : false}
            />
          </div>
        ))}
      </div>
      <div className="App_button">
        <button className="App_button_update" onClick={handleSubmit}>
          update
        </button>
        <button className="App_button_remove" onClick={clearData}>
          Reset
        </button>
      </div>
      {submitClick && (
        <div>
          <h4>
            Group Name :<span>{name}</span>
          </h4>
          <h4>
            Group Description :<span>{description}</span>
          </h4>
          <h4>
            Group Image :<span>{image.raw.name}</span>
          </h4>
          <h4>
            User Selected :{" "}
            <span>
              {finalArray.map((selected) => (
                <span>{selected.name},</span>
              ))}
            </span>
          </h4>
        </div>
      )}
    </div>
  );
}

export default App;
