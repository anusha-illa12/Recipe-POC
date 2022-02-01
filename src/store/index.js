import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export const store = new Vuex.Store({
    state :{
        RecipesCount:1
    },
    mutations:{
        setRecipesCount(state,payload){
            console.log('payload',payload)
            state.RecipesCount += 1;
        }
    },
    actions:{},
    modules:{},
    getters:{
        getRecipesCount(state){
            console.log('state',state)
            return state.RecipesCount;
        }
    }
})
