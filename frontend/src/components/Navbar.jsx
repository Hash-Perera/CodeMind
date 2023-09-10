import React from "react";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import Button from "@mui/material/Button";

const Navbar = () => {
  return (
    <>
      <nav className="navbar navbar-expand-lg">
        <div className="container-fluid">
          <div>
            <a className="navbar-brand" style={{ color: "#FFFF" }}>
              CodeMind
            </a>
          </div>

          <div>
            <div className="navbar-nav">
              <a
                style={{ color: "#FFFF" }}
                className="nav-link me-4"
                aria-current="page"
                href="#"
              >
                Home
              </a>
              <a
                className="nav-link me-5"
                aria-current="page"
                href="#"
                style={{ color: "#FFFF" }}
              >
                About
              </a>
              <a>
                <Button
                  className="mt-2 me-2 nav-link"
                  variant="outlined"
                  color="secondary"
                  size="small"
                >
                  Sign in
                </Button>
              </a>
              <a style={{ color: "#FFFF" }}>
                <Button
                  className="mt-2 nav-link"
                  variant="contained"
                  color="secondary"
                  size="small"
                >
                  Log in
                </Button>
              </a>
            </div>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
