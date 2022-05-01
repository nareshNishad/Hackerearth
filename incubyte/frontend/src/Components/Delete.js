import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

function Delete() {
  const [success, setSuccess] = useState(false);
  const parms = useParams();
  const apiUrl = `${process.env.REACT_APP_URL}/api/${parms.id}`;

  useEffect(() => {
    axios
      .delete(`${apiUrl}`)
      .then((res) => setSuccess(true))
      .catch((err) => setSuccess(false));
  }, [apiUrl]);
  return (
    <section class="mt-3">
      {success ? (
        <p class="text-center lead">User deleted</p>
      ) : (
        <p class="text-center text-danger">User deletion failed: Try again</p>
      )}
      <Link to="/" class="d-block text-center">
        Go back
      </Link>
    </section>
  );
}

export default Delete;
