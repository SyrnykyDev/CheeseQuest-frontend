import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { authUser as authUser2, fetchUser } from "../utils/userApi.ts";
import { INotification } from "../components/Notification/INotification.ts";
import randomNumberInRange from "../utils/RandomNumber2.ts";

export interface UserState {
  user: string | null;
  userData: any;
  isAuthenticated: boolean;
  firstFetch: boolean;
  error: string | null;
  notifications: INotification[];
  loading: boolean;
  searchText: string;
  searchResults: any[];
}

const initialState: UserState = {
  user: null,
  isAuthenticated: false,
  firstFetch: false,
  error: null,
  notifications: [],
  loading: false,
  userData: null,
  searchText: "",
  searchResults: [],
};

export const authUser = createAsyncThunk("users/fetchByIdStatus", async () => {
  const response: any = await authUser2();
  return response;
});

export const fetchUserThunk = createAsyncThunk("users/fetchUser", async () => {
  const response: any = await fetchUser();
  return response;
});

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    addNotification: (state: UserState, action) => {
      state.notifications.push({
        ...action.payload,
        id: randomNumberInRange(),
      });
    },
    removeNotification: (state: UserState, action) => {
      state.notifications = state.notifications.filter(
        (elem) => elem.id !== action.payload.id,
      );
    },

    changeSearchResult: (state: UserState, action) => {
      state.searchResults = action.payload;
    },
    onChangeSearchText: (state: UserState, action) => {
      state.searchText = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(authUser.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(authUser.fulfilled, (state, action) => {
      console.log("action.payload", action.payload);
      if (action.payload?.username) state.user = action.payload?.username;

      state.isAuthenticated = action.payload?.validated || false;

      state.firstFetch = true;
      state.loading = false;
    });
    builder.addCase(fetchUserThunk.fulfilled, (state, action) => {
      if (action.payload?.user) state.userData = action.payload?.user;
    });
  },
});

export const {
  addNotification,
  removeNotification,
  changeSearchResult,
  onChangeSearchText,
} = userSlice.actions;

export default userSlice.reducer;
