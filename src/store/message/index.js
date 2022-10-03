export default {
    state: () => {
        return {
            SocketUserId: 2,
        };
    },
    getters: {
        SocketId(state) {
            return state.SocketUserId;
        },
    },
    mutations: {
        SetDefaultSocketId(state) {
            state.SocketUserId = 0;
        },
        sendMessage(state, resultId) {
            state.SocketUserId = resultId;
        },
    },
    actions: {

    },
};