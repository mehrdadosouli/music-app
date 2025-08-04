import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { funcUploadTrack, fetchAllTracksUploaded } from "~/redux/features/music/musicSlice";
import SwalMessage from "~/utils/SwalMessage";

function UploadMusic() {
    const dispatch = useDispatch();
    const { isLoadingUploadTrack, errorUploadTrack, uploadSuccess } = useSelector(
        (state) => state.songs
    );

    const [file, setFile] = useState(null);
    const [title, setTitle] = useState("");
    const [artist, setArtist] = useState("");

    const handleFileChange = (e) => {
        setFile(e.target.files[0]);
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!file) {
            alert("لطفا یک فایل صوتی انتخاب کنید.");
            return;
        }

        dispatch(funcUploadTrack({ file, customTitle: title, customArtist: artist }));
    };

    useEffect(() => {
        const handleUploadSuccess = async () => {
            if (uploadSuccess) {
                try {
                    setFile(null);
                    setTitle("");
                    setArtist("");
                    await SwalMessage({
                        title: "موفقیت!",
                        text: "آهنگ با موفقیت آپلود شد",
                        icon: "success",
                        confirmButtonText: "باشه"
                    });
                    dispatch(fetchAllTracksUploaded());
                } catch (error) {
                    await SwalMessage({
                        title: "خطا!",
                        text: "آپلود ناموفق بود",
                        icon: "error",
                        confirmButtonText: "باشه"
                    });
                }
            } else {
            }
        };

        handleUploadSuccess();
    }, [uploadSuccess, dispatch]);


    return (
        <form onSubmit={handleSubmit} style={styles.form} className="bg-bgcard">
            <h2 style={styles.title}>🎵 آپلود آهنگ جدید</h2>

            <label style={styles.label}>فایل صوتی:</label>
            <input type="file" accept="audio/*" onChange={handleFileChange} style={styles.inputFile} />

            <label style={styles.label}>نام آهنگ:</label>
            <input
                type="text"
                placeholder="مثال: پرواز"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                style={styles.input}
            />

            <label style={styles.label}>نام خواننده:</label>
            <input
                type="text"
                placeholder="مثال: شجریان"
                value={artist}
                onChange={(e) => setArtist(e.target.value)}
                style={styles.input}
            />

            <button type="submit" disabled={isLoadingUploadTrack} style={styles.button}>
                {isLoadingUploadTrack ? "در حال آپلود..." : "آپلود 🎧"}
            </button>

            {errorUploadTrack && <p style={styles.error}>{errorUploadTrack}</p>}
        </form>
    );
}

const styles = {
    form: {
        color: "#fff",
        padding: "24px",
        borderRadius: "10px",
        maxWidth: "400px",
        margin: "30px auto",
        boxShadow: "0 0 15px rgba(0,0,0,0.3)",
        display: "flex",
        flexDirection: "column",
        gap: "12px",
        fontFamily: "Tahoma, sans-serif",
        marginTop: "10rem"
    },
    title: {
        textAlign: "center",
        fontSize: "22px",
        marginBottom: "16px",
        color: "#00e676"
    },
    label: {
        fontSize: "14px",
        marginBottom: "-4px",
    },
    input: {
        padding: "10px",
        borderRadius: "6px",
        border: "1px solid #555",
        backgroundColor: "#2b2b2b",
        color: "#fff",
    },
    inputFile: {
        padding: "8px",
        borderRadius: "6px",
        backgroundColor: "#2b2b2b",
        color: "#fff",
        border: "1px dashed #555",
    },
    button: {
        marginTop: "16px",
        padding: "12px",
        border: "none",
        borderRadius: "6px",
        backgroundColor: "#00e676",
        color: "#000",
        fontWeight: "bold",
        cursor: "pointer",
        fontSize: "16px",
    },
    error: {
        color: "red",
        marginTop: "10px",
        textAlign: "center"
    }
};

export default UploadMusic;
