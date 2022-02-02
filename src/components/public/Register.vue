<template>
    <div>
        <h2 class="registerHeading">Registration Form</h2>
        <div v-if="showErrorBlock">
            <b>Please correct the following error(s):</b>
            <p v-for="error in errors" :key="error">{{ error }}</p>
        </div>
        <form class="container" @submit.prevent="submitRegisterForm"> 
            <div class="userFields col-4 offset-4"> 
                <label for="userName">User Name</label>
                <input type="text" id="userName" placeholder="Enter User Name" v-model="registerForm.userName" required>
            </div>
            <div class="userFields col-4 offset-4"> 
                <label for="email">Email ID</label>
                <input type="text" id="email" placeholder="Enter Email ID" v-model="registerForm.emailId" required>
            </div>
            <div class="userFields col-4 offset-4">
                <label for="password">Password</label>
                <input type="password" id="password" placeholder="Enter Password"  v-model="registerForm.password"  required>
            </div>
            <div class="userFields col-4 offset-4">
                <label for="cpassword">Confirmation Password</label>
                <input type="password" id="cpassword" placeholder="Enter Confirm Password"  v-model="registerForm.confirmPassword"  required>
            </div>
            <div class="userFields col-4 offset-4"> 
                <label for="mobile">Mobile Number</label>
                <input type="text" id="mobile" placeholder="Enter Mobile Number" v-model="registerForm.mobile" required>
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
        showErrorBlock:false,
        errors : []
      }
    },
    methods :{
        submitRegisterForm(){
            this.errors = [];
            if(this.registerForm.emailId && !this.validEmail(this.registerForm.emailId)){
                //email validation check
                this.errors.push('Valid email required.')
            }
            if(this.registerForm.password != this.registerForm.confirmPassword){
                this.errors.push('Password and Confirm Password should match') 

            }
            if(this.registerForm.mobile.length < 10){ // shoould only accepts number
                this.errors.push('Mobile number length should be 10 or geater') 
            }
            if(this.errors.length){
                this.showErrorBlock = true;
            }else{
                this.showErrorBlock = false;
                let registeredUser = {
                    emailId: this.registerForm.emailId,
                    password: this.registerForm.password,
                    confirmPassword: this.registerForm.confirmPassword,
                    mobile: this.registerForm.mobile,
                    gender: this.registerForm.gender,
                    userName: this.registerForm.userName,
                    skills : this.registerForm.skills
                }
                axios.post('http://localhost:3000/users',registeredUser).then((res) =>{
                    console.info('res',res)
                    if(res.status === 201){
                        this.$toast.success("Registered successfully!");
                        this.loginPage();
                    }
                })
            }
        },
        validEmail: function (email) {
            var re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
            return re.test(email);
        },
        loginPage(){
            this.$router.push({path: '/login'})
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
</style>