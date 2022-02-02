<template>
    <div class="container com-class">
        <h2 class="" v-if="isNew">Add Recipe</h2>
        <h2 class="" v-else>Edit Recipe</h2>
        <div v-if="showErrorBlock">
            <b>Please correct the following error(s):</b>
            <p v-for="error in errors" :key="error">{{ error }}</p>
        </div>
        <form autocomplete="off" class="container" @submit.prevent="addRecipe"> 
            <div class="col-4 offset-4"> 
                <label for="recipeName">Recipe Name</label>
                <input type="text" id="recipeName" placeholder="Enter Recipe Name" v-model="addEditForm.recipeName" required>
            </div>
            <div class="col-4 offset-4">
                <label for="category">Category</label>
                <v-select label="categoryName" :options="categories" v-model="addEditForm.category"></v-select>
            </div>
            <div class="col-4 offset-4">
                <label for="origin">Origin</label>
                <!-- <vue-country-select class="vue-country-select" name="country-select"
                            :model.sync="result" language="en-US">
                </vue-country-select> -->
                <v-select label="countryName" :options="countries" v-model="addEditForm.origin"></v-select>
            </div>
            <div class="col-4 offset-4">
                <label for="ingredients">Ingredients</label>
                <v-select label="ingredientName" :options="Ingredients" v-model="addEditForm.ingredients"></v-select>
            </div>
            <div class="col-4 offset-4"> 
                <label for="description">Description</label>
                <textarea name="description" id="description"  v-model="addEditForm.description" placeholder="Enter description" cols="30" rows="10" required></textarea>
            </div>
            <button type="submit" class="btn btn-success" v-if="isNew">Add Recipe</button>
            <button type="submit" class="btn btn-success" v-else>Update Recipe</button>
        </form>
    </div>
</template>

<script>
import axios from 'axios';
export default {
    name:"AddEditRecipe",
    data() {
        return {
            addEditForm:{
                recipeName:'',
                category:'',
                origin:'',
                description:'',
                ingredients:[],
                image:''
            },
            categories:[
                {
                    id:1,
                    categoryName: "Breakfast" 
                },
                {
                    id:2,
                    categoryName: "Lunch" 
                },
                {
                    id:3,
                    categoryName: "Dinner" 
                },
                {
                    id:4,
                    categoryName: "Salad" 
                },
                {
                    id:5,
                    categoryName: "Dessert" 
                },
                {
                    id:6,
                    categoryName: "Main Course" 
                },
                {
                    id:7,
                    categoryName: "Side Dish" 
                },
                {
                    id:8,
                    categoryName: "Baked" 
                }
            ],
            countries:[
                {
                    countryCode: "Me",
                    countryName: "Mexican"
                },
                {
                    countryCode: "In",
                    countryName: "Indian"
                },
                {
                    countryCode: "It",
                    countryName: "Italian"
                },
                {
                    countryCode: "Ch",
                    countryName: "Chinese"
                },
                {
                    countryCode: "Ja",
                    countryName: "Japanese"
                },
                {
                    countryCode: "Aus",
                    countryName: "Australian"
                }
            ],
            Ingredients:[
                {
                    id:1,
                    ingredientName: "Water" 
                },
                {
                    id:2,
                    ingredientName: "Rice Flour" 
                },
                {
                    id:3,
                    ingredientName: "Wheat Flour" 
                },
                {
                    id:4,
                    ingredientName: "Salt" 
                },
                {
                    id:5,
                    ingredientName: "Chilli Powder" 
                }
            ],
            showErrorBlock:false,
            isNew:true
        };
    },
    components :{
        // "vue-country-select": require("vue-country-select")
    },
    mounted(){
        if(this.$router.history.current.params.id){
            this.isNew = false;
            this.getRecipeDetails(this.$router.history.current.params.id)
        }else{
            this.isNew = true;
            // this.addEditForm.reset();
        }
    },
    destroyed(){
        console.info('in up')
    },
    methods:{
        addRecipe(){
            console.info('this.addEditForm',this.addEditForm);
            let data = {
                recipeName : this.addEditForm.recipeName,
                category: this.addEditForm.category.categoryName,
                origin: this.addEditForm.origin.countryName,
                description: this.addEditForm.description,
                ingredients: [this.addEditForm.ingredients.ingredientName],
                image: "./../../assets/images/recipes/dosa.jpeg",
                isFavourite: false,
                isDeleted: false
            }
            axios.post('http://localhost:3000/allRecipes',data).then((res)=>{
                console.info('rec',res)
                if(res.status === 201){
                    this.$toast.success('Recipe Added successfully!')
                    this.$store.dispatch("setRecipesCount"); // need to call the action methods by using dispatch()
                    this.$router.push({name:'all-recipes'})
                }
            })
        },
        getRecipeDetails(id){
            axios.get('http://localhost:3000/allRecipes/'+id).then((res)=>{
                console.info('rec',res)
                if(res.status === 200){
                    this.addEditForm = res.data;
                }
            })
        }
    }
}
</script>

<style scoped>
.com-class{
    margin-top: 150px;
}
</style>