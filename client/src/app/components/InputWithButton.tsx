"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { I_setResultType } from "../../Types/types";
import { toast } from "sonner";
import { UserInput } from "@/lib/zodUtils";
import { getQueryAnswer } from "@/lib/axios";
import axios from "axios";

export function InputWithButton({
  setResult,
  setLoading,
  loading,
}: I_setResultType) {
  const [inputData, setinputData] = useState<string>("");

  const handleSubmit: any = async () => {
    console.log("inside of handle Submit safe");
    const validation = UserInput.safeParse({ query: inputData });

    if (!validation.success) {
      toast("Error!", {
        description: validation.error.issues[0].message,
      });

      return;
    }
    try {
      setLoading(true);
      console.log("Inside of handle Submit");
      const result: any = await getQueryAnswer(inputData);

      setResult(result.data.geminiAnswer);
    } catch (e: unknown) {
      let description = "Something went wrong. Please try again.";

      if (axios.isAxiosError(e)) {
        description =
          e.response?.data?.message ||
          e.message ||
          "Network error. Please check your connection.";
      } else if (e instanceof Error) {
        description = e.message;
      }

      toast("Error!", {
        description: description,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex w-full max-w-2xl items-center gap-2 mb-15">
      <Input
        type="text"
        placeholder="How can i improve my VO2 max?"
        value={inputData}
        onChange={(e) => setinputData(e.target.value)}
      />
      <Button
        type="button"
        variant="outline"
        onClick={handleSubmit}
        className="text-black whitespace-nowrap cursor-pointer w-26"
        disabled={loading}
      >
        Search
      </Button>
    </div>
  );
}
