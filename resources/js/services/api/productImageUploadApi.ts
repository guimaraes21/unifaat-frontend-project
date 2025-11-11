import { baseAxios } from "../axiosApi";
import catchError from "../catchError";

export default async function productImageUploadApi(productId: number, file: File) {
    try {
        const formData = new FormData();
        formData.append('image', file);

        const { data } = await baseAxios.post<{ image: string }>(
            `api/products/${productId}/image`,
            formData,
            {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            }
        );
        return data;
    } catch (error) {
        return catchError(error);
    }
}
