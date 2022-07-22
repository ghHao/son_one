<!--
* @FileDescription: IP、邮箱、手机号码，单个或多个输入时 校验
* @Author: gaohao
* @Date: 2022-07-21
* @LastEditors: gaohao
* @LastEditTime: 2022-07-21
-->
<template>
    <main class="tags-box" @click="focusInput">
        <a-tag
            size="mini"
            type="info"
            color="processing"
            style="margin-right: 4px;margin-bottom: 1px;"
            v-for="tag in tagsList"
            :key="tag"
            :disable-transitions="false"
            closable
            @close="deleteTags(tag)">
            {{ tag }}
        </a-tag>
        <a-input
            size="mini"
            ref="tagInputRef"
            style="width: 180px;"
            v-model:value="tagValue"
            :placeholder="`请输入${rulesMap[ruleType].nameCn}`"
            allow-clear
            @blur="handleInputConfirm"
            @keyup.enter="handleInputConfirm"
        >
        </a-input>
    </main>
    <footer class="footer">
        <a-button type="primary" html-type="submit" @click="handleOk">保存</a-button>
        <a-button style="margin-left: 10px" @click="handleCancel">取消</a-button>
    </footer>
</template>
<script>
import {computed, ref} from "vue";
import {message} from 'ant-design-vue';

export default {
    name: 'tagsInput',
    props: ['list', 'type'],
    setup (props, {emit}) {
        const tagInputRef = ref(undefined);
        // 输入框的值
        const tagValue = ref('');
        // 标签列表
        const tagsList = computed(() => {
            try {
                return JSON.parse(props.list) || [];
            } catch (error) {
                return props?.list ? props?.list?.length === 0 ? [] : [props.list] : [];
            }
        });
        const ruleType = ref(props.type ?? 'Ip');
        // 校验规则
        const rulesMap = {
            Ip: {nameCn: 'IP', rule: /^((?:(?:25[0-5]|2[0-4]\d|[01]?\d?\d)\.){3}(?:25[0-5]|2[0-4]\d|[01]?\d?\d))$/,},
            Email: {nameCn: "邮箱", rule: /^([a-zA-Z\d][\w-]{2,})@(\w{2,})\.([a-z]{2,})(\.[a-z]{2,})?$/,},
            Phone: {nameCn: "手机号码", rule: /^1(3[0-9]|4[01456879]|5[0-35-9]|6[2567]|7[0-8]|8[0-9]|9[0-35-9])\d{8}$/,},
        };

        const methods = {
            // 聚焦输入框
            focusInput () {
                tagInputRef.value.focus();
            },

            // 删除标签
            deleteTags (tag) {
                tagsList.value.splice(tagsList.value.indexOf(tag), 1);
            },

            // 确定输入框的值
            handleInputConfirm (flag) {
                if (!tagValue.value || tagValue.value === "") {
                    if (flag) {
                        emit('ok', tagsList.value);
                    }
                    return false;
                }
                const str = tagValue.value.trim().replace(/(;$)|(；$)/g, '');
                if (methods.checkRules(str)) {
                    if (tagsList.value.indexOf(str) !== -1) {
                        message.warning(`${rulesMap[ruleType.value].nameCn}已存在`);
                    } else {
                        tagsList.value.push(str);
                        tagValue.value = "";
                        if (flag) {
                            emit('ok', tagsList.value);
                        }
                    }
                } else {
                    message.warning(`输入${rulesMap[ruleType.value].nameCn}格式错误`);
                }
            },

            // 取消
            handleCancel () {
                emit('cancel');
            },
            // 确认
            handleOk () {
                methods.handleInputConfirm(true);
            },

            // 判断字符串是否符合校验规则
            checkRules (val) {
                const rules = rulesMap[ruleType.value].rule;
                return rules.test(val);
            }
        };

        return {
            tagsList,
            tagValue,
            tagInputRef,
            ruleType,
            rulesMap,
            ...methods
        };
    },

};
</script>
<style lang="less" scoped>
.tags-box {
    margin-top: 4px;
    padding: 1px;
    display: flex;
    flex-wrap: wrap;
    border-radius: 5px;
    box-sizing: border-box;
    align-items: center;
    border: 1px solid #d9d9d9;
    min-height: 32px;
    cursor: text;

    &:hover {
        border-color: #268DFF !important;
    }
}

.footer {
    width: 100%;
    display: flex;
    justify-content: flex-end;
    margin-top: 20px;
}
</style>
