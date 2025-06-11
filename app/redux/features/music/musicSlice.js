import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState = {
  value: 0,
  topSongs:[],
  allSong:[],
  myFavorite:[],
  isLoading:false,
  error:"",
  track: null,
  trackLoading: false,
  trackError: "",
};
export const fetchTopSongs=createAsyncThunk('songs/fetchTopSongs',async (_, { rejectWithValue })=>{
  try {
    const response=await fetch("http://localhost:4000/charts/top")
    const data=await response.json()
    return data
  } catch (error) {
    return rejectWithValue("خطا در دریافت اطلاعات از سرور")
  }
})

export const fetchTrackById =createAsyncThunk('song/fetchTrackById',async (trackId,{rejectWithValue})=>{
  try {
    const response=await fetch(`http://localhost:4000/album/${trackId}`)
    const data=await response.json()
    return data
  } catch (error) {
    return rejectWithValue("خطا در دریافت اطلاعات از سرور")
  }
})
const counterSlice = createSlice({
  name: "counter",
  initialState,
  reducers: {
    increment(state) {
      state.value += 1;
    },
    decrement(state) {
      state.value -= 1;
    },
  },
  extraReducers:(builder)=>{
    builder
    .addCase(fetchTopSongs.fulfilled,(state,action)=>{
      state.topSongs=action.payload;
      state.isLoading=false;
      state.error=""
    })
    .addCase(fetchTopSongs.pending,(state,action)=>{
      state.isLoading=true;
      state.error=""
    })
    .addCase(fetchTopSongs.rejected,(state,action)=>{
      state.error=action.error.message;
      state.isLoading=false;
    })
    // جدید برای ترک تکی
      // .addCase(fetchTrackById.pending, (state) => {
      //   state.trackLoading = true;
      //   state.trackError = "";
      //   state.track = null;
      // })
      .addCase(fetchTrackById.fulfilled, (state, action) => {
        state.track = action.payload;
        state.trackLoading = false;
        state.trackError = "";
      })
      // .addCase(fetchTrackById.rejected, (state, action) => {
      //   state.trackError = action.payload || action.error.message;
      //   state.trackLoading = false;
      //   state.track = null;
      // });
    
  }
});

export const { increment, decrement } = counterSlice.actions;
export default counterSlice.reducer;
