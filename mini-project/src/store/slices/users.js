import {createSlice} from '@reduxjs/toolkit'

const currentUserSlice = createSlice({
    name : 'user',
    initialState : null,
    reducers : {
        addNewUser(state, action){
            return action.payload
        },
        addProfileImage(state, action){
            return {
                ...state,
                image : action.payload
            }
        },
        logout(state, action){
            return null
        }
    }
})

export const {addNewUser, addProfileImage, logout} = currentUserSlice.actions
export default currentUserSlice