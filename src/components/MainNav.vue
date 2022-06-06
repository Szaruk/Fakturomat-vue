<template>
  <nav>
    <div class="logo">
      <router-link to="/"><img src="../assets/logo.svg" alt="" /></router-link>
    </div>
    <ul class="nav-links">
      <li class="nav-link">
        <router-link to="/faktura-zakupu">Dodaj fakture zakupu</router-link>
      </li>
      <li class="nav-link">
        <router-link to="/">Dodaj fakture sprzedaży</router-link>
      </li>
      <!--
      <li class="nav-link"><router-link to="/about">About</router-link></li>
      -->
    </ul>
  </nav>
  <router-view />
</template>

<script>
export default {};
</script>

<style lang="scss" scoped>
nav {
  display: flex;
  align-items: center;
  background: #4e92e7;
  justify-content: space-between;
  padding: 1rem 2rem 1rem 2rem;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  .logo {
    img {
      max-width: 250px;
    }
  }
  .nav-links {
    display: flex;
    list-style: none;
    text-transform: uppercase;
    &:hover {
      cursor: pointer;
    }
    .nav-link {
      background: #244369;
      box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
      border-radius: 23px;
      min-width: 185px;
      margin-right: 1rem;
      display: flex;
      justify-content: center;
      padding: 0.7rem;
      transition: all 0.5s ease-in-out;
      font-size: 13px;
      &:hover {
        background: #fff;
      }
      &:hover a {
        color: #244369;
      }
    }
  }
}
</style>
