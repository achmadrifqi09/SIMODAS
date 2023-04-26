const UrlDataToFile = (url, fileName) => {
    const arr = url.split(",");
    const mime = arr[0].match(/:(.*?);/)[1];
    const data = arr[1];

    const dataStr = window.atob(data);
    let n = dataStr.length;
    let dataArr = new Uint8Array(n);

    while (n--) {
        dataArr[n] = dataStr.charCodeAt(n);
    }
    const fileResult = new File([dataArr], fileName, { type: mime });
    return fileResult;
};

export default UrlDataToFile;
