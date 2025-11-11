
import ProductList from "@app/js/React/components/ProductList/ProductList";
import ProductCreateForm from "@app/js/React/components/ProductCreateForm/ProductCreateForm";
import ProductImageUploader from "@app/js/React/components/ProductImageUploader/ProductImageUploader";
import { useEffect, useState, useRef } from "react";
import { ProductModel, ProductImageUploaderRef } from "@app/js/app.types";
import productListApi from "@app/js/services/api/productListApi";

export default function Products() {

    const [productList, setProductList] = useState<ProductModel[] | "error" | undefined>(undefined);
    const [selectedProduct, setSelectedProduct] = useState<ProductModel | null>(null);
    const uploaderRef = useRef<ProductImageUploaderRef>(null);

    useEffect(() => {

        listApi();

    }, []);

    const listApi = async () => {
        const resp = await productListApi(10);
        if ("error" in resp) return setProductList("error");
        setProductList(resp.rows);
    };

    const createProductHandler = () => {
        listApi();
    }

    const deleteProductHandler = () => {
        listApi();
    }

    const handleProductSelect = (product: ProductModel) => {
        setSelectedProduct(product);
    }

    const handleUploadSuccess = () => {
        console.log("Upload realizado com sucesso!");
        listApi();
    }

    return (
        <div className="row g-4">
            <ProductCreateForm onCreate={createProductHandler} />
            <ProductList products={productList} onDelete={deleteProductHandler} />

            {Array.isArray(productList) && productList.length > 0 && (
                <div className="col-12 col-lg-6">
                    <div className="card border-0 shadow-sm rounded-4 mb-3">
                        <div className="card-body">
                            <h5 className="card-title mb-3">Selecione um Produto para Upload</h5>
                            <select
                                className="form-select mb-3"
                                onChange={(e) => {
                                    const product = productList.find(p => p.id === Number(e.target.value));
                                    if (product) handleProductSelect(product);
                                }}
                                defaultValue=""
                            >
                                <option value="" disabled>Escolha um produto...</option>
                                {productList.map(product => (
                                    <option key={product.id} value={product.id}>
                                        {product.name} - R$ {(product.price_times_thousand / 1000).toFixed(2)}
                                    </option>
                                ))}
                            </select>

                            <div className="d-flex gap-2">
                                <button
                                    className="btn btn-success btn-sm"
                                    onClick={() => uploaderRef.current?.enabled()}
                                >
                                    Habilitar Upload
                                </button>
                                <button
                                    className="btn btn-warning btn-sm"
                                    onClick={() => uploaderRef.current?.disabled()}
                                >
                                    Desabilitar Upload
                                </button>
                            </div>
                        </div>
                    </div>

                    {selectedProduct && (
                        <ProductImageUploader
                            productModel={selectedProduct}
                            ref={uploaderRef}
                            onUploadSuccess={handleUploadSuccess}
                        />
                    )}
                </div>
            )}
        </div>
    );
}
