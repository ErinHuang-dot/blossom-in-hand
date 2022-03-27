<template>
  <nav class="nav flex-column bg-darker pt-2 d-none d-lg-block">
    <h5 class="admin-logo text-white px-6 py-3 mb-6">
      <span class="text-light">Admin</span><br>
      <span class="fw-bold">Blossom</span>
      in Hand
    </h5>
    <router-link class="nav-link text-lighter d-flex align-items-center px-6 py-5" to="/admin/products">
      <vue-feather type="list" class="admin-icon me-4"></vue-feather>
      商品管理
    </router-link>
    <router-link class="nav-link text-lighter d-flex align-items-center px-6 py-5" to="/admin/orders">
      <vue-feather type="shopping-bag" class="admin-icon me-4"></vue-feather>
      訂單管理
    </router-link>
    <router-link class="nav-link text-lighter d-flex align-items-center px-6 py-5" to="/admin/coupons">
      <vue-feather type="tag" class="admin-icon me-4"></vue-feather>
      優惠券管理
    </router-link>
  </nav>
  <!-- Hanburger menu -->
  <div class="d-flex justify-content-between d-lg-none bg-darker">
    <button class="navbar-toggler" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasAdmin" aria-controls="offcanvasAdmin" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>
    <a class="navbar-brand text-lighter" href="#">Blossom in Hand</a>
  </div>
  <!-- Responsive nav-->
  <div class="offcanvas offcanvas-start" tabindex="-1" id="offcanvasAdmin" aria-labelledby="offcanvasAdminLabel">
    <div class="offcanvas-header">
      <h5 class="offcanvas-title" id="offcanvasAdmin">Blossom in Hand</h5>
      <button type="button" class="btn-close text-reset" data-bs-dismiss="offcanvas" aria-label="Close"></button>
    </div>
    <div class="offcanvas-body">
      <ul>
        <li>
          <router-link class="nav-link text-lighter" to="/admin/products">商品管理</router-link>
        </li>
        <li>
          <router-link class="nav-link text-lighter" to="/admin/orders">訂單管理</router-link>
        </li>
        <li>
          <router-link class="nav-link text-lighter" to="/admin/coupons">優惠券管理</router-link>
        </li>
      </ul>
    </div>
  </div>
</template>

<style lang="scss">
.nav{
  position: fixed;
  min-width: 200px;
  min-height: 100vh;

  .nav-link {
    letter-spacing: .125rem;
    transition: all ease-in 0.3s;

    &:hover, &:active {
      background-color: #374151;
    }
  }

  .admin-logo {
    font-family: 'Ubuntu', sans-serif;
  }
  .admin-brand {
    font-family: 'Libre Baskerville', serif;
  }
  .admin-icon {
    color: #9ca3af;
  }
}
</style>
