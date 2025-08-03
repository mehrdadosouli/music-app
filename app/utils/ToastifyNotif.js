import SwalMessage from './SwalMessage.js';
import SwalUploader from './SwalUploader'; 

const ToastifyNotif = async (dispatch) => {
    const result = await SwalUploader();

    if (result && result.file) {
        if (dispatch) {
            try {
                const { funcUploadTrack, fetchAllTracksUploaded } = await import('~/redux/features/music/musicSlice');
                const uploadResult = await dispatch(funcUploadTrack({
                    file: result.file,
                    customTitle: result.title,
                    customArtist: result.artist
                }));

                if (uploadResult.meta.requestStatus === 'fulfilled') {
                    await dispatch(fetchAllTracksUploaded());
                    await SwalMessage({
                        title: "موفقیت!",
                        text: "آهنگ با موفقیت آپلود شد",
                        icon: "success",
                        confirmButtonText: "باشه"
                    });

                } else {
                    await SwalMessage({
                        title: "خطا!",
                        text: "آپلود ناموفق بود",
                        icon: "error",
                        confirmButtonText: "باشه"
                    });
                }

            } catch (error) {
                await SwalMessage({
                    title: "خطا!",
                    text: error.message || "خطا در آپلود فایل",
                    icon: "error",
                    confirmButtonText: "باشه"
                });
            }
        } else {
            await SwalMessage({
                title: "خطا!",
                text: "❌ dispatch خطا در",
                icon: "error",
                confirmButtonText: "باشه"
            });
        }

        return {
            artistName: result.artist,
            songName: result.title,
            file: result.file
        };
    }

    return { artistName: '', songName: '', file: null };
};

export default ToastifyNotif;
