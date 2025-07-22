import { Link } from "react-router";

export function meta() {
  return [
    { title: "درباره ما" },
    { name: "description", content: "درباره سایت موزیک پلیر ما" },
  ];
}

export default function AboutUs() {
  return (
    <div className="py-16 bg-bgbody mt-28">
      <div className="container mx-auto px-6 text-primarytxt md:px-12 xl:px-6">
        <div className="space-y-6 md:space-y-0 md:flex md:gap-6 lg:items-center lg:gap-12">
          <div className="md:w-5/12 lg:w-5/12">
            <img
              src="/styles/headerimage.png"
              alt="تصویر درباره ما"
              loading="lazy"
              className="w-full rounded-lg"
            />
          </div>
          <div className="md:w-7/12 lg:w-6/12">
            <h2 className="text-2xl text-primarytxt font-bold md:text-4xl">
              بهترین تجربه گوش دادن موسیقی با موزیک پلیر ما
            </h2>
            <p className="mt-6 text-primarytxt">
              در سایت موزیک پلیر ما، شما به میلیون‌ها آهنگ با کیفیت بالا دسترسی دارید و می‌توانید لیست پخش دلخواه خود را بسازید و موسیقی‌های محبوبتان را به راحتی گوش دهید.
            </p>
            <p className="mt-4 text-primarytxt">
              ما با هدف ارائه تجربه‌ای ساده، سریع و دلنشین برای همه علاقه‌مندان به موسیقی، تلاش می‌کنیم همیشه در کنار شما باشیم و بهترین‌ها را ارائه دهیم.
            </p>
          </div>
        </div>
      </div>

      <div className="mt-8 rounded-lg overflow-hidden shadow-lg ring-1 ring-gray-300 dark:ring-gray-700">
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3239.000915743809!2d51.3370406!3d35.7002385!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3f8e0192e84e282f%3A0x6bb7351c207b2b38!2sAzadi%20St%2C%20Tehran!5e0!3m2!1sen!2s!4v1700000000000"
          width="100%"
          height="350"
          style={{ border: 0 }}
          allowFullScreen=""
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          title="نقشه محل ما"
        ></iframe>
      </div>
    </div>
  );
}
