import { configureStore } from '@reduxjs/toolkit'
import userSlice from './userSlice'
import postsSlice from './videoSlice'

const store = configureStore({
    reducer: {
        user: userSlice.reducer,
        post: postsSlice.reducer,
    }
})

export default store