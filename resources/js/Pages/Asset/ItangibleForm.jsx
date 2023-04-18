import React, { useEffect, useState } from "react";
import { ButtonCommon } from "../../Components/Button/index";
import {
    InputFile,
    InputWithLabel,
    SelectWithLabel,
    TextareaWithLabel,
} from "../../Components/Input/index";
import { Column, WrapperItemsColumn } from "../../Layouts/index";
import { Inertia } from "@inertiajs/inertia";
import Spinner from "../../Components/Spinner/Spinner";
import {
    validatorInput,
    checkAllInputIsCorrect,
} from "../../Utils/ValidatorInput";
import Toast from "../../Components/Toast/Toast";

const ItangibleForm = (props) => {
    const { mode, datas, res } = props;
    const [formData, setFormData] = useState(mode === "edit" ? datas : {});
    const howToEarn = [{ value: "Pembelian" }, { value: "Hibah" }];
    const itemCondition = [{ value: "Baik" }, { value: "Rusak Berat" }];
    const [inputErrors, setInputErrors] = useState({
        item_code: mode === "edit" ? false : true,
        item_name: mode === "edit" ? false : true,
        item_year: mode === "edit" ? false : true,
        price: mode === "edit" ? false : true,
    });
    const [isSubmit, setIsSubmit] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = () => {
        mode === "create"
            ? Inertia.post("/asset", formData)
            : mode === "edit" &&
              Inertia.post(`/asset/${datas.id}/update`, formData);
        setIsLoading(true);
    };

    const handleChange = (event) => {
        const { name, value, type } = event.target;
        const correctnessResult = validatorInput(inputErrors, event.target);
        Object.keys(correctnessResult).forEach((key) => {
            setInputErrors({
                ...inputErrors,
                [key]: correctnessResult[key],
            });
        });
        setFormData({
            ...formData,
            [name]: type === "file" ? event.target.files[0] : value,
        });
    };

    useEffect(() => {
        if (Object.keys(res.errors).length !== 0) {
            setIsLoading(false);
        } else if (
            String(res?.flash.message).toLowerCase().includes("berhasil")
        ) {
            setIsLoading(false);
            setIsSuccess(true);
        }
        setFormData({
            ...formData,
            item_category: "Tak Berwujud",
            how_to_earn: "Pembelian",
            item_condition: "Baik",
            total: 1,
        });
        const isErrorsInput = checkAllInputIsCorrect(inputErrors);
        !isErrorsInput ? setIsSubmit(true) : setIsSubmit(false);
    }, [mode, res, inputErrors]);

    return (
        <>
            {isLoading && <Spinner />}
            {isSuccess && (
                <Toast urlRedirect="/asset" message={res.flash.message} />
            )}
            <form>
                <Column>
                    <WrapperItemsColumn>
                        <InputWithLabel
                            type="text"
                            name="item_code"
                            placeholder="Kode barang / aset"
                            label="Kode Barang"
                            onChange={handleChange}
                            value={formData?.item_code || ""}
                            isCorrect={inputErrors.item_code}
                        />

                        <InputWithLabel
                            type="text"
                            name="item_name"
                            placeholder="Nama aset / nama barang"
                            label="Nama Barang"
                            onChange={handleChange}
                            value={formData?.item_name || ""}
                            isCorrect={inputErrors.item_name}
                        />

                        <InputWithLabel
                            type="text"
                            name="registration"
                            placeholder="Nomor registrasi"
                            label="Registrasi"
                            onChange={handleChange}
                            value={formData?.registration || ""}
                        />

                        <InputWithLabel
                            type="number"
                            name="item_year"
                            placeholder="Tahun pembelian barang"
                            label="Tahun"
                            onChange={handleChange}
                            value={formData?.item_year || ""}
                            isCorrect={inputErrors.item_year}
                        />
                        <InputWithLabel
                            type="text"
                            name="title"
                            placeholder="Judul nama barang"
                            label="Judul/Nama"
                            onChange={handleChange}
                            value={formData?.title || ""}
                        />
                    </WrapperItemsColumn>
                    <WrapperItemsColumn>
                        <InputWithLabel
                            type="text"
                            name="creator"
                            placeholder="Pencipta barang"
                            label="Pencipta"
                            onChange={handleChange}
                            value={formData?.creator || ""}
                        />
                        <InputWithLabel
                            type="text"
                            name="certification_number"
                            placeholder="Nomor sertifikat/nomor pabrik/casis/mesin"
                            label="Nomor Sertifikat"
                            onChange={handleChange}
                            value={formData?.certification_number || ""}
                        />
                        <SelectWithLabel
                            datas={itemCondition}
                            name="item_condition"
                            label="Kondisi Barang"
                            onChange={handleChange}
                        />
                        <SelectWithLabel
                            datas={howToEarn}
                            label="Cara Perolehan"
                            name="how_to_earn"
                            onChange={handleChange}
                        />

                        <InputWithLabel
                            type="number"
                            name="price"
                            placeholder="Harga barang saat diperoleh"
                            label="Harga"
                            onChange={handleChange}
                            value={formData?.price || ""}
                            isCorrect={inputErrors.price}
                        />
                    </WrapperItemsColumn>
                </Column>
                <InputFile
                    name="physical_evidence"
                    accept="image/png, image/jpeg"
                    label="Pilih Gambar"
                    previewType="image"
                    onChange={handleChange}
                    value={formData?.physical_evidence || ""}
                    acceptFile="gambar bertipe PNG dan JPEG"
                />
                <InputFile
                    name="file_bast"
                    accept="application/pdf"
                    label="Pilih Dokumen"
                    previewType="pdf"
                    onChange={handleChange}
                    value={formData?.file_bast || ""}
                    acceptFile="dokumen bertipe PDF"
                />
                <TextareaWithLabel
                    label="Deskripsi"
                    placeholder="Deskripsi barang"
                    name="description"
                    onChange={handleChange}
                >
                    {formData?.description || ""}
                </TextareaWithLabel>
                <ButtonCommon
                    action={handleSubmit}
                    buttonVariant="button-primary-lg"
                    disabled={!isSubmit}
                >
                    Submit
                </ButtonCommon>
            </form>
        </>
    );
};

export default ItangibleForm;
