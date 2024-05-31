

<template>

    <label class="switch">
        <input type="checkbox" :name="data.SystemName" :checked="savedData === true" />        
        <span class="slider"></span>
    </label>  
      
    <p class="caption" v-html="data.Name"></p>


</template>

<script>
export default {
    props: {
        data: Object,
        savedData: undefined,
    },
}
</script>
