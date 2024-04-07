<template lang="pug">
.key
    template(v-if="modifyMode")
        input.keyName.lineInput(type="text" name='keyName' :value="inputKey" placeholder="Key name" required)
        input.secretKey.lineInput(type="text" name='secretKey' :value="inputValue" placeholder="Secret Key" required)
        .buttonWrap
            template(v-if="updatingValue")
                img.loading(style='padding:0;width:18px;height:18px;' src="@/assets/img/loading.png")
            template(v-else)
                .material-symbols-outlined.fill.clickable lock
                .material-symbols-outlined.fill.clickable delete
    template(v-else)
        .keyName {{ key }}
        .secretKey {{ value.substr(0,4) + '**********' }}
</template>

<script setup lang="ts">
let props = defineProps(['modifyMode', 'updatingValue']);

let inputKey = '';
let inputValue = '';
</script>

<style scoped lang="less">
input {
    height: 100%;
    border-bottom: 1px solid #000;
}
.key {
    height: 30px;
    padding: 0 8px;
    margin-bottom: 8px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    font-size: 0.8rem;
    gap: 20px;

    &:last-child {
        margin-bottom: 0;
    }
}
.keyName {
    width: 150px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
}
.secretKey {
    flex-grow: 1;
}
.buttonWrap {
    display: flex;
    gap: 10px;
}
</style>