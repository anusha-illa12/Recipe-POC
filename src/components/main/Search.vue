<template>
    <div class="container com-class" v-if="dataFetched">
        <h1>Categories of recipes</h1>
        <div v-for="(type) in recipeTypes" :key="type.id">
            <SearchSlot>
                <div class="card m-5">
                    <div class="search-item">
                        <img class="card-img-top" src="./../../assets/images/Baked.jpeg" alt="Card image cap" 
                        height="600" width="100">
                        <!-- {{type.image}} -->
                        <!-- <img class="card-img-top" :src="type.image" alt="Card image cap" height="600" width="100"> -->
                        <div class="card-body">
                            <h5 class="card-title">{{type.title}}</h5>
                            <p class="card-text">{{type.description}}</p>
                        </div>
                    </div>
                </div>
            </SearchSlot>
        </div>
        <!-- v-if="renderMyComponent" -->
        <!-- We can use the below reusable component at different places or multiple times at same place by using v-for -->
        <!-- <Competition name="Anu" :objtoParent="objtoParent.name" :arrtoParent="arrtoParent"></Competition> -->
        <Competition :name=userName @customeEventName="registeredToMasterChef"></Competition>
    </div>
</template>

<script>
// import db from './../../assets/db';
import axios from 'axios';
import Competition from './Competition.vue';
import SearchSlot from './SearchSlot.vue';

export default {
    data() {
        return {
            recipeTypes:[],
            userName:'',
            dataFetched: false,
            // objtoParent:{
            //     name:'test',
            //     age:10
            // },
            // arrtoParent:[1,2,3]
            // renderMyComponent: true
        }
    },
    components:{
        Competition,SearchSlot
    },
    mounted(){
        this.getUserDetails()
        this.getRecipeTypes()
    },
    methods :{
        getImage(type) {
            return  require(type);
            // var image = require.context(type.image, false, /\.*$/);
            // return image;
        },
        getRecipeTypes(){
            axios.get('http://localhost:3000/recipeTypes').then((res) =>{
                this.recipeTypes = res.data;
                this.dataFetched = true;
            })
            // this.recipeTypes = db.recipeTypes;
        },
        getUserDetails(){
           if(window.localStorage.getItem('userName')){
               this.userName = window.localStorage.getItem('userName');
           }
        },
        registeredToMasterChef(data){
            //getting data from child to parent
            console.log('output event emitted from child data',data)
            // this.renderMyComponent = false;
            // this.renderMyComponent = true;
            // this.$forceUpdate(); 
        }
    }

}
</script>

<style scoped>
.com-class{
    margin-top: 150px;
    /* display: inline-flex; */
}
.com-class h1 {
    margin: 20px;
    /* font-style: oblique; */
    color: #04AA6D;
    font-family: 'FontAwesome';
}
.search-list {
    margin-top: 0px;
    border-bottom: 1px solid #f7f7f7;
    margin-bottom: 20px;
}
.search-item {
    background: #fff;
    border-radius: 10px;
    position: relative;
    margin-bottom: 30px;
}
</style>