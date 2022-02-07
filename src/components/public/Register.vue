<template>
    <div>
        <h2 class="registerHeading">Registration Form</h2>
        <form class="container" @submit.prevent="submitRegisterForm"> 
            <div class="userFields col-4 offset-4"> 
                <label for="userName">User Name</label>
                <input type="text" id="userName" placeholder="Enter User Name" v-model="registerForm.userName">
                <p v-if="showError('UserNameRequired')" class="error-block">Enter user name.</p>
            </div>
            <div class="userFields col-4 offset-4"> 
                <label for="email">Email ID</label>
                <input type="text" id="email" placeholder="Enter Email ID" v-model="registerForm.emailId">
                <p v-if="showError('EmailRequired')" class="error-block">Enter email id.</p>
                <p v-if="showError('ValidEmailRequired')" class="error-block">Enter valid email id.</p>
            </div>
            <div class="userFields col-4 offset-4">
                <label for="password">Password</label>
                <input type="password" id="password" placeholder="Enter Password"  v-model="registerForm.password">
                <p v-if="showError('PasswordRequired')" class="error-block">Enter password.</p>
                <p v-if="showError('ValidPassword')" class="error-block">Password should contain atleast one Capital letter, one small letter,one digit and one special character and length should be or greater than 8</p>
            </div>
            <div class="userFields col-4 offset-4">
                <label for="cpassword">Confirmation Password</label>
                <input type="password" id="cpassword" placeholder="Enter Confirm Password"  v-model="registerForm.confirmPassword">
                <p v-if="showError('ConfirmPasswordRequired')" class="error-block">Enter confirm password.</p>
                <p v-if="showError('PasswordMatch')" class="error-block">Password and Confirm Password should match</p>
            </div>
            <div class="userFields col-4 offset-4"> 
                <label for="mobile">Mobile Number</label>
                <input type="text" id="mobile" placeholder="Enter Mobile Number" v-model="registerForm.mobile">
                <p v-if="showError('MobileRequired')" class="error-block">Enter mobile number.</p>
                <p v-if="showError('MobileNumbers')" class="error-block">Mobile number should contains numbers only</p>
                <p v-if="showError('MobileLength')" class="error-block">Mobile number length should be 10 or geater</p>
            </div>
            <div class="userFields col-4 offset-4"> 
                <label for="gender">Gender</label>
                <input type="radio" id="male" value="Male" v-model="registerForm.gender"> Male
                <input type="radio" id="female" value="Female" v-model="registerForm.gender"> Female
            </div>
            <div class="userFields col-4 offset-4"> 
                <label for="skills">Skills</label>
                <input type="checkbox" id="Breakfast recipes" value="Breakfast recipes" v-model="registerForm.skills"> Breakfast recipes
                <br>
                <input type="checkbox" id="Lunch recipes" value="Lunch recipes" v-model="registerForm.skills"> Lunch recipes
                <br>
                <input type="checkbox" id="Dinner recipes" value="Dinner recipes" v-model="registerForm.skills"> Dinner recipes
                <br>
                <input type="checkbox" id="Salad recipes" value="Salad recipes" v-model="registerForm.skills"> Salad recipes
                <br>
                <input type="checkbox" id="Dessert recipes" value="Dessert recipes" v-model="registerForm.skills"> Dessert recipes
                <br>
                <input type="checkbox" id="Main-course recipes" value="Main-course recipes" v-model="registerForm.skills"> Main-course recipes
                <br>
                <input type="checkbox" id="Side-dish recipes" value="Side-dish recipes" v-model="registerForm.skills"> Side-dish recipes
                <br>
                <input type="checkbox" id="Baked-goods recipes" value="Baked-goods recipes" v-model="registerForm.skills"> Baked-goods recipes
                <br>
            </div>
            <button type="submit" class="btn btn-success signInorSignUP">Register</button>
            <br>
            <button type="button" class="btn btn-success signInorSignUP" @click="loginPage">Login</button>
        </form>
    </div>
</template>

<script>
import axios from 'axios'
export default {
      data() {
      return {
        registerForm: {
          userName: '',
          emailId: '',
          password: '',
          confirmPassword: '',
          mobile:'',
          gender:'',
          skills:[]
        },
        errors : []
      }
    },
    methods :{
        submitRegisterForm(){
            console.info('in func')
            this.errors = [];
            if(!this.registerForm.userName){
                this.errors.push('UserNameRequired')
            }

            if(!this.registerForm.emailId){
                this.errors.push('EmailRequired')
            }else if(this.registerForm.emailId && !this.validEmail(this.registerForm.emailId)){
                this.errors.push('ValidEmailRequired')
            }
            
            if(!this.registerForm.confirmPassword){
                this.errors.push('ConfirmPasswordRequired')
            }

            if(!this.registerForm.password){
                this.errors.push('PasswordRequired')
            }else if(this.registerForm.password && this.validPassword(this.registerForm.password)){
                 if(this.registerForm.password != this.registerForm.confirmPassword){
                    this.errors.push('PasswordMatch') 
                }
            }else{
                this.errors.push('ValidPassword') 
            }

            if(!this.registerForm.mobile){
                this.errors.push('MobileRequired')
            }else if(this.registerForm.mobile && !this.validMobile(this.registerForm.mobile)){
                this.errors.push('MobileNumbers') 
            }
            if(this.registerForm.mobile && this.registerForm.mobile.length < 10){ // shoould only accepts number
                this.errors.push('MobileLength') 
            }

            let registeredUser = {
                emailId: this.registerForm.emailId,
                password: this.registerForm.password,
                confirmPassword: this.registerForm.confirmPassword,
                mobile: this.registerForm.mobile,
                gender: this.registerForm.gender,
                userName: this.registerForm.userName,
                skills : this.registerForm.skills
            }
            console.info('registeredUser',registeredUser)
            axios.post('http://localhost:3000/users',registeredUser).then((res) =>{
                console.info('res',res)
                if(res.status === 201){
                    this.$toast.success("Registered successfully!");
                    this.loginPage();
                }
            })
        },
        validEmail: function (email) {
            let re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
            return re.test(email);
        },
        validMobile: function (mobile){
            let re = /^[0-9]*$/;
            return re.test(mobile);
        },
        validPassword(password){
           let re = /^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,}$/;
           return re.test(password);
        },
        loginPage(){
            this.$router.push({path: '/login'})
        },
        showError(key){
            console.log('error',this.errors,key);
            if(this.errors.includes(key)){
                return true;
            }
        }
    }
}
</script>

<style scoped>
.signInorSignUP{
    display: inline-block;
    width: 230px;
    margin: 10px;
}

.registerHeading {
    border: solid 2px #28A745;
    background-color: #28A745;
    color: white;
    width: 400px;
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
.error-block{
    color: red;
}
</style>