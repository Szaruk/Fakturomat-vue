import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import PurchaseInvoice from "../views/PurchaseInvoice.vue";
import PurchaseInvoiceDetails from "../views/PurchaseInvoiceDetails.vue";

const routes = [
  {
    path: "/",
    name: "home",
    component: HomeView,
  },
  {
    path: "/faktura-zakupu",
    name: "faktura-zakupu",
    component: PurchaseInvoice,
  },
  {
    path: "/purchase-invoice/:id",
    name: "PurchaseDetails",
    component: PurchaseInvoiceDetails,
    props: true,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
