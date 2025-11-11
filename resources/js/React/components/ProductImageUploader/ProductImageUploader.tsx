import React, { forwardRef, useImperativeHandle, useState } from "react";
import { ProductImageUploaderProps, ProductImageUploaderRef } from "./ProductImageUploader.types";
import productImageUploadApi from "@app/js/services/api/productImageUploadApi";

const ProductImageUploader = forwardRef<ProductImageUploaderRef, ProductImageUploaderProps>(
    ({ productModel, onUploadSuccess }, ref) => {
        const [isDisabled, setIsDisabled] = useState(false);
        const [isLoading, setIsLoading] = useState(false);
        const [error, setError] = useState<string | null>(null);
        const [success, setSuccess] = useState<string | null>(null);
        const [selectedFile, setSelectedFile] = useState<File | null>(null);

        useImperativeHandle(ref, () => ({
            enabled: () => {
                setIsDisabled(false);
            },
            disabled: () => {
                setIsDisabled(true);
                setSelectedFile(null);
                setError(null);
                setSuccess(null);
            }
        }));

        const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
            const file = event.target.files?.[0] || null;
            setSelectedFile(file);
            setError(null);
            setSuccess(null);
        };

        const handleUpload = async () => {
            if (!selectedFile) {
                setError("Por favor, selecione um arquivo");
                return;
            }

            setIsLoading(true);
            setError(null);
            setSuccess(null);

            const result = await productImageUploadApi(productModel.id, selectedFile);

            setIsLoading(false);

            if ('error' in result) {
                setError(result.error);
            } else {
                setSuccess(`Imagem "${result.image}" enviada com sucesso!`);
                setSelectedFile(null);

                if (onUploadSuccess) {
                    onUploadSuccess();
                }
            }
        };

        return (
            <div className="card border-0 shadow-sm rounded-4">
                <div className="card-body">
                    <h5 className="card-title mb-3">Upload de Imagem</h5>
                    <p className="text-muted mb-3">
                        Produto: <strong>{productModel.name}</strong>
                    </p>

                    <div className="vstack gap-2">
                        <div className="mb-3">
                            <label htmlFor="fileInput" className="form-label">
                                Selecione uma imagem
                            </label>
                            <input
                                id="fileInput"
                                type="file"
                                className="form-control"
                                accept="image/*"
                                onChange={handleFileChange}
                                disabled={isDisabled || isLoading}
                            />
                        </div>

                        <button
                            className="btn btn-primary"
                            onClick={handleUpload}
                            disabled={isDisabled || isLoading || !selectedFile}
                        >
                            {isLoading ? (
                                <>
                                    <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                                    Enviando...
                                </>
                            ) : (
                                "Enviar Imagem"
                            )}
                        </button>

                        {isDisabled && (
                            <div className="alert alert-warning mb-0" role="alert">
                                <i className="fa-solid fa-lock me-2"></i>
                                Upload desabilitado
                            </div>
                        )}

                        {error && (
                            <div className="alert alert-danger mb-0" role="alert">
                                <i className="fa-solid fa-circle-exclamation me-2"></i>
                                {error}
                            </div>
                        )}

                        {success && (
                            <div className="alert alert-success mb-0" role="alert">
                                <i className="fa-solid fa-circle-check me-2"></i>
                                {success}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        );
    }
);

ProductImageUploader.displayName = "ProductImageUploader";

export default ProductImageUploader;
