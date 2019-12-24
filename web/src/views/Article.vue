<template>
  <div class="page-article" v-if="model">
    <div class="d-flex py-3 px-2 border-bottom">
      <div class="iconfont text-blue icon-zuojiantou"></div>
      <strong class="flex-1 text-blue pl-2">{{model.title}}</strong>
      <div class="text-grey fs-sx"></div>
    </div>
    <div v-html="model.body" class="px-3 body fs-lg"></div>
    <div class="px-3 border-top py-3">
      <div class="d-flex ai-center">
        <i class="iconfont"></i>
        <strong class="text-blue fs-lg ml-2">相关资讯</strong>
      </div>

      <div class="pt-2">
        <router-view
          class="py-1"
          :to="`/article/${item._id}`"
          tag="div"
          v-for="item in model.related"
          :key="item._id"
        ></router-view>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    id: { required: true }
  },
  data() {
    return {
      model: null
    };
  },
  watch: {
      id:'fetch',
    //   id(){
    //       this.fetch(
    //   }
  },
  methods: {
    async fetch() {
      const res = await this.$http.get(`/articles/${this.id}`);
      this.model = res.data;
    }
  },
  created() {
    this.fetch();
  }
};
</script>
<style lang="scss">
.page-article {
  .iconfont {
    font-size: 1.6923rem;
  }
  .body {
    img {
      max-width: 100%;
      height: auto;
    }
    iframe {
      max-width: 100%;
      height: auto;
    }
  }
}
</style>