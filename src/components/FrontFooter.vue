<template>
  <div class="sticky-bottom bg-darker text-white py-5">
    <div class="container">
      <div class="footer-top w-100 d-flex justify-content-between mb-6 mb-md-7">
        <h3 class="fs-4 my-3">
          <span class="fw-bold">Blossom</span>
          in Hand
        </h3>
        <ul class="d-flex justify-content-end ps-0 my-3">
          <li class="ms-6">
            <a><vue-feather type="facebook"></vue-feather></a>
          </li>
          <li class="ms-6">
            <a><vue-feather type="instagram"></vue-feather></a>
          </li>
          <li class="ms-6">
            <a><vue-feather type="twitter"></vue-feather></a>
          </li>
        </ul>
      </div>
      <div class="footer-bottom w-100 d-md-flex justify-content-between align-items-end">
        <ul class="ps-0 mb-0">
          <li>02-2345-6789</li>
          <li>service@mail.com</li>
        </ul>
        <p class="fs-6 mb-0">2022 Blossom in Hand All Rights Reserved</p>
      </div>
    </div>
  </div>
</template>

<style lang="scss">
.sticky-bottom {
  margin-top: auto;
}
.footer-start, .footer-end {
  height: 150px;
}
</style>
