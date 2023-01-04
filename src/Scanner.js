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

    const startScan = React.useCallback((cameraId) => {
        const qrCodeSuccessCallback = (decodedText, decodedResult) => {
            setDecodedResult((prev) => {
                if (prev?.result?.text !== decodedResult?.result?.text)
                    return [prev, decodedResult];
                //return [prev, decodedResult];
            });
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
            <div>Results</div>
            <br />
            {decodedResult?.map((ele, index) => (
                <React.Fragment key={index}>
                    <div>
                        <span>{ele?.decodedText}</span>
                        <span style={{ marginLeft: "16px" }}>
                            {ele?.result?.format?.formatName}
                        </span>
                    </div>
                </React.Fragment>
            ))}
        </div>
    );
};

export default Scanner;
