import React, { useEffect, useState } from "react";
import CodeEditorWindow from "./CodeEditorWindow";
import axios from "axios";
import { classnames } from "../utils/general";
import { languageOptions } from "../constants/languageOptions";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { defineTheme } from "../lib/defineTheme";
import useKeyPress from "../hooks/useKeyPress";
import Footer from "./Footer";
import OutputWindow from "./OutputWindow";
import CustomInput from "./CustomInput";
import OutputDetails from "./OutputDetails";
import ThemeDropdown from "./ThemeDropdown";
import LanguagesDropdown from "./LanguagesDropdown";

const javascriptDefault = `// Code example

console.log("Hello World!")`;

const Landing = () => {
  const [code, setCode] = useState(javascriptDefault);
  const [customInput, setCustomInput] = useState("");
  const [outputDetails, setOutputDetails] = useState(null);
  const [processing, setProcessing] = useState(null);
  const [theme, setTheme] = useState("cobalt");
  const [language, setLanguage] = useState(languageOptions[0]);
  const isMobile = window.innerWidth < 1024

  const enterPress = useKeyPress("Enter");
  const ctrlPress = useKeyPress("Control");

  useEffect(() => {
    const saved = localStorage.getItem('codeCompilerSave')
    if (saved) setCode(saved)
  }, [])

  const onSelectChange = (sl) => {
    setLanguage(sl);
  };

  useEffect(() => {
    if (enterPress && ctrlPress) {
      handleCompile();
    }
  }, [ctrlPress, enterPress]);

  const onChange = (action, data) => {
    switch (action) {
      case "code": {
        setCode(data);
        break;
      }
      default: {
        console.warn("Case not handled!", action, data);
      }
    }
  };

  const handleCompile = () => {
    setProcessing(true);
    const formData = {
      language_id: language.id,
      // encode source code in base64
      source_code: btoa(unescape(encodeURIComponent(code))),
      stdin: btoa(unescape(encodeURIComponent(customInput))),
    };

    const options = {
      method: "POST",
      url: process.env.REACT_APP_RAPID_API_URL,
      params: { base64_encoded: "true", fields: "*" },
      headers: {
        "content-type": "application/json",
        "Content-Type": "application/json",
        "X-RapidAPI-Host": process.env.REACT_APP_RAPID_API_HOST,
        "X-RapidAPI-Key": process.env.REACT_APP_RAPID_API_KEY,
      },
      data: formData,
    };

    axios
      .request(options)
      .then(function (response) {
        const token = response.data.token;
        checkStatus(token);
      })
      .catch((err) => {
        let error = err.response ? err.response.data : err;
        // get error status
        let status = err.response.status;
        if (status === 429) {

          showErrorToast(
            `Quota of 100 requests exceeded for the Day! Please read the blog on freeCodeCamp to learn how to setup your own RAPID API Judge0!`,
            10000
          );
        }
        setProcessing(false);
      });
  };

  const checkStatus = async (token) => {
    const options = {
      method: "GET",
      url: process.env.REACT_APP_RAPID_API_URL + "/" + token,
      params: { base64_encoded: "true", fields: "*" },
      headers: {
        "X-RapidAPI-Host": process.env.REACT_APP_RAPID_API_HOST,
        "X-RapidAPI-Key": process.env.REACT_APP_RAPID_API_KEY,
      },
    };
    try {
      let response = await axios.request(options);
      let statusId = response.data.status?.id;

      // Processed - we have a result
      if (statusId === 1 || statusId === 2) {
        // still processing
        setTimeout(() => {
          checkStatus(token);
        }, 2000);
        return;
      } else {
        setProcessing(false);
        setOutputDetails(response.data);
        // showSuccessToast(`Compiled Successfully!`);
        return;
      }
    } catch (err) {
      setProcessing(false);
      showErrorToast();
    }
  };

  function handleThemeChange(th) {
    const theme = th;

    if (["light", "vs-dark"].includes(theme.value)) {
      setTheme(theme);
    } else {
      defineTheme(theme.value).then((_) => setTheme(theme));
    }
  }
  useEffect(() => {
    defineTheme("oceanic-next").then((_) =>
      setTheme({ value: "oceanic-next", label: "Oceanic Next" })
    );
  }, []);

  const showSuccessToast = (msg) => {
    toast.success(msg || `Compiled Successfully!`, {
      position: "top-right",
      autoClose: 1000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  };
  const showErrorToast = (msg, timer) => {
    toast.error(msg || `Something went wrong! Please try again.`, {
      position: "top-right",
      autoClose: timer ? timer : 1000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  }

  const renderDesktop = () => {
    return (
      <>
        <ToastContainer
          position="top-right"
          autoClose={2000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
        />
        <div className="flex flex-row space-x-4 items-start px-4 py-4">
          <div className="flex flex-col w-full h-full justify-start items-end">
            <CodeEditorWindow
              code={code}
              onChange={onChange}
              language={language?.value}
              theme={theme.value}
            />
          </div>
          <div className="right-container flex flex-shrink-0 w-[30%] flex-col">
            <div className="dropdowns">
              <LanguagesDropdown onSelectChange={onSelectChange} />
              <ThemeDropdown handleThemeChange={handleThemeChange} theme={theme} />
            </div>
            <OutputWindow outputDetails={outputDetails} isMobile={isMobile} />
            <div className="flex flex-col items-end">
              <CustomInput
                customInput={customInput}
                setCustomInput={setCustomInput}
                isMobile={isMobile}
              />
              <div className="px-3 right-container flex justify-between flex-shrink-0 gap-2 flex-row w-full">
                <div>
                  <button
                    onClick={handleCompile}
                    disabled={!code || processing}
                    className={classnames(
                      "mt-4 z-10 rounded-md bg-[#37586c] text-white px-4 py-2 transition duration-200 flex-shrink-0",
                      !code ? "opacity-50" : ""
                    )}
                  >
                    {processing ? "Processing..." : "Compile"}
                  </button>
                  <button
                    onClick={() => localStorage.setItem('codeCompilerSave', code)}
                    disabled={!code || processing}
                    className={classnames(
                      "mt-4 mx-4 z-10 rounded-md bg-[#366b55] text-white px-4 py-2 transition duration-200 flex-shrink-0",
                      !code ? "opacity-50" : ""
                    )}
                  >
                    Save
                  </button>
                </div>
                <button
                  onClick={() => onChange('code', '')}
                  disabled={processing}
                  style={{ backgroundColor: 'transparent' }}
                  className={classnames(
                    "mt-4 z-10 rounded-md bg-[#37586c] border border-gray text-white px-4 py-2 transition duration-200 flex-shrink-0",
                    !code ? "opacity-50" : ""
                  )}
                >
                  Reset
                </button>
              </div>
            </div>
            {outputDetails && <OutputDetails outputDetails={outputDetails} />}
          </div>
        </div>
        <Footer />
      </>
    )
  }

  const renderMobile = () => {
    return (
      <>
        <div className="landing-mobile">
          <ToastContainer
            position="top-right"
            autoClose={2000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
          />
          <div className="flex flex-col h-full items-start w-screen">
            <div style={{ height: '40vh', marginBottom: '1rem' }} className={`overflow-hidden w-full`}>
              <CodeEditorWindow
                code={code}
                onChange={onChange}
                language={language?.value}
                theme={theme.value}
              />
            </div>
            <div className="right-container flex flex-shrink-0 w-screen flex-col">
              <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
                <button
                  onClick={() => localStorage.setItem('codeCompilerSave', code)}
                  disabled={!code || processing}
                  className={classnames(
                    "mx-4 mb-4  w-2/6 rounded-md bg-[#366b55] text-white px-4 py-2 transition duration-200 flex-shrink-0",
                    !code ? "opacity-50" : ""
                  )}
                >
                  Save
                </button>
                <button
                  onClick={handleCompile}
                  disabled={!code || processing}
                  className={classnames(
                    "mx-4 mb-4 w-1/2 rounded-md bg-[#37586c] text-white px-4 py-2 transition duration-200 flex-shrink-0",
                    !code ? "opacity-50" : ""
                  )}
                >
                  {processing ? "Processing..." : "Compile"}
                </button>
              </div>
              <button
                onClick={() => onChange('code', '')}
                disabled={processing}
                style={{ backgroundColor: 'transparent' }}
                className={classnames(
                  "mx-4 z-10 rounded-md border-2 border-[#37586c] text-white px-4 py-2 transition duration-200 flex-shrink-0",
                  !code ? "opacity-50" : ""
                )}
              >
                Reset
              </button>
            </div>
            <div className="right-container flex flex-shrink-0 flex-col">
              <OutputWindow outputDetails={outputDetails} isMobile={isMobile} />
              <CustomInput
                customInput={customInput}
                setCustomInput={setCustomInput}
                isMobile={isMobile}
              />
              {outputDetails && <OutputDetails outputDetails={outputDetails} isMobile={isMobile} />}
            </div>
            <div className="dropdowns" style={{ margin: '.5rem auto' }}>
              <LanguagesDropdown onSelectChange={onSelectChange} />
              <ThemeDropdown handleThemeChange={handleThemeChange} theme={theme} />
            </div>
          </div>
        </div>
        <Footer />
      </>
    )
  }

  return isMobile ? renderMobile() : renderDesktop()
}

export default Landing;
