import {
    asyncThunkCreator,
    buildCreateSlice,
    createSlice,
    isAnyOf,
    isFulfilled,
    isPending,
    isRejected,
    PayloadAction,
} from "@reduxjs/toolkit";
import {AnyAction} from "redux";
import {authActions} from "./authSlice";

type AppStatusType = "idle" | "loading" | "succeeded" | "failed";

type AppStateType = {
    status: AppStatusType;
    error: null | string;
    isInitialized: boolean;
};

const createAppSlice = buildCreateSlice({
    creators: {asyncThunk: asyncThunkCreator},
});

const slice = createAppSlice({
    name: "app",
    initialState: {
        status: "idle",
        error: null,
        isInitialized: false,
    } as AppStateType,
    reducers: (creators) => ({
        setAppStatus: creators.reducer(
            (state, action: PayloadAction<{ status: AppStatusType }>) => {
                state.status = action.payload.status;
            },
        ),
        setAppError: creators.reducer(
            (state, action: PayloadAction<{ error: string | null }>) => {
                state.error = action.payload.error;
            },
        ),
        setAppIsInitialized: creators.reducer(
            (state, action: PayloadAction<{ isInitialized: boolean }>) => {
                state.isInitialized = action.payload.isInitialized;
            },
        ),
    }),
    extraReducers: (builder) => {
        builder
            .addMatcher(isAnyOf(authActions.initializeApp.settled), (state) => {
                state.isInitialized = true;
            })
            .addMatcher(isPending, (state) => {
                state.status = "loading";
            })
            .addMatcher(isFulfilled, (state) => {
                state.status = "succeeded";
            })
            .addMatcher(isRejected, (state, action: AnyAction) => {
                state.status = "failed";

                console.log(action);
                if (action.payload) {
                    if(action.type === authActions.initializeApp.rejected.type) return
                    if(action.type === authActions.logIn.rejected.type) return

                    state.error = action.payload?.messages[0];
                } else {
                    state.error = action.error.message
                        ? action.error.message
                        : "Some error";
                }
            });
    },
    selectors: {
        selectAppStatus: (sliceState) => sliceState.status,
        selectAppError: (sliceState) => sliceState.error,
        selectAppIsInitialized: (sliceState) => sliceState.isInitialized,
    },
});

export const appSlice = slice.reducer;
export const appActions = slice.actions
export const {selectAppStatus, selectAppIsInitialized, selectAppError} =
    slice.selectors;
