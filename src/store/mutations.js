export default{
    setLoadedMeetups(state,payload){
        state.loadedMeetups = payload;
    },
    setHead(state,payload){
        state.head = payload;
    },
    setSnack(state,payload){
        state.snacky = payload;
    },
    setCustomer(state,payload){
        state.regCustomer = payload;
    },
    setDic(state,payload){
        state.dictionaries = payload;
    },
    set_uid(state,payload){
        state.user_data.id= payload;
    },
    createMeetup(state,payload){
        state.loadedMeetups.push(payload)
    },
    createCustomer(state,payload){
        state.regCustomer.push(payload)
    },
    setAuth(state,payload){
        state.authUser = payload
    },
    setDrawer(state,payload){
        state.drawer = payload
    },
    setReturnees(state,payload){
        state.returnees = payload
    },
    setRightDrawer(state,payload){
        state.drawerRight = payload
    },
    setSideItems(state,payload){
        state.side_items = payload
    },
    setUser_email(state,payload){
        state.user_email = payload.email
    },
    Regform(state,payload){
        state.regform = payload
    },
    ReqDet(state,payload){
        state.reqdetails = payload
    },
    PickDet(state,payload){
        state.pickdetails = payload
    },
    PayDet(state,payload){
        state.paydetails = payload
    },
    PersonalDet(state,payload){
        state.personaldetails = payload
    },
    setLoading(state,payload){
        state.loading = payload
    },
    setLoadingPage(state,payload){
        state.loadingPage = payload
    },
    setError(state,payload){
        state.error = payload
    },
    clearError(state,payload){
        state.error=null
    },
    setSubmitLoadState(state, data) {
        state.submitLoadState = data;
    },
    set_in(state,payload){
        state.s_in=payload
    },
    set_up(state,payload){
        state.s_up=payload
    }
    ,
    setCustomers(state,payload){
        state.customers=payload
    },
    setBookInfo(state,payload){
        state.bookInfo=payload
    },
    setBookDays(state,payload){
        state.bookDays=payload
    },
    setBookHours(state,payload){
        state.bookHours=payload
    },
    setBookMins(state,payload){
        state.bookMins=payload
    },
    setBookTime(state,payload){
        state.bookTime=payload
    },
    setGrandTotal(state,payload){
        state.grandTotal=payload
    },
    setGoldLoad(state,payload){
        state.goldLoad=payload
    },
    setBillData(state,payload){
        state.billData[0]=payload
    },
    setBillRate(state,payload){
        state.billData[0].rate=payload
    },
    setPackage(state,payload){
        state.bookPackage=payload
    },
    setPout(state,payload){
        state.pout = payload;
    },
    setReturnProds(state,payload){
        state.current_products[payload.indy].quantity = payload.rem_quantity;
        state.current_products[payload.indy].ret_quantity = payload.ret_quantity;
    },
    setReturnSales(state,payload){
        state.current_sales.total = payload.rem_total;
        state.current_sales.ret_total = payload.ret_total;
    },
    upReqMsg(state,payload){
        state.reqMsg=state.reqMsg + 1;
    },
    setCustomerID(state,payload){
        state.customerID=payload;
    },
    setNewPurchase(state,payload){
        state.new_purchase.push(payload);
    },
    setNewPopPurchase(state,payload){
        state.new_purchase = payload;
    },
    setAllProducts(state,payload){
        state.all_products.push(payload);
    },
    setCat(state,payload){
        state.all_categories = payload;
    },
    setSalesSession(state,payload){
        state.sales_session = payload;
    },
    setTransferDet(state,payload){
        state.transferDet = payload;
    },
    setTransferNew(state,payload){
        state.transferNew = payload;
    },
    setSup(state,payload){
        state.all_sup = payload;
    },
    setLowStock(state,payload){
        state.low_stock= payload;
    },
    setCurrentSales(state,payload){
        state.current_sales = payload;
    },
    setInvoiceCS(state,payload){
        state.current_sales.invoice_no = payload;
    },
    setAddData(state,payload){
        state.current_sales.invoice_no = payload.invoice_no;
        state.current_sales.amount_tendered = payload.amount_tendered;
        state.current_sales.change_due = payload.change_due;
        state.current_sales.amount_due = payload.amount_due;
        state.current_sales.payment_type = payload.payment_type;
    },
    setCurrentProducts(state,payload){
        state.current_products = payload;
    },

    setSaleCustomer(state,payload){
        state.sale_customer = payload;
    },
    setIsUp(state,payload){
        state.isUp= payload;
    },
    setExCats(state,payload){
        state.ex_cats = payload;
    },
    setTopProds(state,payload){
        state.topProds = payload;
    },
    setOutlets(state,payload){
        state.outlets = payload;
    },
    setDebOut(state,payload){
        state.deb_out= payload;
    },
    setPackUnits(state,payload){
        state.pack_units = payload;
    },
    setBankDrop(state,payload){
        state.bank_drop = payload;
    },
    setSuspendedSales(state,payload){
        state.suspendedSales.unshift(payload);
    },
    setCompany(state,payload){
        state.company_details = payload;
    },
    setPurchaseDet(state,payload){
        state.purchase_det = payload;
    },
    setUserData(state,payload){
        state.user_data = payload;
    },
    setMini(state,payload){
        state.mini = payload;
    },
    clearPurchase(state,payload){
        state.new_purchase = [];
    },
    delPurchase(state,payload){

        // let index = state.new_purchase.findIndex(item => item.id === payload.id)

        state.new_purchase.splice(state.new_purchase.findIndex(item => item.id === payload.id), 1)

    },
    editNewPurchase(state,payload){
           state.new_purchase[payload.index] = payload;
    }

}
