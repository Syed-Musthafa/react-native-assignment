import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

type Post = {
  userName: string;
  caption: string;
  tags: string[];
  id: string;
};

type InitialState = {
  loading: boolean;
  users: Post[];
  error: string;
};

type DataToSent = {
  userName: string;
  caption: string;
  tags: string[];
};

const initialState: InitialState = {
  loading: false,
  users: [],
  error: "",
};

const baseUrl = "192.168.29.73";

export const fetchPostData = createAsyncThunk<Post[], void>(
  'post/fetchPostData',
  async () => {
    try {
      const response = await axios.get(`http://${baseUrl}:4000/api/v1/posts?_sort=createdAt&_order=desc`);
      return response.data;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
);

export const addPostData = createAsyncThunk<Post, DataToSent>(
  "post/addPostData",
  async (dataToSent) => {
    try {
      const response = await axios.post(`http://${baseUrl}:4000/api/v1/posts`, dataToSent);
      return response.data.body;
    } catch (error) {
      throw error;
    }
  }
);

const postData = createSlice({
  name: "post",
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchPostData.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchPostData.fulfilled, (state, action) => {
        state.loading = false;
        const { body } = action.payload
        state.users =  body
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

        state.users =[ action.payload, ...state.users, ]
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
