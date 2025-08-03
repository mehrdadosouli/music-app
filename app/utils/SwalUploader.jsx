import Swal from 'sweetalert2';

const SwalUploader = async () => {
  let selectedFile = null;
  let songName = '';
  let artistName = '';

  const { value: result } = await Swal.fire({
    title: "آپلود موسیقی",
    html: `
      <input type="file" id="file-input" accept="audio/*" style="margin-bottom: 10px;" />
      <input id="swal-input1" class="swal2-input" placeholder="نام آهنگ (اختیاری)" />
      <input id="swal-input2" class="swal2-input" placeholder="نام خواننده (اختیاری)" />
    `,
    focusConfirm: false,
    didOpen: () => {
      const fileInput = document.getElementById('file-input');
      fileInput.addEventListener('change', (e) => {
        selectedFile = e.target.files[0];
      });
    },
    preConfirm: () => {
      songName = document.getElementById('swal-input1').value;
      artistName = document.getElementById('swal-input2').value;

      if (!selectedFile) {
        Swal.showValidationMessage('لطفا یک فایل صوتی انتخاب کنید.');
        return false;
      }
      return {
        file: selectedFile,
        title: songName,
        artist: artistName,
      };
    },
    showCancelButton: true,
    confirmButtonText: "آپلود آهنگ",
    cancelButtonText: "لغو"
  });

  return result || null;
};

export default SwalUploader;
