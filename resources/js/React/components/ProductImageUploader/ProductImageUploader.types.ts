import { ProductModel } from "@app/js/app.types";

export type ProductImageUploaderProps = {
    productModel: ProductModel;
    onUploadSuccess?: () => void;
};

export type ProductImageUploaderRef = {
    enabled: () => void;
    disabled: () => void;
};
