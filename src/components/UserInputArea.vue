<script setup lang="ts">
import {onMounted, reactive, ref} from "vue";
import {
  useMessage, NFormItem, FormRules, NButton, NSpace, NInputNumber,
  NInput, NDynamicInput, NSelect, NGrid, NGi, NDivider,
} from "naive-ui";
import {Preference, UserInfo} from "../assets/types";
import {fieldOptions, timeOptions} from "../assets/data";

const message = useMessage();

const port = (() => {
  let _port = 0;
  let query = window.location.search.substring(1);
  let vars = query.split("&");
  for (let i = 0; i < vars.length; i++) {
    let pair = vars[i].split("=");
    if (pair[0] == "port") {
      _port = parseInt(pair[1]);
      break;
    }
  }
  console.log(_port);
  return isNaN(_port) ? 0 : _port;
})();

onMounted(() => {
  if (!port) {
    message.warning("未检测到端口号，请配合客户端使用本页面", {duration: 0, closable: true});
    message.info("为避免该程序被滥用，客户端暂未开源，还请谅解", {duration: 0, closable: true});
  } else {
    message.success(`本页面已开放源代码，所有信息均不会上传，请放心使用！`, {duration: 3000});
  }
});

const userInfo = reactive<UserInfo>({
  account: "",
  password: "",
  fieldNum: 2,
  preferences: [],
});

function createPreference(): Preference {
  return {fields: [], times: []};
}

const formRules = reactive<FormRules>({
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
  fieldNum: {
    trigger: ["input", "blur"],
    validator: () => {
      if (!userInfo.fieldNum || userInfo.fieldNum < 0) return new Error("请输入您想预定的场地数");
    },
  },
});

function selectSchoolArea(preference: Preference, schoolArea: string) {
  preference.fields = fieldOptions.map(fo => fo.value).filter(f => f.indexOf(schoolArea) > -1);
}

const canSubmit = ref(true);

async function submit() {
  if (!userInfo.fieldNum || !userInfo.account || !userInfo.password) {
    return message.error(`请先补全"用户信息"`);
  } else if (!userInfo.preferences.length) {
    return message.error(`请先添加"场地信息"`);
  } else if (userInfo.preferences.filter(p => p.fields.length === 0 || p.times.length === 0).length) {
    return message.error(`请先补全"场地信息"`);
  } else {
    // TODO: SUBMIT
    canSubmit.value = false;
    message.success("提交成功。请关闭本页面，静候程序运行", {duration: 5000});
    setTimeout(() => message.info("将在5秒后跳转到学校官网", {duration: 1000}), 5000);
    setTimeout(() => message.info("将在4秒后跳转到学校官网", {duration: 1000}), 6000);
    setTimeout(() => message.info("将在3秒后跳转到学校官网", {duration: 1000}), 7000);
    setTimeout(() => message.info("将在2秒后跳转到学校官网", {duration: 1000}), 8000);
    setTimeout(() => message.info("将在1秒后跳转到学校官网", {duration: 1000}), 9000);
    setTimeout(() => location.href = "https://www.cauc.edu.cn/", 10000);
  }
}
</script>

<template>
  <div class="user-input-area">
    <n-grid cols="3" x-gap="10">
      <n-gi>
        <n-form-item label="校园网账号" path="account" :rule="formRules.account" required>
          <n-input v-model:value="userInfo.account" placeholder="请输入校园网账号"/>
        </n-form-item>
      </n-gi>
      <n-gi>
        <n-form-item label="校园网密码" path="password" :rule="formRules.password" required>
          <n-input v-model:value="userInfo.password" type="password" placeholder="请输入校园网密码"/>
        </n-form-item>
      </n-gi>
      <n-gi>
        <n-form-item label="预定的场地数" path="fieldNum" :rule="formRules.fieldNum" required>
          <n-input-number :min="0" v-model:value="userInfo.fieldNum" placeholder="请输入预定的场地数"/>
        </n-form-item>
      </n-gi>
    </n-grid>

    <n-divider>
      <div>场地信息（越靠上的场地，其预约优先级越高）</div>
    </n-divider>
    <n-dynamic-input v-model:value="userInfo.preferences" :min="1"
                     :show-sort-button="true"
                     :on-create="createPreference">
      <template #create-button-default>添加场地信息</template>
      <template #default="{ value }">
        <n-grid cols="2" x-gap="5">
          <n-gi>
            <n-select :options="fieldOptions" v-model:value="value.fields" placeholder="请选择场地(多选)" multiple clearable>
              <template #action>
                <n-space justify="center" align="center">
                  <n-button color="#32647d" @click="selectSchoolArea(value, `东丽`)">东丽校区</n-button>
                  <n-button color="#32647d" @click="selectSchoolArea(value, `宁河`)">宁河校区</n-button>
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
      <n-button type="success" @click="submit" :disabled="!canSubmit">提交数据</n-button>
    </n-divider>
  </div>
</template>

<style scoped>
.user-input-area {
  min-width: calc(min(90vw, 1200px));
}

.n-button {
  margin-left: 4px;
}

.n-button:nth-child(3) {
  margin-right: 8px;
}
</style>
