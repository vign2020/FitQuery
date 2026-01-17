import { Index, RecordMetadata } from "@pinecone-database/pinecone";
import {
  namespace_five,
  namespace_four,
  namespace_misc,
  namespace_three,
  namespace_two,
} from "../Models/PineCone";

export const namespaceMap: Record<string, Index<RecordMetadata>> = {
  namespace_two: namespace_two,
  namespace_three: namespace_three,
  namespace_four: namespace_four,
  namespace_five: namespace_five,
  namespace_misc: namespace_misc,
};
