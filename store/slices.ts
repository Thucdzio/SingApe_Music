import { createSlice } from "@reduxjs/toolkit";

const themeSlice = createSlice({
    name: "theme",
    initialState: {
        isDarkMode: false,
        isSystemTheme: false,
    },
    reducers: {
        toggleTheme: (state) => {
            state.isDarkMode = !state.isDarkMode;
        },
        setTheme: (state, action) => {
            state.isDarkMode = action.payload.isDarkMode;
            state.isSystemTheme = action.payload.isSystemTheme;
        }
    },
});

export default themeSlice
export const { toggleTheme, setTheme } = themeSlice.actions