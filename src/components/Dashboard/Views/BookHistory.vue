<template>
    <v-layout row class="ml-2 mt-1">
        <v-flex xs4 sm4 >
            <v-card>
                <v-toolbar>
                    <v-toolbar-side-icon></v-toolbar-side-icon>
                    <v-toolbar-title class="primary--text">Booking History</v-toolbar-title>
                    <v-spacer></v-spacer>
                    <v-btn icon>
                        <v-icon>search</v-icon>
                    </v-btn>
                    <v-btn icon>
                        {{items.length}}
                    </v-btn>
                </v-toolbar>

                <div class="scroll_history">
                    <v-list two-line>
                        <template v-for="(item, index) in items">
                            <v-list-tile
                                    avatar
                                    @click="toggle(index)"
                                    :key="item.title"
                            >
                                <v-list-tile-content>
                                    <v-list-tile-title>{{ item.title }}</v-list-tile-title>
                                    <v-list-tile-sub-title class="grey--text text--darken-4">{{ item.headline }}</v-list-tile-sub-title>
                                    <v-list-tile-sub-title>{{ item.subtitle }}</v-list-tile-sub-title>
                                </v-list-tile-content>
                                <v-list-tile-action>
                                    <v-list-tile-action-text>{{ item.action }}</v-list-tile-action-text>
                                    <v-btn
                                            outline
                                            color="primary darken-2"
                                            small
                                    >
                                        View Details</v-btn>

                                </v-list-tile-action>
                            </v-list-tile>
                            <v-divider v-if="index + 1 < items.length" :key="item.title"></v-divider>
                        </template>
                    </v-list>
                </div>
            </v-card>
        </v-flex>




        <v-flex xs4 sm7 class="ml-4">
            <v-card>
                <!--<v-card-title>-->
                <!--<span class="headline">{{ formTitle}}</span>-->
                <!--</v-card-title>-->
                <v-card-text>
                    <v-container grid-list-md>
                        <v-layout column>


                            <v-flex xs12 sm12 >

                                <v-card>
                                    <v-container fluid grid-list-md>
                                        <v-layout row wrap>
                                            <v-flex
                                                    v-bind="{ [`xs${card.flex}`]: true }"
                                                    v-for="card in bookDetails"
                                                    :key="card.title"
                                            >
                                                <v-card>
                                                    <v-flex xs12  flexbox>
                                                        <span class="subheading" v-text="card.title"/>
                                                    </v-flex>
                                                    <v-card-title primary-title>
                                                        <v-layout row wrap v-if="card.request">
                                                            <v-flex xs6 sm6>
                                                                <table class="box-table">
                                                                    <tr>
                                                                        <td class="body-1 primary--text text--darken-4">Customer:</td>
                                                                        <td class="caption">Caleb Afaglo</td>

                                                                    </tr>

                                                                    <tr>
                                                                        <td class="body-1 primary--text">Pickup Loc:</td>
                                                                        <td class="caption">Dansoman SSNIT Flats</td>

                                                                    </tr>
                                                                    <tr>
                                                                        <td class="body-1 primary--text">Pickup Date:</td>
                                                                        <td class="caption">23rd March 2018</td>

                                                                    </tr>
                                                                    <tr>
                                                                        <td class="body-1 primary--text">Pickup Time:</td>
                                                                        <td class="caption">3:00pm</td>

                                                                    </tr>
                                                                </table>

                                                            </v-flex>

                                                            <v-flex xs sm6>
                                                                <table class="box-table">
                                                                    <tr>
                                                                        <td class="body-1 primary--text">Dropoff Loc:</td>
                                                                        <td class="caption">Korle Bu </td>

                                                                    </tr>

                                                                    <tr>
                                                                        <td class="body-1 primary--text">Dropoff Date</td>
                                                                        <td class="caption">23rd March 2018</td>

                                                                    </tr>
                                                                    <tr>
                                                                        <td class="body-1 primary--text">Dropoff Time:</td>
                                                                        <td class="caption">7:00pm</td>

                                                                    </tr>
                                                                    <tr>
                                                                        <td class="subheading primary--text">Total Bill:</td>
                                                                        <td>GHc 700</td>

                                                                    </tr>
                                                                </table>
                                                            </v-flex>
                                                        </v-layout>

                                                        <!--DRIVER SECTION OF MODAL-->
                                                        <v-layout row wrap v-if="card.driver">
                                                            <v-flex xs12 sm12>

                                                                        <v-layout row>
                                                                            <v-flex xs7>
                                                                                <div>
                                                                                    <div class="subheading">Mr. Jude Boaten</div>
                                                                                    <div class="caption grey--text ">Driver</div>
                                                                                </div>
                                                                            </v-flex>
                                                                            <v-flex xs5>
                                                                                <v-card-media
                                                                                        src="/static/img/faces/face-1.jpg"
                                                                                        height="60px"
                                                                                        contain
                                                                                ></v-card-media>
                                                                            </v-flex>
                                                                        </v-layout>

                                                            </v-flex>
                                                        </v-layout>

                                                        <!--VEHICLES SECTION OF MODAL-->
                                                        <v-layout row wrap v-if="card.vehicle">
                                                            <v-flex xs12 sm12>

                                                                <v-layout row>
                                                                    <v-flex xs7>
                                                                        <div>
                                                                            <div class="subheading">Executive Package</div>
                                                                            <div class="caption grey--text ">Car No.: GT-239-K</div>
                                                                        </div>
                                                                    </v-flex>
                                                                    <v-flex xs5>
                                                                        <v-card-media
                                                                                src="/static/img/executive.png"
                                                                                height="60px"
                                                                                contain
                                                                        ></v-card-media>
                                                                    </v-flex>
                                                                </v-layout>

                                                            </v-flex>

                                                        </v-layout>


                                                    </v-card-title>

                                                </v-card>

                                            </v-flex>
                                        </v-layout>
                                        <v-btn>Re-Book</v-btn>

                                    </v-container>
                                </v-card>
                            </v-flex>
                        </v-layout>
                    </v-container>
                </v-card-text>
            </v-card>
        </v-flex>
    </v-layout>
