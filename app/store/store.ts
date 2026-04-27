import { combineReducers, configureStore } from "@reduxjs/toolkit"
import { persistReducer, persistStore } from "redux-persist"
import storage from "redux-persist/lib/storage"
import authReducer from "./slices/authSlice"
import taskerReducer from "./slices/taskerSlice"
import serviceReducer from "./slices/serviceSlice"
import categoryReducer from "./slices/categorySlice"
import requestReducer from "./slices/requestSlice"
import adminUsersReducer from "./slices/adminUsersSlice"
import adminTaskersReducer from "./slices/adminTaskersSlice"
import adminAnalyticsReducer from "./slices/adminAnalyticsSlice"
import adminPaymentsReducer from "./slices/adminPaymentsSlice"
import adminDisputesReducer from "./slices/adminDisputesSlice"
import adminOfficersReducer from "./slices/adminOfficersSlice"
import adminProfileReducer from "./slices/adminProfileSlice"



import bookingReducer from "./slices/bookingSlice"
import paymentReducer from "./slices/paymentSlice"
import taskCompletionReducer from "./slices/taskCompletion"
import disputeReducer from "./slices/disputeSlice"
import notificationReducer from "./slices/notificationSlice"
import searchReducer from "./slices/searchSlice"
import reviewReducer from "./slices/reviewSlice"
import resumeReducer from "./slices/resumeSlice"
import overviewReducer from "./slices/overviewSlice"

const rootReducer = combineReducers({
  auth: authReducer,
   tasker: taskerReducer,
   service: serviceReducer,
   category: categoryReducer,
   request: requestReducer,
  adminUsers: adminUsersReducer,
  adminTaskers: adminTaskersReducer,
  adminAnalytics: adminAnalyticsReducer,
  adminPayments: adminPaymentsReducer,
  adminDisputes: adminDisputesReducer,
  adminOfficers: adminOfficersReducer,
  adminProfile: adminProfileReducer,
  
  
  booking: bookingReducer,
  payment: paymentReducer,
  task:taskCompletionReducer,
  dispute:disputeReducer,
  notification:notificationReducer,
  search:searchReducer,
  review:reviewReducer,
  resume:resumeReducer,
  overview: overviewReducer,
})

export type RootState = ReturnType<typeof rootReducer>

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["auth"], 
}

const persistedReducer = persistReducer(persistConfig, rootReducer)

export const store = configureStore({
  reducer: persistedReducer as unknown as typeof rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ["persist/PERSIST", "persist/REHYDRATE", "persist/REGISTER"],
      },
    }),
})

export const persistor = persistStore(store)

export type AppDispatch = typeof store.dispatch