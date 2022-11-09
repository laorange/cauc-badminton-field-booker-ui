<script setup lang="ts">
import CopyrightFooter from "./components/CopyrightFooter.vue";
import packageJson from "../package.json";

import {NWatermark, NMessageProvider} from "naive-ui";
import UserInputArea from "./components/UserInputArea.vue";
</script>

<template>
  <n-watermark content="仅用于学习交流，严禁商用！"
               font-color="rgba(128, 128, 128, 0.1)" fullscreen
               :font-size="12" :line-height="10" :width="320" :height="100"
               :font-weight="200" :x-offset="15" :y-offset="0" :rotate="15"/>
  <h1>CAUC羽毛球场预约程序</h1>

  <n-message-provider>
    <UserInputArea/>
  </n-message-provider>

  <CopyrightFooter
      :version="packageJson.version"
      project-url="https://github.com/laorange/cauc-badminton-field-booker-ui"/>
</template>

<style scoped>
.logo {
  height: 6em;
  padding: 1.5em;
  will-change: filter;
}

.logo:hover {
  filter: drop-shadow(0 0 2em #646cffaa);
}

.logo.vue:hover {
  filter: drop-shadow(0 0 2em #42b883aa);
}
</style>
