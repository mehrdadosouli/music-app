import { Link } from "react-router";

export default function Banner() {
    return (
        <div className="w-full banner flex flex-col justify-center md:items-end md:pl-10 gap-5">
            <h4 className="text-white md:text-5xl text-2xl">تمام <span className="text-primary">بهترین آهنگ‌ها</span></h4>
            <h4 className="text-white md:text-5xl text-2xl">در یک جا گرد هم آمده‌اند</h4>
            <p className="md:w-[32rem] md:text-left text-sm text-white">
                در وب‌سایت ما، می‌توانید به مجموعه‌ای بی‌نظیر از آهنگ‌های محبوب و جدید دسترسی داشته باشید.
                ترانه‌های دلخواه خود را با کیفیت بالا پخش کنید و بدون هیچ وقفه‌ای لذت ببرید.
                هر سبک موسیقی که دوست دارید، همه‌اش اینجا منتظر شماست!
            </p>
            <div className="flex gap-5 mx-auto md:mx-0">
                <span className="md:w-36 w-32 h-8 md:text-base text-sm rounded-sm flex justify-center items-center text-white bg-primary hover:text-primary hover:bg-white border border-primary transition-all select-none" to="/signup">
                    همین حالا کشف کن
                </span>
                <Link className="md:w-36 w-32 h-8 md:text-base text-sm rounded-sm flex justify-center items-center text-secondary border border-secondary hover:text-white hover:bg-secondary transition-all select-none" to="/login">
                    ساخت لیست پخش
                </Link>
            </div>
        </div>
    )
}
