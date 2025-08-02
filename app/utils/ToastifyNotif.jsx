import Swal from 'sweetalert2'

const ToastifyNotif = async (dispatch) => {
    let selectedFile = null;
    let artistName = '';
    let songName = '';

    const { value: result } = await Swal.fire({
        title: "آپلود موسیقی",
        html: `
          <input type="file" id="file-input" accept="audio/*" style="margin-bottom: 10px;">
          <input id="swal-input1" class="swal2-input" placeholder="نام آهنگ (اختیاری)">
          <input id="swal-input2" class="swal2-input" placeholder="نام خواننده (اختیاری)">
        `,
        focusConfirm: false,
        didOpen: () => {
            // اضافه کردن event listener برای فایل
            const fileInput = document.getElementById('file-input');
            fileInput.addEventListener('change', (e) => {
                selectedFile = e.target.files[0];
                console.log('فایل انتخاب شد:', selectedFile);
            });
        },
        preConfirm: () => {
            songName = document.getElementById("swal-input1").value;
            artistName = document.getElementById("swal-input2").value;
            
            if (!selectedFile) {
                Swal.showValidationMessage('لطفا یک فایل صوتی انتخاب کنید.');
                return false;
            }
            
            return {
                file: selectedFile,
                title: songName,
                artist: artistName
            };
        },
        showCancelButton: true,
        confirmButtonText: "آپلود آهنگ",
        cancelButtonText: "لغو"
    });

    // بررسی اینکه آیا کاربر فایل انتخاب کرده است
    if (result && result.file) {
        console.log('=== اطلاعات آپلود شده ===');
        console.log('نام خواننده:', result.artist);
        console.log('نام آهنگ:', result.title);
        console.log('نام فایل:', result.file.name);
        console.log('نوع فایل:', result.file.type);
        console.log('اندازه فایل:', (result.file.size / 1024 / 1024).toFixed(2), 'MB');
        console.log('========================');
        
        // Dispatch دقیقاً مثل UploadMusic
        if (dispatch) {
            try {
                // Import slice functions
                const { fetchUploadTrack, fetchAllTracksUploaded } = await import('~/redux/features/music/musicSlice');
                
                console.log('🚀 شروع آپلود...');
                
                // Dispatch آپلود
                const uploadResult = await dispatch(fetchUploadTrack({ 
                    file: result.file, 
                    customTitle: result.title, 
                    customArtist: result.artist 
                }));
                
                console.log('📤 نتیجه آپلود:', uploadResult);
                
                // بررسی موفقیت آپلود
                if (uploadResult.meta.requestStatus === 'fulfilled') {
                    console.log('✅ آپلود موفق - در حال به‌روزرسانی لیست...');
                    
                    // به‌روزرسانی لیست موسیقی‌ها
                    await dispatch(fetchAllTracksUploaded());
                    
                    // نمایش پیام موفقیت
                    Swal.fire({
                        title: "موفقیت!",
                        text: "آهنگ با موفقیت آپلود شد",
                        icon: "success",
                        confirmButtonText: "باشه"
                    });
                } else {
                    throw new Error('آپلود ناموفق بود');
                }
                
            } catch (error) {
                console.error('❌ خطا در آپلود:', error);
                Swal.fire({
                    title: "خطا!",
                    text: error.message || "خطا در آپلود فایل",
                    icon: "error",
                    confirmButtonText: "باشه"
                });
            }
        } else {
            console.error('❌ Dispatch function not available');
        }

        return { 
            artistName: result.artist, 
            songName: result.title, 
            file: result.file 
        };
    }

    return { artistName: '', songName: '', file: null };
}

export default ToastifyNotif;