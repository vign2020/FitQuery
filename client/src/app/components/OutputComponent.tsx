import React from "react";
import { I_Results } from "../../Types/types";
import { ReactTyped } from "react-typed";

export default function OutputComponent({ result, loading }: I_Results) {
  return (
    <div className="w-full max-w-3xl px-4 text-center">
      {loading ? (
        <p className="text-lg font-medium">LOADING PLEASE WAIT....</p>
      ) : (
        <p>
          <ReactTyped
            strings={[(result as string) || ""]}
            typeSpeed={20}
            showCursor={false}
          />
        </p>
      )}
    </div>
  );
}
