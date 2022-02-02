<template>
  <div class="container login-form">
    <h2 class="loginHeading">Login Form</h2>
    <div v-if="showErrorBlock">
        <b>Please correct the following error(s):</b>
        <p v-for="error in errors" :key="error">{{ error }}</p>
    </div>
    <form class="container" @submit.prevent="submitLoginForm"> 
        <div class="userFields col-4 offset-4"> 
            <label for="emailId">Email ID</label>
            <input type="text" id="emailId" placeholder="Enter Email ID" v-model="userForm.emailId">
            <!-- required -->
        </div>
        <div class="userFields col-4 offset-4">
            <label for="password">Password</label>
            <input type="password" id="password" placeholder="Enter Password"  v-model="userForm.password">
            <!-- required -->
        </div>
        <div class="row col-12">
            <div class="col-6">
                <input type="checkbox"  id="rememberMe" v-model="userForm.checked"> 
                <label for="rememberMe"> Remember Me</label>
            </div>
            <div class="col-6">
                <a @click="openModal">Forgot Password?</a>
            </div>
        </div>
        <button type="submit" class="btn btn-success signInorSignUP">Login</button>
        <br>
        <button type="button" class="btn btn-success signInorSignUP" @click="registerPage">Register</button>
        <div v-if="forgotPasswordModal">
            <transition name="modal">
                <div class="modal-mask">
                    <div class="modal-wrapper">
                        <div class="modal-container">
                            <div class="modal-header">
                                <h2>Forgot Password</h2>
                                <i class="fa fa-close" @click="closeModal"></i>
                            </div>
                            <div class="modal-body">
                                <input type="text" placeholder="Email Address*" v-model="forgotPasswordMailId">
                                <p>Please enter your registered email address, we'll send you reset link.</p>
                                <button type="button" class="btn btn-success" @click="sendMailforForgotPassword">Send</button>
                            </div>
                        </div>
                    </div>
                </div>
            </transition>
        </div>
    </form>
  </div>
  
</template>

<script>
import axios from 'axios'
export default {
    data() {
      return {
        userForm: {
          emailId: '',
          password: '',
          checked: false
        },
        forgotPasswordMailId:'',
        showErrorBlock:false,
        errors : [],
        forgotPasswordModal : false
      }
    },
    methods :{
        submitLoginForm(){
            this.errors = [];
            if(!this.userForm.emailId){
                this.errors.push('Enter email id')
            }
            if(!this.userForm.password){
                this.errors.push('Enter password')
            }
            if(this.errors.length){
                this.showErrorBlock = true;
            }else{
                this.showErrorBlock = false;
                axios.get('http://localhost:3000/users').then((users) =>{
                    const usersList = users.data;
                    const existUser = usersList.find(user => (user.emailId === this.userForm.emailId && user.password === this.userForm.password));
                    if(existUser){
                        window.localStorage.setItem('userDetails',JSON.stringify(existUser))
                        window.localStorage.setItem('emailId',existUser.emailId)
                        window.localStorage.setItem('userName',existUser.userName)
                        window.localStorage.setItem('password',existUser.password)
                        window.localStorage.setItem('registeredToMasterChef',existUser.isRegisteredToMasterChef)
                        this.$router.push({path: '/home'});
                    }else{
                        this.$toast.error("Enter valid credentials");
                    }
                })
            }
        },
        registerPage(){
            this.$router.push({path: '/register'})
            // this.$router.push({ name: 'register' })
        },
        openModal(){
            this.forgotPasswordMailId = ''
            this.forgotPasswordModal = true;
        },
        sendMailforForgotPassword(){
            this.forgotPasswordModal = false;
            this.$router.push({name:'reset-password'})
        },
        closeModal(){
            this.forgotPasswordModal = false;
        }
    }
}
</script>

<style scoped>
/* .login-form{
    background: url('https://picsum.photos/seed/picsum/200/300');
} */
.signInorSignUP{
    display: inline-block;
    width: 230px;
    margin: 10px;
}

.loginHeading {
    border: solid 2px #28A745;
    background-color: #28A745;
    color: white;
    width: 230px;
    display: inline-block;
    border-radius: 5px;
}

.userFields{
    display: block;
    margin-bottom: 8px;
}

label {
  font-weight: bold;
  display: flex;
  margin-bottom: 5px;
}
input + label {
  font-weight: bold;
  display: inline-flex;
  margin-right: 20px;
}
input[type='text'],input[type='password']{
  display: block;
  width: 400px;
  padding: 6px 12px;
  font-size: 14px;
  line-height: 1.42857143;
  color: #555;
  background-color: #fff;
  background-image: none;
  border: 1px solid #ccc;
  border-radius: 4px;
}

.modal-mask {
  position: fixed;
  z-index: 9998;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: table;
  transition: opacity 0.3s ease;
}

.modal-wrapper {
  display: table-cell;
  vertical-align: middle;
}

.modal-container {
  width: 500px;
  margin: 0px auto;
  padding: 20px 30px;
  background-color: #fff;
  border-radius: 2px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.33);
  transition: all 0.3s ease;
  font-family: Helvetica, Arial, sans-serif;
}

.modal-header h3 {
  margin-top: 0;
  color: #42b983;
}

.modal-body {
  margin: 20px 0;
}

.modal-body input{
    border: none;
    border-bottom: 1px solid rgba(74,74,74,.3);
    margin: inherit;
}

.modal-default-button {
  float: right;
}

/*
 * The following styles are auto-applied to elements with
 * transition="modal" when their visibility is toggled
 * by Vue.js.
 *
 * You can easily play with the modal transition by editing
 * these styles.
 */

.modal-enter {
  opacity: 0;
}

.modal-leave-active {
  opacity: 0;
}

.modal-enter .modal-container,
.modal-leave-active .modal-container {
  -webkit-transform: scale(1.1);
  transform: scale(1.1);
}

</style>