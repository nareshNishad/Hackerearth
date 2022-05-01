import { useState } from "react";
import axios from "axios";
import { useLocation, useParams } from "react-router-dom";

function Update() {
  const location = useLocation();
  const parms = useParams();
  const data = location.state?.data;
  const [word, setWord] = useState(data);
  const [success, setSuccess] = useState(false);

  const apiUrl = `${process.env.REACT_APP_URL}/api/${parms.id}`;
  function handleSubmit(e) {
    // e.preventdefault();
    if (word) {
      axios
        .put(`${apiUrl}`, { word })
        .then((res) => {
          setSuccess(true);
        })
        .catch((err) => console.warn(err));
    }
  }
  return (
    <div class="container mt-5">
      {success ? <p class="text-center text-success">success</p> : ""}

      <div class="row mb-3">
        <label for="inputName" class="col-sm-2 col-form-label">
          Name
        </label>
        <div class="col-sm-10">
          <input
            type="text"
            class="form-control"
            id="inputName"
            name="name"
            required
            value={word}
            onChange={(e) => setWord(e.target.value)}
          />
        </div>
      </div>
      <button
        type="submit"
        class="btn btn-primary"
        disabled={word ? false : true}
        onClick={handleSubmit}
      >
        Save
      </button>
    </div>
  );
}

export default Update;
