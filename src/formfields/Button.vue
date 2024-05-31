<template>
    <p class="caption"v-html="data.Name"></p>
    <div >
        <input type="text" :value="savedData[0] ? savedData[0].ButtonText : ''" name="ButtonValue" placeholder="Button text">
        <input type="text" :value="savedData[0] ? savedData[0].ButtonLink : ''" name="ButtonUrl" placeholder="Button link">

        <select :class="data.SystemName" :value="savedData[0] ? savedData[0].Template : ''" name="ButtonConfig" >
            <option value="" disabled selected>Select your option</option>
            <option v-for="options in data.options" :value="options">{{options}}</option>

        </select>
    </div>

</template>

<script>
export default {
    name: 'Button',
    props: {
        data: Object,
        savedData: Object,
    },
}
</script>
