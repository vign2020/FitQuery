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
    } catch (e: unknown) {
      let description = "Something went wrong. Please try again.";

      if (axios.isAxiosError(e)) {
        if (e.status && e.status >= 400 && e.status < 500) {
          description = "A client-side exception has occurred";
        } else if (e.status && e.status >= 500) {
          description = "A server-side exception has occurred";
        }
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
