<template>
    <v-layout row align-center>
        <v-flex sm2>
            <v-select
                    v-model="purchase_det.outlet"
                    offset-y
                    class="mt-2"
                    :items="outlets"
                    label="Select Outlet"
                    data-vv-name="outlet"
                    :error-messages="errors.collect('outlet')"
                    v-validate="'required'"
                    solo
            ></v-select>

        </v-flex>

        <v-flex sm3 md3>
            <v-select
                    v-model="purchase_det.supplier"
                    offset-y
                    class="mt-2 ml-2"
                    :items="suppliers"
                    label="Select Supplier"
                    data-vv-name="supplier"
                    :error-messages="errors.collect('supplier')"
                    v-validate="'required'"
                    solo
            ></v-select>

        </v-flex>
        <v-flex sm3 md3>
            <v-text-field
                    v-model="purchase_det.sup_invoice"
                    class="mt-2 ml-2"
                    label="Invoice No."
                    data-vv-name="invoice"
                    :error-messages="errors.collect('invoice')"
                    v-validate="'required'"
                    solo
            ></v-text-field>

        </v-flex>

        <v-flex sm3 md3>
            <v-text-field
                    v-model="purchase_det.carriage"
                    class="mt-2 ml-2"
                    label="Carriage/Freight"
                    data-vv-name="carriage"
                    :error-messages="errors.collect('carriage')"
                    v-validate="'required'"
                    solo
            ></v-text-field>

        </v-flex>

        <v-flex sm3 md3>
            <v-text-field
                    v-model="purchase_det.vat"
                    class="mt-2 ml-2"
                    label="Vat Charges"
                    data-vv-name="vat"
                    :error-messages="errors.collect('vat')"
                    v-validate="'required'"
                    solo
            ></v-text-field>

        </v-flex>
        <v-flex sm3 md3>
            <v-text-field
                    v-model="purchase_det.sup_discount"
                    class="mt-2 ml-2"
                    label="Discount"
                    data-vv-name="discount"
                    :error-messages="errors.collect('discount')"
                    v-validate="'required'"
                    solo
            ></v-text-field>

        </v-flex>
        <v-flex sm3 md3>
            <v-select
                    v-model="purchase_det.payment_mode"
                    offset-y
                    class="mt-2 ml-2"
                    :items="payment_modes"
                    label="Payment Mode"
                    data-vv-name="mode"
                    :error-messages="errors.collect('mode')"
                    v-validate="'required'"
                    solo
            ></v-select>

        </v-flex>


        <v-spacer></v-spacer>
    </v-layout>
</template>

<script>
    export default {
        name: "validated_purchase_form"
    }
</script>

<style scoped>

</style>