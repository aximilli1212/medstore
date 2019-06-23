<template>
    <div>


        <v-card v-if="" class="grey--text">
            <v-container fluid grid-list-lg>
                <v-layout row>

                    <v-flex>
                        <div class="black--text subheading">Payment Details:</div>
                        <hr>

                    </v-flex>
                </v-layout>
                <v-layout>

                            <v-flex xs6 sm6>
                                <v-select :items=items label="Method"></v-select>
                            </v-flex>
                            <!--<v-flex xs4 sm4>-->
                                <!--<v-text-field-->
                                        <!--name="phone"-->
                                        <!--label="Phone No."-->
                                        <!--id="phone"-->
                                        <!--prepend-icon="phone"-->
                                        <!--value="233-245-2234"-->

                                <!--&gt;</v-text-field>-->
                            <!--</v-flex>-->

                    <v-flex xs6 sm6>
                        <v-card-media
                                src="/static/img/payment1.png"
                                height="100px"
                                contain
                        ></v-card-media>

                    </v-flex>
                </v-layout>
            </v-container>
        </v-card>


    </div>


</template>

<script>
    export default {
        name: "payment-details",
        data(){
            return{
                items:[{ text: 'MTN Mobile Money' },{ text: 'Airtel Money' },{ text: 'Visa Card' },{ text: 'Master Card' }],
            }
        }
    }
</script>

<style scoped>

</style>