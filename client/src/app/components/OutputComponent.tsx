import React from "react";
import { I_Results } from "../../Types/types";
import { ReactTyped } from "react-typed";

export default function OutputComponent({ result, loading }: I_Results) {
  // max-h-[60vh] overflow-y-auto
  return (
    <div className="w-5/6">
      {loading ? (
        <p className="text-lg font-medium justify-center items-center text-center">
          LOADING PLEASE WAIT....
        </p>
      ) : (
        <p>
          <ReactTyped
            strings={[result ? result : ""]}
            typeSpeed={20}
            showCursor={false}
          />
        </p>
      )}
    </div>
  );
}
