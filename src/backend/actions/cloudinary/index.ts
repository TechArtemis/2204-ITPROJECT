import cloudinary from "@/shared/cloudinary";

const { uploader } = cloudinary;

export async function uploadFile(path: string) {
    try {
        console.log("Enter")
        console.log(path)
        const response = await uploader.upload(
            path,
            {
                // eslint-disable-next-line camelcase
                unique_filename: true
            }
        );
        console.log("Enter1")
        if (!response) {
            throw {
                code: 500,
                message: `failed to upload file with path: ${path}`
            };
        }

        return response;

    } catch (error: any) {
        throw{
            error
        };

    }
}