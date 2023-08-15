<template>
  <div class="right">
    <MobileBox class="rightPreview" :device-height="655" :device-width="342">
      <div class="baseInfo" v-if="activeTab === 0">
        <div class="card">
          <div class="organize">
            <div class="organizeImg">
              <img :src="organizeInfo.avatarUrl" alt="" />
            </div>
            <div class="organizeAttr">
              <div class="organizeName">
                {{ organizeInfo.name }}
              </div>
              <div class="organizeTags">
                <div class="tag">{{ organizeInfo.tagList[0].tag }}</div>
                <div class="tag">{{ organizeInfo.tagList[1].tag }}</div>
                <!-- <div class="tag" v-if="tagC">
                  {{ organizeInfo.tag.tagC }}
                </div>
                <div class="tag" v-if="tagD">
                  {{ organizeInfo.tag.tagD }}
                </div> -->
              </div>
            </div>
          </div>
          <div class="describe">
            {{ organizeInfo.briefIntroduction }}
          </div>
        </div>
      </div>
      <div class="organizeDrumbeating" v-if="activeTab === 1">
        <div class="nav">
          <span class="active">社团介绍</span><span>社团部门</span>
        </div>
        <div class="sign_message">
          <sign-info-card
            title="社团介绍"
            :content="organizeInfo.introduction"
            v-if="organizeInfo.introduction !== ''"
          ></sign-info-card>
          <sign-info-card
            title="社团特色"
            :content="organizeInfo.feature"
            v-if="organizeInfo.feature !== ''"
          ></sign-info-card>
          <sign-info-card
            title="社团日常"
            :content="organizeInfo.daily"
            v-if="organizeInfo.daily !== ''"
          ></sign-info-card>
          <sign-info-card
            title="社团宣言"
            :content="organizeInfo.slogan"
            v-if="organizeInfo.slogan !== ''"
          ></sign-info-card>
          <sign-info-card
            title="联系方式"
            :content="organizeInfo.contactInfo"
            v-if="organizeInfo.contactInfo !== ''"
          ></sign-info-card>
          <sign-info-card
            title="更多"
            :content="organizeInfo.more"
            v-if="organizeInfo.more !== ''"
          ></sign-info-card>
          <div style="height: 30px"></div>
        </div>
      </div>
      <div class="department" v-if="activeTab === 2">
        <div class="list" v-if="isList">
          <div class="nav">
            <span>社团介绍</span><span class="active">社团部门</span>
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
          <sign-info-card
            title="部门介绍"
            :content="activeDep.introduction || ''"
          ></sign-info-card>
          <sign-info-card
            title="纳新标准"
            :content="activeDep.standard || ''"
          ></sign-info-card>
        </div>
      </div>
    </MobileBox>
  </div>
</template>
<script setup lang="ts">
import SignInfoCard from '../../components/signInfoCard/singInfoCard.vue';
import MobileBox from '@/pages/Home/components/mobile/index.vue';
import { Data } from '@/api/callout/types/resType';
let activeTab = 0;
let isList = true;
let activeDep: any = {};
const toDepDetail = (index: number) => {
  isList = false;
  activeDep = organizeInfo.departmentList[index];
};
const organizeInfo: Data = {
  avatarUrl:
    'https://p5.itc.cn/q_70/images03/20220512/ecc151fbd129466aaa41ec90b4cef96c.gif',
  briefIntroduction: '社团组织简介',
  contactInfo: '+123456789',
  daily: '社团组织日常',
  feature: '社团组织特色',
  introduction: '社团组织介绍',
  more: '更多信息',
  name: '社团组织名称',
  slogan: '社团组织宣言',
  departmentList: [
    {
      briefIntroduction: '部门1简介',
      id: 1,
      introduction: '部门1介绍',
      name: '部门1',
      standard: '部门1标准'
    },
    {
      briefIntroduction: '部门2简介',
      id: 2,
      introduction: '部门2介绍',
      name: '部门2',
      standard: '部门2标准'
    }
  ],
  tagList: [
    {
      tag: '标签1',
      type: 1
    },
    {
      tag: '标签2',
      type: 2
    }
  ]
};
</script>
<style lang="scss" scoped>
.right {
  // height: 94vh;
  // height: 100%;
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
        height: 90px;
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
          }

          .organizeTags {
            display: flex;
            margin-top: 6px;

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
          margin: 3px auto 0;
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
      height: 84%;
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
      }

      .active {
        border-bottom: 3px solid #096dd9;
      }
    }

    .department {
      width: 91%;
      height: 84%;
      background-color: #f8f8f8;
      text-align: left;
    }
  }

  .depList {
    width: 90%;
    margin: 20px auto 0;

    .departmentCard {
      width: 100%;
      height: 70px;
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
      }
    }
  }

  .departmentDetail {
    .headNav {
      margin-top: 10px;
      margin-left: 10px;
      cursor: pointer;

      span {
        margin-left: 10px;
      }
    }

    .sign_details {
      width: 90%;
      margin: 0 auto;
      margin-top: 20px;
    }
  }
}
</style>
