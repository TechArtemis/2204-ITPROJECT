import cloudinary from "@/shared/cloudinary";

const { uploader } = cloudinary;

export async function uploadFile(path: string) {
    try {
        const response = await uploader.upload(
            path,
            {
                // eslint-disable-next-line camelcase
                unique_filename: true
            }
        );

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