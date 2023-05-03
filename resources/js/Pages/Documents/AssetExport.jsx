import React from "react";
import { Head } from "@inertiajs/inertia-react";
import Logo from "../../../../public/assets/logo-kab-malang.png";
import {
    Document,
    Page,
    Text,
    View,
    StyleSheet,
    PDFViewer,
    Image,
    Font,
} from "@react-pdf/renderer";
import { Layout } from "../../Layouts";
import priceFormatting from "../../Utils/Formatter";

const AssetExport = (props) => {
    const { header, data, cellKey, title, totalPrice } = props;
    const styles = StyleSheet.create({
        page: {
            backgroundColor: "#fff",
            color: "#000",
            padding: "1cm",
            fontFamily: "TimesNewRoman",
        },
        section: {
            margin: 10,
            padding: 10,
        },
        viewer: {
            width: "100%",
            height: "100%",
            border: "none",
            borderRadius: "8px",
        },
        image: {
            width: "48px",
        },

        headerContainer: {
            position: "relative",
            top: "-50px",
            width: "100%",
            right: 0,
            left: 0,
        },

        header: {
            position: "relative",
            top: 0,
            textAlign: "center",
            fontSize: 14,
            fontWeight: 700,
        },

        table: {
            display: "table",
            width: "auto",
            borderStyle: "solid",
            borderWidth: 1,
            borderRightWidth: 0,
            borderBottomWidth: 0,
        },

        tableRow: {
            margin: "auto",
            flexDirection: "row",
        },

        tableCol: {
            width: `${100 / header.length}%`,
            borderStyle: "solid",
            borderWidth: 1,
            borderLeftWidth: 0,
            borderTopWidth: 0,
        },

        tableColTotal: {
            width: `${100 - 100 / header.length}%`,
            borderStyle: "solid",
            borderWidth: 1,
            borderLeftWidth: 0,
            borderTopWidth: 0,
        },

        tableCell: {
            margin: "auto",
            marginTop: 2,
            marginBottom: 2,
            fontSize: 10,
        },

        tableHeaderCell: {
            margin: "auto",
            marginTop: 2,
            marginBottom: 2,
            fontSize: 11,
            fontWeight: 700,
        },
    });

    Font.register({
        family: "TimesNewRoman",
        fonts: [
            {
                src: "https://cdn.jsdelivr.net/npm/@canvas-fonts/times-new-roman@1.0.4/Times New Roman.ttf",
            },
            {
                src: "https://cdn.jsdelivr.net/npm/@canvas-fonts/times-new-roman-bold@1.0.4/Times New Roman Bold.ttf",
                fontWeight: 700,
            },
        ],
    });

    return (
        <Layout>
            <Head title="Eksport Aset" />
            <PDFViewer style={styles.viewer}>
                <Document>
                    <Page
                        size="FOLIO"
                        orientation="landscape"
                        style={styles.page}
                        wrap
                    >
                        <Image style={styles.image} src={Logo} />
                        <View style={styles.headerContainer}>
                            <Text style={styles.header}>
                                DAFTAR ASET DINAS KOMUNIKASI DAN INFORMATIKA
                            </Text>
                            <Text style={styles.header}>{title}</Text>
                        </View>
                        <View style={styles.table}>
                            <View style={styles.tableRow}>
                                {header.map((item, key) => {
                                    return (
                                        <View style={styles.tableCol} key={key}>
                                            <Text
                                                style={styles.tableHeaderCell}
                                            >
                                                {item}
                                            </Text>
                                        </View>
                                    );
                                })}
                            </View>
                            {data.map((item, key) => {
                                return (
                                    <View style={styles.tableRow} key={key}>
                                        {cellKey.map((itemData, i) => {
                                            return (
                                                <View
                                                    style={styles.tableCol}
                                                    key={i}
                                                >
                                                    <Text
                                                        style={styles.tableCell}
                                                    >
                                                        {itemData === "price"
                                                            ? priceFormatting(
                                                                  item[itemData]
                                                              )
                                                            : item[itemData]}
                                                    </Text>
                                                </View>
                                            );
                                        })}
                                    </View>
                                );
                            })}
                            {header.includes("Harga") && (
                                <View style={styles.tableRow}>
                                    <View style={styles.tableColTotal}>
                                        <Text style={styles.tableHeaderCell}>
                                            Total
                                        </Text>
                                    </View>
                                    <View style={styles.tableCol}>
                                        <Text style={styles.tableHeaderCell}>
                                            {priceFormatting(totalPrice)}
                                        </Text>
                                    </View>
                                </View>
                            )}
                        </View>
                    </Page>
                </Document>
            </PDFViewer>
        </Layout>
    );
};

export default AssetExport;
