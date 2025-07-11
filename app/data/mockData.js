export const albums = [
  { id: '100', title: 'آلبوم شیدایی', artistId: '1', release_date: '2000-01-01', cover_url: '/photos/محمدرضا شجریان.jpg', description: "آلبوم سنتی از شجریان" },
  { id: '101', title: 'آلبوم تیک تاک', artistId: '2', release_date: '2013-04-15', cover_url: '/photos/محسن یگانه.jpg', description: "آلبوم پاپ از یگانه" },
  { id: '102', title: 'آلبوم خاطره', artistId: '3', release_date: '2017-09-20', cover_url: '/photos/سیروان خسروی.jpg', description: "آلبوم خاطره انگیز از سیروان" },
  { id: '103', title: 'آلبوم رویا', artistId: '4', release_date: '2019-05-10', cover_url: '/photos/ابی.jpg', description: "آلبوم رویا از ابی" },
  { id: '104', title: 'آلبوم آرایش غلیظ', artistId: '5', release_date: '2014-06-01', cover_url: '/photos/همایون شجریان.jpg', description: "آلبوم ز غلیظ از همایون شجریان" },
];

export const tracks = [
  { id: '1', title: 'بیداد', artistId: '1', artistName: 'محمدرضا شجریان', albumId: '100', duration: 300, genre: 'Classical', style: 'Classical', score: 9, cover_url: '/photos/محمدرضا شجریان.jpg', lyrics: '...', release_date: '2000-01-01', albumTitle: 'آلبوم شیدایی', src: '/music/1.mp3' },
  { id: '2000', title: 'تیک تاک', artistId: '2', artistName: 'محسن یگانه', albumId: '101', duration: 210, genre: 'Pop', style: 'Pop', score: 7.9, cover_url: '/photos/محسن یگانه.jpg', lyrics: '...', release_date: '2013-04-15', albumTitle: 'آلبوم تیک تاک', src: '/music/2000.mp3' },
  { id: '2001', title: 'برف', artistId: '2', artistName: 'محسن یگانه', albumId: '101', duration: 220, genre: 'Pop', style: 'Pop', score: 7.4, cover_url: '/photos/محسن یگانه.jpg', lyrics: '...', release_date: '2013-04-15', albumTitle: 'آلبوم تیک تاک', src: '/music/2001.mp3' },
  { id: '2002', title: 'خاطره', artistId: '3', artistName: 'سیروان خسروی', albumId: '102', duration: 270, genre: 'Pop', style: 'Pop', score: 7.7, cover_url: '/photos/سیروان خسروی.jpg', lyrics: '...', release_date: '2017-09-20', albumTitle: 'آلبوم خاطره', src: '/music/2002.mp3' },
  { id: '2003', title: 'آرایش غلیظ', artistId: '5', artistName: 'همایون شجریان', albumId: '104', duration: 250, genre: 'Fusion', style: 'Fusion', score: 8.5, cover_url: '/photos/همایون شجریان.jpg', lyrics: '...', release_date: '2014-06-01', albumTitle: 'آلبوم آرایش غلیظ', src: '/music/2000.mp3' },
];

export const artists = [
  { id: '1', name: 'محمدرضا شجریان', bio: 'محمدرضا شجریان از بزرگ‌ترین استادان موسیقی سنتی ایرانی بود.', photo: '/photos/محمدرضا شجریان.jpg' },
  { id: '2', name: 'محسن یگانه', bio: 'خواننده، ترانه‌سرا و آهنگساز پاپ ایرانی.', photo: '/photos/محسن یگانه.jpg' },
  { id: '3', name: 'سیروان خسروی', bio: 'خواننده خاطره انگیز.', photo: '/photos/سیروان خسروی.jpg' },
  { id: '4', name: 'ابی', bio: 'خواننده آلبوم رویا.', photo: '/photos/ابی.jpg' },
  { id: '5', name: 'همایون شجریان', bio: 'خواننده و نوازنده موسیقی سنتی ایرانی.', photo: '/photos/همایون شجریان.jpg' },
]; 