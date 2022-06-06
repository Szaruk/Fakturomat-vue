<template>
  <section class="invoice-section">
    <div class="invoice-title">
      <h3>Twoje faktury</h3>
      <img
        class="invoice-list-icon"
        src="../assets/invoice-list-icon.svg"
        alt=""
      />
    </div>
    <div class="invoice-filter">
      <select class="filter">
        <option value="">Faktury zakupu</option>
        <option value="">Faktury sprzedaży</option>
      </select>
      <span class="filter-icon"
        ><img src="../assets/filter-icon.svg" alt=""
      /></span>
    </div>
    <div class="invoice-list-container">
      <div class="invoice-list-columns">
        <span class="invoice-list-title">Data</span>
        <span class="invoice-list-title">Numer faktury</span>
        <span class="invoice-list-title">Kontrahent</span>
        <span class="invoice-list-title">Wartość</span>
      </div>
      <div
        class="invoice-list-values"
        v-for="purchaseData of purchaseInvoice"
        :key="purchaseData.id"
      >
        <span class="invoice-list-data">{{ purchaseData.dateOfIssue }}</span>
        <span class="invoice-list-data"
          ><router-link
            style="
              color: #244369;
              font-weight: bold;
              text-decoration: underline;
            "
            :to="{ name: 'PurchaseDetails', params: { id: purchaseData.id } }"
            target="_blank"
            >{{ purchaseData.invoiceNumber }}</router-link
          ></span
        >
        <span class="invoice-list-data">{{ purchaseData.buyerName }}</span>
        <span class="invoice-list-data">{{
          purchaseData.paymentValue + " zł"
        }}</span>
      </div>
    </div>
  </section>
</template>

<script>
import axios from "axios";

const baseURL = "http://localhost:3000/purchaseInvoice";

export default {
  data() {
    return {
      purchaseInvoice: [],
    };
  },
  async created() {
    try {
      const res = await axios.get(baseURL);
      this.purchaseInvoice = res.data;
    } catch (e) {
      console.error(e);
    }
  },
};
</script>

<style lang="scss" scoped>
.invoice-section {
  display: flex;
  flex-direction: column;
  align-items: center;
  .invoice-title {
    border-bottom: solid black 3px;
    padding-bottom: 0.5rem;
    margin-top: 2rem;
    display: flex;
    align-items: flex-end;
    font-size: 30px;
    .invoice-list-icon {
      max-width: 100px;
    }
  }
  .invoice-filter {
    position: relative;
    align-self: flex-end;
    margin-top: -3rem;
    margin-right: 5rem;
    .filter {
      font-size: 18px;
      width: 220px;
      padding: 0.5rem;
      border: 0;
      background: #244369;
      color: #fff;
      box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
      &:hover {
        cursor: pointer;
      }
    }
    .filter-icon {
      display: flex;
      align-items: center;
      justify-content: center;
      height: 100%;
      width: 40px;
      background: #244369;
      position: absolute;
      right: 0;
      top: 0;
      pointer-events: none;
    }
  }
  .invoice-list-container {
    width: 80%;
    display: flex;
    flex-direction: column;
    margin-top: 4rem;
    .invoice-list-columns {
      border-top: solid black 2px;
      border-bottom: solid black 2px;
      display: flex;
      background: rgba(231, 223, 223, 0.76);
      width: 100%;
      .invoice-list-title {
        border-right: solid black 2px;
        font-weight: bold;
        width: 25%;
        text-align: center;
        padding: 1rem;
        &:first-child {
          border-left: solid black 2px;
        }
      }
    }
    .invoice-list-values {
      width: 100%;
      display: flex;
      border-bottom: solid black 2px;
      border-left: solid black 2px;
      .invoice-list-data {
        border-right: solid black 2px;
        width: 25%;
        color: black;
        text-align: center;
        padding: 0.8rem;
        font-size: 13px;
      }
    }
  }
}
</style>
