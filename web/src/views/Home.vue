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

    <div class="card bg-white p-3 mt-2">
      <div class="card-header d-flex ai-center">
        <i class="iconfont"></i>
        <div class="fs-xl flex-1 px-2">新闻资讯</div>
        <i class="iconfont"></i>
      </div>

      <div class="card-body pt-3">
        <div class="nav jc-between">
          <div class="nav-item active">
            <div class="nav-link">热门</div>
          </div>
          <div class="nav-item">
            <div class="nav-link">热门</div>
          </div>
          <div class="nav-item">
            <div class="nav-link">热门</div>
          </div>
          <div class="nav-item">
            <div class="nav-link">热门</div>
          </div>
          <div class="nav-item">
            <div class="nav-link">热门</div>
          </div>
        </div>
        <div class="pt-3">
          <swiper>
            <swiper-slide>
              <div class="py-2" v-for="n in 5" :key="n">
                <span>[新闻]</span>
                <span>|</span>
                <span></span>
                <span>06/02</span>
              </div>
            </swiper-slide>
          </swiper>
        </div>
      </div>
    </div>

    <!-- end card -->
  </div>
</template>

<script>
export default {
  name: "home",
  data() {
    return {
      swiperOption: {
        pagination: {
          el: ".pagination-home"
        }
      }
    };
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
