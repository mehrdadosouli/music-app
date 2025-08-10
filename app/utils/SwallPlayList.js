import Swal from "sweetalert2";
import { addMyPlayList } from "~/redux/features/music/musicSlice";

function SwallPlayList(dispatch) {
  return Swal.fire({
    title: "ساخت پلی لیست",
    input: "text",
    inputAttributes: {
      autocapitalize: "off",
    },
    showCancelButton: true,
    confirmButtonText: "ساختن",
    preConfirm: async (value) => {
      if (!value) {
        return Swal.showValidationMessage("لطفا اسمی برای پلی لیست انتخاب کنید");
      } 
      const getLocal=JSON.parse(localStorage.getItem('myPlayList')) || []
      const isDuplicate=getLocal.some(item=>item.name === value)
      if(isDuplicate) {
        return Swal.showValidationMessage("این نام قبلا استفاده شده، لطفا نام دیگری انتخاب کنید");
      }
    },
  }).then((result) => {
    if (result.isConfirmed) {
      const newPlaylist = {
        id: `playlist-${Date.now()}`,
        name: result.value,
        music: [],
      };
      dispatch(addMyPlayList(newPlaylist));
      Swal.fire({
        title: `با موفقیت پلی لیست ${result.value} ساخته شد`,
      });
    }
  });
}

export default SwallPlayList;
