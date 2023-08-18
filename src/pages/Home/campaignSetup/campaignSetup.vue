<script lang="ts" setup>
import type { TabsPaneContext } from 'element-plus';
import BaseInfo from './subpage/baseInfo.vue';
import MobilePhone from './subpage/mobile.vue';
import { useOrgInfo } from '@/store/mobile';

const activeName = ref('baseInfo');
// 切换手机模拟器的tab
const handleClick = (tab: TabsPaneContext, event: Event) => {
  useOrgInfo().setActiveTab(+(tab.index ?? 0));
  // console.log(activeName.value);
  // 规范了id的命名，所以可以直接用
  scrollToSection(tab.paneName as string);
};
// 滚动到指定的section
const scrollToSection = (sectionId: string) => {
  const section = document.getElementById(sectionId);
  if (section) {
    section.scrollIntoView({ behavior: 'smooth' });
  }
};
// 监听滚动事件，高亮当前的tab
const highlightActiveTab = (entries: any) => {
  entries.forEach((entry: any) => {
    if (entry.isIntersecting) {
      activeName.value = entry.target.id;
    }
  });
  // const main = document.getElementById('main-container') as HTMLElement;
  // const scrollY = main.scrollTop;
  // const sections = [
  //   { id: 'baseInfo' },
  //   { id: 'clubPromotion' },
  //   { id: 'recruitDept' }
  // ];

  // for (const section of sections) {
  //   const element = document.getElementById(section.id);
  //   if (element) {
  //     const offsetTop = element.offsetTop;
  //     const offsetHeight = element.offsetHeight;
  //     if (scrollY >= offsetTop && scrollY < offsetTop + offsetHeight) {
  //       activeName.value = section.id;
  //       // console.log(activeName);
  //     }
  //   }
  // }
};
// const highlightActiveTab = () => {
//   console.log(1);
//   const main = document.getElementById('main-container') as HTMLElement;
//   const scrollY = main.scrollTop;
//   const sections = [
//     { id: 'baseInfo' },
//     { id: 'clubPromotion' },
//     { id: 'recruitDept' }
//   ];

//   for (const section of sections) {
//     const element = document.getElementById(section.id);
//     if (element) {
//       const offsetTop = element.offsetTop;
//       const offsetHeight = element.offsetHeight;
//       if (scrollY >= offsetTop && scrollY < offsetTop + offsetHeight) {
//         activeName.value = section.id;
//         // console.log(activeName);
//       }
//     }
//   }
// };
onMounted(() => {
  // const main = document.getElementById('main-container') as HTMLElement;
  // console.log(main);
  // main.addEventListener('scroll', highlightActiveTab);

  for (const section of sections) {
    const element = document.getElementById(section.id);
    if (element) {
      observe.observe(element);
    }
  }
});

onBeforeUnmount(() => {
  // window.removeEventListener('scroll', highlightActiveTab);
  // const main = document.getElementById('main-container') as HTMLElement;
  // main.removeEventListener('scroll', highlightActiveTab);
  for (const section of sections) {
    const element = document.getElementById(section.id);
    if (element) {
      observe.unobserve(element);
    }
  }
});
const observe = new IntersectionObserver(highlightActiveTab, {
  threshold: 0.3, // 交叉比例达到多少时触发回调
  root: document.getElementById('main-container') // 监听的根元素
});
const sections = [
  { id: 'baseInfo' },
  { id: 'clubPromotion' },
  { id: 'recruitDept' }
];
const test = () => {
  console.log(1);
};
</script>

<template>
  <div class="setUpRoot">
    <el-card class="tabs-content">
      <!-- 试图自己写一个tabs -->
      <!-- <div>
        <nav class="nav-bar">
          <nav class="nav-list" @click="">基本信息</nav>
          <nav class="nav-list" @click="">社团宣传</nav>
          <nav class="nav-list" @click="">纳新部门</nav>
        </nav>
      </div> -->
      <!-- <BaseInfo /> -->
      <el-tabs v-model="activeName" @tab-click="handleClick" class="demo-tabs">
        <!-- 内容全部空白，只使用tabs的上栏 -->
        <el-tab-pane label="基本信息" name="baseInfo" @click="test">
          <!-- <BaseInfo /> -->
        </el-tab-pane>
        <el-tab-pane label="社团宣传" name="clubPromotion">
          <!-- <ClubPromotion /> -->
        </el-tab-pane>
        <el-tab-pane label="纳新部门" name="recruitDept">
          <!-- <RecruitDept /> -->
        </el-tab-pane>
      </el-tabs>
      <BaseInfo />
    </el-card>
    <div class="tabs-mobile">
      <MobilePhone />
    </div>
  </div>
</template>

<style lang="scss" scoped>
.setUpRoot {
  height: 100%;

  @media (max-width: 820px) {
    flex-direction: column;
    min-height: 100%;
    justify-content: start;
    align-items: center;
    overflow-y: auto;
  }

  box-sizing: border-box;
  padding: 20px;
  height: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-around;
}

//el-tabs下属的subpage,:deep()才能穿透生效，其余已弃用，带scoped就需要穿透
:deep(.demo-tabs > .el-tabs__content) {
  // padding: 32px;
  // color: #6b778c;
  color: #1559ce;
  color: var(--el-text-color-primary);
  // font-size: 15px;
  // font-weight: 400;
}

.tabs-content {
  flex: 2;
  height: 100%;
}

.tabs-mobile {
  flex: 1;
  // height: 100%;
  // display: flex;

  @media (max-width: 820px) {
    display: block;
    flex: 1;
    height: 100%;
    margin-top: 20px;
  }
}
.nav-bar {
  display: flex;
  justify-content: flex-start;
  gap: 20px;
  position: relative;
  padding-bottom: 16px;
  margin-bottom: 16px;
  &:active {
    color: var(--el-color-primary);
    border-bottom: 3px solid var(--el-color-primary);
  }
  /*下面的划线*/
  &::after {
    content: '';
    position: absolute;
    left: 0;
    bottom: 0;
    width: 100%;
    height: 2px;
    background-color: var(--el-border-color-light);
    z-index: var(--el-index-normal);
  }

  .nav-list {
    color: var(--el-text-color-primary);
    font-size: 15px;
    font-weight: 500;
    cursor: pointer;
    &:hover {
      color: var(--el-color-primary);
    }
  }
}
</style>
