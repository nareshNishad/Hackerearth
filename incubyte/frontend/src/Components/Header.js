import { Link } from "react-router-dom";

function Header() {
  return (
    <div class="d-flex flex-column h-100">
      <nav class="navbar navbar-expand-md navbar-light bg-light">
        <div class="container-fluid">
          <Link class="navbar-brand" to="/">
            CRM
          </Link>
        </div>
      </nav>
    </div>
  );
}

export default Header;
