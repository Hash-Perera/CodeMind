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
import FindReplaceIcon from "@mui/icons-material/FindReplace";
import { BarChart } from "@mui/x-charts/BarChart";

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
  const scrollToGenerate = () => {
    const targetElement = document.getElementById("generate");
    if (targetElement) {
      targetElement.scrollIntoView({
        behavior: "auto", // You can change this to "smooth" for smooth scrolling
      });
    }
  };

  const [textareaValue, setTextareaValue] = useState("");
  const [calculatedValues, setCalculatedValues] = useState([]);
  const [isTrue, setIsTrue] = useState(false);
  const [codeLines, setcodeLines] = useState([]);
  const [lineValues, serlineValues] = useState([]);

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

    axios
      .post("http://localhost:5000/analyze", returnValues)
      .then(async (response) => {
        await setCalculatedValues(response.data);
        setcodeLines(calculatedValues["lines"]);
        serlineValues(calculatedValues["result"]);
        setIsTrue(true);
      })
      .catch((error) => {
        console.error("Error sending data:", error);
      });

    scrollToGenerate();
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
              <p>Mesure the Cognitive complexity of your Java code</p>
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
            <div className="col">
              <div className="row align-items-center">
                <h3 className="mt-3 text-center">Insert your Java code Here</h3>
              </div>

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
                  className="me-3"
                  color="secondary"
                >
                  Clear
                </Button>

                <Button
                  onClick={handleGetStarted}
                  variant="contained"
                  endIcon={<SendIcon />}
                  className="me-3"
                >
                  Analyze
                </Button>
                <Button
                  variant="contained"
                  endIcon={<FindReplaceIcon />}
                  color="success"
                >
                  Optimize
                </Button>
              </div>
            </div>

            {/* {isTrue && (
              <div className="col-lg-6">
                <h3>Output</h3>
                {calculatedValues["lines"].map((line, i) => (
                  <div key={i}>
                    <h6>{line}</h6>
                    <h6 style={{ color: "blue" }}>
                      {calculatedValues["result"][i]}
                    </h6>
                  </div>
                ))}
              </div>
            )} */}
          </div>
        </div>
      </div>

      {/*===============================================================================*/}
      <div id="generate" className="" style={{ height: "100vh" }}>
        <div className="container">
          <div className="row align-items-center">
            <h3 className="mt-3 text-center">Summary</h3>
          </div>
          <div className="row mt-5">
            <div className="col-4">
              <h6>Total Cognitive value :</h6>
            </div>
            <div className="col-4 ">100</div>
          </div>
          <div className="row">
            <div className="col-4">
              <h6>Total Maintainability Index value :</h6>
            </div>
            <div className="col-4">50</div>
          </div>
          <div className="row">
            <div className="col-4">
              <h6>Total Cyclomatic Index value :</h6>
            </div>
            <div className="col-4">90</div>
          </div>
        </div>
      </div>

      {/*===============================================================================*/}
      <div className="">
        <BarChart
          xAxis={[
            {
              scaleType: "band",
              data: [
                "group A",
                "group B",
                "group C",
                "group D",
                "group E",
                "group F",
                "group G",
                "group H",
                "group I",
              ],
            },
          ]}
          series={[{ data: [4, 3, 5, 4, 3, 5, 4, 3, 5] }]}
          width={1400}
          height={600}
        />
      </div>

      <div className="">
        <div className="row align-items-center">
          <h3 className="mt-3 text-center">Chat GPT</h3>
        </div>
      </div>
    </>
  );
};

export default Welcome;
