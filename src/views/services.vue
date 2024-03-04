<template lang="pug">
#services
    h1 my-services
    router-link.service(:to="`/my-services/abcdefg`") abcdefg
    router-link.service(:to="`/my-services/hijklmn`") hijklmn
</template>

<script setup lang="ts">

</script>

<style lang="less" scoped>
#services {
    padding: 0 20px;
}
.service {
    display: block;
    text-decoration: none;
    color: #000;
    padding: 10px 0;
}
</style>