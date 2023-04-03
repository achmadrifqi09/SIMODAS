import React, { useEffect, useState } from "react";
import { ButtonSubmit } from "../../Components/Button/index";
import {
    InputWithLabel,
    DropdownInputWithLabel,
} from "../../Components/Input/index";
import { Column, WrapperItemsColumn } from "../../Layouts/index";
import { Inertia } from "@inertiajs/inertia";


const TangibleForm = () => {
    const [formData, setFormData] = useState({});
    const howToEarn = [{ value: "Hibah" }, { value: "Pembelian" }];
    const itemCondition = [{ value: "Baik" }, { value: "Rusak Berat" }];

    const handleSubmit = () => {
        Inertia.post("/asset", formData);
    };

    const handleChange = (event) => {
        const { name, value } = event.target;

        setFormData({
            ...formData,
            [name]: value,
        });
    };

    useEffect(() => {
        setFormData({
            ...formData,
            item_category: "Berwujud",
        });
    }, []);

    return (
        <>
            <form>
                <Column>
                    <WrapperItemsColumn>
                        <InputWithLabel
                            type="text"
                            name="item_code"
                            placeholder="Kode barang / aset"
                            label="Kode Barang"
                            onChange={handleChange}
                        />

                        <InputWithLabel
                            type="text"
                            name="item_name"
                            placeholder="Nama aset / nama barang"
                            label="Nama Barang"
                            onChange={handleChange}
                        />

                        <InputWithLabel
                            type="text"
                            name="certification_number"
                            placeholder="Nomor sertifikat/nomor pabrik/casis/mesin"
                            label="Nomor Sertifikat"
                            onChange={handleChange}
                        />
                        <DropdownInputWithLabel
                            datas={howToEarn}
                            label="Cara Perolehan"
                            name="how_to_earn"
                            onChange={handleChange}
                        />
                        <InputWithLabel
                            type="text"
                            name="item_size"
                            placeholder="Ukuran barang"
                            label="Ukuran"
                            onChange={handleChange}
                        />
                        <InputWithLabel
                            type="number"
                            name="unit"
                            placeholder="Jumlah satuan barang"
                            label="Satuan"
                            onChange={handleChange}
                        />
                        <InputWithLabel
                            type="number"
                            name="total"
                            placeholder="Jumlah keseluruhan barang"
                            label="Jumlah"
                            onChange={handleChange}
                        />
                    </WrapperItemsColumn>
                    <WrapperItemsColumn>
                        <InputWithLabel
                            type="text"
                            name="registration"
                            placeholder="Nomor registrasi barang"
                            label="Registrasi"
                            onChange={handleChange}
                        />

                        <InputWithLabel
                            type="text"
                            name="brand"
                            placeholder="Merk / tipe barang"
                            label="Registrasi"
                            onChange={handleChange}
                        />
                        <InputWithLabel
                            type="text"
                            name="ingredient"
                            placeholder="Material barang"
                            label="Bahan"
                            onChange={handleChange}
                        />
                        <InputWithLabel
                            type="number"
                            name="item_year"
                            placeholder="Tahun pembelian barang"
                            label="Tahun"
                            onChange={handleChange}
                        />
                        <DropdownInputWithLabel
                            datas={itemCondition}
                            name="item_condition"
                            label="Kondisi Barang"
                            onChange={handleChange}
                        />
                        <InputWithLabel
                            type="number"
                            name="price"
                            placeholder="Harga barang saat diperoleh"
                            label="Harga"
                            onChange={handleChange}
                        />
                        <InputWithLabel
                            type="text"
                            name="location"
                            placeholder="Lokasi keberadaan barang"
                            label="Lokasi"
                            onChange={handleChange}
                        />
                    </WrapperItemsColumn>
                </Column>
                <ButtonSubmit action={handleSubmit} label="Simpan" />
            </form>
        </>
    );
};

export default TangibleForm;
