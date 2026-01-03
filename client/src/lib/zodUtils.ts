import * as z from "zod";

export const UserInput = z.object({
  query: z
    .string()
    .trim()
    .min(10, "Query has to be more than 10 characters long!"),
});
