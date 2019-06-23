import Vue from 'vue'
import Router from 'vue-router'
import Home  from '@/components/Home'
import Login  from '@/components/Login'
import Dashboard  from '@/components/Dashboard'
import MakeSale  from '@/components/workit/pos/make_sale/make_sale'
import MakeSaleBarcode  from '@/components/workit/pos/make_sale/make_sale_barcode'
import SaleInvoice  from '@/components/workit/pos/make_sale/sale_invoice'
import NewSaleInvoice  from '@/components/workit/pos/make_sale/new_sale_invoice'
import ClearSaleInvoice  from '@/components/workit/pos/make_sale/clear_sale_invoice'
import BufferInvoice  from '@/components/workit/pos/make_sale/buffer_invoice'
import InvoiceList  from '@/components/workit/pos/make_sale/invoice_list'
import AllInvoiceList  from '@/components/workit/pos/make_sale/all_invoice_list'
import ProformaInvoice  from '@/components/workit/pos/make_sale/proforma_invoice'
import AttendantInvoice  from '@/components/workit/pos/make_sale/attendant_invoice'
import DateRanger  from '@/components/workit/pos/make_sale/date_ranger'
import MySales  from '@/components/workit/pos/make_sale/my_sales'
import Customers  from '@/components/workit/pos/customers';
import PackUnit  from '@/components/workit/admin/pack_units';
import DosageForm from '@/components/workit/admin/dosage_form';
import UserProfile  from '@/components/workit/admin/user_profile';
import SaleSessions  from '@/components/workit/admin/sale_sessions';
import FmsUsers  from '@/components/workit/admin/fms_users';
import FmsCompany  from '@/components/workit/admin/fms_company';
import MyCompany  from '@/components/workit/admin/my_company';
import FmsOutlet  from '@/components/workit/admin/fms_outlet';
import Expenses  from '@/components/workit/pos/expenses';
import Requisitions  from '@/components/workit/pos/reorder/requisitions';
import NewReorder  from '@/components/workit/pos/reorder/new_reorder';
import ReorderView  from '@/components/workit/pos/reorder/reorder_view';
import PosReceive  from '@/components/workit/pos/reorder/pos_receive';
import PosReorderPop  from '@/components/workit/pos/reorder/pos_receive_invoice';
import ExCategories  from '@/components/workit/pos/ex_categories';
import PosExpiry  from '@/components/workit/pos/pos_expiry';
import AccountSummary  from '@/components/workit/accounts/acc_summary';
import StockManager  from '@/components/workit/inventory/stock_manager';
import ProductDictionary  from '@/components/workit/inventory/product_dictionary';
import ZeroStock  from '@/components/workit/inventory/zero_stock';
import AddProducts  from '@/components/workit/inventory/add_products';
import Categories  from '@/components/workit/inventory/categories';
import ReceiveItems  from '@/components/workit/inventory/receive_items';
import Purchases from '@/components/workit/inventory/purchases/purchases'
import NewPurchase from '@/components/workit/inventory/purchases/new_purchase'
import PurchaseView from '@/components/workit/inventory/purchases/purchase_view'
import PurchasePop from '@/components/workit/inventory/purchases/purchase_invoice_pop'
import PurchaseDraft from '@/components/workit/inventory/purchases/purchase_draft'
import ReorderPop from '@/components/workit/inventory/purchases/reorder_invoice_pop'
import Suppliers from '@/components/workit/inventory/purchases/suppliers'
import StockReconciliation from '@/components/workit/inventory/stock_reconciliation'
import NewStockReconciliation from '@/components/workit/inventory/new_reconciliation'
import GoodStockReconciliation from '@/components/workit/inventory/good_reconciliation'
import InvRequisitions from '@/components/workit/inventory/inv_reorder/inv_reorder';
import InvShortages from '@/components/workit/inventory/shortages/inv_shortages';
import InvShortageView from '@/components/workit/inventory/shortages/inv_shortage_view';
import NewShortages from '@/components/workit/inventory/shortages/new_shortages';
import InvTransfer from '@/components/workit/inventory/inv_reorder/inv_transfer';
import BankAccount from '@/components/workit/accounts/bank_account'
import BankTransactions from '@/components/workit/accounts/bank_transact';
import CustomerStatements from '@/components/workit/accounts/customer_statements';
import Debtors from '@/components/workit/accounts/debtors';
import DebtorsHistory from '@/components/workit/accounts/debtors_history';
import CreditorsHistory from '@/components/workit/accounts/creditors_history';
import Creditors from '@/components/workit/accounts/creditors';
import SupplierStatements from '@/components/workit/accounts/supplier_statements'
import ExpiryReports from '@/components/workit/reports/expiry_reports/expiry_reports'
import SalesReport from '@/components/workit/reports/sales_report/sales_report'
import SalesSummary from '@/components/workit/reports/sales_report/sales_summary'
import Toppers from '@/components/workit/reports/toppers'

