
<template>

<p class="caption" v-html="data.Name"></p>
    <div >
        <select :class="data.SystemName" :value="savedData[0] ? savedData[0] : ''" :name="data.SystemName" >
            <option value="" disabled selected>Select your option</option>
            <option v-for="options in data.options" :value="options">{{options}}</option>
        </select>
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
