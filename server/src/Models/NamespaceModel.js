/** @format */

import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

const vectorSchema = new mongoose.Schema({
  namespace_name: { type: String, required: true },
  keywords: { type: String, required: true },
  values: { type: [Number], default: [] },
});

const NamespaceModel = mongoose.model("NamespaceModel", vectorSchema);
export default NamespaceModel;
