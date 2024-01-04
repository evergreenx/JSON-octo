import CodeMirror from "@uiw/react-codemirror";
import { json, jsonLanguage } from "@codemirror/lang-json";
import { okaidia } from "@uiw/codemirror-theme-okaidia";
import { useState } from "react";
import { lintGutter } from "@codemirror/lint";
import { ThemeSelect } from "./components/themeSelect";
import { Button } from "./components/ui/button";
import { PresetActions } from "./components/presetActions";

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

  const [jsonx, setJsonx] = useState(defaultJson);

  // const handleMinifyClick = () => {
  //   try {
  //     const minifiedJSON = JSON.stringify(jsonx).replace(/\s/g, "");
  //     setJsonx(minifiedJSON);
  //   } catch (error) {
  //     console.error("Error minifying JSON:", error);
  //   }
  // };

  const handleFormatClick = () => {
    try {
      const parsedJson = JSON.parse(jsonx);
      const formatted = JSON.stringify(parsedJson, null, 2);
      setJsonx(formatted);
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
    } catch (error) {
      // Handle JSON parsing error
      console.error("Invalid JSON:", error);
      setJsonx("Invalid JSON");
    }
  };

  return (
    <div className="overflow-hidden flex-col flex items-centerrounded-[0.5rem] border bg-background shadow-md md:shadow-xl py-20">
      <div className="flex p-3">
        <h2 className="text-2xl font-extrabold">JSONFORMATTER</h2>

        <div className="ml-auto mb-7 flex w-full space-x-2 sm:justify-end">
          <ThemeSelect />
          <Button
            className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 bg-secondary text-secondary-foreground shadow-sm hover:bg-secondary/80 h-9 px-4 py-2"
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
          <div className="hidden space-x-2 md:flex">
            <Button
              className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 bg-secondary text-secondary-foreground shadow-sm hover:bg-secondary/80 h-9 px-4 py-2"
              type="button"
              aria-haspopup="dialog"
              aria-expanded="false"
              aria-controls="radix-:r3v:"
              data-state="closed"
            >
              View code
            </Button>
            <Button
              className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 bg-secondary text-secondary-foreground shadow-sm hover:bg-secondary/80 h-9 px-4 py-2"
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
              className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 bg-secondary text-secondary-foreground shadow-sm hover:bg-secondary/80 h-9 px-4 py-2"
              type="button"
              aria-haspopup="dialog"
              aria-expanded="false"
              aria-controls="radix-:r42:"
              data-state="closed"
            >
              Share
            </Button>
          </div>
          <Button
            className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 bg-secondary text-secondary-foreground shadow-sm hover:bg-secondary/80 h-9 px-4 py-2"
            type="button"
            id="radix-:r43:"
            aria-haspopup="menu"
            aria-expanded="false"
            data-state="closed"
          >
            <PresetActions />
          </Button>
        </div>
      </div>

      <CodeMirror
        value={jsonx}
        // height="200px"


        style={{
          overflow : 'hidden'
        }}

        onChange={(val) => setJsonx(val)}
        autoCapitalize="false"
        spellCheck="false"
        autoFocus={true}
        theme={"dark"}
        extensions={[json(), lintGutter()]}
        height="500px"
      />
    </div>
  );
}
