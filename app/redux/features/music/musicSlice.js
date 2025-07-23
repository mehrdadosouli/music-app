import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { albums, tracks, artists } from "~/data/mockData";

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
  allAlbum:[],
  albumDetail:[],
  myFavorite: [],
  isLoading: false,
  error: "",
  track: null,
  trend: null,
  trackLoading: false,
  trackError: "",
  theme: "dark",
  btn: false,
  searchTrack:""
};
function getuniqueAlbumes(tracks) {
  const uniqueAlbume = {};
  const result = [];
  for (const track of tracks) {
    if (!uniqueAlbume[track.albumId]) {
      uniqueAlbume[track.albumId] = true;
      result.push(track);
    }
  }
  return result;
}
export const fetchTopSongs = createAsyncThunk(
  "songs/fetchTopSongs",
  async () => {
    const uniqueTracks = getuniqueAlbumes(tracks);
    return uniqueTracks;
  }
);
export const fetchAllAlbum = createAsyncThunk(
  "songs/fetchAllAlbum",
  async () => {
    return albums
  }
);
export const fetchTrendSongs = createAsyncThunk(
  "songs/fetchTrendSongs",
  async () => {
    const uniqueTracks = getuniqueAlbumes(tracks);    
    return uniqueTracks;
  }
);
export const fetchBestSongs = createAsyncThunk(
  "songs/fetchBestSongs",
  async () => {
    const bestSong=tracks.filter(music=>music.score >= 9).slice(0,6)
    return bestSong
  }
);
export const fetchAllSongs = createAsyncThunk(
  "songs/fetchAllSongs",
  async () => {
    return tracks
  }
);
export const fetchTrackById = createAsyncThunk(
  "song/fetchTrackById",
  async (trackId) => {
    const album = albums.find((a) => a.id === trackId);
    if (!album) return null;
    const albumTracks = tracks.filter((t) => t.albumId === album.id);
    return { ...album, tracks: albumTracks };
  }
);
export const fetchAlbumDetail = createAsyncThunk(
  "song/fetchAlbumDetail",
  async (trackId) => {
    const album = albums.find((a) => a.id === trackId);
    if (!album) return null;
    const albumTracks = tracks.filter((t) => t.albumId === album.id);
    return { ...album, tracks: albumTracks };
  }
);
const musicSlice = createSlice({
  name: "music",
  initialState,
  reducers: {
    actionBtn: (state, action) => {
      if (action.payload) {
        state.btn = true;
      } else {
        state.btn = false;
      }
    },
    setSearchTrack: (state, action) => {
      state.searchTrack = action.payload;
    },
    setTrackListMusic: (state, action) => {
      state.track = action.payload;
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
      const alltracks = state.track;
      const findindexTrack = alltracks.tracks.findIndex(
        (item) => item.id === action.payload.id
      );
      if (findindexTrack === -1) {
        return;
      }
      const nextIndex = (findindexTrack + 1) % alltracks.tracks.length;
      state.currentAudio = alltracks.tracks[nextIndex];
    },
    prevMusicBtn: (state, action) => {
      const alltracks = state.track;
      const findindexTrack = alltracks.tracks.findIndex(
        (item) => item.id === action.payload.id
      );
      if (findindexTrack == -1) {
        return;
      }
      const prevIndex =
        (findindexTrack - 1 + alltracks.tracks.length) %
        alltracks.tracks.length;
      state.currentAudio = alltracks.tracks[prevIndex];
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
      .addCase(fetchTopSongs.pending, (state, action) => {
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
      .addCase(fetchTrendSongs.pending, (state, action) => {
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
      .addCase(fetchAllAlbum.pending, (state, action) => {
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
  setSearchTrack
} = musicSlice.actions;
export default musicSlice.reducer;
