
function Footer() {
  return (
    <footer className="w-full bg-bgbody text-primary pt-10 pb-4 px-4 md:px-16 border-t border-gray-700">
      <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-10 mx-auto">
        {/* About */}
        <div className="md:w-1/3">
          <h3 className="font-bold text-lg mb-2">درباره ما</h3>
          <p className="text-sm leading-7 text-footertxt">
            ملودیز یک وب‌سایت موزیک است که بیش از <span className="text-pink-400">۵ سال</span> فعالیت دارد و یکی از معروف‌ترین سایت‌های پخش موزیک در جهان است. در این سایت می‌توانید به صورت رایگان به آهنگ‌ها گوش دهید و دانلود کنید. همچنین اگر محدودیت نمی‌خواهید، می‌توانید <a href="#" className="text-sky-400 underline">اکانت ویژه</a> تهیه کنید.
          </p>
        </div>
        {/* Links */}
        <div className="flex flex-col md:flex-row gap-8 md:gap-40 justify-between">
          <div>
            <h4 className="font-bold border-b border-white/40 pb-1 mb-2 w-fit">ملودیز</h4>
            <ul className="text-sm space-y-2 text-footertxt">
              <li><a href="#">آهنگ‌ها</a></li>
              <li><a href="#">رادیو</a></li>
              <li><a href="#">پادکست</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold border-b border-white/40 pb-1 mb-2 w-fit">دسترسی</h4>
            <ul className="text-sm space-y-2 text-footertxt">
              <li><a href="#">اکسپلور</a></li>
              <li><a href="#">خواننده‌ها</a></li>
              <li><a href="#">پلی‌لیست‌ها</a></li>
              <li><a href="#">آلبوم‌ها</a></li>
              <li><a href="#">داغ‌ترین‌ها</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold border-b border-white/40 pb-1 mb-2 w-fit">ارتباط</h4>
            <ul className="text-sm space-y-2 text-footertxt">
              <li><a href="#">درباره ما</a></li>
              <li><a href="#">قوانین</a></li>
              <li><a href="#">شبکه‌های اجتماعی</a></li>
              <li><a href="#">پشتیبانی</a></li>
            </ul>
          </div>
        </div>
        {/* Logo & Socials */}
        <div className="flex flex-col items-center md:items-end gap-4 min-w-[160px]">
          <span className="text-3xl font-extrabold bg-gradient-to-l from-pink-500 to-sky-400 bg-clip-text text-transparent select-none">ملودیز</span>
          <div className="flex gap-4 mt-2">
            {/* Facebook */}
            <a href="#" aria-label="فیسبوک" className="hover:scale-110 transition"><svg width="22" height="22" fill="none" viewBox="0 0 24 24"><path fill="currentColor" d="M17.525 8.998h-2.02V7.498c0-.48.32-.592.544-.592h1.456V4.998h-1.96c-2.16 0-2.12 1.68-2.12 2.4v1.6h-1.44v2.4h1.44v6.6h2.56v-6.6h1.68l.36-2.4z"/></svg></a>
            {/* Instagram */}
            <a href="#" aria-label="اینستاگرام" className="hover:scale-110 transition"><svg width="22" height="22" fill="none" viewBox="0 0 24 24"><rect width="16" height="16" x="4" y="4" rx="5" stroke="currentColor" strokeWidth="2"/><circle cx="12" cy="12" r="3.5" stroke="currentColor" strokeWidth="2"/><circle cx="17.5" cy="6.5" r="1" fill="currentColor"/></svg></a>
            {/* Twitter */}
            <a href="#" aria-label="توییتر" className="hover:scale-110 transition"><svg width="22" height="22" fill="none" viewBox="0 0 24 24"><path fill="currentColor" d="M21.5 6.5a8.38 8.38 0 0 1-2.36.65A4.13 4.13 0 0 0 21 5.15a8.19 8.19 0 0 1-2.6 1A4.11 4.11 0 0 0 12 9.5c0 .32.04.64.1.94A11.65 11.65 0 0 1 3.5 5.5s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5 0-.18 0-.36-.01-.54A7.72 7.72 0 0 0 22 6.92a8.2 8.2 0 0 1-2.5.68z"/></svg></a>
            {/* Phone */}
            <a href="#" aria-label="تلفن" className="hover:scale-110 transition"><svg width="22" height="22" fill="none" viewBox="0 0 24 24"><path fill="currentColor" d="M6.62 10.79a15.053 15.053 0 0 0 6.59 6.59l2.2-2.2a1 1 0 0 1 1.01-.24c1.12.37 2.33.57 3.58.57a1 1 0 0 1 1 1V20a1 1 0 0 1-1 1C10.07 21 3 13.93 3 5a1 1 0 0 1 1-1h3.5a1 1 0 0 1 1 1c0 1.25.2 2.46.57 3.58a1 1 0 0 1-.24 1.01l-2.2 2.2z"/></svg></a>
          </div>
        </div>
      </div>
      <div className="text-center text-xs text-gray-500 mt-8">© {new Date().getFullYear()} ملودیز - تمامی حقوق محفوظ است.</div>
    </footer>
  );
}

export default Footer;