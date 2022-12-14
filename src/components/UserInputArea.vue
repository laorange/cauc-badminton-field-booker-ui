<script setup lang="ts">
import {onMounted, reactive, ref} from "vue";
import {
  useMessage, NFormItem, FormRules, NButton, NSpace, NInputNumber,
  NInput, NDynamicInput, NSelect, NGrid, NGi, NDivider, NSwitch,
} from "naive-ui";
import {Preference, UserInfo} from "../assets/types";
import {fieldOptions, timeOptions} from "../assets/data";
import UserInfoDisplayArea from "./UserInfoDisplayArea.vue";

const message = useMessage();

onMounted(() => {
  message.success(`本页面已开放源代码，所有信息均不会上传，请放心使用！`, {duration: 3000});
});

const userInfo = reactive<UserInfo>({
  cipher: "",
  account: "",
  password: "",
  startNow: false,
  preferences: [],
});

function createPreference(): Preference {
  return {fields: [], times: []};
}

const formRules = reactive<FormRules>({
  cipher: {
    trigger: ["input", "blur"],
    validator: () => {
      if (!userInfo.cipher) return new Error("请联系开发者以获取暗号");
    },
  },
  account: {
    trigger: ["input", "blur"],
    validator: () => {
      if (!userInfo.account) return new Error("请输入校园网账号");
    },
  },
  password: {
    trigger: ["input", "blur"],
    validator: () => {
      if (!userInfo.password) return new Error("请输入校园网密码");
    },
  },
});

function selectSchoolArea(preference: Preference, schoolArea: string) {
  preference.fields = fieldOptions.map(fo => fo.value).filter(f => f.indexOf(schoolArea) > -1);
}

const showResult = ref(false);

async function submit() {
  if (!userInfo.cipher || !userInfo.account || !userInfo.password) {
    return message.error(`请先补全"用户信息"`);
  } else if (!userInfo.preferences.length) {
    return message.error(`请先添加"场地信息"`);
  } else if (userInfo.preferences.filter(p => p.fields.length === 0 || p.times.length === 0).length) {
    return message.error(`请先补全"场地信息"`);
  } else {
    showResult.value = true;
  }
}
</script>

<template>
  <div class="user-input-area">
    <template v-if="!showResult">
      <n-divider>
        <div>用户信息</div>
      </n-divider>
      <n-grid cols="4" x-gap="10">
        <n-gi span="2">
          <div id="account">
            <n-form-item label="校园网账号" path="account" :rule="formRules.account" required>
              <n-input v-model:value="userInfo.account" placeholder="请输入校园网账号"/>
            </n-form-item>
          </div>
        </n-gi>
        <n-gi span="2">
          <div id="password">
            <n-form-item label="校园网密码" path="password" :rule="formRules.password" required>
              <n-input v-model:value="userInfo.password" type="password" placeholder="请输入校园网密码"/>
            </n-form-item>
          </div>
        </n-gi>
        <n-gi span="3">
          <div id="cipher">
            <n-form-item label="暗号" path="account" :rule="formRules.cipher" required>
              <n-input v-model:value="userInfo.cipher" placeholder="请输入暗号"/>
            </n-form-item>
          </div>
        </n-gi>
        <n-gi>
          <div style="padding-bottom: 24px">
            <n-space style="height: 100%" vertical justify="center" align="center">
              <div>预约当前的场地?</div>
              <n-space align="center" justify="center">
                <n-switch v-model:value="userInfo.startNow"/>
                <div v-if="!userInfo.startNow" style="font-size: 12px; color: green">将于06:30开始运行</div>
                <div v-else style="font-size: 12px; color: green">即刻开始运行</div>
              </n-space>
            </n-space>
          </div>
        </n-gi>
      </n-grid>

      <n-divider>
        <div>场地信息（越靠上的场地，其预约优先级越高）</div>
      </n-divider>
      <n-dynamic-input v-model:value="userInfo.preferences"
                       :show-sort-button="true"
                       :on-create="createPreference">
        <template #create-button-default>添加场地信息</template>
        <template #default="{ value }">
          <n-grid cols="2" x-gap="5">
            <n-gi>
              <n-select :options="fieldOptions" v-model:value="value.fields" placeholder="请选择场地(多选)" multiple clearable>
                <template #action>
                  <n-space justify="center" align="center">
                    <n-button size="tiny" color="#32647d" @click="selectSchoolArea(value, `东丽`)">东丽校区</n-button>
                    <n-button size="tiny" color="#32647d" @click="selectSchoolArea(value, `宁河`)">宁河校区</n-button>
                  </n-space>
                </template>
              </n-select>
            </n-gi>
            <n-gi>
              <n-select :options="timeOptions" v-model:value="value.times" placeholder="请选择时间(多选)" multiple clearable/>
            </n-gi>
          </n-grid>
        </template>
      </n-dynamic-input>

      <n-divider>
        <n-button size="large" type="success" @click="submit">提交数据</n-button>
      </n-divider>
    </template>

    <template v-else>
      <div class="result-display-area">
        <n-space vertical :size="30">
          <h2>请结合客户端使用以下信息：</h2>
          <UserInfoDisplayArea :user-info="userInfo"/>
          <n-button size="large" type="success" @click="showResult=false">编辑数据</n-button>
        </n-space>
      </div>
    </template>
  </div>
</template>

<style scoped>
.user-input-area {
  min-width: calc(min(90vw, 1200px));
}
</style>
