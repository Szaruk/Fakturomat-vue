<template>
  <section class="purchase-details-section">
    <span id="printer-icon" v-on:click="InvoicePrint()"
      ><img src="../assets/printer-icon.svg" alt=""
    /></span>
    <h2 class="logo">Faktur-o-inator</h2>
    <div class="begin-info-place">
      <span class="begin-info-title">Miejsce wydania</span>
      <span class="begin-info-data">{{ purchaseInvoice.placeOfIssue }}</span>
    </div>
    <div class="begin-info-date">
      <span class="begin-info-title">Data wystawienia</span>
      <span class="begin-info-data">{{ purchaseInvoice.dateOfIssue }}</span>
    </div>
    <div class="begin-info-date-service">
      <span class="begin-info-title">Data wykonania usługi</span>
      <span class="begin-info-data">{{ purchaseInvoice.dateOfService }}</span>
    </div>
    <div class="saller-info">
      <span>Sprzedawca</span>
      <span class="saller-more-info">{{ purchaseInvoice.sallerName }}</span>
      <span class="saller-more-info">{{ purchaseInvoice.sallerNIP }}</span>
      <span class="saller-more-info">{{ purchaseInvoice.sallerAddress }}</span>
      <span class="saller-more-info">{{ purchaseInvoice.sallerZIPCode }}</span>
    </div>
    <div class="buyer-info">
      <span>Nabywca</span>
      <span class="buyer-more-info">{{ purchaseInvoice.buyerName }}</span>
      <span class="buyer-more-info">{{ purchaseInvoice.buyerNIP }}</span>
      <span class="buyer-more-info">{{ purchaseInvoice.buyerAddress }}</span>
      <span class="buyer-more-info">{{ purchaseInvoice.buyerZIPCode }}</span>
    </div>
    <h1 class="invoiceNumber">
      Numer Faktury: {{ purchaseInvoice.invoiceNumber }}
    </h1>
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
      <form v-for="item of purchaseInvoice.invoiceProductList">
        <form v-for="items in item" class="products-list-values">
          <div class="products-list-value" style="width: 10%">
            {{ items.lp }}
          </div>
          <div class="products-list-value" style="width: 30%">
            {{ items.productName }}
          </div>
          <div class="products-list-value">{{ items.productJM }}</div>
          <div class="products-list-value">{{ items.productsQuantity }}</div>
          <div class="products-list-value">{{ items.valueNetto + " zł" }}</div>
          <div class="products-list-value">{{ items.valueVat + "%" }}</div>
          <div class="products-list-value">{{ items.sumVat + " zł" }}</div>
          <div class="products-list-value">{{ items.valueBrutto + " zł" }}</div>
        </form>
      </form>
      <div class="payments">
        <div class="payments-container">
          <label class="payments-title" for="payment-term"
            >Termin płatności</label
          >
          <div class="payment-pay">{{ purchaseInvoice.paymentTerm }}</div>
        </div>
        <div class="payments-container">
          <label class="payments-title" for="payment-pay">Do zapłaty</label>
          <div class="payment-pay">
            {{ purchaseInvoice.paymentValue + " zł" }}
          </div>
        </div>
      </div>
      <div class="signatures">
        <div class="saller-sign">
          <div class="sign-title">Podpis sprzedawcy</div>
          <div class="sign"></div>
        </div>
        <div class="buyer-sign">
          <div class="sign-title">Podpis nabywcy</div>
          <div class="sign"></div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import html2pdf from "html2pdf.js";
export default {
  props: ["id"],
  data() {
    return {
      purchaseInvoice: {},
    };
  },
  mounted() {
    fetch("http://localhost:3000/purchaseInvoice/" + this.id)
      .then((res) => res.json())
      .then((data) => (this.purchaseInvoice = data))
      .catch((err) => console.log(err.message));
  },
  methods: {
    HidePrint() {
      let printIcon = document.querySelector("#printer-icon");
      printIcon.style.opacity = 0;
    },
    ShowPrint() {
      let printIcon = document.querySelector("#printer-icon");
      printIcon.style.opacity = 100;
    },
    InvoicePrint() {
      let htmlPDF = document.querySelector(".purchase-details-section");
      this.HidePrint();
      html2pdf(htmlPDF);
      setTimeout(this.ShowPrint, 1000);
    },
  },
};
</script>

<style lang="scss" scoped>
.purchase-details-section {
  display: flex;
  flex-direction: column;
  #printer-icon {
    position: absolute;
    margin-left: 2.5rem;
    margin-top: 1rem;
    &:hover {
      cursor: pointer;
    }
  }
  .logo {
    margin-top: 3rem;
    margin-left: 5rem;
    font-size: 30px;
    color: #4e92e7;
    text-transform: uppercase;
    text-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  }
  .begin-info-place {
    width: 250px;
    align-self: flex-end;
    margin-right: 6rem;
    margin-top: -5rem;
    margin-bottom: 1rem;
    display: flex;
    flex-direction: column;
    text-align: center;
  }
  .begin-info-date {
    width: 250px;
    align-self: flex-end;
    margin-right: 6rem;
    margin-bottom: 1rem;
    display: flex;
    flex-direction: column;
    text-align: center;
  }
  .begin-info-date-service {
    width: 250px;
    align-self: flex-end;
    margin-right: 6rem;
    display: flex;
    flex-direction: column;
    text-align: center;
  }
  .begin-info-title {
    font-weight: bold;
    background: #c4c4c4;
  }
  .begin-info-data {
    border: solid black 1px;
  }
  .saller-info {
    background: #c4c4c4;
    width: 250px;
    display: flex;
    justify-content: center;
    align-items: center;
    font-weight: bold;
    margin-left: 6rem;
    margin-top: 2rem;
    flex-direction: column;
    .saller-more-info {
      background: white;
      width: 100%;
      text-align: center;
      border: solid black 1px;
      font-weight: 400;
    }
  }
  .buyer-info {
    width: 250px;
    align-self: flex-end;
    margin-right: 6rem;
    margin-top: -6.47rem;
    display: flex;
    align-items: center;
    background: #c4c4c4;
    font-weight: bold;
    flex-direction: column;
    .buyer-more-info {
      background: white;
      width: 100%;
      text-align: center;
      border: solid black 1px;
      font-weight: 400;
    }
  }
  .invoiceNumber {
    margin-top: 3rem;
    font-size: 35px;
    align-self: center;
    border-bottom: solid 2px black;
    padding: 5px;
    margin-top: 2rem;
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
    margin-top: 2rem;
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
  .signatures {
    margin-top: 2rem;
    display: flex;
    justify-content: space-between;
    .saller-sign {
      width: 250px;
    }
    .buyer-sign {
      width: 250px;
    }
    .sign-title {
      background: #c4c4c4;
      font-weight: bold;
      text-align: center;
    }
    .sign {
      border: solid black 1px;
      padding: 2rem;
    }
  }
}
</style>
