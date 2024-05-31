<template>

    <p class="caption"v-html="data.Name"></p>
    <div >
        <input type="text" name="HeaderValue" :value="savedData[0] ? savedData[0].ParagraphHeader : ''" placeholder="Header text">
        <select class="widthMinMax" :value="savedData[0] ? savedData[0].HeaderStyle : 'H2'" name="HeaderType" >
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
    name: 'Header',
    props: {
        data: Object,
        savedData: Object,
    },
}
</script>
