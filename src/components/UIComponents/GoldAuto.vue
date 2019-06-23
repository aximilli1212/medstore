<template>
    <vue-google-autocomplete
            ref="address"
            id="map"
            classname="form-control"
            placeholder="Please type your address"
            v-on:placechanged="getAddressData"
            country="sg"
    >
    </vue-google-autocomplete>
</template>

<script>
    export default {
        name: "gold-auto",
        data() {
            return {
                address: {},
                appendIcon: 'search',
                classname: '',
                clearable: 'true',
                disabled: false,
                enableGeolocation: false,
                id: 'map',
                labelText: 'Search Address',
                prependIcon: '',
                placeholderText: '',
                required: 'true',
                types: ['geocode'],

            }
        },
        methods: {
            getAddressData: function (addressData, placeResultData) {
                this.address = addressData;
            }
        }
    }
</script>

<style scoped>

</style>