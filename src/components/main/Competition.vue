<template>
    <div class="container master-chef">
        <h2>Hello {{name}}!</h2>
        <!-- <pre>
            {{objtoParent}}
            {{arrtoParent}}
        </pre> -->
        <p v-if="isRegisteredToMasterChef == 'true'">Successfully registered for the Master Chef competition.</p>
        <p v-else>Are you intrested to participate in MasterChef competition!</p>
        <button v-if="isRegisteredToMasterChef != 'true'" type="button" class="btn btn-success" @click="registerToMasterChef">Register Now</button>
    </div>
</template>

<script>
import axios from 'axios'
export default {
    data() {
        return{
            isRegisteredToMasterChef:'',
            userDetails:{}
        }
    },
    props:[
        'name',
        // 'objtoParent','arrtoParent'
        ],
    emits:['customeEventName'],
    beforeCreate(){
        console.log('in beforeCreate')
    },
    created(){
        console.log('in created')
    },
    beforeMount(){
        console.log('in beforeMount')
    },
    mounted(){
        console.log('search page')
        this.getUserDetails()
    },
    beforeUpdate(){
        console.log('in beforeUpdate')
    },
    beforeDestroy(){
        console.log('in beforeDestroy')
    },
    destroyed(){
        console.log('in destroyed')
    },
    updated(){
        console.log('updated')
        // this.isRegisteredToMasterChef = window.localStorage.getItem('registeredToMasterChef');
    },
    methods:{
        registerToMasterChef(){
            console.log('in registerToMasterChef')
            this.userDetails = JSON.parse(window.localStorage.getItem('userDetails'));
            this.userDetails.isRegisteredToMasterChef = true;
            console.info('userDetails',this.userDetails)
            axios.put('http://localhost:3000/users/'+this.userDetails.id,this.userDetails).then((res) =>{
                console.info('res',res)
                this.$toast.success("Registered successfully for MasterChef Competition!");
                window.localStorage.setItem('registeredToMasterChef',res.data.isRegisteredToMasterChef);
                this.isRegisteredToMasterChef = window.localStorage.getItem('registeredToMasterChef');
                console.log('type',typeof(this.isRegisteredToMasterChef))
                this.$emit('customeEventName',res.data)
                //we can use mixins over here
                // const usersList = users.data;
                // const existUser = usersList.find(user => (user.emailId === this.userForm.emailId && user.password === this.userForm.password));
                // if(existUser){
                //     //store accesstoken
                //     window.localStorage.setItem('emailId',existUser.emailId)
                //     window.localStorage.setItem('userName',existUser.userName)
                //     window.localStorage.setItem('registeredToMasterChef',existUser.isRegisteredToMasterChef)
                //     console.log('in existUser',existUser)
                //     this.$router.push({path: '/home'});
                // }else{
                //     console.log('show error')
                // }
            })
        },
        getUserDetails(){
           if(window.localStorage.getItem('registeredToMasterChef')){
               this.isRegisteredToMasterChef = window.localStorage.getItem('registeredToMasterChef');
           }
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
