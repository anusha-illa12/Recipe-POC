import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const url="http://localhost:3000/allRecipes";
const headers = {Accept:"application/json"}

export const store = new Vuex.Store({
    state :{
        RecipesCount:0,
        FavRecipesCount:0,
        isRegisteredToMasterChef:false
    },
    mutations:{
        setRecipesCount(state,payload){
            state.RecipesCount = payload;
        },
        setFavRecipesCount(state,payload){
            state.FavRecipesCount = payload;
        },
        setMasterChefStatus(state,payload){
            state.isRegisteredToMasterChef = payload;
        }
    },
    actions:{
        async setRecipesCount(state){
            const recipesData = await fetch(url,{headers})
            const allRecipes = await recipesData.json();
            const allActiveRecipes = allRecipes.filter(obj => !obj.isDeleted);
            state.commit("setRecipesCount",allActiveRecipes.length)
        },
        async setFavRecipesCount(state){ //check how to make only 1 api call
            const recipesData = await fetch(url,{headers})
            const allRecipes = await recipesData.json();
            const FavouriteRecipes = allRecipes.filter(obj => obj.isFavourite && !obj.isDeleted);
            state.commit("setFavRecipesCount",FavouriteRecipes.length)
        },
        async setMasterChefStatus(state){
            const userDetails = JSON.parse(window.localStorage.getItem('userDetails'));
            state.isRegisteredToMasterChef = userDetails.isRegisteredToMasterChef;
            state.commit("setMasterChefStatus",state.isRegisteredToMasterChef)
        }
    },
    modules:{},
    getters:{
        getRecipesCount(state){
            return state.RecipesCount;
        },
        getFavRecipesCount(state){
            return state.FavRecipesCount;
        },
        getMasterChefStatus(state){
            return state.isRegisteredToMasterChef;
        }
    }
})
