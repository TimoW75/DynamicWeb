<template>
    <p class="caption"v-html="data.Name"></p>
    <div >
        <input type="text" name="SubHeaderValue" :value="savedData[0] ? savedData[0].Subheader : ''" placeholder="Subheader text">
        <select class="widthMinMax" :value="savedData[0] ? savedData[0].SubheaderStyle : 'H2'" name="SubHeaderType">
            <option disabled value=""></option>
            <option value="H1">H1</option>
            <option value="H2">H2</option>
            <option value="H3">H3</option>
            <option value="H4">H4</option>
            <option value="H5">H5</option>
            <option value="H6">H6</option>
        </select>
    </div>

</template>

<script>
export default {
    name: 'SubHeader',
    props: {
        data: Object,
        savedData: Object,
    },
}
</script>
