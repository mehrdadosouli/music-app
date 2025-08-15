const express = require('express');
const app = express();
const PORT = 4000;
const cors = require('cors');
app.use('/static', express.static('public'));

app.use(cors());
const artists = [
  {
    id: '1',
    name: 'محمدرضا شجریان',
    bio: 'محمدرضا شجریان از بزرگ‌ترین استادان موسیقی سنتی ایرانی بود.',
    photo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/28/Mohammad_Reza_Shajarian_2012.jpg/220px-Mohammad_Reza_Shajarian_2012.jpg',
  },
  {
    id: '2',
    name: 'همایون شجریان',
    bio: 'خواننده و موسیقیدان ایرانی و فرزند محمدرضا شجریان.',
    photo: 'https://upload.wikimedia.org/wikipedia/commons/3/3f/Homayoun_Shajarian_2019.jpg',
  },
  {
    id: '3',
    name: 'محسن یگانه',
    bio: 'خواننده، ترانه‌سرا و آهنگساز پاپ ایرانی.',
    photo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/3a/Mohsen_Yeganeh_1399_%28cropped%29.jpg/220px-Mohsen_Yeganeh_1399_%28cropped%29.jpg',
  },
  {
    id: '4',
    name: 'محمدرضا شجریان',
    bio: 'محمدرضا شجریان یکی از مشهورترین خوانندگان موسیقی پاپ ایران است.',
    photo: 'http://localhost:4000/static/photos/محمدرضا شجریان.jpg',
  },
  {
    id: '5',
    name: 'سیروان خسروی',
    bio: 'خواننده، آهنگساز و تنظیم‌کننده موسیقی پاپ ایرانی.',
    photo: 'https://upload.wikimedia.org/wikipedia/commons/e/e6/Siavash_Khosravi_1393.jpg',
  },
];

// آلبوم‌ها

const albums = [
  { id: '100', title: 'آلبوم شیدایی', artistId: '1', release_date: '2000-01-01', cover_url: 'http://localhost:4000/static/photos/محمدرضا شجریان.jpg',description:"لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ و با استفاده از طراحان گرافیک است. چاپگرها و متون بلکه روزنامه و مجله در ستون و سطرآنچنان که لازم است و برای شرایط فعلی تکنولوژی مورد نیاز و کاربردهای متنوع با هدف بهبود" },
  { id: '101', title: 'آلبوم نسیم بیداری', artistId: '2', release_date: '2015-06-12', cover_url: 'http://localhost:4000/static/photos/محسن یگانه.jpg',description:"لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ و با استفاده از طراحان گرافیک است. چاپگرها و متون بلکه روزنامه و مجله در ستون و سطرآنچنان که لازم است و برای شرایط فعلی تکنولوژی مورد نیاز و کاربردهای متنوع با هدف بهبود" },
  { id: '102', title: 'آلبوم رگ خواب', artistId: '3', release_date: '2017-09-20', cover_url: 'http://localhost:4000/static/photos/محسن یگانه.jpg',description:"لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ و با استفاده از طراحان گرافیک است. چاپگرها و متون بلکه روزنامه و مجله در ستون و سطرآنچنان که لازم است و برای شرایط فعلی تکنولوژی مورد نیاز و کاربردهای متنوع با هدف بهبود" },
  { id: '103', title: 'آلبوم کنار پرچین‌ها', artistId: '4', release_date: '1992-11-11', cover_url: 'https://upload.wikimedia.org/wikipedia/en/3/38/Kenar_Parchinha.jpg' ,description:"لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ و با استفاده از طراحان گرافیک است. چاپگرها و متون بلکه روزنامه و مجله در ستون و سطرآنچنان که لازم است و برای شرایط فعلی تکنولوژی مورد نیاز و کاربردهای متنوع با هدف بهبود"},
  { id: '104', title: 'آلبوم تیک تاک', artistId: '5', release_date: '2013-04-15', cover_url: 'http://localhost:4000/static/photos/سیروان خسروی.jpg',description:"لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ و با استفاده از طراحان گرافیک است. چاپگرها و متون بلکه روزنامه و مجله در ستون و سطرآنچنان که لازم است و برای شرایط فعلی تکنولوژی مورد نیاز و کاربردهای متنوع با هدف بهبود" },
];

