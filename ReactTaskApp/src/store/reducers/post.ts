import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

type InitialState = {
  loading: boolean;
  users: [];
  error: string;
};

type DataToSent = {
  userName: string;
  caption: string;
  tags: []
};

const initialState: InitialState = {
  loading: false,
  users: [],
  error: '',
};

const baseUrl = "192.168.13.6";

export const fetchPostData = createAsyncThunk('post/fetchPostData', async () => {
  try {
    const response = await axios.get(`http://${baseUrl}:4000/api/v1/posts?_sort=createdAt&_order=desc`);
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
});

export const addPostData = createAsyncThunk('post/fetchAddData', async (data) => {
  try {
    const response = await axios.post(`http://${baseUrl}:4000/api/v1/posts`, data);
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
});

const postData = createSlice({
  name: "post",
  initialState : initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchPostData.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchPostData.fulfilled, (state, action: PayloadAction<[]>) => {
        state.loading = false;
        console.log("state.users post", state.users);
        console.log("action.payload post", action.payload);
        state.users = action.payload;
        state.error = '';
      })
      .addCase(fetchPostData.rejected, (state, action) => {
        state.loading = false;
        state.users = [];
        state.error = action.error.message || 'Something went wrong';
      })
      .addCase(addPostData.pending, (state) => {
        state.loading = true;
      })
      .addCase(addPostData.fulfilled, (state, action) => {
        state.loading = false;
        
        state.users = action.payload
     
        state.error = '';
      })
      .addCase(addPostData.rejected, (state, action) => {
        state.loading = false;
        state.users = [];
        state.error = action.error.message || 'Something went wrong';
      });
  },
});

export default postData.reducer;
