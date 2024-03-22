<template lang="pug">
form(@submit="login")
    input(type="email" name="email" required)
    input(type="password" name="password" required)
    input(type="submit")
</template>

<script setup lang="ts">
import { useRoute, useRouter } from 'vue-router';
import { skapi } from '@/code/admin'
import { user } from '@/code/user'

const router = useRouter();
const route = useRoute();

let login = (e) => {
    return skapi.login(e).then(u => {
        Object.assign(user, u);
    }).catch(err => {
        for (let k in user) {
            delete user[k];
        }
    }).finally(()=>{
        router.push('/my-services')
    })
}
</script>