<template>
  <nav aria-label="Page navigation example">
    <ul class="pagination pagination-mm">
      <li class="page-item" :class="{disabled: !pages.has_pre}">
        <a
          class="page-link page-link-pre" href="#" aria-label="Previous"
          @click.prevent="updatePage(pages.current_page - 1)">
            <span aria-hidden="true">
              <vue-feather type="chevron-left"></vue-feather>
            </span>
        </a>
      </li>
      <li
        class="page-item"
        :class="{ active: page === pages.current_page}"
        v-for="page in pages.total_pages"
        :key="page">
        <!-- 如果只有一頁，不用帶連結 -->
        <span class="page-link" v-if="page === pages.current_page">{{ page }}</span>
        <a
          class="page-link" href="#"
          v-else
          @click.prevent="updatePage(page)">{{ page }}</a>
      </li>
      <li class="page-item" :class="{disabled: !pages.has_next}">
        <a
          class="page-link page-link-next" href="#" aria-label="Next"
          @click.prevent="updatePage(pages.current_page + 1)">
            <span aria-hidden="true">
              <vue-feather type="chevron-right"></vue-feather>
            </span>
        </a>
      </li>
    </ul>
  </nav>
</template>

<script>
export default {
  props: ['pages'],
  methods: {
    updatePage (page) {
      this.$emit('emitPages', page)
    }
  }
}
</script>

<style lang="scss">
.page-link {
  padding: .5rem 1rem;
}
.page-link-pre, .page-link-next {
  padding: .325rem .6rem;
}
</style>
