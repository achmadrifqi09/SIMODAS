import React, { useEffect, useState } from "react";
import { ButtonCommon } from "../../Components/Button/index";
import {
    InputWithLabel,
    TextareaWithLabel,
    InputFile,
    Checkbox,
    ReactSelect,
} from "../../Components/Input/index";
import { Column, WrapperItemsColumn } from "../../Layouts/index";
import { Inertia } from "@inertiajs/inertia";
import Spinner from "../../Components/Spinner/Spinner";
import {
    validatorInput,
    checkAllInputIsCorrect,
} from "../../Utils/ValidatorInput";
import Toast from "../../Components/Toast/Toast";
import { howToEarn, itemCondition } from "../../Utils/PresenterData";

const TangibleForm = (props) => {
    const { mode, datas, res, tangibleAssets } = props;
    const [formData, setFormData] = useState(mode === "edit" ? datas : {});
    const [isLoading, setIsLoading] = useState(false);
    const [inputErrors, setInputErrors] = useState({
        item_code: mode === "edit" ? false : true,
        item_name: mode === "edit" ? false : true,
        item_year: mode === "edit" ? false : true,
        price: mode === "edit" ? false : true,
    });
    const [isInternalCode, setIsInternalCode] = useState(false);
    const [isSubmit, setIsSubmit] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);

    const employeesData = props.employees.map((employee) => {
        return {
            value: employee.name,
            label: employee.name,
        };
    });
    employeesData.unshift({ value: "-", label: "-" });

    const assetData =
        mode === "create" &&
        tangibleAssets.map((tangibleAsset) => {
            return {
                value: tangibleAsset.internal_code,
                label: `${tangibleAsset.item_name} - ${
                    tangibleAsset.brand || "-"
                } - ${tangibleAsset.item_year} - ${
                    tangibleAsset.internal_code
                }`,
            };
        });

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

    const handleChecked = (event) => {
        event.target.name === "is_internal_code" &&
            setIsInternalCode(event.target.checked);
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
            item_category: "Berwujud",
            total: 1,
        });
        const isErrorsInput = checkAllInputIsCorrect(inputErrors);
        !isErrorsInput ? setIsSubmit(true) : setIsSubmit(false);
    }, [res, inputErrors]);

    return (
        <>
            {isLoading && (
                <Spinner
                    bgVariant="bg-half-opacity"
                    message=" Sedang memuat, mohon tunggu ..."
                />
            )}
            {isSuccess && (
                <Toast urlRedirect="/asset" message={res.flash.message} />
            )}
            <form>
                {mode === "create" && (
                    <Checkbox
                        name="is_internal_code"
                        onChange={handleChecked}
                        label="Centang jika barang memiliki type, merk, tahun pengadaan yang sama dan telah didaftarkan"
                    />
                )}
                {isInternalCode && (
                    <ReactSelect
                        datas={[...assetData]}
                        label="Pilih Barang yang Sama"
                        onChange={handleChange}
                        name="internal_code"
                    />
                )}
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
                            name="certification_number"
                            placeholder="Nomor sertifikat/nomor pabrik/casis/mesin"
                            label="Nomor Sertifikat"
                            onChange={handleChange}
                            value={formData?.certification_number || ""}
                        />
                        <ReactSelect
                            datas={howToEarn}
                            label="Cara Perolehan"
                            onChange={handleChange}
                            name="how_to_earn"
                            isMulti={false}
                            defaultValue={formData?.how_to_earn || ""}
                        />
                        <InputWithLabel
                            type="text"
                            name="item_size"
                            placeholder="Ukuran barang"
                            label="Ukuran"
                            onChange={handleChange}
                            value={formData?.item_size || ""}
                        />
                        <InputWithLabel
                            type="text"
                            name="spesification"
                            placeholder="Spesifikasi barang"
                            label="Spesifikasi"
                            onChange={handleChange}
                            value={formData?.spesification || ""}
                        />
                        <InputWithLabel
                            type="number"
                            name="unit"
                            placeholder="Jumlah satuan barang"
                            label="Satuan"
                            onChange={handleChange}
                            value={formData?.unit || ""}
                        />
                        <InputWithLabel
                            type="number"
                            name="total"
                            placeholder="Jumlah keseluruhan barang"
                            label="Jumlah"
                            disabled={true}
                            onChange={handleChange}
                            value={formData?.total || ""}
                        />
                    </WrapperItemsColumn>
                    <WrapperItemsColumn>
                        <InputWithLabel
                            type="text"
                            name="registration"
                            placeholder="Nomor registrasi barang"
                            label="Registrasi"
                            onChange={handleChange}
                            value={formData?.registration || ""}
                        />
                        <InputWithLabel
                            type="text"
                            name="brand"
                            placeholder="Merk / tipe barang"
                            label="Merk"
                            onChange={handleChange}
                            value={formData?.brand || ""}
                        />
                        <InputWithLabel
                            type="text"
                            name="ingredient"
                            placeholder="Material barang"
                            label="Bahan"
                            onChange={handleChange}
                            value={formData?.ingredient || ""}
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

                        <ReactSelect
                            datas={itemCondition}
                            label="Kondisi Barang"
                            onChange={handleChange}
                            name="item_condition"
                            isMulti={false}
                            defaultValue={formData?.item_condition || ""}
                        />

                        <InputWithLabel
                            type="number"
                            name="price"
                            placeholder="Harga barang saat diperoleh"
                            label="Harga"
                            onChange={handleChange}
                            value={formData?.price}
                            isCorrect={inputErrors.price}
                        />
                        <InputWithLabel
                            type="text"
                            name="location"
                            placeholder="Lokasi keberadaan barang"
                            label="Lokasi"
                            onChange={handleChange}
                            value={formData?.location || ""}
                        />
                        <ReactSelect
                            datas={[...employeesData]}
                            label="Pengguna"
                            onChange={handleChange}
                            name="user"
                            isMulti={false}
                            defaultValue={formData?.user || ""}
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
                    buttonType="submit"
                >
                    Submit
                </ButtonCommon>
            </form>
        </>
    );
};

export default TangibleForm;
