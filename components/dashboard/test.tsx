"use client";
import { useState } from "react";
import { Moon, Sun } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function ButtonRotationTest() {
  const [isDark, setIsDark] = useState(false);
  
  return (
    <div className="p-8">
      <Button 
        onClick={() => setIsDark(!isDark)}
        className="mb-8 px-4 py-2 bg-blue-500 text-white rounded"
      >
        Toggle Dark Mode
      </Button>

      <div className={`relative p-4 rounded-lg ${isDark ? 'dark' : ''}`}>
        <Button 
          className="inline-flex items-center justify-center w-10 h-10 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800"
          title={isDark ? "Switch to light mode" : "Switch to dark mode"}
        >
          <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0 duration-1000" />
          <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100 duration-1000" />
        </Button>
      </div>
      
      <p className="mt-4">{isDark.toString()}</p>
    </div>
  );
}