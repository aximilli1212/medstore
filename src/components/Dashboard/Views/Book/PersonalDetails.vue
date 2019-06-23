<template>
    <div>


        <v-card v-if="" class="grey--text">
            <v-container fluid grid-list-lg>
                <v-layout row>
                    <v-flex xs12>
                        <div class="black--text ">Billing Information:</div>
                        <hr>
                        <v-layout row wrap>
                              <bill-list>

                              </bill-list>
                        </v-layout>

                    </v-flex>
                </v-layout>

            </v-container>
        </v-card>

    </div>
</template>

<script>
    import BillList from './BillList'
    export default {
        name: "personal-details",
        data(){
            return{
                items:[{ text: 'Mr' },{ text: 'Mrs' },{ text: 'Miss' }],
            }
        },
        components:{
            BillList,
        }
    }
</script>

<style scoped>

</style>