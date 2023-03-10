// import latest version of cloudinary as cloudinary
import { v2 as cloudinary } from "cloudinary";

// configure cloudinary using env variables
cloudinary.config(
    {
        CLOUD_NAME: process.env.CLOUDINARY_CLOUD_NAME,
        API_KEY: process.env.CLOUDINARY_API_KEY,
        API_SECRET: process.env.CLOUDINARY_API_SECRET
    }
);

// export cloudinary after configuration
export default cloudinary;