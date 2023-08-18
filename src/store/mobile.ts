import { defineStore } from 'pinia';
import { Data } from '@/api/callout/types/resType';
const useOrgInfo = defineStore('orgInfo', () => {
  const data = reactive<Data>({
    name: '加载中',
    avatarUrl: '#',
    briefIntroduction: '加载中',
    tagList: [
      {
        tag: '加载中',
        type: 1
      },
      {
        tag: '加载中',
        type: 1
      }
    ],
    introduction: '加载中',
    feature: '加载中',
    daily: '加载中',
    slogan: '加载中',
    contactInfo: '加载中',
    more: '加载中',
    departmentList: []
  });
  const activeTab = reactive({
    value: 0
  });
  const setOrgInfo = (val: Data) => {
    Object.assign(data, val);
  };
  const setActiveTab = (val: number) => {
    activeTab.value = val;
  };
  return {
    data,
    activeTab,
    setOrgInfo,
    setActiveTab
  };
});
export { useOrgInfo };
