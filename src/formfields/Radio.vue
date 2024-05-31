

<template>

    <p class="caption" v-html="data.Name"></p>
    <label class="switch">
        <input type="checkbox" :value="savedData[0] ? savedData[0] : ''" :name="data.SystemName" >
        <span class="slider"></span>
    </label>    


</template>

<script>
export default {
    props: {
        data: Object,
        savedData: undefined,
    },
}
</script>
