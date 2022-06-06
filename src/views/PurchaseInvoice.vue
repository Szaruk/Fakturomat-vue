<template>
  <MainNav />
  <section class="purchase-invoice">
    <div class="first-row">
      <h2 class="logo">Faktur-o-inator</h2>
      <form class="begin-info" ref="beginInfo">
        <label class="begin-info-title" for="place-of-issue"
          >Miejsce wydania</label
        >
        <input
          class="begin-info-input"
          type="text"
          name="place-of-issue"
          v-model="InvoiceForm.placeOfIssue"
        />
        <label class="begin-info-title" for="date-of-issue"
          >Data wystawienia</label
        >
        <input
          class="begin-info-input"
          type="date"
          name="date-of-issue"
          v-model="InvoiceForm.dateOfIssue"
        />
        <label class="begin-info-title" for="date-of-service"
          >Data wykonania usługi</label
        >
        <input
          class="begin-info-input"
          type="date"
          name="date-of-service"
          v-model="InvoiceForm.dateOfService"
        />
      </form>
    </div>
    <form class="saller-buyer" ref="sallerBuyer">
      <div class="saller">
        <label class="saller-title" for="saller">Sprzedawca</label>
        <input
          class="saller-value"
          type="text"
          name="saller"
          id=""
          placeholder="Nazwa"
          v-model="InvoiceForm.sallerName"
        />
        <input
          class="saller-value"
          type="text"
          name="saller"
          id=""
          placeholder="NIP"
          v-model="InvoiceForm.sallerNIP"
        />
        <input
          class="saller-value"
          type="text"
          name="saller"
          id=""
          placeholder="Adres"
          v-model="InvoiceForm.sallerAddress"
        />
        <input
          class="saller-value"
          type="text"
          name="saller"
          id=""
          placeholder="Kod pocztowy"
          v-model="InvoiceForm.sallerZIPCode"
        />
      </div>
      <div class="buyer">
        <label class="buyer-title" for="buyer">Nabywca</label>
        <input
          class="buyer-value"
          type="text"
          name="buyer"
          id=""
          placeholder="Nazwa"
          v-model="InvoiceForm.buyerName"
        />
        <input
          class="buyer-value"
          type="text"
          name="buyer"
          id=""
          placeholder="NIP"
          v-model="InvoiceForm.buyerNIP"
        />
        <input
          class="buyer-value"
          type="text"
          name="buyer"
          id=""
          placeholder="Adres"
          v-model="InvoiceForm.buyerAddress"
        />
        <input
          class="buyer-value"
          type="text"
          name="buyer"
          id=""
          placeholder="Kod pocztowy"
          v-model="InvoiceForm.buyerZIPCode"
        />
      </div>
    </form>
    <form class="main-info-invoice" ref="invoiceNumber">
      <label to="invoice-number" class="invoice-number-title"
        >Numer faktury:</label
      >
      <input
        type="text"
        name="invoice-number"
        class="invoice-number"
        v-model="InvoiceForm.invoiceNumber"
      />
    </form>
    <div class="products-list-container">
      <!-- Product List Form Title -->
      <div class="products-list">
        <div class="products-list-columns" style="width: 10%">Lp.</div>
        <div class="products-list-columns" style="width: 30%">
          Nazwa towaru i usługi
        </div>
        <div class="products-list-columns">Jm.</div>
        <div class="products-list-columns">Ilość</div>
        <div class="products-list-columns">Wartość netto</div>
        <div class="products-list-columns">Stawka VAT</div>
        <div class="products-list-columns">Kwota VAT</div>
        <div class="products-list-columns">Kwota Brutto</div>
      </div>
      <!-- Product List Form -->
      <form
        class="products-list-values"
        v-for="(item, index) in InvoiceForm.invoiceProductList"
        ref="productLists"
      >
        <div class="products-list-value" style="width: 10%">
          {{ (item.lp = index + 1) }}
        </div>
        <input
          class="products-list-value"
          style="width: 30%"
          v-model="item.productName"
        />
        <select class="products-list-value" v-model="item.productJM">
          <option>szt</option>
          <option>kg</option>
          <option>m</option>
        </select>
        <input
          class="products-list-value"
          type="number"
          v-model="item.productsQuantity"
        />
        <input
          class="products-list-value"
          type="number"
          v-model="item.valueNetto"
        />
        <select class="products-list-value" v-model="item.valueVat">
          <option>5</option>
          <option>7</option>
          <option>6</option>
          <option>22</option>
          <option>23</option>
        </select>
        <div class="products-list-value" ref="sumVAT">
          {{ valueVAT[index] }}
        </div>
        <div class="products-list-value" ref="valueBRUTTO">
          {{ valueBrutto[index] }}
        </div>
      </form>

      <div class="payments">
        <div class="payments-container">
          <label class="payments-title" for="payment-term"
            >Termin płatności</label
          >
          <input
            type="date"
            name="payment-term"
            v-model="InvoiceForm.paymentTerm"
          />
        </div>
        <div class="payments-container">
          <label class="payments-title" for="payment-pay">Do zapłaty</label>
          <div type="text" class="payment-pay">
            {{ valuePayment }}
          </div>
        </div>
      </div>
    </div>
    <input
      class="submit-invoice"
      type="submit"
      value="Utwórz fakturę"
      v-on:click="addInvoiceForm"
    />
  </section>
