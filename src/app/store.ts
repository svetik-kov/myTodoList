import { configureStore } from "@reduxjs/toolkit"
import { tasksReducer, tasksSlice } from "@/features/todolists/model/tasks-slice.ts"
import { appReducer, appSlice } from "@/app/app-slice.ts"
import { todolistsReducer, todolistsSlice } from "@/features/todolists/model/todolists-slice.ts"
import { authReducer, authSlice } from "@/features/auth/model/auth-slice.ts"

export const store = configureStore({
  reducer: {
    [tasksSlice.name]: tasksReducer,
    [todolistsSlice.name]: todolistsReducer,
    [appSlice.name]: appReducer,
    [authSlice.name]: authReducer,
  },
})

export type RootState = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch

// для возможности обращения к store в консоли браузера
// @ts-ignore
window.store = store
