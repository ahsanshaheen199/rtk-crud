import {createSlice,createAsyncThunk} from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
    users: [],
    isLoading: false,
    isError: false,
    isSuccess: false,
    message: ''
}

export const fetchUsers = createAsyncThunk(
    'users/getAll',
    async (_,thunkAPI) => {
        try {
            const result = await axios.get('http://localhost:3001/users');

            return result.data;
        } catch( error ) {
            const message = (error.response && error.response.data && error.response.data.message ) || error.message
            return thunkAPI.rejectWithValue(message)
        }

    }
)

export const createUser = createAsyncThunk(
    'user/createUser',
    async ( user, thunkAPI ) => {
        try {
            const result = await axios.post('http://localhost:3001/users', { ...user });
            return result.data;
        } catch( error ) {
            const message = (error.response && error.response.data && error.response.data.message ) || error.message
            return thunkAPI.rejectWithValue(message)
        }
    }
)

export const fetchUserByID = createAsyncThunk(
    'user/fetchUserByID',
    async ( id, thunkAPI ) => {
        try {
            const result = await axios.get(`http://localhost:3001/users/${id}`);
            return result.data;
        } catch( error ) {
            const message = (error.response && error.response.data && error.response.data.message ) || error.message
            return thunkAPI.rejectWithValue(message)
        }
    }
)

export const updateUser = createAsyncThunk(
    'user/updateUser',
    async ( user, thunkAPI ) => {
        try {
            const result = await axios.patch(`http://localhost:3001/users/${user.id}`,{...user});
            return result.data;
        } catch( error ) {
            const message = (error.response && error.response.data && error.response.data.message ) || error.message
            return thunkAPI.rejectWithValue(message)
        }
    }
)

export const deleteUser = createAsyncThunk(
    'user/deleteUser',
    async ( id, thunkAPI ) => {
        try {
            await axios.delete(`http://localhost:3001/users/${id}`);
            return id;
        } catch( error ) {
            const message = (error.response && error.response.data && error.response.data.message ) || error.message
            return thunkAPI.rejectWithValue(message)
        }
    }
)

export const userSlice = createSlice({
    name: 'users',
    initialState,
    reducers: {

    },
    extraReducers: (builder) => {
        builder.addCase(fetchUsers.pending, ( state, action ) => {
            state.isLoading = true;
        })
            .addCase(fetchUsers.fulfilled, ( state, action ) => {
                state.isLoading = false;
                state.users = action.payload;
                state.isSuccess = true;
            })
            .addCase(fetchUsers.rejected, ( state, action ) => {
                state.isLoading = false;
                state.users = [];
                state.isError = true;
                state.message = action.payload
            } )
            .addCase(createUser.pending,( state, action ) => {
                state.isLoading = true;
            })
            .addCase(createUser.fulfilled, ( state, action ) => {
                state.isLoading = false;
                state.users = [action.payload,...state.users];
                state.isSuccess = true;
            })
            .addCase(createUser.rejected, ( state, action ) => {
                state.isLoading = false;
                state.users = [];
                state.isError = true;
                state.message = action.payload
            } )
            .addCase(deleteUser.fulfilled, ( state, action ) => {
                state.isLoading = false;
                state.users = [ ...state.users.filter( user => user.id !== action.payload.id ) ];
                state.isSuccess = true;
            })
            .addCase(fetchUserByID.pending,( state, action ) => {
                state.isLoading = true;
            })
            .addCase(fetchUserByID.fulfilled, ( state, action ) => {
                state.isLoading = false;
                state.users = [action.payload];
                state.isSuccess = true;
            })
            .addCase(fetchUserByID.rejected, ( state, action ) => {
                state.isLoading = false;
                state.users = [];
                state.isError = true;
                state.message = action.payload
            } )
            .addCase(updateUser.pending,( state, action ) => {
                state.isLoading = true;
            })
            .addCase(updateUser.fulfilled, ( state, action ) => {
                state.isLoading = false;
                state.users = [...state.users.map( user => user.id == action.payload.id ? action.payload : user )];
                state.isSuccess = true;
            })
            .addCase(updateUser.rejected, ( state, action ) => {
                state.isLoading = false;
                state.users = [];
                state.isError = true;
                state.message = action.payload
            } )

    }
});

export default userSlice.reducer;