</template>

<script>
import axios from "axios";
import MainNav from "../components/MainNav.vue";
const baseURL = "http://localhost:3000/purchaseInvoice";
export default {
  components: { MainNav },
  data() {
    return {
      InvoiceForm: {
        //Begin Info
        placeOfIssue: null,
        dateOfIssue: null,
        dateOfService: null,
        //Saller Info
        sallerName: null,
        sallerNIP: null,
        sallerAddress: null,
        sallerZIPCode: null,
        //Buyer Info
        buyerName: null,
        buyerNIP: null,
        buyerAddress: null,
        buyerZIPCode: null,
        //Invoice Number
        invoiceNumber: null,
        //Payment Term
        paymentTerm: null,
        //Payment Value
        paymentValue: null,
        //List
        invoiceProductList: [
          {
            lp: null,
            productName: "",
            productJM: "",
            productsQuantity: null,
            valueNetto: "",
            valueVat: null,
            sumVat: 0,
            valueBrutto: null,
          },
          {
            lp: null,
            productName: "",
            productJM: "",
            productsQuantity: null,
            valueNetto: "",
            valueVat: null,
            sumVat: 0,
            valueBrutto: null,
          },
          {
            lp: null,
            productName: "",
            productJM: "",
            productsQuantity: null,
            valueNetto: "",
            valueVat: null,
            sumVat: 0,
            valueBrutto: null,
          },
          {
            lp: null,
            productName: "",
            productJM: "",
            productsQuantity: null,
            valueNetto: "",
            valueVat: null,
            sumVat: 0,
            valueBrutto: null,
          },
          {
            lp: null,
            productName: "",
            productJM: "",
            productsQuantity: null,
            valueNetto: "",
            valueVat: null,
            sumVat: 0,
            valueBrutto: null,
          },
        ],
      },
    };
  },
  computed: {
    valueVAT: function () {
      return this.InvoiceForm.invoiceProductList.map(function (index) {
        return (index.valueNetto * index.valueVat) / 100;
      });
    },
    valueBrutto: function () {
      return this.InvoiceForm.invoiceProductList.map(function (index) {
        if (
          isNaN(
            (index.valueNetto * index.valueVat) / 100 +
              parseInt(index.valueNetto)
          ) == false
        ) {
          return (
            (index.valueNetto * index.valueVat) / 100 +
            parseInt(index.valueNetto) * index.productsQuantity
          );
        }
      });
    },
    valuePayment: function () {
      const suma = [];
      let sumValue = 0;
      for (const test in this.valueBrutto) {
        suma.push(this.valueBrutto[test]);
      }
      for (let i = 0; i < suma.length; i++) {
        if (suma[i] != undefined) {
          sumValue += suma[i];
          //console.log(sumValue);
        }
      }
      this.InvoiceForm.paymentValue = sumValue.toFixed(2);
      return sumValue.toFixed(2) + " zł";
    },
  },
  methods: {
    resetValues() {
      this.$refs.beginInfo.reset();
      this.$refs.sallerBuyer.reset();
      this.$refs.invoiceNumber.reset();
    },
    async addInvoiceForm() {
      for (const listValue in this.InvoiceForm.invoiceProductList) {
        this.InvoiceForm.invoiceProductList[listValue].sumVat += Number(
          this.$refs.sumVAT[listValue].innerHTML
        );
      }
      for (const bruttoValue in this.InvoiceForm.invoiceProductList) {
        this.InvoiceForm.invoiceProductList[bruttoValue].valueBrutto += Number(
          this.$refs.valueBRUTTO[bruttoValue].innerHTML
        );
      }
      await axios.post(baseURL, {
        id: "",
        invoiceType: "purchaseInvoice",
        invoiceNumber: this.InvoiceForm.invoiceNumber,
        placeOfIssue: this.InvoiceForm.placeOfIssue,
        dateOfIssue: this.InvoiceForm.dateOfIssue,
        dateOfService: this.InvoiceForm.dateOfService,
        sallerName: this.InvoiceForm.sallerName,
        sallerNIP: this.InvoiceForm.sallerNIP,
        sallerAddress: this.InvoiceForm.sallerAddress,
        sallerZIPCode: this.InvoiceForm.sallerZIPCode,
        buyerName: this.InvoiceForm.buyerName,
        buyerNIP: this.InvoiceForm.buyerNIP,
        buyerAddress: this.InvoiceForm.buyerAddress,
        buyerZIPCode: this.InvoiceForm.buyerZIPCode,
        paymentTerm: this.InvoiceForm.paymentTerm,
        paymentValue: this.InvoiceForm.paymentValue,
        invoiceProductList: [this.InvoiceForm.invoiceProductList],
      });
      this.resetValues();
    },
  },
};
</script>

