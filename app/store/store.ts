import { combineReducers, configureStore } from "@reduxjs/toolkit"
import { persistReducer, persistStore } from "redux-persist"
import storage from "redux-persist/lib/storage"
import authReducer from "./slices/authSlice"
import taskerReducer from "./slices/taskerSlice"
import serviceReducer from "./slices/serviceSlice"
import categoryReducer from "./slices/categorySlice"
import requestReducer from "./slices/requestSlice"
import bookingReducer from "./slices/bookingSlice"
import paymentReducer from "./slices/paymentSlice"
import taskCompletionReducer from "./slices/taskCompletion"
import disputeReducer from "./slices/disputeSlice"
import notificationReducer from "./slices/notificationSlice"
import searchReducer from "./slices/searchSlice"

const rootReducer = combineReducers({
  auth: authReducer,
  tasker: taskerReducer,
  service: serviceReducer,
  category: categoryReducer,
  request: requestReducer,
  booking: bookingReducer,
  payment: paymentReducer,
  task:taskCompletionReducer,
  dispute:disputeReducer,
  notification:notificationReducer,
  search:searchReducer
})

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["auth"], 
}

const persistedReducer = persistReducer(persistConfig, rootReducer)

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ["persist/PERSIST", "persist/REHYDRATE", "persist/REGISTER"],
      },
    }),
})

export const persistor = persistStore(store)

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch