<template lang="pug">
form(@submit.prevent='extractForm')
    // admin 필수 숨겨진 필드
    input(type='hidden' name='service' :value='currentService.id')
    input(type='hidden' name='owner' :value='currentService.owner')

    // 선택
    input(name='record_id' placeholder='record id')

    br

    // 필수
    input(name='table[name]' placeholder='table.name' required)

    br

    select(name='table[access_group]')
        option(value='public' selected) Public
        option(value='authorized') Authorized
        option(value='private') Private

    br

    // 선택
    input(name='table[subscription]' placeholder='subscription (user id)')

    br

    // 선택
    input(name='reference' placeholder='referenced record id')

    br

    // index 선택
    p Index
    hr
    select(v-model='index')
        option(value='none' selected) None
        option(value='name') Index name
        option(value='$updated') Updated Date
        option(value='$uploaded') Uploaded Date
        option(value='$referenced_count') Number of referenced
        option(value='$user_id') Uploaders user id

    br

    template(v-if='index !== "none"')
        template(v-if='index == "name"')
            input(name='index[name]' placeholder='index name' required)

            br

            select(v-model='indexValueType')
                option(value='text' selected) String
                option(value='number') Number
                option(value='checkbox') Boolean

        input(name='index[value]' :type='indexValueType' placeholder='index value' :required='indexValueType !== "checkbox"' v-model='indexValue')

        template(v-if='index !== "$user_id" && indexValueType !== "checkbox"')
            select(v-model='indexCondition' :disabled='conditionDisabled')
                option(value='=' selected) equal
                option(value='>=') greater or equal
                option(value='>') greater
                option(value='<=') less or equal
                option(value='<') less
                option(value='range') range

            input(v-if='indexCondition == "range"' name='index[range]' :type='indexValueType' placeholder='index range' required)

    br

    // tag, 선택

    input(name='tag' placeholder='tag1, tag2, ...')

    br

    input(type='submit' value='search')
</template>

<script setup>
import { ref, watch } from 'vue';
import { skapi } from '@/code/admin';
import { currentService } from '@/views/service/main';
import jsonCrawler from 'jsoncrawler'; // https://github.com/broadwayinc/jsoncrawler 참고
let index = ref('none');
let indexValueType = ref('text');
let indexValue = ref('');
let indexCondition = ref('=');
let conditionDisabled = ref(false);
watch(index, (n) => {
    conditionDisabled.value = false;
    indexValueType.value = 'text';
    indexCondition.value = '=';
    switch (n) {
        case '$user_id':
            indexValueType.value = 'text';
            indexCondition.value = '=';
            conditionDisabled.value = true;
            break;
        case 'name':
            break;
        case '$referenced_count':
            indexValueType.value = 'number';
            break;
        default:
            // updated, uploaded
            indexValueType.value = 'datetime-local';
    }
})

watch(indexValueType, n => {
    indexValue.value = '';
})

let fetchOption = {
    limit: 100, // 100개 씩 가져오기, pager에서 n게 씩 보여주기
    fetchMore: false // 새로운 검색일때 fetchMore false로, 같은 검색 조건에서 더 가져올때 true로
}

async function extractForm(e) {
    let form = skapi.util.extractFormData(e);
    let params = form.data;

    if (params?.index?.condition === 'range') {
        delete params.index.condition;
    }

    // 빈 값 제거
    let emptyValues = jsonCrawler(params, [""]);
    for (let p of emptyValues) {
        let obj = params;
        for (let k of p.path) {
            obj = obj[k];
        }
        delete obj[p.key];
    }

    console.log(params);

    try {
        let records = await skapi.getRecords(params, fetchOption);
        fetchOption.fetchMore = true;
        console.log(records); // 가져온 데이터
    } catch (err) {
        alert(err.message);
    }
}

</script>