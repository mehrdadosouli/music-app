import { removePlayList } from "~/redux/features/music/musicSlice";
import Swal from "sweetalert2";

function SwallDelete(dispatch, item) {
  return Swal.fire({
    title: "آیا مطمئن هستید؟",
    text: "این عمل قابل بازگشت نیست!",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "بله، حذف کن!",
  }).then((result) => {
    if (result.isConfirmed) {
      dispatch(removePlayList(item));
      Swal.fire({
        title: "حذف شد!",
        text: "فایل شما با موفقیت حذف شد.",
        icon: "success",
      });
    }
  });
}

export default SwallDelete;
