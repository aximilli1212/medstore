<template>
    <div>
        <v-layout row align-center class="mb-2">

            <v-flex sm3 >
                <v-btn large color="primary--text" class="elevation-8" @click="$router.go(-1)"><v-icon left>mdi-arrow-left-thick</v-icon>Go Back</v-btn>
            </v-flex>
            <v-flex sm3 >
                <v-btn v-if="reset_pass" large color="primary--text" class="elevation-8" @click="viewProfile"><v-icon left>mdi-account</v-icon>View Profile</v-btn>
                <v-btn v-else large color="secondary--text" class="elevation-8" @click="viewReset"><v-icon left>mdi-lock-reset</v-icon>Reset Password</v-btn>
            </v-flex>

        </v-layout>


        <v-container
                fill-height
                fluid
                grid-list-xl>

            <v-layout
                    justify-center
                    wrap
            >
                <v-flex
                        v-if="reset_pass"
                        xs12
                        md4
                        offset-md2
                >
                    <material-card
                            title="Edit Profile"
                            text="Complete your profile"
                    >
                        <div class="mb-2 subheading secondary--text" >Change Password</div>
                        <v-form>
                            <v-container py-0>
                                <v-layout wrap>
                                    <v-flex xs12 sm12 md12 >
                                        <v-text-field
                                                ref="password"
                                                name="password"
                                                label="Password"
                                                data-vv-name="password"
                                                data-vv-delay="300"
                                                min="6"
                                                v-validate="'required|min:6|max:100'"
                                                v-model="user.password"
                                                :error-messages="errors.collect('password')"
                                                hint="Password should be a minimum of 6 characters"
                                                prepend-icon="lock"
                                                :append-icon="isPasswordVisible ? 'visibility' : 'visibility_off'"
                                                :append-icon-cb="() => (isPasswordVisible = !isPasswordVisible)"
                                                :type="isPasswordVisible ? 'text' : 'password'"
                                        ></v-text-field>
                                    </v-flex>

                                    <v-flex xs12 sm12 md12>
                                        <v-text-field
                                                label="Confirm Password"
                                                data-vv-name="password_confirmation"
                                                data-vv-delay="300"
                                                target= "password"
                                                v-validate="'required|confirmed:password'"
                                                v-model="user.c_password"
                                                :error-messages="errors.collect('password_confirmation')"
                                                prepend-icon="lock"
                                                :append-icon="isPasswordVisible2 ? 'visibility' : 'visibility_off'"
                                                :append-icon-cb="() => (isPasswordVisible2 = !isPasswordVisible2)"
                                                :type="isPasswordVisible2 ? 'text' : 'password'"
                                        ></v-text-field>
                                    </v-flex>
                                    <v-flex
                                            xs12
                                            text-xs-right
                                    >
                                        <v-btn
                                                class="mx-0 font-weight-light"
                                                color="secondary"
                                                :loading = "loader"
                                                :disabled = "loader"
                                                @click="resetPass"
                                        >
                                            <v-icon left>mdi-refresh</v-icon>
                                            Change Password
                                        </v-btn>
                                    </v-flex>
                                </v-layout>
                            </v-container>
                        </v-form>
                    </material-card>
                </v-flex>

                <v-flex
                        v-else
                        xs12
                        md8
                >
                    <material-card
                            title="Edit Profile"
                            text="Complete your profile"
                    >
                        <div class="mb-2 subheading primary--text" >User Profile</div>

                        <v-form>
                            <v-container py-0>
                                <v-layout wrap>
                                    <v-flex
                                            xs12
                                            md4
                                    >
                                        <v-text-field
                                                label="Company"
                                                disabled
                                                v-model="uSum.com_name"

                                        >

                                        </v-text-field>
                                    </v-flex>
                                    <v-flex
                                            xs12
                                            md4
                                    >
                                        <v-text-field
                                                class="purple-input"
                                                label="Outlet Name"
                                                disabled
                                                v-model="uSum.com_outlet_name"
                                        >
                                            {{uSum.name}}

                                        </v-text-field>
                                    </v-flex>
                                    <v-flex
                                            xs12
                                            md4
                                    >
                                        <v-text-field
                                                label="Location"
                                                class="purple-input"
                                                disabled
                                                v-model="uSum.com_outlet"
                                        >

                                        </v-text-field>


                                    </v-flex>
                                    <v-flex
                                            xs12
                                            md6
                                    >
                                        <v-text-field
                                                label="Username"
                                                class="purple-input"
                                               v-model="user.name"
                                                :counter="40"
                                                :error-messages="errors.collect('username')"
                                                v-validate="'required|max:40'"
                                                data-vv-name="username"
                                                required
                                        >

                                        </v-text-field>
                                    </v-flex>
                                    <v-flex
                                            xs12
                                            md6
                                    >
                                        <v-text-field
                                                label="Email Address"
                                                class="purple-input"
                                                v-model="user.email"
                                                :counter="40"
                                                :error-messages="errors.collect('email')"
                                                v-validate="'required|email|max:40'"
                                                data-vv-name="email"
                                                required
                                        >
                                        </v-text-field>

                                    </v-flex>
                                    <v-flex
                                            xs12
                                            md12
                                    >
                                        <v-text-field
                                                label="Adress"
                                                class="purple-input"
                                                v-model="uSum.com_address"
                                                disabled
                                        ></v-text-field>

                                    </v-flex>
                                    <v-flex
                                            xs12
                                            text-xs-right
                                    >
                                        <v-btn
                                                class="mx-0 font-weight-light"
                                                color="secondary"
                                                :loading = "loader"
                                                :disabled="loader"
                                                @click="updateProfile"
                                        >
                                            <v-icon left>mdi-account-convert</v-icon>
                                            Update Profile
                                        </v-btn>
                                    </v-flex>
                                </v-layout>
                            </v-container>
                        </v-form>
                    </material-card>
                </v-flex>






                <v-flex
                        xs12
                        md4
                >
                    <material-card class="v-card-profile">
                        <v-avatar
                                slot="offset"
                                class="mx-auto d-block"
                                size="130"
                        >
                            <img
                                    src="/static/img/male.gif"
                            >
                        </v-avatar>
                        <v-card-text class="text-xs-center">
                            <h6 class="category text-gray font-weight-thin mb-1">{{uSum.name}}</h6>
                            <h6 class="category text-gray font-weight-thin mb-3">({{uSum.role}})</h6>
                            <h4 class="card-title font-weight-light">{{uSum.email}}</h4>
                            <!--<p class="card-description font-weight-light">Don't be scared of the truth because we need to restart the human foundation in truth And I love you like Kanye loves Kanye I love Rick Owens’ bed design but the back is...</p>-->
                            <!--<v-btn-->
                                    <!--color="success"-->
                                    <!--round-->
                                    <!--class="font-weight-light"-->
                            <!--&gt;Follow</v-btn>-->
                        </v-card-text>
                    </material-card>
                </v-flex>
            </v-layout>
        </v-container>

        <simplert :useRadius="true"
                  :useIcon="true"
                  ref="simplert">
        </simplert>

    </div>