</template>

<script>
    export default {
        name: "book-history",
        data () {
            return {
                selected: [2],
                items: [
                    { action: '2 days ago', headline: '23rd March 2017', title: 'Movenpick Grand Hotel', subtitle: "7:00 pm",time:"5:00pm" },
                    { action: '6 days ago', headline: '15th August 2017', title: 'National Theatre', subtitle: "3:45 pm" },
                    { action: '2 weeks ago', headline: '13th Mar 2018', title: 'Zenith Bank Headoffice', subtitle: "11:00 pm" },
                    { action: 'a month ago', headline: '2nd Feb 2017', title: 'Kruger Security', subtitle: "08:18 am" },
                    { action: '3 months ago', headline: '29th May 2017', title: 'Page Event Center', subtitle: "02:30 pm" },
                ],
                bookDetails: [
                    { title: 'Book Details', src: '/static/img/4.jpg', flex: 12 ,request:'set'},
                    { title: '', src: '/static/img/2.jpg', flex: 6,
                        driver:{name:'Kwame Oduro Jnr',img_url:'/static/img/faces/0.png'} },
                    { title: '', src: '/static/img/milwaukee.jpg', flex: 6,
                        vehicle:{name:'Hyundai',packageName:'Standard',img_url:'/static/img/14.png'}
                    }
                ],
            }
        },

        methods: {
            toggle (index) {
                const i = this.selected.indexOf(index)

                if (i > -1) {
                    this.selected.splice(i, 1)
                } else {
                    this.selected.push(index)
                }
            }
        }
    }
</script>

<style scoped>
    .scroll_history{
        height:600px;
        overflow-y:scroll;
    }
</style>