// ترک‌ها

const tracks = [
  {
    id: '1000',
    title: 'بیداد',
    artistId: '1',
    artistName: 'محمدرضا شجریان',
    albumId: '100',
    duration: 300,
    genre: 'Classical Persian',
    style: 'Classical',
    score: 9,
    cover_url: 'http://localhost:4000/static/photos/محمدرضا شجریان.jpg',
    stream_url: 'https://example.com/stream/1000',
    download_url: 'https://example.com/download/1000',
    lyrics: 'بیداد از آلبوم شیدایی از محمدرضا شجریان',
    release_date: '2000-01-01',
    albumTitle: 'آلبوم شیدایی',
  },
  {
    id: '1001',
    title: 'مرغ سحر',
    artistId: '1',
    artistName: 'محمدرضا شجریان',
    albumId: '100',
    duration: 320,
    genre: 'Classical Persian',
    style: 'Classical',
    score: 8.5,
    cover_url: 'http://localhost:4000/static/photos/محمدرضا شجریان.jpg',
    stream_url: 'https://example.com/stream/1001',
    download_url: 'https://example.com/download/1001',
    lyrics: 'مرغ سحر از آلبوم شیدایی از محمدرضا شجریان',
    release_date: '2000-01-01',
    albumTitle: 'آلبوم شیدایی',
  },
  {
    id: '1002',
    title: 'چرا رفتی',
    artistId: '1',
    artistName: 'محمدرضا شجریان',
    albumId: '100',
    duration: 280,
    genre: 'Classical Persian',
    style: 'Classical',
    score: 8,
    cover_url: 'http://localhost:4000/static/photos/محمدرضا شجریان.jpg',
    stream_url: 'https://example.com/stream/1002',
    download_url: 'https://example.com/download/1002',
    lyrics: 'چرا رفتی از آلبوم شیدایی از محمدرضا شجریان',
    release_date: '2000-01-01',
    albumTitle: 'آلبوم شیدایی',
  },

  {
    id: '2000',
    title: 'دل شیدا',
    artistId: '2',
    artistName: 'همایون شجریان',
    albumId: '101',
    duration: 250,
    genre: 'Persian Traditional',
    style: 'Traditional',
    score: 8.7,
    cover_url: 'http://localhost:4000/static/photos/محسن یگانه.jpg',
    stream_url: 'https://example.com/stream/2000',
    download_url: 'https://example.com/download/2000',
    lyrics: 'دل شیدا از آلبوم نسیم وصل از همایون شجریان',
    release_date: '2015-06-12',
    albumTitle: 'آلبوم نسیم بیداری',
  },
  {
    id: '2001',
    title: 'شب دهم',
    artistId: '2',
    artistName: 'همایون شجریان',
    albumId: '101',
    duration: 270,
    genre: 'Persian Traditional',
    style: 'Traditional',
    score: 8.4,
    cover_url: 'http://localhost:4000/static/photos/محسن یگانه.jpg',
    stream_url: 'https://example.com/stream/2001',
    download_url: 'https://example.com/download/2001',
    lyrics: 'شب دهم از آلبوم نسیم وصل از همایون شجریان',
    release_date: '2015-06-12',
    albumTitle: 'آلبوم نسیم بیداری',
  },
  {
    id: '2002',
    title: 'گل نازم',
    artistId: '2',
    artistName: 'همایون شجریان',
    albumId: '101',
    duration: 260,
    genre: 'Persian Traditional',
    style: 'Traditional',
    score: 8.6,
    cover_url: 'http://localhost:4000/static/photos/محسن یگانه.jpg',
    stream_url: 'https://example.com/stream/2002',
    download_url: 'https://example.com/download/2002',
    lyrics: 'گل نازم از آلبوم نسیم وصل از همایون شجریان',
    release_date: '2015-06-12',
    albumTitle: 'آلبوم نسیم بیداری',
  },

  {
    id: '3000',
    title: 'عاشق که می‌شوی',
    artistId: '3',
    artistName: 'محسن یگانه',
    albumId: '102',
    duration: 240,
    genre: 'Pop',
    style: 'Pop',
    score: 7.9,
    cover_url: 'http://localhost:4000/static/photos/محسن یگانه.jpg',
    stream_url: 'https://example.com/stream/3000',
    download_url: 'https://example.com/download/3000',
    lyrics: 'عاشق که می‌شوی از آلبوم رگ خواب از محسن یگانه',
    release_date: '2017-09-20',
    albumTitle: 'آلبوم رگ خواب',
  },
  {
    id: '3001',
    title: 'رگ خواب',
    artistId: '3',
    artistName: 'محسن یگانه',
    albumId: '102',
    duration: 220,
    genre: 'Pop',
    style: 'Pop',
    score: 8.1,
    cover_url: 'http://localhost:4000/static/photos/محسن یگانه.jpg',
    stream_url: 'https://example.com/stream/3001',
    download_url: 'https://example.com/download/3001',
    lyrics: 'رگ خواب از آلبوم رگ خواب از محسن یگانه',
    release_date: '2017-09-20',
    albumTitle: 'آلبوم رگ خواب',
  },
  {
    id: '3002',
    title: 'برگرد',
    artistId: '3',
    artistName: 'محسن یگانه',
    albumId: '102',
    duration: 230,
    genre: 'Pop',
    style: 'Pop',
    score: 7.8,
    cover_url: 'http://localhost:4000/static/photos/محسن یگانه.jpg',
    stream_url: 'https://example.com/stream/3002',
    download_url: 'https://example.com/download/3002',
    lyrics: 'برگرد از آلبوم رگ خواب از محسن یگانه',
    release_date: '2017-09-20',
    albumTitle: 'آلبوم رگ خواب',
  },

  {
    id: '4000',
    title: 'کلبه',
    artistId: '4',
    artistName: 'محمدرضا شجریان',
    albumId: '103',
    duration: 260,
    genre: 'Pop',
    style: 'Pop',
    score: 7.5,
    cover_url: 'http://localhost:4000/static/photos/محمدرضا شجریان.jpg',
    stream_url: 'https://example.com/stream/4000',
    download_url: 'https://example.com/download/4000',
    lyrics: 'کلبه از آلبوم کنار پرچین‌ها از محمدرضا شجریان',
    release_date: '1992-11-11',
    albumTitle: 'آلبوم کنار پرچین‌ها',
  },
  {
    id: '4001',
    title: 'شاید',
    artistId: '4',
    artistName: 'محمدرضا شجریان',
    albumId: '103',
    duration: 250,
    genre: 'Pop',
    style: 'Pop',
    score: 7.6,
    cover_url: 'http://localhost:4000/static/photos/محمدرضا شجریان.jpg',
    stream_url: 'https://example.com/stream/4001',
    download_url: 'https://example.com/download/4001',
    lyrics: 'شاید از آلبوم کنار پرچین‌ها از محمدرضا شجریان',
    release_date: '1992-11-11',
    albumTitle: 'آلبوم کنار پرچین‌ها',
  },
  {
    id: '4002',
    title: 'خاطره',
    artistId: '4',
    artistName: 'محمدرضا شجریان',
    albumId: '103',
    duration: 270,
    genre: 'Pop',
    style: 'Pop',
    score: 7.7,
    cover_url: 'http://localhost:4000/static/photos/محمدرضا شجریان.jpg',
    stream_url: 'https://example.com/stream/4002',
    download_url: 'https://example.com/download/4002',
    lyrics: 'خاطره از آلبوم کنار پرچین‌ها از محمدرضا شجریان',
    release_date: '1992-11-11',
    albumTitle: 'آلبوم کنار پرچین‌ها',
  },

  {
    id: '5000',
    title: 'تیک تاک',
    artistId: '5',
    artistName: 'سیروان خسروی',
    albumId: '104',
    duration: 210,
    genre: 'Pop',
    style: 'Pop',
    score: 7.9,
    cover_url: 'http://localhost:4000/static/photos/سیروان خسروی.jpg',
    stream_url: 'https://example.com/stream/5000',
    download_url: 'https://example.com/download/5000',
    lyrics: 'تیک تاک از آلبوم تیک تاک از سیروان خسروی',
    release_date: '2013-04-15',
    albumTitle: 'آلبوم تیک تاک',
  },
  {
    id: '5001',
    title: 'برف',
    artistId: '5',
    artistName: 'سیروان خسروی',
    albumId: '104',
    duration: 220,
    genre: 'Pop',
    style: 'Pop',
    score: 7.4,
    cover_url: 'http://localhost:4000/static/photos/سیروان خسروی.jpg',
    stream_url: 'https://example.com/stream/5001',
    download_url: 'https://example.com/download/5001',
    lyrics: 'برف از آلبوم تیک تاک از سیروان خسروی',
    release_date: '2013-04-15',
    albumTitle: 'آلبوم تیک تاک',
  },
  {
    id: '5002',
    title: 'رویا',
    artistId: '5',
    artistName: 'سیروان خسروی',
    albumId: '104',
    duration: 230,
    genre: 'Pop',
    style: 'Pop',
    score: 7.8,
    cover_url: 'http://localhost:4000/static/photos/سیروان خسروی.jpg',
    stream_url: 'https://example.com/stream/5002',
    download_url: 'https://example.com/download/5002',
    lyrics: 'رویا از آلبوم تیک تاک از سیروان خسروی',
    release_date: '2013-04-15',
    albumTitle: 'آلبوم تیک تاک',
  },
];

