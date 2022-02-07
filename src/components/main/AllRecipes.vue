<template>
    <div class="container com-class">
        <table class="table">
            <thead class="table-header">
                <tr>
                <th scope="col">Name</th>
                <th scope="col">Category</th>
                <th scope="col">Origin</th>
                <th scope="col">Actions</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="recipe in allRecipes" :key="recipe.id">
                <th scope="row">{{recipe.recipeName}}</th>
                <td>{{recipe.category.categoryName}}</td>
                <td>{{recipe.origin.countryName}}</td>
                <td>
                    <i v-if="recipe.isFavourite" class="fa fa-heart mr-2" style="color:red" @click="doFavourite(recipe)"></i>
                    <i v-else class="fa fa-heart mr-2" @click="doFavourite(recipe)"></i>
                    <i class="fa fa-edit mr-2" @click="editRecipe(recipe)"></i>
                    <i class="fa fa-trash mr-2" @click="deleteRecipe(recipe)"></i>
                </td>
                </tr>
                <tr class="text-center" v-if="!allRecipes.length">
                    <p>No records found</p>
                </tr>
            </tbody>
        </table>
        <Competition></Competition>
    </div>
</template>

<script>
import axios from 'axios'
import recipeActionsMixin from './../../mixins/recipeActions';
import Competition from './Competition.vue';

export default {
    data() {
        return {
            allRecipes:[]
        }
    },
    mixins:[recipeActionsMixin],
    components:{
        Competition
    },
    mounted(){
        this.getRecipes() //reusable name as using mixins for fav recipes as well
    },
    methods :{
        getRecipes(){
            axios.get('http://localhost:3000/allRecipes').then((recipes)=>{
                this.allRecipes = recipes.data.filter(obj => !obj.isDeleted);
            })
        }
    }

}
</script>

<style scoped>
.com-class{
    margin-top: 150px;
}
.table-header{
    color: #04AA6D;
}
.table td i{
    cursor: pointer;
}
</style>