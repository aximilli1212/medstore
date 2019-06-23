<template>
  <v-container>
    <v-layout row>
      <v-flex xs12>


        <form @submit.prevent="onRegisterUser">
          <v-layout>
            <v-flex xs12 sm6 offset-sm3>
              <v-text-field
                      name="title"
                      label="Title"
                      v-model="title"
              ></v-text-field>

            </v-flex>
          </v-layout>

          <v-layout>
            <v-flex xs12 sm6 offset-sm3>
              <v-text-field
                      name="firstname"
                      label="First Name"
                      required
                      v-model="firstname"
              ></v-text-field>

            </v-flex>
          </v-layout>

          <v-layout>
            <v-flex xs12 sm6 offset-sm3>
              <v-text-field
                      name="lastname"
                      label="Last Name"
                      required
                      v-model="lastname"
              ></v-text-field>

            </v-flex>
          </v-layout>
          <v-layout>
            <v-flex xs12 sm6 offset-sm3>
              <v-text-field
                      name="phone"
                      label="Phone Number"
                      required
                      v-model="phone"
              ></v-text-field>

            </v-flex>
          </v-layout><v-layout>
            <v-flex xs12 sm6 offset-sm3>
              <v-text-field
                      name="company"
                      label="Company Name"
                      v-model="company"
              ></v-text-field>

            </v-flex>
          </v-layout>

          <v-layout>
            <v-flex xs12 sm6 offset-sm3>
              <v-text-field
                      name="address"
                      label="Address"
                      required
                      v-model="address"
              ></v-text-field>

            </v-flex>
          </v-layout>

          <v-layout>
            <v-flex xs12 sm6 offset-sm3>
              <v-select
                      :items="paymethods"
                      v-model="prefpay"
                      label="Payment Method (Prefered)"
                      single-line
                      bottom
              ></v-select>

            </v-flex>
          </v-layout>

          <v-layout>
            <v-flex xs12 sm6 offset-sm5>
              <v-btn class="primary"
                     :disabled="!formIsValid"
                     type="submit"
              >
                Register
              </v-btn>
            </v-flex>
          </v-layout>
        </form>



      </v-flex>
    </v-layout>


  </v-container>
</template>

<script>
    export default {
        name: "create-meetup",
        data(){
            return{
                title:'',
                firstname:'',
                lastname:'',
                email:this.$store.state.user.email,
                phone:'',
                company:'',
                address:'',
                prefpay:'',
                date:new Date(),
                paymethods:[{text:'Visa Card'},{text:'Master Card'},{text:'Mobile Money'}]

            }

        },

        computed:{
            formIsValid(){
                return this.title!=='' &&
                    this.firstname!=='' &&
                    this.lastname!=='' &&
                    this.email!=='' &&
                    this.phone!=='' &&
                    this.address!=='' &&
                    this.prefpay!==''
            },

            subDateTime(){
                const date = new Date(this.date)
                if(typeof this.time=='string'){
                    const hours= this.time.match(/^(\d+)/)[1]
                    const minutes= this.time.match(/:(\d+)/)[1]
                    date.setHours(hours)
                    date.setMinutes(minutes)

                }else{
                    date.setHours(this.time.getHours())
                    date.setMinutes(this.time.getMinutes)
                }
                console.log(date)
                return date
            }
        },

        methods:{

            onRegisterUser(){
                const UserData={
                    title:this.title,
                    firstname:this.firstname,
                    lastname:this.lastname,
                    email:this.email,
                    phone:this.phone,
                    company:this.company,
                    address:this.address,
                    prefpay:this.prefpay,
                    date:this.date
                }
                this.$store.dispatch('createCustomer',UserData)
            }
        }
    }
</script>

<style scoped>

</style>