import React, { useState } from "react";
import { Head } from "@inertiajs/inertia-react";
import { Layout } from "../../Layouts/index";
import Container from "../../Layouts/Container";
import { ButtonGroup } from "../../Components/Button/index";
import TangibleForm from "./TangibleForm";
import ItangibleForm from "./ItangibleForm";

const AddAsset = () => {
    const [formType, setformType] = useState("Berwujud");

    const howToEarn = [{ value: "Hibah" }, { value: "Pembelian" }];
    const itemCondition = [{ value: "Baik" }, { value: "Rusak Berat" }];

    const handleClickButtonGroup = (event) => {
        setformType(event.target.name);
    };

    return (
        <Layout>
            <Head title="Tambah Aset" />
            <h2>Tambah Asset</h2>
            <Container>
                <ButtonGroup
                    buttons={["Berwujud", "Tak Berwujud"]}
                    action={handleClickButtonGroup}
                />
                {formType === "Berwujud" ? <TangibleForm /> : <ItangibleForm />}
                {/* <form>
                    <Column>
                        <WrapperItemsColumn>
                            <InputWithLabel
                                type="text"
                                name="item_code"
                                placeholder="Kode barang / aset"
                                label="Kode Barang"
                            />
                            <InputWithLabel
                                type="text"
                                name="item_name"
                                placeholder="Nama aset / nama barang"
                                label="Nama Barang"
                            />
                            <InputWithLabel
                                type="text"
                                name="certification_number"
                                placeholder="Nomor sertifikat/nomor pabrik/casis/mesin"
                                label="Nomor Sertifikat"
                            />
                            <DropdownInputWithLabel
                                datas={howToEarn}
                                label="Cara Perolehan"
                                name="how_to_earn"
                            />
                            <InputWithLabel
                                type="text"
                                name="item_size"
                                placeholder="Ukuran barang"
                                label="Ukuran"
                            />
                            <InputWithLabel
                                type="number"
                                name="unit"
                                placeholder="Jumlah satuan barang"
                                label="Satuan"
                            />
                            <InputWithLabel
                                type="number"
                                name="total"
                                placeholder="Jumlah keseluruhan barang"
                                label="Jumlah"
                            />
                            <InputWithLabel
                                type="text"
                                name="creator"
                                placeholder="Pencipta / pembuat barang"
                                label="Pencipta"
                            />
                        </WrapperItemsColumn>
                        <WrapperItemsColumn>
                            <InputWithLabel
                                type="text"
                                name="registration"
                                placeholder="Nomor registrasi barang"
                                label="Registrasi"
                            />
                            <InputWithLabel
                                type="text"
                                name="brand"
                                placeholder="Merk / tipe barang"
                                label="Registrasi"
                            />
                            <InputWithLabel
                                type="text"
                                name="ingredient"
                                placeholder="Material barang"
                                label="Bahan"
                            />
                            <InputWithLabel
                                type="number"
                                name="item_year"
                                placeholder="Tahun pembelian barang"
                                label="Tahun"
                            />
                            <DropdownInputWithLabel
                                datas={itemCondition}
                                label="Kondisi Barang"
                            />
                            <InputWithLabel
                                type="number"
                                name="price"
                                placeholder="Harga barang saat diperoleh"
                                label="Harga"
                            />
                            <InputWithLabel
                                type="text"
                                name="location"
                                placeholder="Lokasi keberadaan barang"
                                label="Lokasi"
                            />

                            <InputWithLabel
                                type="text"
                                name="title"
                                placeholder="Judul / Nama barang"
                                label="Judul / Nama"
                            />
                        </WrapperItemsColumn>
                    </Column>
                </form> */}
            </Container>
        </Layout>
    );
};

export default AddAsset;
