<template lang="pug">
._codeWrap
    div(style="text-align:right")
        .copy(v-if='cpy_btn' @click="copy")
            span.copyMsg Copy code
            .material-symbols-outlined.fill.nohover(style="font-size:20px;margin-left:5px") file_copy
    .code
        slot

</template>
<script setup>
let props = defineProps(['hidecopy'])
let cpy_btn = !props.hidecopy;

console.log({props})
let copy = (e) => {
    let allcopy = document.querySelectorAll('.copyMsg');
    for (let i = 0; i < allcopy.length; i++) {
        allcopy[i].textContent = 'Copy code';
    }
    let code = e.currentTarget.parentElement.nextElementSibling.querySelector('.code > pre');
    let doc = document.createElement('textarea');
    doc.textContent = code.textContent;
    document.body.append(doc);
    doc.select();
    document.execCommand('copy');
    doc.remove();

    let copyMsg = e.currentTarget.querySelector('.copyMsg')
    copyMsg.textContent = 'Copied!'

    setTimeout(() => {
        copyMsg.textContent = 'Copy code'
    }, 2000)
}
</script>
<style lang="less">
._codeWrap {
    position: relative;
    margin-top: 8px;

    .copy {
        display: inline-block;
        text-align: right;
        font-size: 14px;
        font-weight: 400;
        cursor: pointer;
    }

    .code {
        background: var(--black-8);
        margin-top: 8px;
        border-radius: 8px;
        box-shadow: 2px 2px 3px 0px rgba(0, 0, 0, 0.15);
        color: #FFF;
        overflow-x: auto;

        pre {
            font-size: 15px;
            margin: 0;
            padding: 1rem;
        }
    }
}
</style>