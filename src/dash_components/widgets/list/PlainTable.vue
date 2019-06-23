<template>
  <v-card>
    <v-toolbar card dense color="transparent">
      <v-toolbar-title><h4>Low Stock Products</h4></v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn icon>
        <v-icon>more_vert</v-icon>
      </v-btn>
    </v-toolbar>
    <v-divider></v-divider>
    <v-card-text class="pa-0">
      <template>
        <v-data-table
          :headers="headers"
          :items="lowStock"
          hide-actions
          class="elevation-0"
        >
          <template slot="items" slot-scope="props">
            <td>{{ props.item.name }}</td>
            <td class="text-xs-left">{{ props.item.quantity }}</td>
            <td class="text-xs-left"><v-progress-linear :value="props.item.progress" height="5" :color="props.item.color"></v-progress-linear> </td>
              <td class="justify-center layout px-0">

                  <v-btn
                          flat
                          small
                          class="mr-2 primary--text cpoint"
                          @click="editItem(props.item)"
                  ><v-icon

                  >
                      mdi-file-document-box
                  </v-icon> View Details</v-btn>



                  <v-btn  small
                          flat
                          class="secondary--text cpoint"
                          @click="deleteItem(props.item)"
                  ><v-icon

                  >
                      mdi-find-replace
                  </v-icon> Re-order</v-btn>

              </td>
          </template>
        </v-data-table>
      </template>
      <v-divider></v-divider>
    </v-card-text>
  </v-card>
</template>

<script>
import { Projects } from '@/api/project';
export default {
  data () {
    return {
      headers: [

        {
          text: 'Product Name',
          align: 'left',
          value: 'name'
        },
        { text: 'Available Quantity', value: 'quantity' },
        { text: 'Severity', value: 'progress' },
        { text: 'Action', value: 'action', align: 'right' },

      ],
    }
  },
  computed: {
    lowStock() {
      return this.$store.getters.getLowStock;
    }
  }
};
</script>
