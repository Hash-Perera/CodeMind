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
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Welcome = () => {
  const notify = () =>
    toast.error("Enter Valid Java Code !", {
      position: toast.POSITION.TOP_CENTER,
    });

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

  const scrollToOptimize = () => {
    const targetElement = document.getElementById("optimize");
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
  const [codeNames, setCodeNames] = useState([]);
  const [chatGptCode, setChatGptCode] = useState("");
  const [isChatGpTrue, setChatGptTrue] = useState(false);
  const [totalCogValue, setTotalCogValue] = useState(false);

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
      .post("http://localhost:5000/analyzenew", returnValues)
      .then(async (response) => {
        console.log(response.data);
        if (response.data !== false) {
          await setCalculatedValues(response.data);
          setcodeLines(response.data.lines);
          serlineValues(response.data.complexity);
          console.log(codeLines);
          console.log(lineValues);

          var codeNames = [];
          var totalCogValue = 0;
          response.data.complexity.map((line, index) => {
            // Use the index here as needed
            codeNames.push(`Line ${index + 1}`);
            totalCogValue += line;
          });
          setCodeNames(codeNames);
          setTotalCogValue(totalCogValue);
          setIsTrue(true);
          scrollToGenerate();
        } else {
          console.log("Fucking error");
          notify();
        }
      })
      .catch((error) => {
        console.error("Error sending data:", error);
      });
  };

  const optimizeCode = () => {
    var returnValues = {
      code: textareaValue,
    };

    axios
      .post("http://localhost:5000/optimize", returnValues)
      .then((response) => {
        console.log("Optimized Values");
        console.log(response.data);
        console.log(response.data.code);
        setChatGptCode(response.data.code);
        setChatGptTrue(true);
      })
      .finally(() => {
        scrollToOptimize();
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
                  onClick={optimizeCode}
                  variant="contained"
                  endIcon={<FindReplaceIcon />}
                  color="success"
                >
                  Optimize
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/*===============================================================================*/}
      <div id="generate" className="container-fluid">
        <div className="container">
          <div className="row align-items-center">
            <h3 className="mt-3 text-center">Summary</h3>
          </div>
          <div className="row mt-5">
            <div className="col-4">
              <h6>Total Cognitive value : </h6>
            </div>
            <div className="col-4 ">{totalCogValue}</div>
          </div>
        </div>

        <div style={{ height: "50px" }}></div>
        <div className="container">
          <table className="table table-striped">
            <thead className="thead-dark mb-5">
              <tr>
                <th className="col-10">Lines</th>
                <th className="col-2">Complexity Value</th>
              </tr>
            </thead>

            {isTrue && (
              <tbody>
                {calculatedValues["lines"].map((line, i) => (
                  <tr key={i}>
                    <td className="col-10">{line}</td>
                    <td style={{ color: "blue" }} className="col-2">
                      {calculatedValues["complexity"][i]}
                    </td>
                  </tr>
                ))}
              </tbody>
            )}
          </table>
        </div>
      </div>
      {/*===============================================================================*/}

      <div className="container">
        {isTrue && (
          <div className="">
            <BarChart
              xAxis={[
                {
                  scaleType: "band",
                  data: codeNames,
                },
              ]}
              series={[{ data: lineValues }]}
              width={1400}
              height={600}
            />
          </div>
        )}
      </div>

      <div className="container" id="optimize" style={{ height: "100vh" }}>
        <div className="row align-items-center">
          <h3 className="mt-3 text-center">Optimized Code</h3>

          {isChatGpTrue && (
            <textarea
              className="form-control"
              id="exampleFormControlTextarea1"
              rows="24"
              value={chatGptCode} // Bind the value of the textarea to the state
            ></textarea>
          )}
        </div>
      </div>
      <ToastContainer />
    </>
  );
};

export default Welcome;
