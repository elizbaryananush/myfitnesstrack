import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const fetchData = createAsyncThunk('posts/fetchData', async () => {
    const response = await fetch('http://localhost:8000/api/getWorkouts', {
        method: 'GET',
    });
    return await response.json();
});

const postsSlice = createSlice({
    name: 'posts',
    initialState: {
      postList: {
        data: null,
      },
    },
    reducers: {
        liked(state, action) {
            const post = state.postList.data.find(x => x._id == action.payload._id)
            post.liked = !post.liked
        },
    },
    extraReducers: (builder) => {
        builder.addCase(fetchData.fulfilled, (state, action) => {
            state.postList.data = action.payload;
        });
    },
})

export const postsActions = { ...postsSlice.actions, fetchData };

export default postsSlice