import {
    GET_USER_DATA,
} from '../actions/actionsConst';

const initialState = {
    username: '',
    email: '',
    passwordOne: '',
    passwordTwo: '',
    error: null,
};

export default function user(state = initialState, action) {
    switch (action.type) {
        case GET_USER_DATA:
            return {
                ...state,
                value: action.payload,
            };
        default:
            return state;
    }
}
