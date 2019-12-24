<template>
  <div id="home">
    <swiper :options="swiperOption">
      <swiper-slide>
        <img src="../assets/images/9ddcc281154afdfb2a6bea80f908fc1f.jpeg" alt class="w-100" />
      </swiper-slide>
      <swiper-slide>
        <img src="../assets/images/e388133a50eaa267b2425df3e7e661d7.jpeg" alt class="w-100" />
      </swiper-slide>
      <swiper-slide>
        <img src="../assets/images/ee20ec1714ff6f69dc64e05022f8ac70.jpeg" alt class="w-100" />
      </swiper-slide>
      <div class="swiper-pagination pagination-home text-right px-3 pb-2" slot="pagination"></div>
    </swiper>
    <!-- end swiper -->

    <div class="nav-icons text-dark-1 pt-3 bg-white mt-3 text-center">
      <div class="d-flex flex-wrap">
        <div class="nav-item mb-3">
          <i class="sprite sprite-news"></i>
          <div class="py-2">爆料站</div>
        </div>
        <div class="nav-item mb-3">
          <i class="sprite sprite-book"></i>
          <div class="py-2">故事站</div>
        </div>
        <div class="nav-item mb-3">
          <i class="sprite sprite-shop"></i>
          <div class="py-2">周边商城</div>
        </div>
        <div class="nav-item mb-3">
          <i class="sprite sprite-experience"></i>
          <div class="py-2">体验版</div>
        </div>
      </div>
      <div class="bg-light py=2 fs-sm">
        <i class="sprite sprite-arrow mr-1"></i>
        <span>收起</span>
      </div>
    </div>
    <!-- end nav icon -->

    <!-- 新闻资讯 -->
    <mylistcard icon="news" title="新闻资讯" :categories="newsCats">
      <template #items="{category}">
        <router-link
          tag="div"
          :to="`/articles/${news._id}`"
          v-for="(news,i) in category.newsList"
          :key="i"
        >
          <div class="py-2 fs-lg d-flex">
            <span class="text-info">[{{news.categoryName}}]</span>
            <span class="px-2">|</span>
            <span class="flex-1 text-dark-1 text-ellipsis pr-2">{{news.title}}</span>
            <span class="text-grey-1 fs-sm">{{news.createAt | date}}</span>
          </div>
        </router-link>
      </template>
    </mylistcard>

    <!-- 英雄列表 -->
    <mylistcard icon="cansaitubiaozhuanqu-" title="英雄列表" :categories="heroCats">
      <template #items="{category}">
        <div class="d-flex flex-wrap" style="margin:0 -0.5rem">
          <router-link
            tag="div"
            :to="`/heroes/${heroes._id}`"
            class="p-2 text-center"
            style="width:20%"
            v-for="(heroes,i) in category.heroList"
            :key="i"
          >
            <img :src="heroes.avatar" alt class="w-100" />
            <div>{{heroes.name}}</div>
          </router-link>
        </div>
      </template>
    </mylistcard>
    <!-- end card -->
  </div>
</template>

<script>
import dayjs from "dayjs";
export default {
  name: "home",
  data() {
    return {
      swiperOption: {
        pagination: {
          el: ".pagination-home"
        }
      },
      newsCats: [],
      heroCats: []
    };
  },
  filters: {
    // 过滤时间
    date(val) {
      return dayjs(val).format("MM/DD");
    }
  },
  methods: {
    // 获取文章
    async fetchNewsList() {
      const res = await this.$http.get("/news/list");
      this.newsCats = res.data;
    },
    // 获取英雄
    async fetchHeroList() {
      const res = await this.$http.get("/heroes/list");
      this.heroCats = res.data;
    }
  },
  created() {
    this.fetchNewsList();
    this.fetchHeroList();
  }
};
</script>

<style lang="scss">
@import "../assets/_variables.scss";
.pagination-home {
  .swiper.pagination-bullet {
    border-radius: 2px;
    background: map-get($colors, "white");
    &.swiped.pagination-bullet-active {
      background: map-get($colors, "info");
    }
  }
}
.nav-icons {
  border-top: 1px solid $border-color;
  border-bottom: 1px solid $border-color;
  .nav-item {
    width: 25%;
    border-right: 3px solid $border-color;
    &:nth-child(4n) {
      border-right: none;
    }
  }
}
</style>


