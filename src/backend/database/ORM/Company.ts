// Third-party imports
import { model, models, Schema, Types } from "mongoose";

const companySchema = new Schema(
    {
        companyID: String || Types.ObjectId,
        Image: String,
        CompanyName: String,
        CompanyAddress: String
    }
);

// makes the model for mongoose collections
export const Model = models.CompanySchema || model("CompanySchema", companySchema);