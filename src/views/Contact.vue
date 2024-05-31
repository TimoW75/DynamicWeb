<script setup>
  import InPageSidebar from "$/components/InPageSidebar.vue";
  import VisualEditor from "$/components/VisualEditor.vue";
  import InfoBar from "$/components/InfoBar.vue";
</script>

<template>

  <section class="mainContent">

    <section class="editor">

      <InfoBar />

      <VisualEditor />

    </section>

    <section class="inPageSidebar">
      <inPageSidebar />
    </section>

  </section>

</template>

<script>
export default {
  data() {
    return {};
  },
  computed: {
    getPageData: {
      get() {
        return this.$store.getters.getPageData(this.$route.path);
      },
    },
  },
  
};
</script>
