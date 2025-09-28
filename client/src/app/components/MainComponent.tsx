"use client";
import React, { useState } from "react";
import { InputWithButton } from "./InputWithButton";
import OutputComponent from "./OutputComponent";
import "../../../styles/index.css";

export default function MainComponent() {
  const [result, setResult] = useState<string | undefined>(undefined);
  const [loading, setLoading] = useState<boolean>(false);

  return (
    <div
      className="flex flex-col min-h-screen items-center justify-around px-4"
      id="main-container"
    >
      {/* Hero / Input section */}
      <div className="flex flex-col justify-center items-center mb-10 w-full max-w-3xl text-center">
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold m-5 leading-snug">
          Get answers from peer-reviewed journals for your fitness queries!
        </h1>

        <InputWithButton
          setResult={setResult}
          setLoading={setLoading}
          loading={loading}
        />
      </div>

      {/* Output Section */}
      <OutputComponent result={result} loading={loading} />
    </div>
  );
}
