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
import { ButtonGroup } from "../../Components/Button/index";
import ListData from "../../Components/List/ListData";
import { tangibleData, itangibleData } from "../../Utils/PresenterData";

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
                                    ? `${import.meta.env.VITE_APP_URL.concat(
                                          datas.physical_evidence
                                      )}`
                                    : `${
                                          import.meta.env.VITE_APP_URL
                                      }assets/no-image.webp`
                            }
                        />
                        <div className="heading-container">
                            <h3>{datas.item_name}</h3>
                            <span>
                                Pengguna :{" "}
                                {datas.user ? datas.user : "Belum ada"}
                            </span>
                        </div>
                    </WrapperItemsColumn>
                    <WrapperItemsColumn>
                        <ButtonGroup
                            buttons={tabPanel}
                            action={handleNavigationTab}
                        />
                        {tabType === "Detail" ? (
                            <Scrolling layoutHeight="h-half">
                                <ListData
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
                                    {datas.distribution_id && (
                                        <li className="list-item">
                                            <span className="label">
                                                Dokumen BAST V1 (Menggunakan 3
                                                TTD)
                                            </span>
                                            <span className="value">
                                                <a href="" className="link">
                                                    Lihat
                                                </a>
                                            </span>
                                        </li>
                                    )}
                                    {datas.distribution_id && (
                                        <li className="list-item">
                                            <span className="label">
                                                Dokumen BAST V2 (Menggunakan 4
                                                TTD)
                                            </span>
                                            <span className="value">
                                                <a href="" className="link">
                                                    Lihat
                                                </a>
                                            </span>
                                        </li>
                                    )}
                                    <li className="list-item">
                                        <span className="label">
                                            Label aset
                                        </span>
                                        <span className="value">
                                            <a
                                                href={`/asset/${datas.id}/label/preview`}
                                                className="link"
                                                target="_blank"
                                            >
                                                Lihat
                                            </a>
                                            <a
                                                href={`/asset/${datas.id}/label/download`}
                                                className="link"
                                            >
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
