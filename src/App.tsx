import CodeMirror, { useCodeMirror } from "@uiw/react-codemirror";
import { json, jsonParseLinter } from "@codemirror/lang-json";
import { useEffect, useRef, useState } from "react";
import { lintGutter, linter } from "@codemirror/lint";
import { ThemeSelect } from "./components/themeSelect";
import { Button } from "./components/ui/button";
// import { PresetActions } from "./components/presetActions";
import { EditorView } from "@codemirror/view";
import { aura } from "@uiw/codemirror-theme-aura";

import { okaidia } from "@uiw/codemirror-theme-okaidia";

import { githubLight, githubDark } from "@uiw/codemirror-theme-github";

import { tomorrowNightBlue } from "@uiw/codemirror-theme-tomorrow-night-blue";

// import { copilot } from '@uiw/codemirror-theme-copilot';

import { copilot } from "@uiw/codemirror-theme-copilot";

import React from "react";
import { useToast } from "./components/ui/use-toast";
import { LoadData } from "./components/loadData";

export default function App() {
  const defaultJson = `
  {
    "string": "ABCDE",
    "number": 1,
    "null": null,
    "boolean": true,
    "object": {
        "string": "ABCDE",
        "number": 1,
        "null": null,
        "boolean": true
    },
    "array": [
        1,
        2,
        3,
        4,
        {
            "string": "ABCDE",
            "number": 1,
            "null": null,
            "boolean": true,
            "array": [
                1,
                2,
                3,
                4,
                {
                    "string": "ABCDE",
                    "number": 1,
                    "null": null,
                    "boolean": true
                }
            ]
        }
    ]
}
  
  `;

  const [value, setValue] = React.useState("");
  const [jsonx, setJsonx] = useState(defaultJson);

  const editor = useRef();

  const { toast } = useToast();

  const { setContainer } = useCodeMirror({
    container: editor.current,

    basicSetup: {
      lineNumbers: false,
      highlightActiveLine: false,
      highlightActiveLineGutter: false,
      foldGutter: false,
    },
    value: value,
    width: "auto",

    height: "auto",
    theme: "dark",
  });

  const handleFormatClick = () => {
    try {
      const parsedJson = JSON.parse(jsonx);
      const formatted = JSON.stringify(parsedJson, null, 2);
      setJsonx(formatted);

      toast({
        description: "JSON has been format",
      });
    } catch (error) {
      console.error("Invalid JSON:", error);
      setJsonx("Invalid JSON");
    }
  };

  const handleMinifyClick = () => {
    try {
      const parsedJson = JSON.parse(jsonx);
      const minified = JSON.stringify(parsedJson);
      setJsonx(minified);

      toast({
        description: "JSON has been minified",
      });
    } catch (error) {
      // Handle JSON parsing error
      console.error("Invalid JSON:", error);
      setJsonx("Invalid JSON");
    }
  };

  useEffect(() => {
    if (editor.current) {
      setContainer(editor.current);
    }
  }, [ setContainer, value]);

  let theme = copilot;
  switch (value) {
    case "copilot":
      theme = copilot;

      break;

    case "aura":
      theme = aura;
      break;

    case "tomorrownightblue":
      theme = tomorrowNightBlue;

      break;

    case "okaidia":
      theme = okaidia;

      break;

    case "githubdark":
      theme = githubDark;

      break;

    case "githublight":
      theme = githubLight;
      break;
    default:
      theme = copilot;

      break;
  }

  const handleExport = () => {
    const data = jsonx; // Stringify JSON with formatting
    const blob = new Blob([data], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", "formattedJSON.json");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    toast({
      description: "json downloaded ",
    });
  };

  return (
    <div className="flex-col  items-center rounded-[0.5rem] border bg-background h-screen ">
      <div className="flex flex-col item lg:flex-row p-8">
        <h2 className="text-2xl font-extrabold">JSONFORMATTERX</h2>

        <div className="ml-auto mb-7 flex flex-wrap items-center  w-full  lg:space-y-0 lg:space-x-2 sm:justify-end lg:mt-0 mt-[20px]">
          <ThemeSelect value={value} setValue={setValue} />

          <Button
            className="inline-flex items-center lg:mt-0  justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 bg-secondary text-secondary-foreground shadow-sm hover:bg-secondary/80 h-9 px-4 py-2"
            type="button"
            aria-haspopup="dialog"
            aria-expanded="false"
            aria-controls="radix-:r3s:"
            data-state="closed"
            onClick={() => {
              handleMinifyClick();
            }}
          >
            Minify
          </Button>
          <div className=" space-x-2 md:flex ">
            <LoadData setJsonx={setJsonx} />
            <Button
              className="inline-flex lg:mt-0 mt-[10px] items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 bg-secondary text-secondary-foreground shadow-sm hover:bg-secondary/80 h-9 px-4 py-2"
              type="button"
              aria-haspopup="dialog"
              aria-expanded="false"
              aria-controls="radix-:r42:"
              data-state="closed"
              onClick={handleFormatClick}
            >
              Format
            </Button>

            <Button
              onClick={handleExport}
              className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 bg-secondary text-secondary-foreground shadow-sm hover:bg-secondary/80 h-9 px-4 py-2"
              type="button"
              aria-haspopup="dialog"
              aria-expanded="false"
              aria-controls="radix-:r42:"
              data-state="closed"
            >
              Download
            </Button>
          </div>
          {/* <Button
            className="inline-flex lg:mt-0 mt-[10px] items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 bg-secondary text-secondary-foreground shadow-sm hover:bg-secondary/80 h-9 px-4 py-2"
            type="button"
            id="radix-:r43:"
            aria-haspopup="menu"
            aria-expanded="false"
            data-state="closed"
          >
            <PresetActions />
          </Button> */}
        </div>
      </div>

      <CodeMirror
        value={jsonx}
        // height="200px"

        style={{
          overflow: "hidden",
          fontSize: "18px",
        }}
        // className="h-screen"
        onChange={(val) => setJsonx(val)}
        autoCapitalize="false"
        spellCheck="false"
        autoFocus={true}
        theme={theme}
        extensions={[
          json(),
          lintGutter(),
          EditorView.lineWrapping,
          linter(jsonParseLinter()),
        ]}
      />


      <p className="text-sm text-center py-5">

created with ❤️ by <a href="https://github.com/evergreenx">ido evergreen</a>

      </p>
    </div>
  );
}
