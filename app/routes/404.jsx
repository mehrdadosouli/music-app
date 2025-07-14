import { Link } from "react-router";

export function meta() {
  return [
    { title: "صفحه ی 404" },
    { name: "description", content: "صفحه مورد نظر پیدا نشد" },
  ];
}

export default function NotFound() {
  return (<div className="text-center p-8">
      <h1 className="text-4xl font-bold text-primarytxt">صفحه ای پیدا نشد</h1>
      <p className="text-xl text-gray-500 mt-4">خطایی رخ داده است. صفحه‌ای که به دنبال آن بودید یافت نشد.</p>
      <Link to="/" className="mt-6 inline-block text-blue-500 hover:text-blue-700">
        بازگشت به صفحه اصلی
      </Link>
    </div>);
}