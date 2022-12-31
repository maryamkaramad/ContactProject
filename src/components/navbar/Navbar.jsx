import React from "react";
import SearchContact from "../contact/SearchContact";
import { PURPLE } from "../../helpers/Color";
const Navbar = () => {
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
          <div className="col">
            <SearchContact />
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
