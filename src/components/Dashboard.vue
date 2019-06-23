<template>
    <div>
        <v-container grid-list-xl fluid>
            <v-layout row wrap>
                <!--<v-btn @click="loadLow">Login Logoligi</v-btn>-->
                <!-- mini statistic start -->
                <v-flex lg3 sm6 xs12>
                    <mini-statistic
                            icon="mdi-alert-decagram"
                            :title="mini.exp"
                            sub-title="Products expiring"
                            color="secondary"
                            link="/expiry_reports"
                    >
                    </mini-statistic>
                </v-flex>
                <v-flex lg3 sm6 xs12>
                    <slide-x-right-transition>
                    <mini-statistic
                            icon="mdi-tag"
                            :title="mini.prod"
                            sub-title="Products Added"
                            color="orange darken-3"
                            link="/stock_manager"
                    >
                    </mini-statistic>
                    </slide-x-right-transition>
                </v-flex>
                <v-flex lg3 sm6 xs12>
                    <mini-statistic
                            icon="mdi-account-location"
                            :title="mini.deb"
                            sub-title="Debtors available"
                            color="primary"
                            link="/debtors"
                    >
                    </mini-statistic>
                </v-flex>
                <v-flex lg3 sm6 xs12>
                    <mini-statistic
                            icon="mdi-account-star"
                            :title="mini.cred"
                            sub-title="Creditors unpaid"
                            color="grey darken-3"
                            link="/creditors"
                    >
                    </mini-statistic>
                </v-flex>
                <!-- mini statistic  end -->


                <v-flex lg12 sm12 xs12>
                    <v-widget title="Sales & Expenses" content-bg="white">
                        <v-btn icon slot="widget-header-action">
                            <v-icon class="text--secondary">refresh</v-icon>
                        </v-btn>
                        <div slot="widget-content">
                            <e-chart
                                    :path-option="[
                  ['dataset.source', siteTrafficData],
                  ['color', ['#074D64', '#660033']],
                  ['legend.show', true],
                  ['xAxis.axisLabel.show', true],
                  ['yAxis.axisLabel.show', true],
                  ['grid.left', '2%'],
                  ['grid.bottom', '5%'],
                  ['grid.right', '3%'],
                  ['series[0].type', 'bar'],
                  ['series[0].areaStyle', {}],
                  ['series[0].smooth', true],
                  ['series[1].smooth', true],
                  ['series[1].type', 'bar'],
                  ['series[1].areaStyle', {}],
                ]"
                                    height="400px"
                                    width="100%"
                            >
                            </e-chart>
                        </div>
                    </v-widget>
                </v-flex>
                <!-- Circle statistic -->

                <v-flex lg3 sm12 xs12 v-for="(item,index) in debOut" :key="'c-trending'+index">
                    <circle-statistic
                            :title="item.subheading"
                            :sub-title="item.headline"
                            :caption="item.caption"
                            :icon="item.icon.label"
                            :color="item.linear.color"
                            :value="item.linear.value"
                    >
                    </circle-statistic>
                </v-flex>






                <v-flex lg8 sm12 xs12>
                    <v-widget title="Top Selling Products" content-bg="white">
                        <div slot="widget-content">
                            <e-chart
                                    :path-option="[
                  ['dataset.source', locData],
                  ['legend.bottom', '0'],
                  ['color', ['#660033', color.indigo.darken3, color.red.darken3, color.green.darken3, color.cyan.darken3, color.teal.base]],
                  ['xAxis.show', false],
                  ['yAxis.show', false],
                  ['series[0].type', 'pie'],
                  ['series[0].avoidLabelOverlap', true],
                  ['series[0].radius', ['50%', '70%']],
                ]"
                                    height="400px"
                                    width="100%"
                            >
                            </e-chart>
                        </div>
                    </v-widget>

                    <!--Plain Table for Low Stock Products-->

                    <v-divider class="ma-2"></v-divider>
                    <plain-table></plain-table>

                    <!--Plain Order Table for Processes-->

                    <!--<v-divider class="ma-2"></v-divider>-->
                    <!--<plain-table-order></plain-table-order>-->


                </v-flex>

                <!-- statistic section -->
                <v-flex lg4 sm12 xs12>
                    <linear-statistic
                            title="Sales"
                            sub-title="Sales increase this month"
                            icon="trending_up"
                            color="green darken-3"
                            :value="15"
                    >
                    </linear-statistic>

                    <linear-statistic class="my-4"
                                      title="Revenue"
                                      sub-title="Revenue increase this month"
                                      icon="trending_up"
                                      color="primary"
                                      :value="50"
                    >
                    </linear-statistic>
                    <linear-statistic class="my-4"
                                      title="Expenses"
                                      sub-title="Expenses Increase this month"
                                      icon="trending_up"
                                      color="secondary"
                                      :value="30"
                    >
                    </linear-statistic>

                    <linear-statistic class="mt-4"
                                      title="Customer"
                                      sub-title="Customer increase"
                                      icon="trending_down"
                                      color="yellow darken-3"
                                      :value="25"
                    >
                    </linear-statistic>
                </v-flex>

            </v-layout>
        </v-container>
    </div>
