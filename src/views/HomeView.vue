<template>
  <MainNav />
  <InvoiceList />
</template>

<script>
import InvoiceList from "../components/InvoiceList.vue";
import MainNav from "../components/MainNav.vue";
export default {
  components: { InvoiceList, MainNav },
};
</script>
