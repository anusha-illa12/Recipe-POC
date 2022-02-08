<template>
  <div class="container test">
      <div class="important-class">
        <i @click="doImportant" :class="classDetail.isClassImportant ?  'fa fa-star mr-2 icon-color' : 'fa fa-star-o mr-2'"  aria-hidden="true"></i>
        <!-- <i v-if="classDetail.isClassImportant" class="fa fa-star mr-2 icon-color" style="color:red" @click="doImportant"></i> -->
        <!-- <i v-else class="fa fa fa-star-o mr-2" @click="doImportant"></i> -->
        <h2>{{classDetail.title}}</h2>
      </div>
    <p>{{classDetail.description}}</p>
    
  </div>
</template>

<script>
export default {
    props:[
        'classDetail'
    ],
    emits:['doImportant'],
    methods :{
        doImportant(){
            this.classDetail.isClassImportant = !this.classDetail.isClassImportant
            this.$emit('doImportant',this.classDetail)
        }
    }
}
</script>

<style scoped>
.test{
    margin-top: 70px;
    border: 1px ridge #5ed17c;
}
.important-class{
    display: inline-flex;
}
.icon-color{
    color: #5ed17c;
}
</style>