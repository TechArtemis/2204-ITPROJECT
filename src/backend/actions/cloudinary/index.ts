import cloudinary from "@/backend/config/cloudinary";

const { uploader } = cloudinary;

export async function uploadFile(path: string) {
    const response = await uploader.upload(path,
        {
            unique_filename: true
        }
    );
    if (!response) {
        throw {
            status: 500,
            message: `failed to upload file with path: ${ path }`
        };
    }
    return {
        filename: response.public_id
    };
}