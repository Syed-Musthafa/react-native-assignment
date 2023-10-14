import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";




type InitialState = {
    loading: boolean
    users: []
    error: string
}


const initialState: InitialState = {
    loading: false,
    users: [],
    error: ''
}


// Generates pending, fulfilled and rejected action types
export const fetchPostData = createAsyncThunk('post/fetchPostData', () => {
    return axios
        .get('http://192.168.29.73:4000/api/v1/posts?_sort=createdAt&_order=desc')
        .then(response => response.data)
        .catch(err => console.log(err)
        )
})



export const addPostData= createAsyncThunk(
    'postData',
    async (data) => {

        const config = {
            method: 'post',
            url: 'http://192.168.29.73:4000/api/v1/posts',
            headers: {
                'Authorization': '',
                'Content-Type': ''
            },
            data: data
        };

        const response = await axios(config)
            .then(function (response) {
            console.log(JSON.stringify(response.data));
            })
            .catch(function (error) {
            console.log(error);
            });

            console.log("response", response.data);
            
        return response.data
    }
)


const postData = createSlice({
    name: "post",
    initialState,
    reducers: {},
    extraReducers: builder => {
        builder.addCase(fetchPostData.pending, state => {
            state.loading = true
        })
        builder.addCase(fetchPostData.fulfilled, (state, action: PayloadAction<[]>) => {
            state.loading = false,
                state.users = action.payload,
                state.error = ''
        }
        )
        builder.addCase(fetchPostData.rejected, (state, action) => {
            state.loading = false
            state.users = []
            state.error = action.error.message || 'Something went wrong'
        })
        builder.addCase(addPostData.pending, state => {
            state.loading = true
        })
        builder.addCase(addPostData.fulfilled, (state, action: PayloadAction<[]>) => {
            state.loading = false,
                state.users = action.payload
                state.error = ''
        }
        )
        builder.addCase(addPostData.rejected, (state, action) => {
            state.loading = false
            state.users = []
            state.error = action.error.message || 'Something went wrong'
        })
    }
})


export default postData.reducer;