<style lang="scss" scoped>
.purchase-invoice {
  display: flex;
  flex-direction: column;
  .first-row {
    padding: 2rem;
    display: flex;
    justify-content: space-between;
    .logo {
      margin-top: 3rem;
      margin-left: 2rem;
      font-size: 90px;
      color: #4e92e7;
      text-transform: uppercase;
      text-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
    }
    .begin-info {
      margin-right: 2rem;
      display: flex;
      flex-direction: column;
      width: 300px;
      text-align: center;
      .begin-info-title {
        margin-top: 1rem;
        font-weight: bold;
        background: #c4c4c4;
      }
      .begin-info-input {
        text-align: center;
        &:hover {
          cursor: pointer;
        }
      }
    }
  }
  .saller-buyer {
    display: flex;
    justify-content: space-between;
    width: 100%;
    .saller {
      margin-left: 4rem;
      width: 250px;
      display: flex;
      flex-direction: column;
      &-title {
        text-align: center;
        font-weight: bold;
        background: #c4c4c4;
      }
      &-value {
        border: solid black 1px;
      }
    }
    .buyer {
      margin-right: 4rem;
      width: 250px;
      display: flex;
      flex-direction: column;
      &-title {
        text-align: center;
        font-weight: bold;
        background: #c4c4c4;
      }
      &-value {
        border: solid black 1px;
      }
    }
  }
  .main-info-invoice {
    margin-top: 2rem;
    display: flex;
    justify-content: center;
    .invoice-number-title {
      font-size: 30px;
      font-weight: bold;
    }
    .invoice-number {
      border: 0;
      border-bottom: dotted black 3px;
      margin-left: 1rem;
      font-size: 30px;
      text-align: center;
      &:active,
      &:focus {
        border: 0;
        border-bottom: dotted black 3px;
        outline: 0;
      }
    }
  }
  .products-list-container {
    align-self: center;
    width: 90%;
    margin-bottom: 4rem;
    .products-list {
      margin-top: 4rem;
      border: solid black 2px;
      border-left: 0;
      width: 100%;
      display: flex;
      background: #c4c4c4;
      &-columns {
        display: flex;
        align-items: center;
        justify-content: center;
        text-align: center;
        width: 25%;
        border-left: solid black 2px;
        font-size: 14px;
        font-weight: bold;
        padding: 0.6rem;
      }
    }
  }
  .products-list-values {
    width: 100%;
    display: flex;
    .products-list-value {
      width: 25%;
      border: solid black 1px;
      padding: 0.6rem;
      display: flex;
      align-items: center;
      justify-content: center;
      text-align: center;
    }
  }
  .payments {
    margin-top: 5rem;
    width: 100%;
    align-self: center;
    display: flex;
    justify-content: space-between;
    .payments-container {
      display: flex;
      flex-direction: column;
      width: 250px;
      .payments-title {
        text-align: center;
        background: #c4c4c4;
        font-weight: bold;
      }
      .payment-pay {
        border: solid black 1px;
        padding: 1rem;
        text-align: center;
      }
    }
  }
  .submit-invoice {
    width: 200px;
    margin: 2rem;
    align-self: flex-end;
    border: none;
    padding: 1rem;
    border-radius: 1rem;
    background: #4e92e7;
    font-weight: bold;
    color: white;
    transition: all 0.2s ease-in;
    &:hover {
      cursor: pointer;
      transform: scale(1.1);
    }
  }
}
</style>
