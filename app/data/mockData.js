export const albums = [
  { id: '100', title: 'آلبوم شیدایی', artistId: '1', release_date: '2000-01-01', cover_url: '/assets/photos/محمدرضا شجریان.jpg', description: "لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ و ..." },
  { id: '101', title: 'آلبوم نسیم بیداری', artistId: '2', release_date: '2015-06-12', cover_url: '/assets/photos/محسن یگانه.jpg', description: "لورم ایپسوم متن ساختگی ..." },
];

export const tracks = [
  { id: '1000', title: 'بیداد', artistId: '1', artistName: 'محمدرضا شجریان', albumId: '100', duration: 300, genre: 'Classical Persian', style: 'Classical', score: 9, cover_url: '/assets/photos/محمدرضا شجریان.jpg', lyrics: 'بیداد از آلبوم شیدایی از محمدرضا شجریان', release_date: '2000-01-01', albumTitle: 'آلبوم شیدایی' },
  { id: '1001', title: 'مرغ سحر', artistId: '1', artistName: 'محمدرضا شجریان', albumId: '100', duration: 320, genre: 'Classical Persian', style: 'Classical', score: 8.5, cover_url: '/assets/photos/محمدرضا شجریان.jpg', lyrics: 'مرغ سحر از آلبوم شیدایی از محمدرضا شجریان', release_date: '2000-01-01', albumTitle: 'آلبوم شیدایی' },
];

export const artists = [
  { id: '1', name: 'محمدرضا شجریان', bio: 'محمدرضا شجریان از بزرگ‌ترین استادان موسیقی سنتی ایرانی بود.', photo: '/assets/photos/محمدرضا شجریان.jpg' },
  { id: '2', name: 'محسن یگانه', bio: 'خواننده، ترانه‌سرا و آهنگساز پاپ ایرانی.', photo: '/assets/photos/محسن یگانه.jpg' },
]; 