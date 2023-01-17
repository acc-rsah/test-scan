import React from "react";
import { Html5Qrcode } from "html5-qrcode";

let html5QrCode;
const brConfig = {
    fps: 10,
    qrbox: { width: 300, height: 200 },
    disableFlip: false,
};

const stopScan = () => {
    try {
        html5QrCode
            .stop()
            .then((res) => {
                html5QrCode.clear();
            })
            .catch((err) => {
                console.log(err.message);
            });
    } catch (err) {
        //dispatch Master code for error
        console.log(err); //remove this console.log after dispatching
    }
};

const Scanner = () => {
    const [cameraId, setCameraId] = React.useState();
    const [decodedResult, setDecodedResult] = React.useState([]);
    const [scannedArr, setScannedArr] = React.useState([]);
    console.log("Scanner Deployed...");
    const arrayCode = [
        {
            barcode: "2150",
        },
        {
            barcode: "4857",
        },
        {
            barcode: "5046",
        },
        {
            barcode: "7027",
        },
        {
            barcode: "7832",
        },
        {
            barcode: "7844",
        },
        {
            barcode: "8466",
        },
        {
            barcode: "8901",
        },
        {
            barcode: "B8C1",
        },
        {
            barcode: "T5D7",
        },
        {
            barcode: "F8C4",
        },
        {
            barcode: "54S8",
        },
        {
            barcode: "DPDP",
        },
        {
            barcode: "74DA",
        },
        {
            barcode: "B42A",
        },
        {
            barcode: "A9W8",
        },
        {
            barcode: "C83A",
        },
        {
            barcode: "ALCL",
        },
        {
            barcode: "RLGM",
        },
        {
            barcode: "0CD2",
        },
        {
            barcode: "4C6E",
        },
        {
            barcode: "54B8",
        },
        {
            barcode: "ZTEE",
        },
        {
            barcode: "6CFD",
        },
        {
            barcode: "94D7",
        },
        {
            barcode: "0495",
        },
        {
            barcode: "FCB0",
        },
        {
            barcode: "255E",
        },
        {
            barcode: "94FB",
        },
        {
            barcode: "001E",
        },
        {
            barcode: "DSNW",
        },
        {
            barcode: "ZTEN",
        },
        {
            barcode: "SROT",
        },
        {
            barcode: "ZTEG",
        },
        {
            barcode: "TJNW",
        },
        {
            barcode: "CP17",
        },
        {
            barcode: "CPE0",
        },
        {
            barcode: "DTH0",
        },
        {
            barcode: "STB0",
        },
        {
            barcode: "APHN",
        },
        {
            barcode: "GNXS",
        },
        {
            barcode: "SRME",
        },
        {
            barcode: "502B",
        },
        {
            barcode: "8C15",
        },
        {
            barcode: "0CB6",
        },
        {
            barcode: "20J2",
        },
        {
            barcode: "WUVA",
        },
        {
            barcode: "ZYXE",
        },
        {
            barcode: "DSWM",
        },
        {
            barcode: "DTHH",
        },
        {
            barcode: "CFCA",
        },
    ];
    /* 
    //Scanning will be stopped if app loses its focus - have to refactor this code ||Rishav
    window.addEventListener(
        "blur",
        function (e) {
            // just lost focus
            stopScan();
        },
        false
    ); */
    const cameraIdValue = (deviceCameraId) => {
        setCameraId(deviceCameraId);
    };

    const getCameraId = () => {
        Html5Qrcode.getCameras()
            .then((devices) => {
                if (devices && devices.length) {
                    let devicesCpy = [...devices];
                    let deviceCameraId = devicesCpy.pop().id;
                    cameraIdValue(deviceCameraId);
                }
            })
            .catch((err) => {
                //dispatch master code for error
                console.log(err); //remove this console.log after dispatching
            });
    };

    React.useEffect(() => {
        getCameraId();
        html5QrCode = new Html5Qrcode("reader");
    }, []);

    React.useEffect(() => {
        if (cameraId) {
            startScan(cameraId);
        }
    }, [cameraId]);

    const checkSnExists = (checkSnExists) => {
        let result = String(checkSnExists);
        let checkSn = arrayCode.findIndex(({ barcode }) =>
            result.startsWith(barcode)
        );
        if (checkSn !== -1) setDecodedResult(result);
    };

    const pushInArr = (decodedText) => {
        if (scannedArr.indexOf(decodedText) === -1) {
            //checkSnExists(decodedText);
            setScannedArr((prev) => [...prev, decodedText]);
        }
    };

    const startScan = React.useCallback((cameraId) => {
        const qrCodeSuccessCallback = (decodedText, decodedResult) => {
            console.log(decodedText);
            console.log(decodedResult);
            //checkSnExists(decodedText);
            pushInArr(decodedText);
            /* setDecodedResult((prev) => {
                if (prev?.result?.text !== decodedResult?.result?.text)
                    return [prev, decodedResult];
                //return [prev, decodedResult];
            }); */
        };

        html5QrCode.start(
            { deviceId: { exact: cameraId } },
            brConfig,
            qrCodeSuccessCallback
        );
    }, []);

    return (
        <div
            style={{
                backgroundColor: "white",
            }}
        >
            <div style={{ position: "relative", backgroundColor: "#1E1E1E" }}>
                <div id="reader" width="100%" />
            </div>
            <br />
            <br />
            <button onClick={stopScan}>Stop Scan</button>
            <br />
            <br />
            <br />
            <div>
                <b>Scanned Results</b>
            </div>
            <br />
            <br />
            <br />
            {/* {decodedResult.length > 0 ? (
                <div>Scanned Serial Number:: {decodedResult}</div>
            ) : null} */}
            {scannedArr.map((ele, index) => (
                <>
                    <span key={index}>{ele}</span>
                    <br />
                </>
            ))}
            {/* {decodedResult?.map((ele, index) => (
                <React.Fragment key={index}>
                    <div>
                        <span>{ele?.decodedText}</span>
                        <span style={{ marginLeft: "16px" }}>
                            {ele?.result?.format?.formatName}
                        </span>
                    </div>
                </React.Fragment>
            ))} */}
        </div>
    );
};

export default Scanner;
