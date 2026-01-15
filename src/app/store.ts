import { configureStore } from "@reduxjs/toolkit"
import { appReducer } from "@/app/app-slice.ts"
import { todolistsReducer } from "@/features/todolists/model/todolists-slice.ts"
import { tasksReducer } from "@/features/todolists/model/tasks-slice.ts"
import { todolistApi } from "@/features/todolists/api/_todolistApi.ts"
import { setupListeners } from "@reduxjs/toolkit/query"

// создание store
export const store = configureStore({
  reducer: {
    tasks: tasksReducer,
    todolists: todolistsReducer,
    app: appReducer,
    [todolistApi.reducerPath]: todolistApi.reducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(todolistApi.middleware),
})

setupListeners(store.dispatch)

// автоматическое определение типа всего объекта состояния
export type RootState = ReturnType<typeof store.getState>
// автоматическое определение типа метода dispatch
export type AppDispatch = typeof store.dispatch

// для возможности обращения к store в консоли браузера
// @ts-ignore
window.store = store
