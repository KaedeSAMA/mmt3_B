<script setup lang="ts">
import SignInfoCard from '../../components/signInfoCard/singInfoCard.vue';
import MobileBox from '@/pages/Home/components/mobile/index.vue';
import { Data } from '@/api/callout/types/resType';
import { useOrgInfo } from '@/store/mobile';

let isList = ref(true);
let activeDep: any = reactive({}); //具体展示的部门信息
let { data, activeTab, setActiveTab } = useOrgInfo();
const organizeInfo: Data = data;
const toDepDetail = (index: number) => {
  isList.value = false;
  activeDep = organizeInfo.departmentList[index]; //为了确保能同步更新，不使用拷贝而传递引用
  // Object.assign(activeDep, organizeInfo.departmentList[index]);
};
</script>

<template>
  <div class="right">
    <MobileBox class="rightPreview" :device-height="655" :device-width="342">
      <div class="baseInfo" v-if="activeTab.value === 0">
        <div class="card">
          <section class="organize" @click="setActiveTab(1)">
            <div class="organizeImg">
              <img :src="organizeInfo.avatarUrl" alt="logo" />
            </div>
            <div class="organizeAttr">
              <div class="organizeName">
                {{ organizeInfo.name }}
              </div>
              <div class="organizeTags">
                <template v-for="item in organizeInfo.tagList">
                  <div class="tag" v-if="item.tag ?? '' != ''">
                    {{ item.tag }}
                  </div>
                </template>
              </div>
            </div>
          </section>
          <section class="describe">
            {{ organizeInfo.briefIntroduction }}
          </section>
        </div>
      </div>
      <div class="organizeDrumbeating" v-if="activeTab.value === 1">
        <div class="nav">
          <span class="active">社团介绍</span
          ><span @click="setActiveTab(2)">社团部门</span>
        </div>
        <div class="sign_message">
          <sign-info-card
            title="社团介绍"
            :content="organizeInfo.introduction"
            v-if="organizeInfo.introduction ?? '' !== ''"
          ></sign-info-card>
          <sign-info-card
            title="社团特色"
            :content="organizeInfo.feature"
            v-if="organizeInfo.feature ?? '' !== ''"
          ></sign-info-card>
          <sign-info-card
            title="社团日常"
            :content="organizeInfo.daily"
            v-if="organizeInfo.daily ?? '' !== ''"
          ></sign-info-card>
          <sign-info-card
            title="社团宣言"
            :content="organizeInfo.slogan"
            v-if="organizeInfo.slogan ?? '' !== ''"
          ></sign-info-card>
          <sign-info-card
            title="联系方式"
            :content="organizeInfo.contactInfo"
            v-if="organizeInfo.contactInfo ?? '' !== ''"
          ></sign-info-card>
          <sign-info-card
            title="更多"
            :content="organizeInfo.more"
            v-if="organizeInfo.more ?? '' !== ''"
          ></sign-info-card>
          <div style="height: 30px"></div>
        </div>
      </div>
      <div class="department" v-if="activeTab.value === 2">
        <div class="list" v-if="isList">
          <div class="nav">
            <span @click="setActiveTab(1)">社团介绍</span
            ><span class="active">社团部门</span>
          </div>
          <div
            class="depList"
            v-for="(item, index) in organizeInfo.departmentList"
            :key="index"
          >
            <div class="departmentCard" @click="toDepDetail(index)">
              <div class="info">
                <div class="title">{{ item.name }}</div>
                <div class="describe van-ellipsis">
                  {{ item.briefIntroduction }}
                </div>
              </div>
              <div class="icon">
                <i class="el-icon-arrow-right"></i>
              </div>
            </div>
          </div>
        </div>

        <div class="departmentDetail" v-else>
          <div class="headNav" @click="isList = true">
            <i class="el-icon-arrow-left"></i>
            <span>返回</span>
          </div>
          <div class="detail_message">
            <sign-info-card
              title="部门介绍"
              :content="activeDep.introduction"
              v-if="activeDep.introduction ?? '' !== ''"
            ></sign-info-card>
            <sign-info-card
              title="纳新标准"
              :content="activeDep.standard"
              v-if="activeDep.standard ?? '' !== ''"
            ></sign-info-card>
          </div>
        </div>
      </div>
    </MobileBox>
  </div>
