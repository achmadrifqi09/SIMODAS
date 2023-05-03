import React, { useState, useEffect } from "react";
import { InputWithLabel } from "../../Components/Input";
import { Layout, Container, Column, WrapperItemsColumn } from "../../Layouts";
import { Head } from "@inertiajs/inertia-react";
import { ButtonCommon } from "../../Components/Button/index";
import {
    validatorInput,
    checkAllInputIsCorrect,
} from "../../Utils/ValidatorInput";
import Toast from "../../Components/Toast/Toast";
import Spinner from "../../Components/Spinner/Spinner";
import { Inertia } from "@inertiajs/inertia";

const EmployeeForm = (props) => {
    const { datas, mode, errors, flash } = props;
    const editedData = datas?.[0];
    const [formData, setFormData] = useState(mode === "edit" ? datas?.[0] : {});
    const [isLoading, setIsLoading] = useState(false);
    const [inputErrors, setInputErrors] = useState({
        name: mode === "edit" ? false : true,
    });
    const [isSubmit, setIsSubmit] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);

    const handleChange = (event) => {
        const { name, value } = event.target;
        const correctnessResult = validatorInput(inputErrors, event.target);
        Object.keys(correctnessResult).forEach((key) => {
            setInputErrors({
                ...inputErrors,
                [key]: correctnessResult[key],
            });
        });
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleSubmit = () => {
        mode === "create"
            ? Inertia.post("/employees", formData)
            : mode === "edit" &&
              Inertia.post(`/employees/${datas?.[0].id}/update`, formData);
        setIsLoading(true);
    };

    useEffect(() => {
        if (Object.keys(errors).length != 0) {
            setIsLoading(false);
        } else if (String(flash?.message).toLowerCase().includes("berhasil ")) {
            setIsSuccess(true);
            setIsLoading(false);
        }
        const isErrorsInput = checkAllInputIsCorrect(inputErrors);
        !isErrorsInput ? setIsSubmit(true) : setIsSubmit(false);
    }, [errors, inputErrors, flash]);

    return (
        <Layout>
            {isLoading && <Spinner />}
            {isSuccess && (
                <Toast urlRedirect="/employees" message={flash.message} />
            )}
            <Head
                title={
                    props.mode == "edit"
                        ? "Edit Data"
                        : props.mode == "create"
                        ? "Tambah Data"
                        : ""
                }
            />
            <h2>
                {props.mode == "edit"
                    ? "Edit Data"
                    : props.mode == "create"
                    ? "Tambah Data"
                    : ""}
            </h2>
            <Container>
                <form>
                    <InputWithLabel
                        type="text"
                        name="name"
                        placeholder="Masukkan nama lengakap pengguna"
                        label="Nama Pengguna"
                        onChange={handleChange}
                        value={formData?.name || ""}
                        isCorrect={inputErrors.name}
                    />
                    <InputWithLabel
                        type="text"
                        name="rank"
                        placeholder="ex: Penata Tk. I"
                        label="Pangkat"
                        onChange={handleChange}
                        value={formData?.rank || ""}
                    />
                    <InputWithLabel
                        type="text"
                        name="position"
                        placeholder="ex: Kasub. Bag. Umum dan Kepegawaian"
                        label="Jabatan"
                        onChange={handleChange}
                        value={formData?.position || ""}
                    />

                    <InputWithLabel
                        type="text"
                        name="nip"
                        placeholder="ex: 19860xxxxxx"
                        label="NIP Pengguna"
                        onChange={handleChange}
                        value={formData?.nip || ""}
                    />
                    <InputWithLabel
                        type="text"
                        name="group"
                        placeholder="ex: III - d"
                        label="Golongan"
                        onChange={handleChange}
                        value={formData?.group || ""}
                    />

                    <ButtonCommon
                        action={handleSubmit}
                        buttonVariant="button-primary-lg"
                        disabled={!isSubmit}
                        buttonType="submit"
                    >
                        Submit
                    </ButtonCommon>
                </form>
            </Container>
        </Layout>
    );
};

export default EmployeeForm;
