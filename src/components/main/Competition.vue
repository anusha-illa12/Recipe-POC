<template>
    <div class="container master-chef">
        <h2>Hello {{name}}!</h2>
        <!-- <pre>
            {{objtoParent}}
            {{arrtoParent}}
        </pre> -->
        <p v-if="getMasterChefStatus">Successfully registered for the Master Chef competition.</p>
        <p v-else>Are you intrested to participate in MasterChef competition!</p>
        <button v-if="!getMasterChefStatus" type="button" class="btn btn-success" @click="registerToMasterChef">Register Now</button>
    </div>
</template>

<script>
import axios from 'axios';
import {mapGetters} from 'vuex'
export default {
    data() {
        return{
            // isRegisteredToMasterChef:false,
            userDetails:{},
            name:''
        }
    },
    // props:[
        // 'name',
        // 'objtoParent','arrtoParent'
        // ],
    // emits:['customeEventName'],
    beforeCreate(){
        // console.log('in beforeCreate')
    },
    created(){
        // console.log('in created')
    },
    beforeMount(){
        // console.log('in beforeMount')
    },
    mounted(){
        // console.log('search page')
         if(window.localStorage.getItem('userDetails')){
            this.userDetails = JSON.parse(window.localStorage.getItem('userDetails'));
         }
        this.getUserDetails()
    },
    beforeUpdate(){
        // console.log('in beforeUpdate')
    },
    updated(){
        // console.log('updated')
        // this.isRegisteredToMasterChef = window.localStorage.getItem('registeredToMasterChef');
    },
    beforeDestroy(){
        // console.log('in beforeDestroy')
    },
    destroyed(){
        // console.log('in destroyed')
    },
    computed:{
        ...mapGetters({getMasterChefStatus:"getMasterChefStatus"}),
    },
    methods:{
        registerToMasterChef(){
            console.log('in registerToMasterChef')
            // this.userDetails = this.$store.userDetails;
            // this.userDetails = window.localStorage.getItem('userDetails');
            this.userDetails.isRegisteredToMasterChef = true;
            console.info('userDetails',this.userDetails)
            axios.put('http://localhost:3000/users/'+this.userDetails.id,this.userDetails).then((res) =>{
                console.info('res',res)
                this.$toast.success("Registered successfully for MasterChef Competition!");
                // this.$store.userDetails = res.data;
                window.localStorage.setItem('userDetails',JSON.stringify(this.userDetails));
                // this.isRegisteredToMasterChef = this.userDetails.isRegisteredToMasterChef;
                this.$store.dispatch("setMasterChefStatus");
                // this.isRegisteredToMasterChef = window.localStorage.getItem('registeredToMasterChef');
                // this.isRegisteredToMasterChef = this.$store.userDetails.isRegisteredToMasterChef;
                // this.$emit('customeEventName',res.data)
            })
        },
        getUserDetails(){
            this.name = this.userDetails.userName;
            // this.isRegisteredToMasterChef = this.userDetails.isRegisteredToMasterChef;
        }
    }
}
</script>
<style scoped>
.master-chef {
    border: 1px solid #30cf1324;
    border-radius: 10px;
    padding: 15px;
    width: 100%;
}
</style>
