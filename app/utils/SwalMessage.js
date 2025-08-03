import Swal from 'sweetalert2';

function SwalMessage({ title, text, icon, confirmButtonText }) {
    return Swal.fire({
        title: title || "پیام",
        text: text || "عملیاتی انجام شده است.",
        icon: icon || "info",
        confirmButtonText: confirmButtonText || "باشه"
    });
}

export default SwalMessage;