import NotFound from '../components/Error.vue';

Vue.use(Router);

export default new Router({
    // mode:'hash',
    routes: [

        {
            path: '/',
            name: 'Home',
            component: Home
        },
        {
            path: '/login',
            name: 'Login',
            component: Login
        },
        {
            path: '/dashboard',
            name: 'Dashboard',
            meta: { breadcrumb: true },
            component: Dashboard
        },

        {
            path: '/make_sale',
            name: 'sales',
            meta: { breadcrumb: true },
            component: MakeSale
        },
        {
            path: '/make_sale_barcode',
            name: 'make-sale-barcode',
            meta: { breadcrumb: true },
            component: MakeSaleBarcode
        },
        {
            path: '/date_ranger',
            name: 'date_ranger',
            meta: { breadcrumb: true },
            component: DateRanger
        },
        {
            path: '/purchase_draft',
            name: 'purchase_draft',
            // meta: { breadcrumb: true },
            component: PurchaseDraft
        },
        {
            path: '/my_sales',
            name: 'my_sales',
            meta: { breadcrumb: true },
            component: MySales
        },
        {
            path: '/sales_summary',
            name: 'sales_summary',
            meta: { breadcrumb: true },
            component: SalesSummary
        },
        {
            path: '/toppers',
            name: 'toppers',
            meta: { breadcrumb: true },
            component: Toppers
        },
        {
            path: '/sale_invoice',
            name: 'sale_invoice',
            component: SaleInvoice
        },
        {
            path: '/new_sale_invoice',
            name: 'new_sale_invoice',
            component: NewSaleInvoice
        },
        {
            path: '/clear_sale_invoice',
            name: 'clear_sale_invoice',
            component: ClearSaleInvoice
        },
        {
            path: '/user_profile',
            name: 'user_profile',
            component: UserProfile
        },
        {
            path: '/buffer_invoice',
            name: 'buffer_invoice',
            component: BufferInvoice
        },
        {
            path: '/invoice_list',
            name: 'invoice_list',
            component: InvoiceList
        },
        {
            path: '/all_invoice_list',
            name: 'all_invoice_list',
            component: AllInvoiceList
        },
        {
            path: '/attendant_invoice',
            name: 'attendant_invoice',
            component: AttendantInvoice
        },
        {
            path: '/debtors',
            name: 'debtors',
            meta: { breadcrumb: true },
            component: Debtors
        },
        {
            path: '/creditors',
            name: 'creditors',
            meta: { breadcrumb: true },
            component: Creditors
        },

        {
            path: '/stock_recon',
            name: 'stock_recon',
            meta: { breadcrumb: true },
            component: StockReconciliation
        },

        {
            path: '/new_recon',
            name: 'new_recon',
            meta: { breadcrumb: true },
            component: NewStockReconciliation
        },

        {
            path: '/good_recon',
            name: 'good_recon',
            meta: { breadcrumb: true },
            component: GoodStockReconciliation
        },

        {
            path: '/bank_account',
            name: 'bank_account',
            meta: { breadcrumb: true },
            component: BankAccount
        },
        {
            path: '/requisitions',
            name: 'requisitions',
            meta: { breadcrumb: true },
            component: Requisitions
        },
        {
            path: '/new_reorder',
            name: 'new_reorder',
            // meta: { breadcrumb: true },
            component: NewReorder
        },
        {
            path: '/inv_requisitions',
            name: 'inv_requisitions',
            // meta: { breadcrumb: true },
            component: InvRequisitions
        },
        {
            path: '/inv_shortages',
            name: 'inv_shortages',
            // meta: { breadcrumb: true },
            component: InvShortages
        },{
            path: '/inv_shortage_view',
            name: 'inv_shortage_view',
            // meta: { breadcrumb: true },
            component: InvShortageView
        },

        {
            path: '/new_shortages',
            name: 'new_shortages',
            // meta: { breadcrumb: true },
            component: NewShortages
        },

        {
            path: '/inv_transfer',
            name: 'inv_transfer',
            // meta: { breadcrumb: true },
            component: InvTransfer
        },
        {
            path: '/bank_transact',
            name: 'bank_transact',
            meta: { breadcrumb: true },
            component: BankTransactions
        },
        {
            path: '/customer_statements',
            name: 'customer_statements',
            meta: { breadcrumb: true },
            component: CustomerStatements
        },
        {
            path: '/supplier_statements',
            name: 'supplier_statements',
            meta: { breadcrumb: true },
            component: SupplierStatements
        },
        {
            path: '/expiry_reports',
            name: 'expiry_reports',
            meta: { breadcrumb: true },
            component: ExpiryReports
        },

        {
            path: '/zero_stock',
            name: 'zero_stock',
            component: ZeroStock
        },
        {
            path: '/pack_unit',
            name: 'pack_unit',
            meta: { breadcrumb: true },
            component: PackUnit
        },
        {
            path: '/dosage_forms',
            name: 'dosage_forms',
            meta: { breadcrumb: true },
            component: DosageForm
        },

        {
            path: '/customers',
            name: 'customers',
            meta: { breadcrumb: true },
            component: Customers
        },
        {
            path: '/suppliers',
            name: 'suppliers',
            meta: { breadcrumb: true },
            component: Suppliers
        },
        {
            path: '/pos_expiry',
            name: 'pos_expiry',
            meta: { breadcrumb: true },
            component: PosExpiry
        },
        {
            path: '/pos_receive',
            name: 'pos_receive',
            meta: { breadcrumb: true },
            component: PosReceive
        },
        {
            path: '/debtors_history',
            name: 'debtors_history',
            // meta: { breadcrumb: true },
            component: DebtorsHistory
        },
        {
            path: '/creditors_history',
            name: 'creditors_history',
            // meta: { breadcrumb: true },
            component: CreditorsHistory
        },
        {
            path: '/receive_items',
            name: 'receive_items',
            meta: { breadcrumb: true },
            component: ReceiveItems
        },

        {
            path: '/expenses',
            name: 'expenses',
            meta: { breadcrumb: true },
            component: Expenses
        },

        {
            path: '/proforma_invoice',
            name: 'proforma_invoice',
            meta: { breadcrumb: true },
            component: ProformaInvoice
        },
        {
            path: '/categories',
            name: 'categories',
            meta: { breadcrumb: true },
            component: Categories
        },

        {
            path: '/ex_categories',
            name: 'ex_categories',
            meta: { breadcrumb: true },
            component: ExCategories
        },


        {
            path: '/purchases',
            name: 'purchases',
            meta: { breadcrumb: true },
            component: Purchases
        },
        {
            path: '/new_purchase',
            name: 'new_purchase',
            meta: { breadcrumb: true },
            component: NewPurchase
        },

        {
            path: '/purchase_view',
            name: 'purchase_view',
            meta: { breadcrumb: true },
            component: PurchaseView
        },
        {
            path: '/reorder_view',
            name: 'reorder_view',
            meta: { breadcrumb: true },
            component: ReorderView
        },
        {
            path: '/reorder_pop',
            name: 'reorder_pop',
            meta: { breadcrumb: false },
            component: ReorderPop
        },
        {
            path: '/pos_reorder_invoice',
            name: 'pos_reorder_invoice',
            meta: { breadcrumb: false },
            component: PosReorderPop
        },
        {
            path: '/purchase_pop',
            name: 'purchase_pop',
            meta: { breadcrumb: false },
            component: PurchasePop
        },
        {
            path: '/acc_summary',
            name: 'account_summary',
            meta: { breadcrumb: true },
            component: AccountSummary
        },
        {
            path: '/stock_manager',
            name: 'stock_manager',
            meta: { breadcrumb: true },
            component: StockManager
        }, {
            path: '/add_products',
            name: 'add_products',
            meta: { breadcrumb: true },

            component: AddProducts
        },
        {
            path: '/product_dictionary',
            name: 'product_dictionary',
            meta: { breadcrumb: true },
            component: ProductDictionary
        },
        {
            path: '/sales_report',
            name: 'sales_report',
            meta: { breadcrumb: false },
            component: SalesReport
        },
        {
            path: '/fms_users',
            name: 'fms_users',
            meta: { breadcrumb: true },
            component: FmsUsers
        },
        {
            path: '/sale_sessions',
            name: 'sale_sessions',
            meta: { breadcrumb: true },
            component: SaleSessions
        },
        {
            path: '/company',
            name: 'fmscompany',
            meta: { breadcrumb: true },
            component: FmsCompany
        },
        {
            path: '/my_company',
            name: 'company',
            meta: { breadcrumb: true },
            component: MyCompany
        },
        {
            path: '/outlets',
            name: 'outlets',
            meta: { breadcrumb: true },
            component: FmsOutlet
        },

        { path: '*', component: NotFound }
    ],
    mode:'history'

})
