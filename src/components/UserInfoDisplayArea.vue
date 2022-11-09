<script setup lang="ts">
import {UserInfo} from "../assets/types";
import {computed} from "vue";
import {Base64} from "js-base64";
import {NCode} from "naive-ui";

const props = defineProps<{ userInfo: UserInfo }>();

const code = computed(() => Base64.encode(JSON.stringify(props.userInfo)));
</script>

<template>
  <div id="user-info-display-area">
    <n-code id="user-info-code" :code="code" :word-wrap="true"/>
  </div>
</template>

<style scoped>

</style>
