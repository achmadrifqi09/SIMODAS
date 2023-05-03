import React from "react";
import { Container, Layout } from "../../Layouts";
import {
    InputWithLabel,
    TextareaWithLabel,
    InputFile,
    Checkbox,
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
import { ButtonCommon } from "../../Components/Button/index";
import { Head } from "@inertiajs/inertia-react";

const DistributionForm = (props) => {
    return (
        <Layout>
            <Head title="Kelola BAST" />
            <h2>Tambah Data</h2>
            <Container>
                <form>
                    <Column>
                        <WrapperItemsColumn>
                            <InputWithLabel
                                type="text"
                                name="item_code"
                                placeholder="Kode barang / aset"
                                label="Kode Barang"
                                // onChange={handleChange}
                                // value={formData?.item_code || ""}
                                // isCorrect={inputErrors.item_code}
                            />
                        </WrapperItemsColumn>
                    </Column>
                </form>
            </Container>
        </Layout>
    );
};

export default DistributionForm;
