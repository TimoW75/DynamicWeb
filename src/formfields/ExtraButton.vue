<template>

    <p class="caption"v-html="data.Name"></p>
    <div >
        <input type="text" :value="savedData[0] ? savedData[0].ExtraButtonText : ''" 
            name="ExtraButtonValue" placeholder="Extra button text">
        <input type="text" :value="savedData[0] ? savedData[0].ExtraButtonLink : ''" 
            name="ExtraButtonUrl" placeholder="Extra Button link">

        <select :class="data.SystemName" :value="savedData[0] ? savedData[0].Template : ''" name="ExtraButtonConfig" >
            <option value="" disabled selected>Select your option</option>
            <option v-for="options in data.options" :value="options">{{options}}</option>

        </select>
    </div>
    
</template>

<script>
export default {
    name: 'ExtraButton',
    props: {
        data: Object,
        savedData: Object,
    },
}
</script>