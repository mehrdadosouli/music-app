import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchUploadTrack, fetchAllTracksUploaded } from "~/redux/features/music/musicSlice";

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

    dispatch(fetchUploadTrack({ file, customTitle: title, customArtist: artist }));
  };

  useEffect(() => {
    if (uploadSuccess) {
      setFile(null);
      setTitle("");
      setArtist("");
      dispatch(fetchAllTracksUploaded());
    }
  }, [uploadSuccess, dispatch]);

  return (
    <form onSubmit={handleSubmit}>
      <input type="file" accept="audio/*" onChange={handleFileChange} />
      <input
        type="text"
        placeholder="نام آهنگ (اختیاری)"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <input
        type="text"
        placeholder="نام خواننده (اختیاری)"
        value={artist}
        onChange={(e) => setArtist(e.target.value)}
      />
      <button type="submit" disabled={isLoadingUploadTrack}>
        {isLoadingUploadTrack ? "در حال آپلود..." : "آپلود آهنگ"}
      </button>
      {errorUploadTrack && <p style={{ color: "red" }}>{errorUploadTrack}</p>}
    </form>
  );
}

export default UploadMusic;
