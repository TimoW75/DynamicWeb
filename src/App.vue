<script setup>
  import sidebarLeft from '$/components/sidebarLeft.vue';
  import sidebarRight from '$/components/sidebarRight.vue';
  import topBar from '$/components/topBar.vue';
</script>

<template>
  <div>

    <topBar />

    <section class="mainContentContainer">
      <sidebarLeft />

      <router-view v-slot="{ Component }">
        <transition name="fade" mode="out-in">
          <component :is="Component" />
        </transition>
      </router-view>

      <sidebarRight />
      
    </section>


  </div>
</template>

<script>
export default {
  mounted() {}
}
</script>

<style>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s ease-out;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
