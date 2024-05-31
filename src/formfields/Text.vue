<template>
    <p class="caption" v-html="data.Name"></p>
    <div >
        <input type="text" :value="savedData[0] ? savedData : ''" :name="data.SystemName" :placeholder="data.Name">
    </div>

</template>

<script>
export default {
    props: {
        data: Object,
        savedData: undefined,
    },
}
</script>
