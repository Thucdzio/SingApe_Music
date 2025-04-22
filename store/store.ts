import { configureStore } from "@reduxjs/toolkit";
import themeSlice from "./slices";

const store = configureStore({
    reducer: themeSlice.reducer,
    
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
        serializableCheck: false,
        }),
    });

export default store;
