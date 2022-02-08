<template>
  <div class="container com-class">
    <div v-for="classDetail in classesDetails" :key="classDetail.id">
      <MasterChefClass :classDetail="classDetail" @doImportant="doImportant"></MasterChefClass>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import MasterChefClass from './MasterChefClasses.vue';
export default {
  data() {
    return{
      classesDetails:[]
    }
  },
  components:{
    MasterChefClass
  },
  beforeMount(){
    this.getClassDetails();
  },
  methods:{
    getClassDetails(){
      axios.get('http://localhost:3000/masterChefClasses').then(res =>{
        this.classesDetails = res.data;
      })
    },
    doImportant(data){
      axios.put('http://localhost:3000/masterChefClasses/'+data.id,data).then(res =>{
        if(res.status === 200){
          let msg;
          if(res.data.isClassImportant)
            msg = 'Added as Important successfully!' 
          else
            msg = 'Removed as important successfully!'
          
          this.$toast.success(msg)
          this.getClassDetails()
        }else{
          this.$toast.error(res.statusText)
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