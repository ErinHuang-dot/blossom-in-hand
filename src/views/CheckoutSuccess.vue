<template>
  <div class="d-block d-md-flex justify-content-between">
    <div class="flex-fill d-block d-md-flex flex-column justify-content-start  align-items-end px-4 mb-5">
      <div class="bg-text-top">
        <router-link class="text-darker text-decoration-none" to="/">
        <h5 class="fs-4 my-2">
            <span class="fw-bold">Blossom</span>
            in Hand
        </h5>
      </router-link>
      </div>
      <div class="bg-text-bottom">
        <h1 class="fs-3 py-3">結帳成功</h1>
        <p class="w-100 mb-5">您訂購的商品將在一週內出貨，出貨後會發送Eamil通知，請留意信件，謝謝您的訂購！</p>
        <router-link to="/" class="btn btn-accent px-6">回到首頁</router-link>
      </div>
    </div>
    <div class="flex-fill">
      <div class="bg-img bg-img-half"></div>
    </div>
  </div>
</template>

<style lang="scss">
.bg-img-half {
  height: 100vh;
  width: 50vw;
  background-image: url(https://images.unsplash.com/photo-1607087007621-ef43a693ed80?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=387&q=80);
}
.bg-text-top, .bg-text-bottom {
  width: 75%;
}
.bg-text-bottom {
  margin-top: 30vh;
}

@media (max-width: 480px) {
  .bg-img-half {
    width: 100vw;
  }
  .bg-text-bottom {
    margin-top: 15vh;
    width: 100%;
  }
}
</style>
