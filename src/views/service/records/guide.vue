<template lang="pug">
    p(style='margin-bottom:0') Search and manage your database records.
    
    p(style='margin-bottom: 0').
        The example below shows how you can let your users to upload / fetch their data from your service.
        The indexing and the security level is defined from your HTML without any server side code.
        Skapi can handle any type of data including huge binary files.
    Code
        pre.
            #[span(style="color:#999") &lt;!-- Uploading data --&gt;]
            #[span(style="color:#999") &lt;]#[span(style="color:#33adff") form] #[span(style="color:#44E9FF") onsubmit]=#[span(style="color:#FFED91") "skapi.postRecord(event, { table: { name: 'my_collection', access_group: 'authorized' } }).then(r => console.log(r))"]#[span(style="color:#999") &gt;]
                #[span(style="color:#999") &lt;]#[span(style="color:#33adff") input] #[span(style="color:#44E9FF") name]=#[span(style="color:#FFED91") "something"] #[span(style="color:#44E9FF") placeholder]=#[span(style="color:#FFED91") "Write something"]#[span(style="color:#999") &gt;]#[span(style="color:#999") &lt;]#[span(style="color:#33adff") br]#[span(style="color:#999") &gt;]#[span(style="color:#999") &lt;]#[span(style="color:#33adff") br]#[span(style="color:#999") &gt;]
                #[span(style="color:#999") &lt;]#[span(style="color:#33adff") input] #[span(style="color:#44E9FF") type]=#[span(style="color:#FFED91") "file"] #[span(style="color:#44E9FF") name]=#[span(style="color:#FFED91") "my_file"]#[span(style="color:#999") &gt;]#[span(style="color:#999") &lt;]#[span(style="color:#33adff") br]#[span(style="color:#999") &gt;]#[span(style="color:#999") &lt;]#[span(style="color:#33adff") br]#[span(style="color:#999") &gt;]
                #[span(style="color:#999") &lt;]#[span(style="color:#33adff") input] #[span(style="color:#44E9FF") type]=#[span(style="color:#FFED91") "submit"] #[span(style="color:#44E9FF") value]=#[span(style="color:#FFED91") "Submit"]#[span(style="color:#999") &gt;]
            #[span(style="color:#999") &lt;/]#[span(style="color:#33adff") form]#[span(style="color:#999") &gt;]

    Code
        pre.
            #[span(style="color:#999") &lt;!-- Fetching data --&gt;]
            #[span(style="color:#999") &lt;]#[span(style="color:#33adff") form] #[span(style="color:#44E9FF") onsubmit]=#[span(style="color:#FFED91") "skapi.getRecords(event).then(r => console.log(r))"]#[span(style="color:#999") &gt;]
                #[span(style="color:#999") &lt;]#[span(style="color:#33adff") input] #[span(style="color:#44E9FF") name]=#[span(style="color:#FFED91") "table&#91;name&#93;"] #[span(style="color:#44E9FF") value]=#[span(style="color:#FFED91") "my_collection"] #[span(style="color:#44E9FF") hidden]#[span(style="color:#999") &gt;]
                #[span(style="color:#999") &lt;]#[span(style="color:#33adff") input] #[span(style="color:#44E9FF") name]=#[span(style="color:#FFED91") "table&#91;access_group&#93;"] #[span(style="color:#44E9FF") value]=#[span(style="color:#FFED91") "authorized"] #[span(style="color:#44E9FF") hidden]#[span(style="color:#999") &gt;]
                #[span(style="color:#999") &lt;]#[span(style="color:#33adff") input] #[span(style="color:#44E9FF") type]=#[span(style="color:#FFED91") "submit"] #[span(style="color:#44E9FF") value]=#[span(style="color:#FFED91") "Get Data"]#[span(style="color:#999") &gt;]
            #[span(style="color:#999") &lt;/]#[span(style="color:#33adff") form]#[span(style="color:#999") &gt;]

    p For more details, please refer to the #[a(href="https://docs.skapi.com/database/create.html" target="_blank") Documentation]
</template>

<script setup lang="ts">
import Code from "@/components/code.vue";
</script>