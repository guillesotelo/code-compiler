import React, { useEffect, useState } from "react";

import Editor from "@monaco-editor/react";

const CodeEditorWindow = ({ onChange, language, code, theme }) => {
  const [value, setValue] = useState(code || "");

  useEffect(()=> {
    setValue(code)
  }, [code])

  const handleEditorChange = (value) => {
    setValue(value);
    onChange("code", value);
  };

  return (
    <Editor
      height="92vh"
      width={`100%`}
      language={language || "javascript"}
      value={value}
      theme={theme}
      defaultValue="// Write your code here"
      onChange={handleEditorChange}
    />
  );
};
export default CodeEditorWindow;
