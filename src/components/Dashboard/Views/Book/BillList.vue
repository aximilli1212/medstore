<template>
  <div class="content">
    <div class="container-fluid">
      <div class="row">
        <div class="col-12">
          <card>
            <template slot="header">
              <h4 class="card-title">{{activePackage}}</h4>
              <p class="card-category">Billing information as calculated from provided information</p>
            </template>
            <div class="table-responsive">
              <l-table class="table-hover table-striped"
                       :columns="table1.columns"
                       :data="table1.data">
              </l-table>
            </div>
            <v-flex xs12 sm6 offset-sm5>
              <div ><span class="headline grey--text">Grand Total:</span> <span class="headline green--text">Ghc {{ grandTotal}}</span></div>

            </v-flex>
          </card>


        </div>

      </div>
    </div>
  </div>
</template>
<script>
  import LTable from '@/components/UIComponents/Table.vue'
  import Card from '@/components/UIComponents/Cards/Card.vue'
  const tableColumns = ['Rate', 'Duration', 'Calculation', 'Subtotal']
  const tableData = [

  ]

  export default {
    components: {
      LTable,
      Card
    },
    data () {
      return {
        table1: {
          columns: [...tableColumns],
          data: [
          ]
        },
          gold_package:[
          ],

      }
    },
      computed:{
          bookPackage(){
              return this.$store.getters.bookPackage;
          },
          grandTotal(){
              return this.$store.getters.getGrandTotal;
          },
          billChange(){
              return this.$store.getters.getBillData;
          },
          activePackage(){
           return this.$store.getters.Package[this.bookPackage].name;
          }

      },
      mounted(){
          this.gold_package_set();
          this.setBill();
          // tableData[1].rate= this.gold_package.rate
      },
      created(){
          this.$bus.$on('new-book', ($event) => {
             this.setBill();
          })
      },
      methods:{
          gold_package_set(){
              this.gold_package = this.$store.getters.Package[this.bookPackage]

          },
          setBill(){
              this.$store.getters.getBillData[0].rate  = this.gold_package.rate;
              let duration = '0 Day(s) 0 Hr(s) 0 Min(s) ';


               if(this.$store.getters.getBookDays > 0){
                   duration=this.$store.getters.getBookDays+' Day(s)';

               }
               if(this.$store.getters.getBookHours > 0){
                   duration=duration+' '+this.$store.getters.getBookHours+' Hour(s)';
               }
               if(this.$store.getters.getBookMins > 0){
                   duration=duration+' '+this.$store.getters.getBookMins+' Minute(s)';
               }

              this.$store.getters.getBillData[0].duration = duration;

              this.table1.data = this.$store.getters.getBillData;

          },
      },
      watch:{
        // bookPackage:function(){
        //     this.gold_package = this.$store.getters.Package[this.bookPackage]
        //     this.$store.getters.getBillData[0].rate  = this.$store.getters.Package[this.bookPackage].rate;
        //
        //
        // },
          billChange:function(){
            this.setBill();
          }
      }
  }
</script>
<style>
</style>
