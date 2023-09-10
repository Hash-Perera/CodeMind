import React from "react";
import { useEffect, useState } from "react";
import backgroundImage from "../assets/images/15082511_v617batch2-bb-01-technology.jpg";
import "../styles/Welcome.css";
import axios from "axios";
import Button from "@mui/material/Button";
import SendIcon from "@mui/icons-material/Send";
import ClearIcon from "@mui/icons-material/Clear";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import Navbar from "./Navbar";

const Welcome = () => {
  const containerStyle = {
    backgroundImage: `url(${backgroundImage})`,
    backgroundSize: "cover", // Adjust as needed
    backgroundRepeat: "no-repeat", // Adjust as needed
    backgroundPosition: "center", // Adjust as needed
    minHeight: "100vh", // Ensure the container covers the full viewport height
    color: "#ffffff", // Set the text color to white or another contrasting color
    textShadow: "2px 2px 4px rgba(0, 0, 0, 0.5)", // Add a text shadow fo
  };

  const scrollToTarget = () => {
    const targetElement = document.getElementById("scrollTarget");
    if (targetElement) {
      targetElement.scrollIntoView({
        behavior: "auto", // You can change this to "smooth" for smooth scrolling
      });
    }
  };

  const [textareaValue, setTextareaValue] = useState("");

  //Update the state with text area value
  const handleTextareaChange = (event) => {
    setTextareaValue(event.target.value);
  };

  //On submit
  const handleGetStarted = () => {
    //Make sending object
    var returnValues = {
      code: textareaValue,
    };
    //Console the send code String value
    console.log(returnValues);

    axios
      .post("http://localhost:5000/code", returnValues)
      .then((response) => {
        console.log(response.data);
      })
      .catch((error) => {
        console.error("Error sending data:", error);
      });
  };

  //Clear Text Area
  const handleClearTextarea = () => {
    setTextareaValue("");
  };

  return (
    <>
      {/*Landing Welcome page*/}
      <div style={containerStyle}>
        <Navbar />
        <div className="container-fluid text-center">
          <div className="pt-5" style={{ marginTop: "6rem" }}>
            <div className="new">
              <div class="content">
                <h2>CodeMind</h2>
                <h2>CodeMind</h2>
              </div>
            </div>
            {/* <h1 style={{ fontSize: "10rem" }}>CodeMind</h1> */}

            <div className="body2">
              <p>Welcome to my codepen profile</p>
            </div>
            <div style={{ marginTop: "2rem" }}>
              <Button
                onClick={scrollToTarget}
                variant="contained"
                endIcon={<ArrowForwardIosIcon />}
                className="mt-4"
                color="secondary"
              >
                Get Start
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/*Second DIV */}
      <div id="scrollTarget" className="scroll-target">
        <div className="container">
          <div className="row">
            <div className="col-lg-6">
              <h3>Insert your Java code Here</h3>
              <textarea
                className="form-control"
                id="exampleFormControlTextarea1"
                rows="24"
                value={textareaValue} // Bind the value of the textarea to the state
                onChange={handleTextareaChange}
              ></textarea>

              <div className="mt-3">
                <Button
                  onClick={handleClearTextarea}
                  variant="contained"
                  endIcon={<ClearIcon />}
                  className="me-2"
                  color="secondary"
                >
                  Clear
                </Button>

                <Button
                  onClick={handleGetStarted}
                  variant="contained"
                  endIcon={<SendIcon />}
                >
                  Generate
                </Button>
              </div>
            </div>

            <div className="col-lg-6">
              <h3>Output</h3>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Welcome;
