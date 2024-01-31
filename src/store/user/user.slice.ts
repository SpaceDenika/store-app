import { createSlice } from '@reduxjs/toolkit';

interface IProfile {
  email: string;
  name: string;
  password: string | number;
}

interface IState {
  profile: IProfile;
  jwt: string | null;
}

const initialState: IState = {
	profile: {
		email: '',
		name: '',
		password: ''
	},
	jwt: localStorage.getItem('token') ?? null
};

export const userSlice = createSlice({
	name: 'user',
	initialState,
	reducers: {
		setProfile: (state, action) => {
			if (!action.payload) {
				state.profile.email = '';
				state.profile.name = '';
				return;
			}
			state.profile.email = action.payload.email;
			state.profile.name = action.payload.name;
		},
		setToken: (state, action) => {
			if (!action.payload) {
				return;
			}
			state.jwt = action.payload.access_token;
			localStorage.setItem('token', action.payload.access_token);
		},
		logout: (state) => {
			state.profile = {} as IProfile;
			state.jwt = null;
			localStorage.removeItem('token');
		}
	}
});

export const { setProfile, setToken, logout } = userSlice.actions;

export default userSlice.reducer;