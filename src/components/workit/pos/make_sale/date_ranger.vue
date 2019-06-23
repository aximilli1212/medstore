<template>
    <div>
        <v-container grid-list-md>
            <v-layout
                    row
                    wrap
            >
                <v-flex xs12>
                    <v-card class="daterange--default">
                        <v-toolbar
                                dark
                                flat
                                color="primary"
                        >
                            <v-toolbar-title>Default</v-toolbar-title>
                        </v-toolbar>
                        <v-card-text>
                            <p>From:
                                <v-chip>{{ range[0] }}</v-chip> To:
                                <v-chip>{{ range[1] }}</v-chip>
                            </p>
                            <p>In this example, you can only select dates within the last 15 days.</p>
                            <v-daterange
                                    :options="dateRangeOptions"
                                    @input="onDateRangeChange"
                            />
                        </v-card-text>
                    </v-card>
                </v-flex>
                <v-flex xs12>
                    <v-card class="daterange--no-preset">
                        <v-toolbar
                                dark
                                flat
                                color="primary"
                        >
                            <v-toolbar-title>No Presets</v-toolbar-title>
                        </v-toolbar>
                        <v-card-text>
                            <p>From:
                                <v-chip>{{ range[0] }}</v-chip> To:
                                <v-chip>{{ range[1] }}</v-chip>
                            </p>
                            <v-daterange
                                    :options="dateRangeOptions"
                                    no-presets
                                    @input="onDateRangeChange"
                            />
                        </v-card-text>
                    </v-card>
                </v-flex>
                <v-flex xs12>
                    <v-card class="daterange--min-date">
                        <v-toolbar
                                dark
                                flat
                                color="primary"
                        >
                            <v-toolbar-title>Minimun & Maximum Selectable Date</v-toolbar-title>
                        </v-toolbar>
                        <v-card-text>
                            <v-alert
                                    :value="true"
                                    type="info"
                            >In this example, you can only select dates within the last 15 days & 20 days ahead.</v-alert>
                            <p>From:
                                <v-chip>{{ range[0] }}</v-chip> To:
                                <v-chip>{{ range[1] }}</v-chip>
                            </p>
                            <v-daterange
                                    :options="dateRangeOptionsWithMinDate"
                                    no-presets
                                    @input="onDateRangeChange"
                            />
                        </v-card-text>
                    </v-card>
                </v-flex>
                <v-flex xs12>
                    <v-card class="daterange--dark">
                        <v-toolbar
                                dark
                                flat
                                color="primary"
                        >
                            <v-toolbar-title>Dark Theme</v-toolbar-title>
                        </v-toolbar>
                        <v-card-text>
                            <p>From:
                                <v-chip>{{ range[0] }}</v-chip> To:
                                <v-chip>{{ range[1] }}</v-chip>
                            </p>
                            <v-daterange
                                    :options="dateRangeOptions"
                                    dark
                                    @input="onDateRangeChange"
                            />
                        </v-card-text>
                    </v-card>
                </v-flex>
                <!-- Custom Icons -->
                <v-flex xs12>
                    <v-card class="daterange--custom-icons">
                        <v-toolbar
                                dark
                                flat
                                color="primary"
                        >
                            <v-toolbar-title>Custom Icons</v-toolbar-title>
                        </v-toolbar>
                        <v-card-text>
                            <p>From:
                                <v-chip>{{ range[0] }}</v-chip> To:
                                <v-chip>{{ range[1] }}</v-chip>
                            </p>
                            <v-daterange
                                    :options="dateRangeOptions"
                                    next-icon="arrow_forward"
                                    prev-icon="arrow_back"
                                    @input="onDateRangeChange"
                            />
                        </v-card-text>
                    </v-card>
                </v-flex>
                <v-flex xs12>
                    <v-card class="daterange--in-menu">
                        <v-toolbar
                                dark
                                flat
                                color="primary"
                        >
                            <v-toolbar-title>Open In Menu</v-toolbar-title>
                        </v-toolbar>
                        <v-card-text>
                            The date picker can also be used from a menu. Here's an example -
                            <div>
                                <code v-pre>
                                    &#x3C;v-menu full-width offset-y :close-on-content-click=&#x22;false&#x22; v-model=&#x22;dateMenu&#x22; bottom&#x3E;
                                    &#x3C;v-btn color=&#x22;primary&#x22; outline slot=&#x22;activator&#x22;&#x3E;{{ range[0] }} &#x26;mdash; {{ range[1] }}&#x3C;/v-btn&#x3E;
                                    &#x3C;v-card&#x3E;
                                    &#x3C;v-card-text&#x3E;
                                    &#x3C;v-daterange :options=&#x22;dateRangeOptions&#x22; @input=&#x22;onDateRangeChange&#x22; /&#x3E;
                                    &#x3C;/v-card-text&#x3E;
                                    &#x3C;/v-card&#x3E;
                                    &#x3C;/v-menu&#x3E;
                                </code>
                            </div>
                            <v-menu
                                    :close-on-content-click="false"
                                    v-model="dateMenu"
                                    offset-y
                                    bottom
                            >
                                <v-btn
                                        slot="activator"
                                        color="primary"
                                >{{ range[0] }} &mdash; {{ range[1] }}</v-btn>
                                <v-card>
                                    <v-card-text>
                                        <v-daterange
                                                :options="dateRangeOptions"
                                                @input="onDateRangeChange"
                                        />
                                    </v-card-text>
                                </v-card>
                            </v-menu>
                        </v-card-text>
                    </v-card>
                </v-flex>




                <v-flex xs12>
                    <v-card class="daterange--highlight-dates-off">
                        <v-toolbar
                                dark
                                flat
                                color="primary"
                        >
                            <v-toolbar-title>Rage Highlighting Off</v-toolbar-title>
                        </v-toolbar>
                        <v-card-text>
                            <p>From:
                                <v-chip>{{ range[0] }}</v-chip> To:
                                <v-chip>{{ range[1] }}</v-chip>
                            </p>
                            <p>Range highlighting is by default on. It can be turned off by setting <code>highlight-range</code> prop
                                to <code>false</code></p>
                            <v-daterange
                                    :options="dateRangeOptions"
                                    :highlight-range="false"
                                    @input="onDateRangeChange"
                            />
                        </v-card-text>
                    </v-card>
                </v-flex>
            </v-layout>
        </v-container>
    </div>
