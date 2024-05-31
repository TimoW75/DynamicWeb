<script setup>
    import { 
        IconAppWindow, 
        IconArrowBackUp, 
        IconArrowForwardUp, 
        IconDeviceDesktop, 
        IconDeviceMobile, 
        IconDeviceTablet, 
        IconX 
    } from "@tabler/icons-vue";
</script>

<template>
    <div class="infoBar">
        <div class="top">
            <p class="path">
            path: {{ getPageData.url }}
            </p>

            <div class="showHeaderFooter">
                <label class="switch">
                    <input type="checkbox" >
                    <span class="slider"></span>
                </label>  
                <p>Show header & footer</p>
            </div>

            <div class="backForward">
                <IconArrowBackUp stroke="1.5"/>
                <IconArrowForwardUp stroke="1.5"/>
            </div>

            <div class="devices">
                <IconDeviceMobile stroke="1.5"/>
                <IconDeviceTablet stroke="1.5"/>
                <IconDeviceDesktop stroke="1.5"/>
            </div>
        </div>
        <div class="devider"></div>
        <div class="tabs">
            <router-link to="/" class="backButton">
                <div class="icon">
                    <IconAppWindow stroke="1.5"/>
                    <p>Home</p>
                </div>   
                <IconX stroke="1.5"/>
            </router-link>

            <router-link to="/Contact" class="backButton">
                <div class="icon">
                    <IconAppWindow stroke="1.5"/>
                    <p>Contact</p>
                </div>   
                <IconX stroke="1.5"/>
            </router-link>
        </div>

    </div>

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
