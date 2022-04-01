<template>
  <nav class="navbar navbar-expand-lg navbar-light navbar-bg">
    <div class="container container-fluid">
      <router-link class="navbar-brand" to="/">
        <h2 class="fs-4 my-2">
            <span class="fw-bold">Blossom</span>
            in Hand
        </h2>
      </router-link>
      <!-- Ham menu -->
      <button
        class="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarNav"
        aria-controls="navbarNav"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse justify-content-end" id="navbarNav">
        <ul class="navbar-nav">
          <li class="nav-item">
            <router-link class="nav-link px-5" to="/products">挑花買花</router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link px-5" to="/cart">購物車</router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link d-flex align-items-center" to="/login">
              <span class="me-2">登入</span>
              <vue-feather type="log-in"></vue-feather>
            </router-link>
          </li>
        </ul>
      </div>
      <!-- <button type="button" class="btn btn-primary">
        結帳
        <span class="badge rounded-pill bg-danger">
          {{ cartData.carts.length }}
          <span class="visually-hidden">購物車品項數量</span>
        </span>
      </button> -->
    </div>
  </nav>
</template>

<style lang="scss">
.navbar-bg {
  background-color: rgba($color: #e5ddd6, $alpha: .1);
}

.nav-link {
  font-size: 1.125rem;
}
</style>
