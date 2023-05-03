import React, { useEffect, useState } from "react";
import LabelItem from "../../Components/Label/LabelItem";
import { ButtonCommon } from "../../Components/Button";
import { Layout, Container } from "../../Layouts";
import html2canvas from "html2canvas";
import Spinner from "../../Components/Spinner/Spinner";
import Toast from "../../Components/Toast/Toast";
import { Head } from "@inertiajs/inertia-react";

const LabelAsset = (props) => {
    const [isErrorDownload, setIsErrorDownload] = useState(false);
    const handleCapture = async () => {
        const element = document.querySelector("#capture");
        const canvas = await html2canvas(element, {
            allowTaint: true,
            useCORS: true,
        });
        const img = canvas.toDataURL("image/png", 1.0);
        try {
            await downloadImage(
                img,
                `${props.datas[0].item_name}-${props.datas[0].internal_code}`
            );
        } catch {
            setIsErrorDownload(true);
        }
    };

    const downloadImage = (blob, fileName) => {
        return new Promise(() => {
            const fakeLink = window.document.createElement("a");
            fakeLink.style = "display:none;";
            fakeLink.download = fileName;

            fakeLink.href = blob;

            document.body.appendChild(fakeLink);
            fakeLink.click();
            document.body.removeChild(fakeLink);

            fakeLink.remove();
            props.mode === "download" && window.history.back();
        });
    };
    useEffect(() => {
        props.mode === "download" && handleCapture();
    }, []);

    return (
        <Layout>
            <Head title="Label" />
            {isErrorDownload && <Toast message="Gagal mengunduh label" />}
            {props.mode === "download" && (
                <Spinner
                    bgVariant="bg-full-opacity"
                    message="File disiapkan, mohon tunggu ..."
                />
            )}
            <Container>
                <ButtonCommon
                    buttonVariant="button-primary"
                    action={handleCapture}
                    buttonType="button"
                >
                    Unduh Label
                </ButtonCommon>
                <LabelItem datas={props.datas} />
            </Container>
        </Layout>
    );
};

export default LabelAsset;