</template>

<style lang="scss" scoped>
.right {
  height: 100%;
  margin-left: 40px;
  // margin-top: 24px;
  // transform: translateY(-20px);
  display: flex;
  align-items: center;

  .rightPreview {
    .baseInfo {
      width: 91%;
      height: 84%;

      .card {
        width: 96%;
        margin: 0 auto;
        background-color: #f8f8f8;
        border-radius: 20px;
        margin-top: 48px;
        border: 2px solid #e8e8e8;
        box-shadow: 0 6px 20px 0 rgba(0, 0, 0, 0.19);

        .organize {
          margin: 15px 0 0 10px;
          display: flex;

          .organizeAttr {
            margin-left: 5px;
          }

          .organizeName {
            font-weight: 600;
            text-align: left;
            cursor: pointer;
          }

          .organizeTags {
            display: flex;
            margin-top: 6px;
            flex-wrap: wrap;
            gap: 5px;
            .tag {
              font-size: 11px;
              border: 1px solid #1890ff;
              color: #1890ff;
              border-radius: 14px;
              padding: 2px;
              margin-right: 5px;
            }
          }
        }

        .describe {
          font-size: 11px;
          overflow: hidden;
          white-space: nowrap;
          text-overflow: ellipsis;
          width: 90%;
          margin: 3px auto 5px;
          text-align: left;
        }

        img {
          height: 50px;
          width: 50px;
          min-height: 35px;
          min-width: 35px;
          border-radius: 10px;
        }
      }
    }

    .organizeDrumbeating {
      width: 91%;
      height: 90%;
      overflow: hidden; //超出视野隐藏
      background-color: #f8f8f8;
      text-align: left;

      .sign_message {
        width: 90%;
        height: calc(100% - 52px);
        margin: 0 auto;
        padding-bottom: 30px;
        overflow: scroll;
        // 隐藏滚动条
        scrollbar-width: none;

        &::-webkit-scrollbar {
          display: none;
          /* Chrome Safari */
        }

        .sign_details {
          margin-top: 10px;
        }
      }
    }

    .nav {
      height: 44px;
      width: 90%;
      margin: 0 auto;
      margin-top: 10px;
      background-color: #fff;
      display: flex;
      align-items: flex-end;
      justify-content: space-around;

      span {
        border-bottom: 3px solid transparent;
        padding-bottom: 5px;
        cursor: pointer;
      }

      .active {
        border-bottom: 3px solid #096dd9;
      }
    }

    .department {
      width: 91%;
      height: 90%;
      background-color: #f8f8f8;
      text-align: left;
    }
  }

  .depList {
    width: 90%;
    margin: 20px auto 0;

    .departmentCard {
      width: 100%;
      // height: 70px;
      margin-top: 10px;
      margin-bottom: 10px;
      background-color: #fff;
      border-radius: 8px;
      display: flex;
      align-items: center;
      cursor: pointer;

      .info {
        width: 90%;
        margin-left: 10px;
        padding-top: 10px;

        .title {
          color: #2c405a;
          font-weight: 600;
          margin-bottom: 5px;
        }

        .describe {
          color: #3f536e;
          font-size: 12px;
          letter-spacing: 2px;
        }
        .van-ellipsis {
          padding: 10px 5px 20px;
        }
      }
    }
  }

  .departmentDetail {
    height: 100%;
    overflow: hidden;
    .headNav {
      margin-top: 10px;
      margin-left: 10px;
      cursor: pointer;
      /* 防止mobile组件的after伪元素遮挡 */
      position: relative;
      z-index: 200;

      span {
        margin-left: 10px;
      }
    }
    .detail_message {
      height: 90%;
      margin: 0 auto;
      overflow: scroll;
      // 隐藏滚动条
      scrollbar-width: none;

      &::-webkit-scrollbar {
        display: none;
        /* Chrome Safari */
      }

      .sign_details {
        margin-top: 10px;
      }
    }
    /* 未显示reference，但是有用，勿删 */
    .sign_details {
      width: 90%;
      margin: 0 auto;
      margin-top: 20px;
    }
  }
}
</style>
