"use client";
import React, { useState } from "react";
import { InputWithButton } from "./InputWithButton";
import OutputComponent from "./OutputComponent";

export default function MainComponent() {
  const [result, setResult] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  return (
    <div
      className="flex flex-col min-h-screen items-center"
      id="main-container"
    >
      {/* Hero / Input section */}

      <div className="flex flex-col w-full max-w-3xl gap-6 h-64 justify-center items-center text-center">
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold leading-snug">
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
