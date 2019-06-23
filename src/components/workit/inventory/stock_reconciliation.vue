<template>
    <div>
        <v-btn @click="$router.push('new_recon')"  color="primary" dark class="mb-2">New Reconciliation</v-btn>
        <v-dialog v-model="dialog" persistent max-width="500px">

            <v-card>
                <v-toolbar>
                    <v-toolbar-title class="primary--text">Add Reconciliation</v-toolbar-title>

                    <v-spacer></v-spacer>

                    <v-btn icon @click.native="dialog = false">
                        <v-icon color="secondary">mdi-close</v-icon>
                    </v-btn>

                </v-toolbar>

                <v-card-text>
                    <v-container grid-list-md>
                        <v-layout wrap>
                            <v-flex xs12 sm12 md12>
                                <v-text-field box v-model="editedItem.name" label="Naration"></v-text-field>
                            </v-flex>
                            <v-flex xs12 sm12 md12>
                                <v-text-field
                                 box
                                  v-model="editedItem.calories"
                                   label="Amount"
                                   
                                   ></v-text-field>
                            </v-flex>
                            
                        </v-layout>
                    </v-container>
                </v-card-text>

                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="blue darken-1" flat @click.native="close">Cancel</v-btn>
                    <v-btn color="blue darken-1" flat @click.native="save">Save</v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>



        <v-card class="thead">
            <v-card-title>
                <v-btn icon color="primary" @click="$router.go(-1)" small><v-icon>mdi-arrow-left-thick</v-icon></v-btn>
                <p class="headline ttext mt-3">Reconciliation</p>
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
                    :items="reconciliation"
                    :search="search"
            >
                <template slot="items" slot-scope="props">
                    <td>{{ props.item.invoice }}</td>
                    <td>{{ props.item.outlet }}</td>
                    <td>{{ props.item.opening_qty }}</td>
                    <td>{{ props.item.closing_qty }}</td>
                    <td>{{ props.item.qty_diff }}</td>
                    <td>{{ props.item.opening_value }}</td>
                    <td>{{ props.item.closing_value }}</td>
                    <td>{{ props.item.diff_value }}</td>
                    <td>{{ props.item.userby }}</td>
                    <td>{{ props.item.date }}</td>
                </template>
                <v-alert slot="no-results" :value="true" color="error" icon="warning">
                    Your search for "{{ search }}" found no results.
                </v-alert>
            </v-data-table>
        </v-card>
    </div>
</template>

<script>
    export default {
        name: "reconciliation",
        data () {
            return {
                search: '',
                headers: [
                    { text: 'Inv', align: 'left', sortable: false, value: 'invoice',class:'subheading'},
                    { text: 'Out.', align: 'left', value: 'outlet',class:'subheading' },
                    { text: 'Opn. Qty', align: 'left', value: 'opening_qty',class:'subheading' },
                    { text: 'Clsn. Qty', value: 'closing_qty',class:'subheading' },
                    { text: 'Qty Diff', value: 'qty_diff',class:'subheading' },
                    { text: 'Opn. Val(GHc)', value: 'opening_value',class:'subheading' },
                    { text: 'Clsn. Val(GHc)', value: 'closing_value',class:'subheading' },
                    { text: 'Diff Val(GHc)', value: 'diff_value',class:'subheading' },
                    { text: 'By', Value: 'userby',class:'subheading' },
                    { text: 'Date', Value: 'date',class:'subheading' },
                     { text: '', value: 'name', align: 'centre', sortable: false }
                ],
                dialog:false,
                outlet:'Warehouse',
                editedIndex: -1,
                editedItem: {
                    name: '',
                    calories: 0,
                    fat: 0,
                    carbs: 0,
                    protein: 0
                },
                defaultItem: {
                    name: '',
                    calories: 0,
                    fat: 0,
                    carbs: 0,
                    protein: 0
                },
                reconciliation: [
                    {
                        value: false,
                        invoice: 123454,
                        outlet: 'warehouse',
                        opening_qty: 6.0,
                        closing_qty: 6.0,
                        qty_diff: 24,
                        opening_value: 4.0,
                        closing_value: 200.0,
                        diff_value: 186,
                        userby: 'aximilli32',
                        date: '2018-08-22'
                    },
                ],
                side_items:[],
            }
        },
        watch: {
            dialog(val){
                val || this.close()
            }
        },
        mounted(){
            this.setSide();
        },
        methods:{
            setSide(){
                this.$store.commit('setSideItems',this.side_items);
                this.$store.commit('setDrawer',false);
            },
            close () {
                this.dialog = false
                setTimeout(() => {
                    this.editedItem = Object.assign({}, this.defaultItem)
                    this.editedIndex = -1
                }, 300)
            },

            save () {
                if (this.editedIndex > -1) {
                    Object.assign(this.reconciliation[this.editedIndex], this.editedItem)
                } else {
                    this.reconciliation.push(this.editedItem)
                }
                this.close()
            }
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