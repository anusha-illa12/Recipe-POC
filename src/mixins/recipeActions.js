import axios from "axios";
import Vue from "vue";
export default{
    methods:{
        doFavourite(recipe){
            console.info('in fav meth')
            recipe.isFavourite = !recipe.isFavourite;
            axios.put('http://localhost:3000/allRecipes/'+recipe.id,recipe).then((recipe)=>{
                if(recipe.data.isFavourite)
                    this.$toast.success("Added to Favourites successfully!");
                else
                    this.$toast.success("Removed from Favourites successfully!");
                this.getRecipes();
            })
        },
        editRecipe(recipe){
            this.$router.push({path:'add-edit-recipe/'+recipe.id})
        },
        deleteRecipe(recipe){
            // axios.delete('http://localhost:3000/allRecipes/'+recipe.id).then((recipe)=>{
            //     //deleted successfully message
            //     console.log('recipe',recipe)
            //     this.getAllRecipes()
            // })
            Vue.$confirm({
                title: 'Are you sure?',
                message: 'Want to delete this recipe?',
                button: {
                  yes: 'Yes',
                  no: 'Cancel'
                },
                callback: confirm => {
                    console.log('confirm',confirm)
                    if(confirm){
                        recipe.isDeleted = true
                        axios.put('http://localhost:3000/allRecipes/'+recipe.id,recipe).then((res)=>{
                            if(res.status === 200){
                                this.$toast.success("Recipe deleted successfully!");
                                this.getRecipes();
                            }
                        })
                    }
                }
              })
        }
    }
}