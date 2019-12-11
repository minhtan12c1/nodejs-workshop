
const state = {
    items: [],
}

// getters
const getters = {
    items: states => states.items,
}

// actions
const actions = {
    addProductToCart ({ state, commit }, product) {

        if (product.ID !== '') {
            const cartItem = state.items.find(item => item.id === product.ID)
            if (!cartItem) {
                commit('pushProductToCart', { id: product.ID })
            } else {
                commit('incrementItemQuantity', cartItem)
            }

        }
    },
    incrementItemQuantity ({ state, commit }, productId) {
        const cartItem = state.items.find(item => item.id === productId)
         commit('incrementItemQuantity', cartItem)
    },
    decrementItemQuantity ({ state, commit }, productId) {
        const cartItem = state.items.find(item => item.id === productId)
        if (cartItem.quantity > 1 ) {
            commit('decrementItemQuantity', cartItem)
        }
    }
}

// mutations
const mutations = {
    pushProductToCart (state, { id }) {
        state.items.push({
            id,
            quantity: 1
        })
    },

    incrementItemQuantity (state, { id }) {
        const cartItem = state.items.find(item => item.id === id)
        cartItem.quantity++
    },
    decrementItemQuantity (state, { id }) {
        const cartItem = state.items.find(item => item.id === id)
        cartItem.quantity--
    },

}

export default {
    state,
    getters,
    actions,
    mutations
}
