<template lang="pug">
.testing-page
    h1 Testing Page

    hr

    // registerNewsletterGroup
    form.form-wrap(@submit.prevent="registerNewsletterGroup")
        h4 1. Register Newsletter Group
        input(type="text" name="group" maxlength="20" :disabled="disabled" placeholder="Enter newsletter group name")
        input(type="number" name="restriction" value="0" min="0" max="99" :disabled="disabled" placeholder="Enter newsletter group number")
        button(type="submit" :disabled="disabled") registered

    // newsletterGroupEndpoint
    .form-wrap
        h4 2. Check Newsletter Group Endpoint
        button(:disabled="disabled" @click="newsletterGroupEndpoint") Check Endpoint
        .result {{ getnewsletterGroupEndpoint }}
</template>

<script setup>
import { currentService } from '@/views/service/main';
import { onMounted, ref } from 'vue';

let disabled = ref(false);
let getnewsletterGroupEndpoint = ref('click the button to get endpoint');

function registerNewsletterGroup() {
    const groupName = document.querySelector('input[name="group"]').value;
    const restriction = document.querySelector('input[name="restriction"]').value;

    if (!groupName || !restriction) {
        alert('Please fill in all fields.');
        return;
    }

    if (!/^[A-Za-z0-9]+$/.test(groupName) || /\s/.test(groupName)) {
        alert('Group name must be alphanumeric and cannot contain spaces.');
        return;
    }

    if (isNaN(restriction) || restriction < 0 || restriction > 99) {
        alert('Restriction must be a number between 0 and 99.');
        return;
    }

    disabled.value = true;

    let option = {
        group: groupName,
        restriction: restriction
    };

    currentService.registerNewsletterGroup(option).then(r => {
        console.log(r); // SUCCESS: Group registered successfully.
    }).catch(e => {
        console.log(e);
    }).finally(() => {
        disabled.value = false;
    });
}

async function newsletterGroupEndpoint() {
    disabled.value = true;

    let endpoint = await currentService.newsletterGroupEndpoint();

    getnewsletterGroupEndpoint.value = endpoint;
    disabled.value = false;
}

onMounted(() => {
    console.log(currentService.service);
});
</script>

<style scoped lang="less">
.testing-page {
    min-height: 500px;
    background-color: #eee;
    padding: 1rem;
    margin-top: var(--nav-top, 20);
}

.form-wrap {
    max-width: 500px;
    margin: 0 auto;
    margin-bottom: 3rem;

    input {
        display: block;
        width: 100%;
        margin-bottom: 1rem;
        padding: 0.5rem;
    }

    .result {
        padding: 0.5rem;
        border: 1px solid #ccc;
        font-size: 0.9rem;
    }
}

h1 {
    margin: 0;
}

button {
    background-color: black;
    color: white;
    width: 100%;
    margin-bottom: 1rem;
}
</style>