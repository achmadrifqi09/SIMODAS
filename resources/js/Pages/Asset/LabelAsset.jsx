import React from "react";
import LabelItem from "../../Components/Label/LabelItem";
import { ButtonCommon } from "../../Components/Button";
import { Layout, Container } from "../../Layouts";
import html2canvas from "html2canvas";

const LabelAsset = (props) => {
    const handleCapture = () => {
        const element = document.querySelector("#capture");
        html2canvas(element, { allowTaint: true, useCORS: true }).then(
            (canvas) => {
                const imgData = canvas.toDataURL("image/png", 1.0);
                const newData = imgData.replace(
                    /^data:image\/jpg/,
                    "data:application/octet-stream"
                );

                downloadImage(newData, props.datas[0].item_name);
            }
        );
    };

    const downloadImage = (blob, fileName) => {
        const fakeLink = window.document.createElement("a");
        fakeLink.style = "display:none;";
        fakeLink.download = fileName;

        fakeLink.href = blob;

        document.body.appendChild(fakeLink);
        fakeLink.click();
        document.body.removeChild(fakeLink);

        fakeLink.remove();
    };

    return (
        <Layout>
            <Container>
                <ButtonCommon
                    buttonVariant="button-primary"
                    action={handleCapture}
                >
                    Unduh Label
                </ButtonCommon>
                <LabelItem datas={props.datas} />
            </Container>
        </Layout>
    );
};

export default LabelAsset;