</template>

<script>
    let axios = require("axios");
    export default {
        $_veeValidate: {
            validator: 'new'
        },
        name:"user_profile",
        data(){
            return{
                loader:false,
                reset_pass:false,
                isPasswordVisible: false,
                isPasswordVisible2: false,
                user:{
                    name:'',
                    email:'',
                    password:'',
                    c_password:'',
                    company_id:0,
                    outlet_id:0,
                    role:'',
                },

            }
        },
        computed:{
            uSum(){
                let uData = {
                    name:this.userData.user_name,
                    email:this.userData.user_email,
                    role:this.userData.role_name,
                    com_name:this.userData.company_name,
                    com_address:this.userData.company_address,
                    com_location:this.userData.company_location,
                    com_phone:this.userData.company_phone_no,
                    com_slogan:this.userData.company_slogan,
                    com_outlet:this.userData.outlet_location,
                    com_outlet_name:this.userData.outlet_name,

                }
                return uData;
            },
                apiSet(){
                    return this.$store.getters.getApi
                },


        },
        mounted(){
            this.viewProfile();
        },
        methods:{
            viewReset(){
                this.reset_pass = true;

            },
            viewProfile(){
                this.reset_pass = false;
                this.user.name = this.uSum.name;
                this.user.email = this.uSum.email;
            },

            updateProfile(){
                this.loader = true;

                let self = this;
                if((this.user.name === this.uSum.name) && (this.user.email === this.uSum.email) ){
                    self.$store.commit('setSnack',{t:"Sorry! No Change in details.", c:"red darken-3"});
                    this.loader = false;
                        return false;
                }






                this.$validator.validateAll().then((result)=>{
                    if(result){
                        this.loader = true;
                        const UserData={
                            uid:this.userData.id,
                            email:this.user.email,
                            name:this.user.name,
                        }


                        axios.post(this.apiSet.update_det, UserData)
                            .then(function (response) {
                                self.closeup();
                                self.loadUsers();
                                self.$store.dispatch('loadUserData',UserData.uid);

                                self.loader = false;
                                self.snack=true;
                                self.snackText="Success. Data was successfully added.";
                                self.snackColor="green";
                            })
                            .catch(function (error) {
                                self.loader = false;
                                self.snack=true;
                                self.snackText="Error.Sorry an error occured.";
                                self.snackColor="red";
                            });
                    }
                    else{
                        self.snack=true;
                        self.snackText="Error. Please correct form errors.";
                        self.snackColor="red";
                        return false;
                    }
                });

            },
            resetPass(){
                let self = this;

                this.$validator.validateAll().then((result)=>{
                    if(result){
                        let confirmFn = function() {
                            self.res();
                        };

                        let obj = {
                            title: 'Reset Password?',
                            message: 'Are you sure you want to Reset Password?',
                            type: 'warning',
                            useConfirmBtn: true,
                            onConfirm: confirmFn
                        }
                        this.$refs.simplert.openSimplert(obj);


                    } else{
                        self.$store.commit('setSnack',{t:"Error! Please correct form errors.", c:"red darken-3"})
                        return false;

                    }
                });






                },

            res(){
                let uid = this.userData.id;
                let pass = this.user.password;
                    this.loader = true;
                    let self = this;

                    axios.patch(this.apiSet.passReset + '/' + uid,{password:pass} )
                        .then(function (response) {
                            console.log(response);
                            self.loader = false;
                            localStorage.setItem('workitUser', JSON.stringify({}));
                            self.$store.commit('setSnack',{t:"Success! Password Successfully reset", c:"green darken-3"})
                            self.$router.push('/');

                        })
                        .catch(function (error) {
                            console.log(error);
                            self.loader = false;
                            this.snack = true;
                            this.snackText = "Network erorr occured."
                            this.snackColor = "red"
                        });

                },


    }

    }

</script>
