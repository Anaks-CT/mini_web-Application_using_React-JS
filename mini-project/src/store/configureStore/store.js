import currentUserSlice from "../slices/users";

const { configureStore } = require("@reduxjs/toolkit");


const store = configureStore({
    reducer : {
        currentUser : currentUserSlice.reducer
    }
})

export  {store}