</template>
<script>
    import { format, subDays, addDays } from 'date-fns';
    export default {
        data() {
            return {
                range: [],
                dateRangeOptions: {
                    startDate: format(subDays(new Date(), 7), 'YYYY-MM-DD'),
                    endDate: format(new Date(), 'YYYY-MM-DD'),
                    format: 'MM/DD/YYYY',
                    presets: [
                        {
                            label: 'Today',
                            range: [
                                format(new Date(), 'YYYY-MM-DD'),
                                format(new Date(), 'YYYY-MM-DD'),
                            ],
                        },
                        {
                            label: 'Yesterday',
                            range: [
                                format(subDays(new Date(), 1), 'YYYY-MM-DD'),
                                format(subDays(new Date(), 1), 'YYYY-MM-DD'),
                            ],
                        },
                        {
                            label: 'Last 30 Days',
                            range: [
                                format(subDays(new Date(), 30), 'YYYY-MM-DD'),
                                format(subDays(new Date(), 1), 'YYYY-MM-DD'),
                            ],
                        },
                    ],
                },
                dateRangeOptionsWithMinDate: {
                    startDate: format(subDays(new Date(), 7), 'YYYY-MM-DD'),
                    endDate: format(new Date(), 'YYYY-MM-DD'),
                    minDate: format(subDays(new Date(), 15), 'YYYY-MM-DD'),
                    maxDate: format(addDays(new Date(), 20), 'YYYY-MM-DD'),
                    format: 'MM/DD/YYYY',
                    presets: [
                        {
                            label: 'Today',
                            range: [
                                format(new Date(), 'YYYY-MM-DD'),
                                format(new Date(), 'YYYY-MM-DD'),
                            ],
                        },
                        {
                            label: 'Yesterday',
                            range: [
                                format(subDays(new Date(), 1), 'YYYY-MM-DD'),
                                format(subDays(new Date(), 1), 'YYYY-MM-DD'),
                            ],
                        },
                        {
                            label: 'Last 30 Days',
                            range: [
                                format(subDays(new Date(), 30), 'YYYY-MM-DD'),
                                format(subDays(new Date(), 1), 'YYYY-MM-DD'),
                            ],
                        },
                    ],
                },
                dateMenu: false,
            };
        },
        methods: {
            onDateRangeChange(range) {
                this.range = range;
            },
        },
    };
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