// Middleware
app.use(express.json());

// جستجو (بر اساس نام ترک، خواننده، آلبوم)
app.get('/search', (req, res) => {
  const q = req.query.q ? req.query.q.toLowerCase() : '';
  if (!q) return res.status(400).json({ error: 'پارامتر q لازم است' });

  const trackResults = tracks.filter(t => t.title.toLowerCase().includes(q));
  const artistResults = artists.filter(a => a.name.toLowerCase().includes(q));
  const albumResults = albums.filter(a => a.title.toLowerCase().includes(q));

  res.json({
    tracks: trackResults,
    artists: artistResults,
    albums: albumResults,
  });
});

// اطلاعات ترک
app.get('/track/:id', (req, res) => {
  const track = tracks.find(t => t.id === req.params.id);
  if (!track) return res.status(404).json({ error: 'ترک پیدا نشد' });
  res.json(track);
});

// اطلاعات آلبوم همراه با ترک‌ها
app.get('/album/:id', (req, res) => {
  const album = albums.find(a => a.id === req.params.id);
  if (!album) return res.status(404).json({ error: 'آلبوم پیدا نشد' });
  const albumTracks = tracks.filter(t => t.albumId === album.id);
  res.json({ ...album, tracks: albumTracks });
});

// اطلاعات خواننده همراه با آلبوم‌ها و ترک‌ها
app.get('/artist/:id', (req, res) => {
  const artist = artists.find(a => a.id === req.params.id);
  if (!artist) return res.status(404).json({ error: 'خواننده پیدا نشد' });

  const artistAlbums = albums.filter(a => a.artistId === artist.id);
  const artistTracks = tracks.filter(t => t.artistId === artist.id);

  res.json({ ...artist, albums: artistAlbums, tracks: artistTracks });
});

// متن ترانه
app.get('/lyrics/:track_id', (req, res) => {
  const track = tracks.find(t => t.id === req.params.track_id);
  if (!track) return res.status(404).json({ error: 'ترک پیدا نشد' });
  res.json({ lyrics: track.lyrics });
});

// چارت (5 ترک اول)
app.get('/charts/top', (req, res) => {
  res.json(tracks.slice(0, 5));
});

// استارت سرور
app.listen(PORT, () => {
  console.log(`API موزیک در حال اجرا روی http://localhost:${PORT}`);
});
