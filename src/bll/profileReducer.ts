import {authAPI, UpdateUserType, UserDataType} from "../api/auth/auth-api";
import {Dispatch} from "redux";
import {handleServerNetworkError} from "../common/utils/errors-utils";
import {setAppStatusAC} from "./appReducer";
import {AppThunk} from "./store";


const PROFILE = "PROFILE/PROFILE"


export type ProfileStateType = {
    user: null | UserDataType
}

const initialProfileState = {
    user: null as null | UserDataType,
}
export const profileReducer = (state: ProfileStateType = initialProfileState, action: ProfileActionsType): ProfileStateType => {
    switch (action.type) {
        case 'PROFILE/PROFILE': {
            if (action.payload.profile !== null) {
                return {
                    ...state,
                    user: {...action.payload.profile}
                }
            } else {
                return {
                    ...state,
                    user: action.payload.profile
                }
            }
        }
        default:
            return state
    }
}

//types
export type ProfileActionsType = SetProfileACType

type SetProfileACType = ReturnType<typeof setProfileAC>

// actions
export const setProfileAC = (profile: UserDataType | null) => {
    return {
        type: PROFILE,
        payload: {
            profile
        }
    } as const
}
// thunks
export const updateUserTC = (model: UpdateUserType): AppThunk => async (dispatch: Dispatch) => {
    dispatch(setAppStatusAC("loading"))
    try {
        const response = await authAPI.userUpdate(model)
        dispatch(setProfileAC(response.data.updatedUser))
        dispatch(setAppStatusAC("succeeded"))
    } catch (e) {
        handleServerNetworkError(e, dispatch)
    } finally {
        dispatch(setAppStatusAC("succeeded"))
    }
};