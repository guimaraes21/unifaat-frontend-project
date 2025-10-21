import { ListApi, ProductModel } from "@app/js/app.types";
import { baseAxios } from "../axiosApi";
import catchError from "../catchError";

type ProductListApiParams = {
    limit?: number;
    page?: number;
    orderBy?: string;
    query?: string;
}

export default async function productListApi(params: ProductListApiParams = {}) {

    const {
        limit = 15,
        page = 1,
        orderBy = "id,desc",
        query: searchQuery = ""
    } = params;

    const offset = (page - 1) * limit;

    const queryParams = new URLSearchParams({
        "orderBy": orderBy,
        "limit": limit.toString(),
        "offset": offset.toString()
    });

    if (searchQuery) {
        queryParams.append("query", searchQuery);
    }

    try {
        const { data } = await baseAxios.get<ListApi<ProductModel>>(`api/products?${queryParams}`);

        return data;
    } catch (error) {
        return catchError(error);
    }
}
