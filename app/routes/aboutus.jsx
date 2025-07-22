import { Link } from "react-router";

export function meta() {
  return [
    { title: "درباره ما | موزیک پلیر" },
    { name: "description", content: "ارتباط با ما در موزیک پلیر" },
  ];
}

export default function AboutUs() {
  return (
    <section className="bg-bgbody mt-28 ">
      <div className="px-6 py-12 mx-auto">
        <div className="lg:flex lg:items-start lg:-mx-6 flex-col-reverse lg:flex-row">

          {/* فرم تماس */}
          <div className="mt-8 lg:w-1/2 lg:mx-6">
            <div className="w-full px-8 py-10 mx-auto overflow-hidden bg-white rounded-lg shadow-2xl  lg:max-w-xl shadow-gray-300/50 ">
              <h1 className="text-lg font-medium text-primarytxt">چه سوالی دارید؟</h1>

              <form className="mt-6">
                <div>
                  <label className="block mb-2 text-sm text-primarytxt">نام کامل</label>
                  <input type="text" placeholder="مثلاً علی رضایی"
                    className="block w-full px-5 py-3 mt-2 text-primarytxt placeholder-gray-400 bg-white border border-gray-200 rounded-md focus:border-blue-400 focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40"
                  />
                </div>

                <div className="mt-6">
                  <label className="block mb-2 text-sm text-primarytxt">ایمیل</label>
                  <input type="email" placeholder="example@email.com"
                    className="block w-full px-5 py-3 mt-2 text-primarytxt placeholder-gray-400 bg-white border border-gray-200 rounded-md focus:border-blue-400 focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40"
                  />
                </div>

                <div className="mt-6">
                  <label className="block mb-2 text-sm text-primarytxt">پیام شما</label>
                  <textarea placeholder="پیامتان را اینجا بنویسید..."
                    className="block w-full h-32 px-5 py-3 mt-2 text-primarytxt placeholder-gray-400 bg-white border border-gray-200 rounded-md md:h-48 focus:border-blue-400 focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40"
                  ></textarea>
                </div>

                <button
                  className="w-full px-6 py-3 mt-6 text-sm font-medium tracking-wide text-white bg-blue-500 rounded-md hover:bg-blue-400 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-50"
                >
                  ارسال پیام
                </button>
              </form>
            </div>
          </div>

          {/* اطلاعات تماس + نقشه */}
          <div className="lg:w-1/2 lg:mx-6">
            <h1 className="text-2xl font-semibold text-primarytxt :text-white lg:text-3xl">
              با ما در تماس باشید
            </h1>

            <div className="mt-6 space-y-6 text-primarytxt :text-primarytxt">
              <div className="flex items-start">
                <span className="w-6 h-6 text-blue-500 :text-blue-400 mr-2">
                  📍
                </span>
                <span>امام زاده حسن , تهران،</span>
              </div>

              <div className="flex items-start">
                <span className="w-6 h-6 text-blue-500 :text-blue-400 mr-2">
                  📞
                </span>
                <span>09905354491</span>
              </div>

              <div className="flex items-start">
                <span className="w-6 h-6 text-blue-500 :text-blue-400 mr-2">
                  ✉️
                </span>
                <span>mehrdadosoulisaran@gmail.com</span>
              </div>
            </div>

            {/* شبکه‌های اجتماعی */}
            <div className="mt-8">
              <h3 className="text-primarytxt :text-primarytxt">ما را دنبال کنید:</h3>
              <div className="flex mt-4 space-x-4 rtl:space-x-reverse">
                <Link to="" className="hover:text-blue-500 :hover:text-blue-400">🌐</Link>
                <Link to="" className="hover:text-blue-500 :hover:text-blue-400">🐦</Link>
                <Link to="" className="hover:text-blue-500 :hover:text-blue-400">📸</Link>
                <Link to="" className="hover:text-blue-500 :hover:text-blue-400">📘</Link>
              </div>
            </div>

            {/* نقشه گوگل */}
            <div className="mt-8 rounded-lg overflow-hidden shadow-lg ring-1 ring-gray-300 :ring-gray-700">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3239.000915743809!2d51.3370406!3d35.7002385!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3f8e0192e84e282f%3A0x6bb7351c207b2b38!2sAzadi%20St%2C%20Tehran!5e0!3m2!1sen!2s!4v1700000000000"
                width="100%"
                height="250"
                style={{ border: 0 }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="map"
              ></iframe>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
