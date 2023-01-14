import React from "react";
import SearchContact from "../Contacts/SearchContact";
import { PURPLE } from "../../helpers/Color";
import { useLocation } from "react-router-dom";
const Navbar = ({ search, query }) => {
  const location = useLocation()
  return (
    <nav className="navbar navbar-dark navbar-expand-sm shadow-lg">
      <div className="container">
        <div className="row w-100">
          <div className="col">
            <div>
              <i className="fas fa-id-badge fa-1x" style={{ color: PURPLE }}></i>
              {""}  وب اپلیکیشن مدیریت {""}
              <span style={{ color: PURPLE }}> مخاطبین</span>
            </div>

          </div>
          {location.pathname === "/contacts" ? (
            <div className="col">
              <SearchContact query={query} search={search} />
            </div>
          ) : null}

        </div>
      </div>
    </nav>
  );
};

export default Navbar;
