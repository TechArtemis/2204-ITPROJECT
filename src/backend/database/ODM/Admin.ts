// Third-party imports
import { model, models, Schema, Types } from "mongoose";
/*
    AdminID
    AdminEmail
    AdminPassword
    use verification code
    name: Admin
*/
const adminSchema = new Schema(
    {
        id: String || Types.ObjectId,
        email: {
            type: String,
            required: true
        },
        password: String,
        name: "Admin"
    }
);



// makes the model for mongoose collections
export const Model = models.adminSchema || model("AdminSchema", adminSchema);