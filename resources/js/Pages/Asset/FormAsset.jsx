import React, { useEffect, useState } from "react";
import { Head } from "@inertiajs/inertia-react";
import { Layout } from "../../Layouts/index";
import Container from "../../Layouts/Container";
import { ButtonGroup } from "../../Components/Button/index";
import TangibleForm from "./TangibleForm";
import ItangibleForm from "./ItangibleForm";

const AddAsset = (props) => {
    const [formType, setformType] = useState("Berwujud");
    const itemCategory = [{ value: "Berwujud" }, { value: "Tak Berwujud" }];

    const handleClickButtonGroup = (event) => {
        setformType(event.target.name);
    };

    useEffect(() => {
        if (props.mode === "edit") {
            setformType(props.datas[0].item_category);
        }
    }, []);

    return (
        <Layout>
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
                {props.mode != "edit" && (
                    <ButtonGroup
                        buttons={itemCategory}
                        action={handleClickButtonGroup}
                    />
                )}

                {formType === "Berwujud" ? (
                    <TangibleForm
                        mode={props.mode}
                        datas={props.mode === "edit" ? props?.datas[0] : ""}
                        res={{ errors: props.errors, flash: props.flash }}
                        employees={props.employees}
                    />
                ) : (
                    <ItangibleForm
                        mode={props.mode}
                        datas={props.mode === "edit" ? props?.datas[0] : ""}
                        res={{ errors: props.errors, flash: props.flash }}
                        employees={props.employees}
                    />
                )}
            </Container>
        </Layout>
    );
};

export default AddAsset;
