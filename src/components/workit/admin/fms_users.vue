<template>
    <div>
        <v-dialog v-model="dialog" persistent max-width="600px">
            <v-btn slot="activator" color="secondary" dark class="mb-2"><v-icon left>mdi-plus</v-icon> New User</v-btn>
            <v-card>
                <v-toolbar >
                    <v-toolbar-title class="primary--text">{{formTitle}}</v-toolbar-title>

                    <v-spacer></v-spacer>


                    <v-btn icon @click.native="closeup">
                        <v-icon color="secondary">mdi-close</v-icon>
                    </v-btn>
                </v-toolbar>


                <v-card-text>
                    <v-form ref="form" v-model="valid" lazy-validation>
                        <v-container grid-list-md elevation-3>
                            <v-layout wrap >

                                <v-flex xs12 sm6 md6>
                                    <v-text-field
                                            label="Full Name"
                                            v-model="user.name"
                                            prepend-icon="mdi-account"
                                            v-validate="'required'"
                                            data-vv-name="name"
                                            :error-messages="errors.collect('name')"
                                    ></v-text-field>
                                </v-flex>
                                <v-flex xs12 sm6 md6>
                                    <v-text-field
                                            label="Email"
                                            v-model="user.email"
                                            prepend-icon="mdi-email"
                                            v-validate="'email|required'"
                                            data-vv-name="email"
                                            :error-messages="errors.collect('email')"
                                    ></v-text-field>
                                </v-flex>

                                <v-flex xs12 sm6 md6 v-if="passup">
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

                                <v-flex xs12 sm6 md6 v-if="passup">
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

                                <!--<v-flex xs12 sm6 md6>-->
                                    <!--<v-select-->
                                            <!--v-model="company"-->
                                            <!--:hint="`${company.company_name}, ${company.id}`"-->
                                            <!--:items="companies"-->
                                            <!--item-text="company_name"-->
                                            <!--item-value="id"-->
                                            <!--label="Select Company"-->
                                            <!--prepend-icon="mdi-domain"-->
                                            <!--persistent-hint-->
                                            <!--return-object-->
                                            <!--offset-y-->
                                    <!--&gt;</v-select>-->
                                <!--</v-flex>-->

                                <v-flex xs12 sm6 md6>
                                    <v-select
                                            v-model="outlet"
                                            :hint="`${outlet.outlet_name}, ${outlet.id}`"
                                            :items="outlets"
                                            item-text="outlet_name"
                                            item-value="id"
                                            label="Select Outlet"
                                            prepend-icon="mdi-home-variant"
                                            persistent-hint
                                            return-object
                                            offset-y
                                    ></v-select>
                                </v-flex>
                                <v-flex xs12 sm6 md6>
                                    <v-select
                                            v-model="role"
                                            :hint="`${role.role_name}, ${role.abbr}`"
                                            :items="roles"
                                            item-text="role_name"
                                            item-value="abbr"
                                            label="Assign Role"
                                            prepend-icon="mdi-account-convert"
                                            persistent-hint
                                            return-object
                                            offset-y
                                    ></v-select>
                                </v-flex>

                            </v-layout>
                        </v-container>
                    </v-form>
                    <small>*indicates required field</small>
                </v-card-text>
                <v-card-actions>
                    <v-spacer></v-spacer>

                    <v-btn color="primary" flat @click.native="closeup">Close</v-btn>

                    <v-btn
                            @click="onUserAdd"
                            color="secondary"
                            :loading="loader"
                            :disabled="loader"

                    ><v-icon left>mdi-library-plus</v-icon>{{btnTitle}}</v-btn>

                </v-card-actions>
            </v-card>
        </v-dialog>



        <v-card class="thead">
            <v-card-title>
                <!--<v-btn @click="getOut">get Out</v-btn>-->
                <v-btn icon color="primary" @click="$router.go(-1)" small><v-icon>mdi-arrow-left-thick</v-icon></v-btn>
                <p class="headline ttext mt-3">All Users [ <i class="green--text text--darken-3">{{total}}</i> ]</p>
                <v-spacer></v-spacer>
                <v-text-field
                        v-model="search"
                        append-icon="search"
                        label="Search"
                        single-line
                        hide-details
                        outline
                ></v-text-field>
            </v-card-title>

            <v-data-table
                    :headers="headers"
                    :items="users"
                    :search="search"
                    :loading="fetchup"
                    class="elevation-8"
            >
                <template slot="items" slot-scope="props">
                    <td>{{ props.item.id }}</td>
                    <td>{{ props.item.name }}</td>
                    <td>{{ props.item.email }}</td>
                    <td>{{ props.item.role }}</td>
                    <td>{{ props.item.outlet}}</td>
                    <!--<td>{{ props.item.company}}</td>-->
                    <td class="justify-center layout px-0">

                        <v-btn  small
                                flat
                                class="orange--text text--darken-3 cpoint"
                                @click="resetPass(props.item.id)"
                        ><v-icon

                        >
                            mdi-lock-reset
                        </v-icon> Reset Password </v-btn>

                        <v-btn  small
                                flat
                                class="primary--text cpoint"
                                @click="editItem(props.item)"
                        ><v-icon

                        >
                            mdi-pencil
                        </v-icon> Edit </v-btn>

                        <v-btn  small
                                flat
                                class="red--text cpoint"
                                @click="deleteItem(props.item,props.item.id)"
                        ><v-icon

                        >
                            mdi-delete
                        </v-icon> Delete </v-btn>

                    </td>
                </template>
                <v-alert slot="no-results" :value="true" color="error" icon="warning">
                    Your search for "{{ search }}" found no results.
                </v-alert>
            </v-data-table>
        </v-card>

        <v-snackbar
                :timeout="16000"
                :top="true"
                :right="x === 'right'"
                v-model="snack"
                color=""
        >
            {{snackText}}
            <v-btn flat :color="snackColor" @click.native="snack = false">Close</v-btn>
        </v-snackbar>

        <simplert :useRadius="true"
                  :useIcon="true"
                  ref="simplert">
        </simplert>



    </div>
