<template lang="pug">
h1 OPEN ID Logger 등록하기

hr

p Open ID Logger를 등록합니다.

form(@submit.prevent="addLogger")
  label
    | Logger ID:
    input(type="text", name="id", required)

  br

  label
    | Username Key:
    input(type="text", name="usr", placeholder="sub")

  br

  label
    | Request URL:
    input(type="url", name="url", required placeholder="https://example.com/api/token=$TOKEN")

  br

  label
    | Request Method:
    select(name="mthd", v-model="reqMethod")
      option(value="GET") GET
      option(value="POST") POST

  br

  label
    | Request Header(JSON):
    br
    textarea(type="text", name="hder", rows="5", cols="50" placeholder='{"Authorization": "Bearer $TOKEN"}')

  label(:class="{ disabled: reqMethod === 'POST' }")
    | Get Parameter (JSON):
    br
    textarea(type="text", name="prms", rows="5", cols="50")

  br

  label(:class="{ disabled: reqMethod === 'GET' }")
    | Request Post Body JSON (Only Post):
    br
    textarea(type="text", name="data", rows="5", cols="50")

  br

  fieldset
    legend Condition
    label
      | Profile Attribute:
      input(type="text", name="cdtn[key]", v-model="condKey")

    br

    div(:class="{ disabled: condKey === '' }")
      label
        | Attribute value:
        input(type="text", name="cdtn[value]")

      br

      label
        | Condition:
        select(name="cdtn[condition]", v-model="cond")
          option(value="=") None
          option(value="!=") Not Equals
          option(value=">") Greater
          option(value=">=") Greater or Equals
          option(value="<") Less
          option(value="<=") Less or Equals

      br

      label(:class="{ disabled: cond !== '=' }")
        | Range:
        input(type="text", name="cdtn[range]")

  br

  button(type="submit") Add Logger

hr

h1 Logger List
label
  | Logger ID: 
  input(type="text", placeholder="All", v-model="getLoggerId")

br

button(@click="getOpenIDLoggers") Get Loggers

hr

div(style='overflow-x: hidden;')
    div(style='overflow-x: auto;')
        table
            thead
                tr
                th Logger ID
                th Username Key
                th Request URL
                th Request Method
                th Request Header
                th Get Parameter
                th Post Data
                th Condition
                th Range
                th Action
            tbody
                tr(v-for="logger in loggerList")
                    td {{ logger.id }}
                    td {{ logger.usr }}
                    td {{ logger.url }}
                    td {{ logger.mthd }}
                    td {{ logger.hder }}
                    td {{ logger.prms }}
                    td {{ logger.data }}
                    td {{ logger.cdtn }}
                    td {{ logger.range }}
                    td
                        button(@click="deleteLogger(logger.id)") Delete


</template>

<script setup>
import { currentService } from "@/views/service/main";
import { skapi } from "@/code/admin";
import { ref } from "vue";
let reqMethod = ref("GET");
let cond = ref("=");
let condKey = ref("");
let getLoggerId = ref("");

let loggerList = ref([]);

function addLogger(e) {
  let params = skapi.util.extractFormData(e.target).data;
  console.log(params);

  let hasToBeJson = ["data", "hder", "prms"];

  for (let key of hasToBeJson) {
    if (params[key]) {
      try {
        params[key] = JSON.parse(params[key]);
      } catch (e) {
        alert(`${key} is invalid JSON string.`);
        return;
      }
    }
  }

  params.req = "create";

  for (let key in params) {
    if (!params[key]) delete params[key];
  }

  return currentService.registerOpenIDLogger(params).then((res) => {
    console.log(res);
    alert("Open ID Logger added.");
  });
}


function getOpenIDLoggers() {
  let params = {
    req: "list",
  };
  if (getLoggerId.value) {
    params.id = getLoggerId.value;
  }
  return currentService.registerOpenIDLogger(params).then((res) => {
    console.log(res);
    loggerList.value = res.list;
  });
}

function deleteLogger(id){
    return currentService.registerOpenIDLogger({req: "delete", id}).then((res) => {
        console.log(res);
        alert("Open ID Logger deleted.");
    });
}
</script>
