import { createAsyncThunk, createSlice, current } from "@reduxjs/toolkit";

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
  myFavorite: [],
  isLoading: false,
  error: "",
  track: null,
  trackLoading: false,
  trackError: "",
  theme: "dark",
  btn: false,
};
export const fetchTopSongs = createAsyncThunk(
  "songs/fetchTopSongs",
  async (_, { rejectWithValue }) => {
    try {
      const response = await fetch("http://localhost:4000/charts/top");
      const data = await response.json();
      return data;
    } catch (error) {
      return rejectWithValue("خطا در دریافت اطلاعات از سرور");
    }
  }
);

export const fetchTrackById = createAsyncThunk(
  "song/fetchTrackById",
  async (trackId, { rejectWithValue }) => {
    try {
      const response = await fetch(`http://localhost:4000/album/${trackId}`);
      const data = await response.json();
      return data;
    } catch (error) {
      return rejectWithValue("خطا در دریافت اطلاعات از سرور");
    }
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
    setDuration: (state, action) => {
      state.duration = action.payload;
    },
    nextMusicBtn: (state, action) => {
      const alltracks = state.track;
      const findindexTrack = alltracks.tracks.findIndex(
        (item) => item.id === action.payload.id
      );
      if (findindexTrack == -1) {
        return;
      }
      const nextIndex = (findindexTrack + 1)  % alltracks.tracks.length;
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
      const prevIndex = (findindexTrack - 1 + alltracks.tracks.length) % alltracks.tracks.length;
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
      .addCase(fetchTrackById.fulfilled, (state, action) => {
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
  setDuration,
  setPlayerVisibility,
  nextMusicBtn,
  prevMusicBtn,
} = musicSlice.actions;
export default musicSlice.reducer;
