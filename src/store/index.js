import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const url="http://localhost:3000/allRecipes";
const headers = {Accept:"application/json"};

export const store = new Vuex.Store({
    state :{
        RecipesCount:0
    },
    mutations:{
        setRecipesCount(state,payload){
            console.log('payload',payload)
            state.RecipesCount = payload;
            // state.RecipesCount = 3;
        }
    },
    actions:{
        async setRecipesCount(state){
            const recipesData = await fetch(url,{headers})
            const allRecipes = await recipesData.json();
            console.log('allRecipes',allRecipes)
            const allActiveRecipes = allRecipes.filter(obj => !obj.isDeleted);
            state.commit("setRecipesCount",allActiveRecipes.length)
        }
    },
    modules:{},
    getters:{
        getRecipesCount(state){
            console.log('state',state)
            return state.RecipesCount;
        }
    }
})
