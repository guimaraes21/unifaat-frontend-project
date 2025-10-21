
import ProductList from "@app/js/React/components/ProductList/ProductList";
import ProductCreateForm from "@app/js/React/components/ProductCreateForm/ProductCreateForm";
import Pagination from "@app/js/React/components/Pagination/Pagination";
import { useEffect, useState, useRef } from "react";
import { ProductModel } from "@app/js/app.types";
import productListApi from "@app/js/services/api/productListApi";

export default function Products() {

    const [productList, setProductList] = useState<ProductModel[] | "error">();
    const [searchQuery, setSearchQuery] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const debounceTimeoutRef = useRef<number | null>(null);

    const limit = 10;

    useEffect(() => {
        if (debounceTimeoutRef.current) {
            clearTimeout(debounceTimeoutRef.current);
        }

        debounceTimeoutRef.current = window.setTimeout(() => {
            setCurrentPage(1);
            listApi(1, searchQuery);
        }, 500);

        return () => {
            if (debounceTimeoutRef.current) {
                clearTimeout(debounceTimeoutRef.current);
            }
        };
    }, [searchQuery]);

    useEffect(() => {
        listApi(currentPage, searchQuery);
    }, [currentPage]);

    const listApi = async (page: number = currentPage, query: string = searchQuery) => {
        const resp = await productListApi({ limit, page, query });
        if ("error" in resp) return setProductList("error");
        setProductList(resp.rows);
        setTotalPages(Math.ceil(resp.count / limit));
    };

    const createProductHandler = () => {
        listApi(currentPage, searchQuery);
    }

    const deleteProductHandler = () => {
        listApi(currentPage, searchQuery);
    }

    const handlePageChange = (page: number) => {
        setCurrentPage(page);
    }

    const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchQuery(event.target.value);
    }

    return (
        <div className="row g-4">
            <ProductCreateForm onCreate={createProductHandler} />

            <div className="col-12">
                <div className="input-group">
                    <span className="input-group-text">
                        <i className="fa-solid fa-search"></i>
                    </span>
                    <input
                        type="text"
                        className="form-control"
                        placeholder="Buscar produtos..."
                        value={searchQuery}
                        onChange={handleSearchChange}
                    />
                </div>
            </div>

            <ProductList products={productList} onDelete={deleteProductHandler} />

            <div className="col-12">
                <Pagination
                    currentPage={currentPage}
                    totalPages={totalPages}
                    onPageChange={handlePageChange}
                />
            </div>
        </div>
    );
}
