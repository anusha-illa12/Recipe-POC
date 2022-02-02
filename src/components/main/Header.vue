<template>
<header class="header">
  <div class="container">
    <div class="logo">
      <a title="Recipes" href="#/home">
      <img alt="Image" class="image" src="./../../assets/images/logo3.jpg" height="60" width="80">
      </a>
    </div>
    <nav class="main-nav">
      <ul>
        
        <li class="active"><i class="fa fa-plus"></i><router-link to="/add-edit-recipe">Add Recipe</router-link></li>
        <li><i class="fa fa-list"></i><router-link to="/all-recipes">All Recipes ({{getRecipesCount}})</router-link></li>
        <li><i class="fa fa-heart"></i><router-link to="/fav-recipes">Fav recipes</router-link></li>
        <li class="dropdown nav-item">
          <i class="fa fa-user"></i>
          <a class="" title="Profile" href="javascript:;" data-toggle="dropdown">Profile</a>
          <span aria-expanded="false" aria-haspopup="true" class="caret dropdown-toggle" data-toggle="dropdown" id="navbarDropdown" role="button"></span>
          <div class="dropdown-menu">
            <router-link class="dropdown-item" to="/profile">My Profile</router-link>
            <a class="dropdown-item" @click="signOut">Sign out</a>
          </div>
        </li>
        </ul>
    </nav>
  </div>
  </header>
</template>

<script>
import {mapActions,mapGetters} from 'vuex'
export default {
  data(){
    return {
      // getRecipesCount:0
    }
  },
  computed:{
    ...mapGetters({getRecipesCount:"getRecipesCount"})
    // getRecipesCount(){
    //   return this.$store.getters.c;
    // }
  },
  beforeMount(){
    // this.$store.commit("setRecipesCount"); // need to call the mutation methods by using commit()
    // this.$store.dispatch("setRecipesCount"); // need to call the action methods by using dispatch()
    //instaed of above both ways we can call directly by using mapActions to call methods from actions of vuex,mapGetters to call methods from gettersof vuex
    this.setRecipesCount();
  },
  methods:{
    ...mapActions(['setRecipesCount']),
    signOut(){
      this.$confirm({
        // auth: true,
        message: 'Are you sure you want to logout?',
        button: {
          yes: 'Yes',
          no: 'No'
        },
        /**
         * Callback Function
         * @param {Boolean} confirm 
         * @param {String} password 
         */
        callback: (confirm) => {
          // if (confirm && password == window.localStorage.getItem('password')) {
            if(confirm){
              window.localStorage.clear();
              this.$router.push({ name: 'login' })
            }
          // }else{
          //   this.$toast.warning("Enter valid password");
          // }
        }
      })
    }
  }

}
</script>

<style scoped>
.header {
  position: fixed;
  top: 0;
  left: 0;
  height: 116px;
  background: #fff;
  width: 100%;
  box-shadow: 0 4px 4px 0 rgb(0 0 0 / 5%);
  z-index: 1001;
}

.image{
  border-radius: 10px;
}

.logo {
    margin-top: 23px;
    float: left;
}

.main-nav {
    float: right;
    margin-top: 36px;
}

.main-nav li {
    display: inline-block;
    padding: 0 21px 10px 20px;
    position: relative;
}

.main-nav a:hover{
  color: #8d3fb1;
}

.main-nav li{
  color: #04AA6D;
}

.main-nav li:hover{
  color: #8d3fb1;
}

.main-nav a {
    font-family: nimbus_sans_novus_med;
    font-size: 18px;
    color: #04AA6D;
    letter-spacing: 0;
    position: relative;
    transition: all .3 ease;
    text-decoration: none;
    background: none;
}

.main-nav li span {
    margin-left: 5px;
    display: inline-block;
    vertical-align: middle;
    cursor: pointer;
}

</style>