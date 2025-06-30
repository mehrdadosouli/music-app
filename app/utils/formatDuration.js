function formatDuration(seconds) {
  // این شرط از نمایش NaN جلوگیری می‌کند
  if (!seconds || isNaN(seconds)) {
    return "00:00";
  }

  // این خط با Math.floor مشکل اعشار را برای همیشه حل می‌کند
  const totalSeconds = Math.floor(seconds);

  const min = Math.floor(totalSeconds / 60);
  const sec = totalSeconds % 60;

  // این دو خط از دو رقمی بودن اعداد اطمینان حاصل می‌کنند (مثلا 08)
  const formattedMin = String(min).padStart(2, "0");
  const formattedSec = String(sec).padStart(2, "0");

  return `${formattedMin}:${formattedSec}`;
}

// فراموش نکنید که تابع را export کنید تا در فایل‌های دیگر قابل استفاده باشد
export { formatDuration };