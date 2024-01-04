import CodeMirror from "@uiw/react-codemirror";
import { json } from "@codemirror/lang-json";
import { okaidia } from "@uiw/codemirror-theme-okaidia";
import { useState } from "react";
import { ThemeSelect } from "./components/themeSelect";
import { Button } from "./components/ui/button";
import { PresetActions } from "./components/presetActions";

export default function App() {
  return (
    <div className="overflow-hidden rounded-[0.5rem] border bg-background shadow-md md:shadow-xl py-20">
      <div className="ml-auto mb-7 flex w-full space-x-2 sm:justify-end">
        <ThemeSelect />

        <Button
          className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 bg-secondary text-secondary-foreground shadow-sm hover:bg-secondary/80 h-9 px-4 py-2"
          type="button"
          aria-haspopup="dialog"
          aria-expanded="false"
          aria-controls="radix-:r3s:"
          data-state="closed"
        >
          Save
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
      <CodeMirror
        value={`
  "company": "ABC Corporation",
  "location": "New York",
  "employees": [
    {
      "id": 101,
      "name": "John Doe",
      "position": "Software Engineer",
      "skills": ["JavaScript", "Python", "React"]
    },
    {
      "id": 102,
      "name": "Alice Smith",
      "position": "Data Analyst",
      "skills": ["SQL", "R", "Data Visualization"]
    },
    {
      "id": 103,
      "name": "Bob Johnson",
      "position": "Product Manager",
      "skills": ["Product Development", "Market Analysis"]
    }
  ],
  "departments": {
    "engineering": {
      "manager": "Sarah Brown",
      "teams": [
        {
          "name": "Frontend Team",
          "members": ["John Doe", "Emily Clark", "David Lee"]
        },
        {
          "name": "Backend Team",
          "members": ["Andrew Miller", "Sophia Garcia"]
        }
      ]
    },
    "marketing": {
      "manager": "Michael Wilson",
      "teams": [
        {
          "name": "Digital Marketing",
          "members": ["Alice Smith", "Jessica Taylor"]
        },
        {
          "name": "Brand Management",
          "members": ["Bob Johnson", "Olivia Anderson"]
        }
      ]
    }
  },
  "financials": {
    "revenue": 1500000,
    "expenses": 950000,
    "profits": 550000
  },
  "projects": [
    {
      "name": "Project Alpha",
      "description": "Developing a new software application",
      "status": "In Progress"
    },
    {
      "name": "Project Beta",
      "description": "Market research and analysis",
      "status": "On Hold"
    }
  ]
      `}
        // height="200px"
        theme={"dark"}
        extensions={[json()]}
        height="500px"
      />
    </div>
  );
}
