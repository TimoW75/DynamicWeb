<script setup>

import {
  IconHome, 
  IconFiles, 
  IconLibrary, 
  IconUsers,
  IconReportMoney,
  IconBuilding,
  IconChartBar,
  IconSettings

} from '@tabler/icons-vue';

</script>

<template>

  <section class="leftSidebar">
    <ul>
      <li>
        <router-link :to="{ name: 'home'}">

          <IconHome stroke="1.5" />
          <p>Home</p>
        </router-link>
      </li>
      <li>
        <router-link :to="{ name: 'library'}">
          <IconLibrary stroke="1.5" />
          <p>Library</p>
        </router-link>
      </li>
      <li>
        <router-link :to="{ name: 'library'}">
          <IconFiles stroke="1.5" />
          <p>Filse</p>
        </router-link>
      </li>
      <li>
        <router-link :to="{ name: 'library'}">
          <IconUsers stroke="1.5" />
          <p>Users</p>
        </router-link>
      </li>
      <li>
        <router-link :to="{ name: 'library'}">
          <IconReportMoney stroke="1.5" />
          <p>Ecommerce</p>
        </router-link>
      </li>
      <li>
        <router-link :to="{ name: 'library'}">
          <IconBuilding stroke="1.5" />
          <p>PIM</p>
        </router-link>
      </li>
      <li>
        <router-link :to="{ name: 'library'}">
          <IconChartBar stroke="1.5" />
          <p>Marketing</p>
        </router-link>
      </li>
    </ul>
    <div>
      <IconSettings stroke="1.5" />
      <p>Settings</p>
    </div>
  </section>

</template>

<script>
export default {
  mounted() {
    
  },
  methods: {
    
  }
}
</script>