</template>

<script>

    import API from '../api';
    import EChart from '../dash_components/chart/echart';
    import MiniStatistic from '../dash_components/widgets/statistic/MiniStatistic';
    import PostListCard from '../dash_components/widgets/card/PostListCard';
    import PostSingleCard from '../dash_components/widgets/card/PostSingleCard';
    import WeatherCard from '../dash_components/widgets/card/WeatherCard';
    import PlainTable from '../dash_components/widgets/list/PlainTable';
    import PlainTableOrder from '../dash_components/widgets/list/PlainTableOrder';
    import VWidget from '../dash_components/VWidget';
    import Material from 'vuetify/es5/util/colors';
    import VCircle from '../dash_components/circle/VCircle';
    import BoxChart from '../dash_components/widgets/chart/BoxChart';
    import LinearStatistic from '../dash_components/widgets/statistic/LinearStatistic';
    import CircleStatistic from '../dash_components/widgets/statistic/CircleStatistic';


    export default {
        name:"home",
        components: {
            VWidget,
            MiniStatistic,
            VCircle,
            WeatherCard,
            PostSingleCard,
            PostListCard,
            EChart,
            BoxChart,
            LinearStatistic,
            CircleStatistic,
            PlainTable,
            PlainTableOrder
        },
        data: () => ({
            color: Material,
            selectedTab: 'tab-1',
            // mini:{
            //     exp:12,
            //     prod:39,
            //     deb:98,
            //     cred:998
            //
            // },
            linearTrending: [
                {
                    subheading: 'Sales',
                    headline: '2,55',
                    caption: 'increase',
                    percent: 15,
                    icon: {
                        label: 'trending_up',
                        color: 'success'
                    },
                    linear: {
                        value: 15,
                        color: 'success'
                    }
                },
                {
                    subheading: 'Revenue',
                    headline: '6,553',
                    caption: 'increase',
                    percent: 10,
                    icon: {
                        label: 'trending_down',
                        color: 'error'
                    },
                    linear: {
                        value: 15,
                        color: 'error'
                    }
                },
                {
                    subheading: 'Orders',
                    headline: '5,00',
                    caption: 'increase',
                    percent: 50,
                    icon: {
                        label: 'arrow_upward',
                        color: 'info'
                    },
                    linear: {
                        value: 50,
                        color: 'info'
                    }
                }
            ],


        }),
        computed: {
            activity () {
                return API.getActivity();
            },
            posts () {
                return API.getPost(3);
            },
            siteTrafficData () {
                return API.getMonthVisit;
            },
            locData () {
                return this.$store.getters.getTopProds;
            },
            mini() {
                return this.$store.getters.getMini;
            },
            debOut() {
                return this.$store.getters.getDebOut;
            }
        },
        mounted(){
            this.showHead();
            this.loadTop();
            this.loadMini();
            this.loadOut();
            this.loadLow();
        },
        methods:{
            showHead(){
                this.$store.commit('setHead',true)
            },
            loadTop(){
                this.$store.dispatch('loadTopProds');

            },
            loadMini(){
                this.$store.dispatch('loadCount');

            },
            loadOut(){
                this.$store.dispatch('loadDebOut');

            },

            loadLow(){
                this.$store.dispatch('loadLowStock');

            }
        },



    }
</script>

<style lang="scss">
    .thead{
        background: #474747 url('/static/img/bg.png');
    }
    .ttext{
        color: #2e3436;
        text-shadow: 0px 2px 3px rgba(0,0,0,0.3);
    }
</style>