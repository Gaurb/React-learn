import {configureStore} from '@reduxjs/toolkit';
import authSlice from './authAlice'

const store = configureStore({
    reducer: {
        auth: authSlice,
    }
});

export default store;