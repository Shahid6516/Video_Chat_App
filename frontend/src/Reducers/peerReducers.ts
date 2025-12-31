import { ADD_PEER, REMOVE_PEER } from "../Actions/peerAction";

export const peerReducer = (state: any, action: any) => {
    switch (action.type) {
        case ADD_PEER:
            return {
                ...state,
                [action.payload.peerId]: {
                    stream: action.payload.stream 
                },
            };
        case REMOVE_PEER:
            const { [action.payload.peerId]: _, ...rest } = state;
            return rest;
        default:
            return state;
    }
};