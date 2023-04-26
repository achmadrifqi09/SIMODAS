import React, { useState } from "react";

import {
    Container,
    Layout,
    Column,
    WrapperItemsColumn,
    Scrolling,
} from "../../Layouts/index";
import ImageRoundedCorner from "../../Components/Image/Image";
import { Head } from "@inertiajs/inertia-react";
import { ButtonGroup, ButtonWithIcon } from "../../Components/Button/index";
import List from "../../Components/List/List";
import { tangibleData, itangibleData } from "../../Utils/PresenterData";
import { DocumentIcon } from "@heroicons/react/24/outline";

const DetailedAsset = (props) => {
    const [tabType, setTabType] = useState("Detail");
    let datas = props?.assetData[0];

    const tabPanel = [
        { value: "Detail" },
        { value: "Dokumen" },
        { value: "Riwayat BAST" },
    ];

    const handleNavigationTab = (event) => {
        setTabType(event.target.name);
    };
    return (
        <Layout>
            <Head title="Detail" />
            <h2>Detail Asset</h2>
            <Container>
                <Column>
                    <WrapperItemsColumn>
                        <ImageRoundedCorner
                            source={
                                datas.physical_evidence
                                    ? `${import.meta.env.VITE_APP_URL}/${
                                          datas.physical_evidence
                                      }`
                                    : `${
                                          import.meta.env.VITE_APP_URL
                                      }/assets/no-image.webp`
                            }
                        />
                    </WrapperItemsColumn>
                    <WrapperItemsColumn>
                        <h3>{datas.item_name}</h3>
                        <span>
                            Pengguna : {datas.user ? datas.user : "Belum ada"}
                        </span>
                        <ButtonGroup
                            buttons={tabPanel}
                            action={handleNavigationTab}
                        />
                        {tabType === "Detail" ? (
                            <Scrolling layoutHeight="h-half">
                                <List
                                    presenterData={
                                        datas?.item_category === "Berwujud"
                                            ? tangibleData
                                            : datas?.item_category ===
                                                  "Tak Berwujud" &&
                                              itangibleData
                                    }
                                    datas={datas}
                                />
                            </Scrolling>
                        ) : tabType === "Dokumen" ? (
                            <>
                                <ul className="list">
                                    <li className="list-item">
                                        <span className="label">
                                            Dokumen BAST V1 (Menggunakan 3 TTD)
                                        </span>
                                        <span className="value">
                                            <a href="" className="link">
                                                Lihat
                                            </a>
                                        </span>
                                    </li>
                                    <li className="list-item">
                                        <span className="label">
                                            Dokumen BAST V2 (Menggunakan 4 TTD)
                                        </span>
                                        <span className="value">
                                            <a href="" className="link">
                                                Lihat
                                            </a>
                                        </span>
                                    </li>
                                    <li className="list-item">
                                        <span className="label">
                                            Label aset
                                        </span>
                                        <span className="value">
                                            <a
                                                href={`/asset/${datas.id}/label`}
                                                className="link"
                                                target="_blank"
                                            >
                                                Lihat
                                            </a>
                                            <a href="" className="link">
                                                Unduh
                                            </a>
                                        </span>
                                    </li>
                                </ul>
                            </>
                        ) : (
                            tabType === "Riwayat BAST" && (
                                <>
                                    <h3>Riwayat BAST</h3>
                                </>
                            )
                        )}
                    </WrapperItemsColumn>
                </Column>
            </Container>
        </Layout>
    );
};

export default DetailedAsset;