</template>

<script>
    let axios = require("axios");
    export default {
        name: "fms_users",
        data () {
            return {
                loader:false,
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
                role: {role_name:'SuperAdmin', abbr: 'X' },
                roles: [
                    { role_name: 'SuperAdmin', abbr: 'X' },
                    { role_name: 'Retailer', abbr: 'P' },
                    { role_name: 'Finance Manager', abbr: 'F' },
                    { role_name: 'Cashier', abbr: 'C' },
                    { role_name: 'Warehouse Manager', abbr: 'W' },
                    { role_name: 'Administrator', abbr: 'A' }
                ],
                company: { company_name: 'WorkIT FMS', id: 1 },
                companies: [],
                outlet: { outlet_name: 'Warehouse', id: 1 },
                outlets: [],
                search: '',
                side_items:[

                ],
                headers: [
                    { text: 'ID', align: 'left', value: 'id',class:'subheading' },
                    { text: 'User Name', align: 'left', value: 'name',class:'subheading' },
                    { text: 'Email', align: 'left', value: 'email',class:'subheading' },
                    { text: 'Role', align: 'left', value: 'role_name',class:'subheading' },
                    { text: 'Outlet', align: 'left', value: 'outlet',class:'subheading' },
                    // { text: 'Company', align: 'left', value: 'company',class:'subheading' },
                    { text: 'Actions', align: 'center', value: 'action',class:'subheading' },
                ],
                dialog:false,
                fetchup:false,
                snack:false,
                total:'',
                snackText:false,
                snackColor:'',
                editedIndex: -1,
                users: [

                ]
            }
        },
        computed:{
            apiSet(){
                return this.$store.getters.getApi
            },
            getOutlets(){
                return this.$store.getters.getOutlets;
            },
            formTitle () {
                return this.editedIndex === -1 ? 'Add User' : 'Edit User'
            },
            btnTitle () {
                return this.editedIndex === -1 ? 'Add User' : 'Update User'
            },
            passup() {
                return this.editedIndex === -1 ? true : false;
            }
        },
        mounted(){
            this.setSide();
            this.loadUsers();
            this.getOut();
            this.getCompanys();

        },

        methods:{
            setSide(){

                this.$store.commit('setSideItems',this.side_items);
                this.$store.commit('setDrawer',false);
            },
            getOut(){
                this.$store.dispatch('loadOutlets');
                this.outList();
            },
            outList(){
                let outSet =  this.$store.getters.getOutlets;
                let exSet = [];

                for (let key = 0, len = outSet.length; key < len; key++) {

                    if(outSet[key].id > 1){

                    exSet.push({outlet_name: outSet[key].outlet_name,id:outSet[key].id});

                    }


                }

                this.outlets =  exSet;
            },
            getCompanys(){

                let self = this;
                this.fetchup = true;

                axios.get(this.apiSet.allCompanys)

                // let sData = {
                //     oid:this.userData.outlet_id,
                //     cid:this.userData.company_id,
                // }
                // axios.post(this.apiSet.allCompanys,sData)
                    .then(response=>{
                        const set_com=[];
                        // console.log(response.data.data);
                        const obj = response.data.data;
                        // for(let key in obj){
                        for (let key = 0, len = obj.length; key < len; key++) {
                            set_com.push({
                                id:obj[key].id,
                                company_name:obj[key].company_name,
                            })
                        }

                        self.companies =set_com;

                    }).catch(
                    e => {
                        console.log(e);
                        self.loader = false;
                        this.snack = true;
                        this.snackText = "Sorry network error occurred.";
                        this.snackColor = "red";

                        this.err.push(e);
                    }
                )

            },

            loadUsers(){
                let self = this;
                this.fetchup = true;
                let cid = {
                    cid:this.userData.company_id
                }

                // axios.get(this.apiSet.allUsers)
                axios.post(this.apiSet.postUsers, cid)
                    .then(response=>{
                        const set_users=[];
                        const obj = response.data.data;
                        // for(let key in obj){
                        for (let key = 0, len = obj.length; key < len; key++) {
                            set_users.push({
                                id:obj[key].id,
                                num:key,
                                title:obj[key].title,
                                name:obj[key].name,
                                email:obj[key].email,
                                role:obj[key].role_name,
                                company:obj[key].company.company_name,
                                outlet:obj[key].outlet.outlet_name,
                                lastname:obj[key].lastname,
                                phone_no:obj[key].phone_no,

                            })
                        }

                        self.users =set_users;
                        self.total = set_users.length;
                        self.fetchup = false;

                        this.snack = true;
                        this.snackText = "Data Was Successfully loaded.";
                        this.snackColor = "green";

                    }).catch(
                    e => {
                        console.log(e);
                        self.loader = false;
                        this.snack = true;
                        this.snackText = "Sorry network error occurred.";
                        this.snackColor = "red";

                        this.err.push(e);
                    }
                )
            },

            onUserAdd(){

                if(this.editedIndex > -1){
                    this.updateUser();

                }
                else{

                    let self = this;
                    this.$validator.validateAll().then((result)=>{
                        if(result){
                            this.loader = true;
                            const UserData={
                                company_id:this.company.id,
                                outlet_id:this.outlet.id,
                                role:this.role.abbr,
                                role_name:this.role.role_name,
                                email:this.user.email,
                                password:this.user.password,
                                c_password:this.user.c_password,
                                name:this.user.name,
                            }


                            axios.post(this.apiSet.register, UserData)
                                .then(function (response) {
                                    self.closeup();
                                    self.loadUsers();
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
                }

            },

            editItem (item) {

                this.editedIndex = this.users.indexOf(item);
                const index = this.users.indexOf(item);
                let raw = this.users[index];
                this.user = Object.assign({}, raw);
                this.dialog = true;
            },


            closeup(){
                this.dialog = false;
                this.user.name='';
                this.user.email='';
                this.user.password='';
                this.user.c_password='';

                this.editedIndex = -1

            },

            updateUser() {

                let self = this;

                if (this.editedIndex > -1) {
                    Object.assign(this.users[this.editedIndex], this.editedItem)

                    let objID = this.editedIndex;
                    let uid = this.users[objID].id;
                    this.loader = true;

                    console.log(objID);

                    const UserData={
                        company_id:this.company.id,
                        outlet_id:this.outlet.id,
                        role:this.role.abbr,
                        role_name:this.role.role_name,
                        email:this.user.email,
                        name:this.user.name,
                    }


                    axios.patch(this.apiSet.singleUser + '/' + uid, UserData)
                        .then(function (response) {
                            self.loader = false;
                            self.snack = true;
                            self.snackText = "Update Successful";
                            self.snackColor = "green";
                            self.closeup();
                            self.$validator.reset();
                            self.loadUsers();

                        })
                        .catch(function (error) {
                            console.log(error);
                            self.loader = false;
                            this.snack = true;
                            this.snackText = "Network erorr occured."
                            this.snackColor = "red"
                        });

                } else {
                    // console.log(this.editedItem);

                }
            },

            resetPass (item) {
                let self = this;
                let confirmFn = function() {
                    self.res(item);
                }

                let obj = {
                    title: 'Reset Password?',
                    message: 'Are you sure you want to Reset Password?',
                    type: 'warning',
                    useConfirmBtn: true,
                    onConfirm: confirmFn
                }
                this.$refs.simplert.openSimplert(obj);

            },

            res(uid){
                this.fetchup = true;
                let self = this;

                axios.patch(this.apiSet.passReset + '/' + uid)
                    .then(function (response) {
                        console.log(response);
                        self.fetchup = false;
                        self.snack = true;
                        self.snackText = "Password Successfully Reset to fms1212";
                        self.snackColor = "green";

                    })
                    .catch(function (error) {
                        console.log(error);
                        self.loader = false;
                        this.snack = true;
                        this.snackText = "Network erorr occured."
                        this.snackColor = "red"
                    });

            },


            deleteItem (item,h) {
                let self = this;
                // let confirmFn = this.del(item);

                if( h === 1){

                    let obj_non = {
                        title: 'Sorry !',
                        message: 'You Cannot Delete SuperAdmin?',
                        type: 'warning',
                        // useConfirmBtn: true,
                    }

                    this.$refs.simplert.openSimplert(obj_non);
                    return false;
                }

                let confirmFn = function() {
                    self.del(item);
                }

                let obj = {
                    title: 'Delete User?',
                    message: 'Are you sure you want to Delete User?',
                    type: 'warning',
                    useConfirmBtn: true,
                    onConfirm: confirmFn
                }
                this.$refs.simplert.openSimplert(obj);

            },

            del(item){
                let self = this;
                let apiUrl = this.$store.state.config.url;


                if(item.id === this.userData.id){
                    self.snack = true;
                    self.snackText = "Sorry You cannot Delete yourself.";
                    self.snackColor ="red";

                    return false;
                }

                const index = this.users.indexOf(item);
                this.users.splice(index, 1);


                axios.delete(apiUrl+'/user/'+item.id)
                    .then(function(response){
                        console.log(response);
                        self.del_snackbar = true;
                        self.loadUsers();
                        self.snack = true;
                        self.snackText = "Data Successfully Deleted";
                        self.snackColor ="red";

                    }).catch(function(error){
                    self.snack = true;
                    self.snackText = "Sorry. Network Error occured.";
                    self.snackColor ="red";
                    console.log(error);
                })
            },
        }
    }
</script>

<style lang="scss" scoped>
    .thead{
        background: #474747 url('/static/img/bg.png');
    }
    .ttext{
        color: #2e3436;
        text-shadow: 0px 2px 3px rgba(0,0,0,0.3);
    }
    .centerup{
        font-size:25px;
        background-color: #666666;
        -webkit-background-clip: text;
        -moz-background-clip: text;
        background-clip: text;
        color: transparent;
        text-shadow: rgba(255,255,255,0.5) 0px 3px 3px;
    }
    .cent tr td:first-child{
        font-weight:bold;
        font-size:14px;
        color:#222222;
    }

</style>