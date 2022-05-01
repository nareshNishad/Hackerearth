import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

function Main() {
  const [wordList, setWordList] = useState([]);
  const [searchWord, setSearchWord] = useState("");

  const apiUrl = `${process.env.REACT_APP_URL}/api/`;

  function handleSearch() {
    let searchUrl;
    if (searchWord) {
      searchUrl = `${process.env.REACT_APP_URL}/api/${searchWord}`;
      searchWordById(searchUrl);
    } else {
      getList();
    }
  }
  function searchWordById(searchUrl) {
    axios
      .get(`${searchUrl}`)
      .then((res) => {
        let temp = [];
        temp.push(res.data);
        setWordList([...temp]);
      })
      .catch((err) => console.warn(err));
  }
  function getList() {
    axios
      .get(`${apiUrl}`)
      .then((res) => setWordList([...res.data]))
      .catch((err) => console.warn(err));
  }
  useEffect(() => {
    getList();
  }, [apiUrl]);
  return (
    <section class="container-fluid customer-table mt-3">
      <div class="table-header d-flex justify-content-between align-items-center">
        <p class="lead">Words</p>
        <div class="d-flex flex-row" id="navbarSupportedContent">
          <input
            class="form-control me-2"
            type="search"
            placeholder="Search by id"
            aria-label="Search"
            name="q"
            value={searchWord}
            onChange={(e) => setSearchWord(e.target.value)}
          />
          <button class="btn btn-outline-primary" onClick={handleSearch}>
            Search
          </button>
        </div>
        <Link to="/add" class="btn btn-outline-primary">
          Add new
        </Link>
      </div>
      <div class="table-responsive">
        <table class="table">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Name</th>
              <th scope="col">Action</th>
            </tr>
          </thead>
          <tbody>
            {wordList.map((words) => (
              <tr key={words.id}>
                <th scope="row">{words.id}</th>
                <td>{words.word}</td>
                <td class="d-flex">
                  <Link
                    to={`/update/${words.id}`}
                    state={{ data: words.word }}
                    class="btn btn-outline-info me-2"
                  >
                    Edit
                  </Link>
                  <Link
                    to={`/remove/${words.id}`}
                    class="btn btn-outline-danger me-2"
                  >
                    Delete
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}

export default Main;
