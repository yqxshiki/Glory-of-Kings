<template>
  <div id="home">
    <swiper :options="swiperOption">
      <swiper-slide>
        <img src alt class="w-100" />
      </swiper-slide>
      <div class="swiper-pagination pagination-home text-right px-3 pb-2" slot="pagination"></div>
    </swiper>
    <!-- end swiper -->

    <div class="nav-icons text-dark-1 pt-3 bg-white mt-3 text-center">
      <div class="d-flex flex-wrap">
        <div class="nav-item mb-3" v-for="n in 10" :key="n">
          <i class="sprite sprite-news"></i>
          <div class="py-2">爆料站</div>
        </div>
      </div>
      <div class="bg-light py=2 fs-sm">
        <i class="sprite sprite-arrow mr-1"></i>
        <span>收起</span>
      </div>
    </div>
    <!-- end nav icon -->
    <!-- 新闻资讯 -->
    <mylistcard icon="menu1" title="新闻资讯" :categories="newsCats">
      <template #items="{category}">
        <div class="py-2 fs-lg d-flex" v-for="(news,i) in category.newsList" :key="i">
          <span class="text-info">[{{news.categoryName}}]</span>
          <span class="px-2">|</span>
          <span class="flex-1 text-dark-1 text-ellipsis pr-2">{{news.title}}</span>
          <span class="text-grey-1 fs-sm">{{news.createAt | date}}</span>
        </div>
      </template>
    </mylistcard>
    <!-- 英雄列表 -->
    <mylistcard icon="menu1" title="英雄列表" :categories="heroCats">
      <template #items="{category}">
        <div class="d-flex flex-wrap" style="margin:0 -0.5rem">
          <div class="p-2 text-center" style="width:20%" v-for="(hero,i) in category.heroList" :key="i">
            <img :src="hero.avatar" alt  class="w-100"/>
            <div>{{hero.name}}</div>
          </div>
        </div>
      </template>
    </mylistcard>
    <!-- end card -->
  </div>
</template>

<script>
import  dayjs from 'dayjs'
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
    date(val) {
      return dayjs(val).format("MM/DD");
    }
  },
  methods: {
    async fetchNewsList() {
      const res = await this.$http.get("/news/list");
      this.newsCats = res.data;
    },
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


