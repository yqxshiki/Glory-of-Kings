<template>
  <mycard :icon="icon" :title="title">
    <div class="nav jc-between">
      <div
        class="nav-item"
        :class="{active:active===i}"
        v-for="(category,i) in categories"
        :key="i"
        @click="$refs.list.swiper.slideTo(i)"
      >
        <div class="nav-link" style="margin-left:-1rem">{{category.name}}</div>
      </div>
    </div>
    <div class="pt-3">
      <swiper ref="list" @slide-change="()=>active=$refs.list.swiper.realIndex">
        <swiper-slide v-for="(category, i) in categories" :key="i">
          <slot name="items" :category="category"></slot>
        </swiper-slide>
      </swiper>
    </div>
  </mycard>
</template>

<script>
export default {
  props: {
    icon: { type: String, required: true },
    title: { type: String, required: true },
    categories: { type: Array, required: true }
  },
  data() {
    return {
      active: 0
    };
  }
};
</script>
<style>
</style>