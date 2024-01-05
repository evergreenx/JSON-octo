"use client";

import * as React from "react";
import { Dialog } from "@radix-ui/react-dialog";

import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import {
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { toast } from "@/components/ui/use-toast";
import { useRef } from "react";

export function LoadData({ setJsonx } : {

    setJsonx: React.Dispatch<React.SetStateAction<string>>

}) {
  const [open, setIsOpen] = React.useState(false);
  const [showDeleteDialog, setShowDeleteDialog] = React.useState(false);

  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = async (e:React.ChangeEvent<HTMLInputElement>) => {

    //ts-ignore
    const file =  e.target.files &&  e.target.files[0];
    if (file) {
      try {
        const fileContent = await file.text();
        const parsedJSON = fileContent;
        setJsonx(parsedJSON);

        setIsOpen(false);

        toast({
          title: ` ${file.name.slice(0 ,15)} loaded`,
        });
      } catch (error) {
        toast({
          title: "Error parsing JSON file:",
        });
      }
    }
  };

  const handleButtonClick = () => {
    // ts-ignore

    if(fileInputRef.current){
        fileInputRef.current.click();

    }
  };

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 bg-secondary text-secondary-foreground shadow-sm hover:bg-secondary/80 h-9 px-4 py-2"
            type="button"
            aria-haspopup="dialog"
            aria-expanded="false"
            aria-controls="radix-:r3v:"
            data-state="closed"
          >
            Load Data
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuItem onSelect={() => setIsOpen(true)}>
            Upload file
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem
            onSelect={() => setShowDeleteDialog(true)}
            className="text-red-600"
          >
            Load from URL
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      <Dialog open={open} onOpenChange={setIsOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Upload </DialogTitle>
            <DialogDescription></DialogDescription>
          </DialogHeader>
          <div className="py-6">
            <div>
              <label htmlFor="fileInput">
                <Button onClick={handleButtonClick}>Upload JSON</Button>
              </label>
              <input
                ref={fileInputRef}
                id="fileInput"
                type="file"
                accept=".json"
                style={{ display: "none" }}
                onChange={handleFileChange}
              />

              {/* Rest of your code */}
            </div>
          </div>
          <DialogFooter>
            <Button variant="secondary" onClick={() => setIsOpen(false)}>
              Close
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      <AlertDialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This preset will no longer be
              accessible by you or others you&apos;ve shared it with.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <Button
              variant="destructive"
              onClick={() => {
                setShowDeleteDialog(false);
                toast({
                  description: "This preset has been deleted.",
                });
              }}
            >
              Delete
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
