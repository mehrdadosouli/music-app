import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { albums, tracks, artists } from "~/data/mockData";
import { supabase } from "../../../utils/supabaseClient";

const initialState = {
  currentTime: 0, // زمان فعلی پخش
  duration: 0, // مدت زمان کل آهنگ
  volume: 0.5,
  song: [],
  currentAudio: null,
  isPlaying: false,
  isPlayerVisible: false,
  topSongs: [],
  allSong: [],
  allAlbum: [],
  albumDetail: [],
  myFavoritemusic: [],
  likedMusic: null,
  isLoadingMyFavoritemusic: false,
  errorMyFavoritemusic: "",
  isLoading: false,
  error: "",
  track: null,
  trend: null,
  trackLoading: false,
  trackError: "",
  theme: "dark",
  btn: false,
  searchTrack: "",
  minusMusic: false,
  currentPage: 0,
  itemsPerPage: 0,
  isLoadingUploadTrack: false,
  UploadTrack: [],
  errorUploadTrack: "",
  uploadSuccess: false,
  FetchTrackUpload: [],
  isLoadingFetchTrackUpload: false,
  errorFetchTrackUpload: "",
};

export const funcUploadTrack = createAsyncThunk(
  "music/uploadTrack",
  async ({ file, customTitle, customArtist }, { rejectWithValue }) => {
    try {
      const fileNameWithoutExt = file.name.replace(/\.[^/.]+$/, "");
      const title =
        customTitle && customTitle.trim() !== ""
          ? customTitle
          : fileNameWithoutExt;
      const artistName = "trackBg";
      // const artistName = customArtist && customArtist.trim() !== "" ? customArtist : "artistName";

      const filePath = `music/${Date.now()}_${file.name}`;

      // آپلود فایل و گرفتن response
      const { data: uploadData, error: uploadError } = await supabase.storage
        .from("music-files")
        .upload(filePath, file, { upsert: false });

      if (uploadError) throw uploadError;

      // گرفتن URL صحیح از response آپلود
      const {
        data: { publicUrl },
      } = supabase.storage.from("music-files").getPublicUrl(uploadData.path);

      // درج رکورد تو جدول tracks بدون نیاز به user_id
      const { data: insertData, error: insertError } = await supabase
        .from("tracks")
        .insert([
          {
            title,
            artistName,
            src: publicUrl,
            // user_id را حذف کردیم چون anonymous upload می‌خواهیم
          },
        ])
        .select();

      if (insertError) throw insertError;

      return insertData[0];
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const fetchAllTracksUploaded = createAsyncThunk(
  "songs/fetchAllTracksUploaded",
  async (_, thunkAPI) => {
    try {
      const { data, error } = await supabase.from("tracks").select("*");

      if (error) throw error;

      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

// تابع برای گرفتن آلبوم‌های یکتا از بین ترک‌ها
function getUniqueAlbums(tracks) {
  const uniqueAlbums = {};
  const result = [];
  for (const track of tracks) {
    if (!uniqueAlbums[track.albumId]) {
      uniqueAlbums[track.albumId] = true;
      result.push(track);
    }
  }
  return result;
}

export const fetchTopSongs = createAsyncThunk(
  "songs/fetchTopSongs",
  async () => {
    const uniqueTracks = getUniqueAlbums(tracks);
    return uniqueTracks;
  }
);

export const fetchAllAlbum = createAsyncThunk(
  "songs/fetchAllAlbum",
  async () => {
    return albums;
  }
);

export const fetchTrendSongs = createAsyncThunk(
  "songs/fetchTrendSongs",
  async () => {
    const uniqueTracks = getUniqueAlbums(tracks);
    return uniqueTracks;
  }
);

export const fetchBestSongs = createAsyncThunk(
  "songs/fetchBestSongs",
  async () => {
    const bestSong = tracks.filter((music) => music.score >= 9).slice(0, 6);
    return bestSong;
  }
);

export const fetchAllSongs = createAsyncThunk(
  "songs/fetchAllSongs",
  async () => {
    return tracks;
  }
);

// توجه: trackId اینجا در واقع id آلبوم است
export const fetchTrackById = createAsyncThunk(
  "song/fetchTrackById",
  async (albumId) => {
    const album = albums.find((a) => a.id === albumId);
    if (!album) return null;
    const albumTracks = tracks.filter((t) => t.albumId === album.id);
    return { ...album, tracks: albumTracks };
  }
);

export const fetchAlbumDetail = createAsyncThunk(
  "song/fetchAlbumDetail",
  async (albumId) => {
    const album = albums.find((a) => a.id === albumId);
    if (!album) return null;
    const albumTracks = tracks.filter((t) => t.albumId === album.id);
    return { ...album, tracks: albumTracks };
  }
);

const musicSlice = createSlice({
  name: "music",
  initialState,
  reducers: {
    loadFavoriteMusic: (state) => {
      const savedFavorites =
        JSON.parse(localStorage.getItem("myfavorite")) || [];
      state.myFavoritemusic = savedFavorites;
    },
    addFavoriteMusic: (state, action) => {
      let getLocalItems = JSON.parse(localStorage.getItem("myfavorite")) || [];
      const track = action.payload;
      const findItem = getLocalItems.some((item) => item.id === track.id);

      let updatedFavorite;
      if (!findItem) {
        updatedFavorite = [...getLocalItems, track];
      } else {
        updatedFavorite = getLocalItems.filter((item) => item.id !== track.id);
      }
      state.myFavoritemusic = updatedFavorite;
      localStorage.setItem("myfavorite", JSON.stringify(updatedFavorite));
    },

    actionMoreOption: (state, action) => {
      if (state.likedMusic == action.payload) {
        state.likedMusic = null;
      } else {
        state.likedMusic = action.payload;
      }
    },
    actionBtn: (state, action) => {
      state.btn = !!action.payload;
    },
    setCurrentPage: (state, action) => {
      state.currentPage = action.payload;
    },
    setItemsPerPage: (state, action) => {
      state.itemsPerPage = action.payload;
    },
    setSearchTrack: (state, action) => {
      state.searchTrack = action.payload;
    },
    setTrackListMusic: (state, action) => {
      state.track = action.payload;
    },
    setMinustMusic: (state, action) => {
      state.minusMusic = action.payload;
    },
    playAudio: (state, action) => {
      state.currentAudio = action.payload;
      state.isPlaying = true;
      state.isPlayerVisible = true;
    },
    pauseAudio: (state) => {
      state.isPlaying = false;
    },
    setPlayerVisibility: (state, action) => {
      state.isPlayerVisible = action.payload;
    },
    setCurrentMusic: (state, action) => {
      state.currentAudio = action.payload;
    },
    setDurations: (state, action) => {
      state.duration = action.payload;
    },
    nextMusicBtn: (state, action) => {
      const allTracks = state.track;
      if (!allTracks) return;
      const tracksArray = allTracks.tracks ? allTracks.tracks : allTracks;
      const currentIndex = tracksArray.findIndex(
        (item) => item.id === action.payload.id
      );
      if (currentIndex === -1) return;
      const nextIndex = (currentIndex + 1) % tracksArray.length;
      state.currentAudio = tracksArray[nextIndex];
    },
    prevMusicBtn: (state, action) => {
      const allTracks = state.track;
      if (!allTracks) return;
      const tracksArray = allTracks.tracks ? allTracks.tracks : allTracks;
      const currentIndex = tracksArray.findIndex(
        (item) => item.id === action.payload.id
      );
      if (currentIndex === -1) return;
      const prevIndex =
        (currentIndex - 1 + tracksArray.length) % tracksArray.length;
      state.currentAudio = tracksArray[prevIndex];
    },
    setTheme(state, action) {
      state.theme = action.payload;
    },
    toggleTheme(state) {
      state.theme = state.theme === "light" ? "dark" : "light";
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchTopSongs.fulfilled, (state, action) => {
        state.topSongs = action.payload;
        state.isLoading = false;
        state.error = "";
      })
      .addCase(fetchTopSongs.pending, (state) => {
        state.isLoading = true;
        state.error = "";
      })
      .addCase(fetchTopSongs.rejected, (state, action) => {
        state.error = action.error.message;
        state.isLoading = false;
      })
      .addCase(fetchTrendSongs.fulfilled, (state, action) => {
        state.trend = action.payload;
        state.isLoading = false;
        state.error = "";
      })
      .addCase(fetchTrendSongs.pending, (state) => {
        state.isLoading = true;
        state.error = "";
      })
      .addCase(fetchTrendSongs.rejected, (state, action) => {
        state.error = action.error.message;
        state.isLoading = false;
      })
      .addCase(fetchAllAlbum.fulfilled, (state, action) => {
        state.allAlbum = action.payload;
        state.isLoading = false;
        state.error = "";
      })
      .addCase(fetchAllAlbum.pending, (state) => {
        state.isLoading = true;
        state.error = "";
      })
      .addCase(fetchAllAlbum.rejected, (state, action) => {
        state.error = action.error.message;
        state.isLoading = false;
      })
      .addCase(fetchTrackById.fulfilled, (state, action) => {
        state.track = action.payload;
        state.trackLoading = false;
        state.trackError = "";
      })
      .addCase(fetchAlbumDetail.fulfilled, (state, action) => {
        state.albumDetail = action.payload;
      })
      .addCase(fetchBestSongs.fulfilled, (state, action) => {
        state.track = action.payload;
        state.trackLoading = false;
        state.trackError = "";
      })
      .addCase(fetchAllSongs.fulfilled, (state, action) => {
        state.track = action.payload;
        state.trackLoading = false;
        state.trackError = "";
      })
      // اصلاح نام تو extraReducers به funcUploadTrack
      .addCase(funcUploadTrack.pending, (state) => {
        state.isLoadingUploadTrack = true;
        state.errorUploadTrack = "";
        state.uploadSuccess = false;
      })
      .addCase(funcUploadTrack.fulfilled, (state, action) => {
        state.isLoadingUploadTrack = false;
        state.errorUploadTrack = "";
        state.uploadSuccess = true; // اضافه کردن وضعیت موفقیت
        if (!state.FetchTrackUpload) state.FetchTrackUpload = [];
        state.FetchTrackUpload.unshift(action.payload);
      })
      .addCase(funcUploadTrack.rejected, (state, action) => {
        state.isLoadingUploadTrack = false;
        state.errorUploadTrack = action.payload || action.error.message;
        state.uploadSuccess = false;
      })
      .addCase(fetchAllTracksUploaded.pending, (state) => {
        state.isLoadingFetchTrackUpload = true;
        state.errorFetchTrackUpload = "";
      })
      .addCase(fetchAllTracksUploaded.fulfilled, (state, action) => {
        state.isLoadingFetchTrackUpload = false;
        state.FetchTrackUpload = action.payload;
        state.errorFetchTrackUpload = "";
      })
      .addCase(fetchAllTracksUploaded.rejected, (state, action) => {
        console.error(
          "fetchAllTracksUploaded error:",
          action.payload || action.error.message
        );
        state.isLoadingFetchTrackUpload = false;
        state.errorFetchTrackUpload = action.payload || action.error.message;
      });
  },
});

export const {
  toggleTheme,
  setTheme,
  playAudio,
  pauseAudio,
  actionBtn,
  setCurrentMusic,
  setDurations,
  setPlayerVisibility,
  nextMusicBtn,
  prevMusicBtn,
  setTrackListMusic,
  setSearchTrack,
  setMinustMusic,
  setCurrentPage,
  setItemsPerPage,
  addFavoriteMusic,
  loadFavoriteMusic,
  actionMoreOption,
} = musicSlice.actions;

export default musicSlice.reducer;
