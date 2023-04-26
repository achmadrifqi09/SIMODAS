import React from "react";
import "../../../css/label.css";
import Logo from "../../../../public/assets/logo-lg.svg";

const LabelItem = (props) => {
    const datas = props.datas[0];
    return (
        <div className="canvas" id="capture">
            <div className="rectangular">
                <div className="box-logo">
                    <img src={Logo} alt="LOGO PEMKAB" />
                </div>
                <div className="box-description">
                    <div className="col1">
                        <b>BMD - TA {datas.item_year}</b>
                    </div>
                    <div className="col2">
                        Kode Barang - Registrasi
                        <br />
                        {`${datas.item_code ?? "(-)"} - ${
                            datas.registration ?? "(-)"
                        } - ${datas.internal_code}`}
                    </div>
                    <div className="col3">
                        Nama Barang - Merk <br />
                        {`${datas.item_name ?? "(-)"} - ${
                            datas.brand ?? "(-)"
                        }`}
                    </div>
                    <div className="col2">
                        Lokasi Barang <br />
                        {datas.location ?? "-"}
                    </div>
                    <div className="col4">
                        <b>DINAS KOMUNIKASI DAN INFORMATIKA KABUPATEN MALANG</b>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LabelItem;
