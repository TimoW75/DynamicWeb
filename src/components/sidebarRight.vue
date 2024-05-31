<script setup>
  import {
    IconBrowser, 
    IconAppWindow,
    IconBrush,
    IconUserCode,
    IconLayout,
    IconAccessible,
    IconBuilding,
    IconSettings,
    IconChevronRight,

  } from '@tabler/icons-vue';
  import vLazyImage from 'v-lazy-image';
</script>

<template>

  <section class="righSidebar">
    <ul>
      <li>
        <IconChevronRight stroke="1.5" @click="collapseRightBar"/>
        <v-lazy-image src="/assets/img/bluedesk.png" alt="Placeholder" />
      </li>
      <div class="devider"></div>
      <li>
        <router-link :to="{ name: 'home'}">

          <IconAppWindow stroke="1.5" />
          <p>Page editor</p>
        </router-link>
      </li>
      <li>
        <router-link :to="{ name: 'library'}">
          <IconBrowser stroke="1.5" />
          <p>Header & footer</p>
        </router-link>
      </li>
      <li>
        <router-link :to="{ name: 'library'}">
          <IconBrush stroke="1.5" />
          <p>Styling</p>
        </router-link>
      </li>
      <li>
        <router-link :to="{ name: 'library'}">
          <IconUserCode stroke="1.5" />
          <p>Developers</p>
        </router-link>
      </li>
      <li>
        <router-link :to="{ name: 'library'}">
          <IconLayout stroke="1.5" />
          <p>Elements</p>
        </router-link>
      </li>
      <li>
        <router-link :to="{ name: 'library'}">
          <IconAccessible stroke="1.5" />
          <p>Accessible</p>
        </router-link>
      </li>
      <li>
        <router-link :to="{ name: 'library'}">
          <IconBuilding stroke="1.5" />
          <p>Corporate settings</p>
        </router-link>
      </li>
    </ul>
    
    <ul>
      <div class="devider"></div>
      <li>
        <router-link :to="{ name: 'library'}">
          <IconSettings stroke="1.5" />
          <p>Settings</p>
        </router-link>
      </li>
    </ul>
  </section>

</template>

<script>
export default {
  methods: {
    collapseRightBar() {
      let sidebar = document.querySelector('.righSidebar')
      sidebar.classList.toggle('collapsed');
      sidebar.querySelectorAll('p').forEach(element => {
        element.classList.toggle('hide');
      });
    }
  }
}
</script>
