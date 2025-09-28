"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { I_setResultType } from "../../Types/types";
import { toast } from "sonner";
import { UserInput } from "@/lib/zodUtils";
import { getQueryAnswer } from "@/lib/axios";

export function InputWithButton({
  setResult,
  setLoading,
  loading,
}: I_setResultType) {
  const [inputData, setinputData] = useState<string>("");

  const handleSubmit = async () => {
    const validation = UserInput.safeParse({ query: inputData });

    if (!validation.success) {
      toast("Error!", {
        description: validation.error.issues[0].message,
      });

      return;
    }
    try {
      setLoading(true);

      const result = await getQueryAnswer(inputData);

      setResult(result.data.geminiAnswer);
    } catch (e) {
      toast("API Error!", {
        description:
          "There has been an error in fetching response . Please try again ! ",
      });
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex w-full max-w-2xl items-center gap-2 mb-15">
      <Input
        type="text"
        placeholder="Enter your query."
        value={inputData}
        onChange={(e) => setinputData(e.target.value)}
        className="flex-grow border-2 text-white"
      />
      <Button
        type="button"
        variant="outline"
        onClick={handleSubmit}
        className="text-black whitespace-nowrap cursor-pointer"
        disabled={loading}
      >
        Submit
      </Button>
    </div>
  );
}
