export default{
    getApi(state) {
        return state.config.api;
    },
    getHead(state) {
        return state.head;
    },
    getNewPurchase(state){
        return state.new_purchase;
    },
    getPout(state){
        return state.pout;
    },

    getDrawer(state){
        return state.drawer;
    },
    getCustomers(state){
        return state.customers;
    },
    getReturnees(state){
        return state.returnees;
    },
    getDebOut(state){
        return state.deb_out;
    },
    getLowStock(state){
        return state.low_stock;
    },
    getSalesSession(state){
        return state.sales_session;
    },
    getCustomerID(state){
        return state.customerID;
    },
    getTopProds(state){
        return state.topProds;
    },
    getMini(state){
        return state.mini;
    },
    getIsUp(state){
        return state.isUp;
    },
    getDictionaries(state){
        return state.dictionaries;
    },
    getCats(state){
        return state.all_categories;
    },
    getSnack(state){
        return state.snacky;
    },
    getCurrentProducts(state){
        return state.current_products;
    },
    getAllProducts(state){
        return state.all_products[0];
    },
    getTranserDet(state){
        return state.transferDet;
    },
    getTranserNew(state){
        return state.transferNew;
    },
    getCurrentSales(state){
        return state.current_sales;
    },
    getCompany(state){
        return state.company_details;
    },
    getSaleCustomer(state){
        return state.sale_customer;
    },
    getUserData(state){
        return state.user_data;
    },
    getSideItems(state){
        return state.side_items;
    },
    getExCats(state){
        return state.ex_cats;
    },
    getOutlets(state){
        return state.outlets;
    },
    getMylets(state){
        let outSet =  state.outlets;
        let letSet = [];

        for (let key = 0, len = outSet.length; key < len; key++) {
            letSet.push(outSet[key].outlet_name);

        }
        return letSet;
    },
    getSup(state){
        return state.all_sup;
    },
    getAuthUser(state){
        return state.all_sup;
    },
    getPackUnits(state){
        return state.pack_units;
    },
    getBankDrop(state){
        return state.bank_drop;
    },
    getSuspendedSales(state){
        return state.suspendedSales;
    },
    getRightDrawer(state){
        return state.drawerRight;
    },
    getPurchaseDet(state){
        return state.purchase_det;
    },



}
