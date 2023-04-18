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
import List from "../../Components/List/List";
import { tangibleData, itangibleData } from "../../Utils/PresenterData";

const DetailedAsset = (props) => {
    const [tabType, setTabType] = useState("Berwujud");
    let datas = props?.assetData[0];

    const tabPanel = [
        { value: "Detail" },
        { value: "Riwayat BAST" },
        { value: "Lain-Lain" },
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
                                    ? `http://localhost:8000/${datas.physical_evidence}`
                                    : "http://localhost:8000/assets/no-image.webp"
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
                        <Scrolling layoutHeight="h-half">
                            <List
                                presenterData={
                                    datas?.item_category === "Berwujud"
                                        ? tangibleData
                                        : datas?.item_category ===
                                              "Tak Berwujud" && itangibleData
                                }
                                datas={datas}
                            />
                        </Scrolling>
                    </WrapperItemsColumn>
                </Column>
            </Container>
        </Layout>
    );
};

export default DetailedAsset;
