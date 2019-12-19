<template>
  <div id="CategoryEdit">
    <h1>{{id?'编辑':'新建'}}英雄</h1>
    <el-form label-width="120px" @submit.native.prevent="save">
      <!-- 基本信息 -->
      <el-tabs type="border-card">
        <el-tab-pane label="基本信息">
          <el-form-item label="名称">
            <el-input v-model="model.name"></el-input>
          </el-form-item>
          <el-form-item label="图像">
            <el-upload
              class="avatar-uploader"
              :action="uploadUrl"
              :show-file-list="false"
              :on-success="afterupload"
              :headers="getAuthHeaders()"
            >
              <img v-if="model.avatar" :src="model.avatar" class="avatar" />
              <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload>
          </el-form-item>
          <el-form-item label="称号">
            <el-input v-model="model.title"></el-input>
          </el-form-item>
          <el-form-item label="类型">
            <el-select v-model="model.categories" multiple>
              <el-option
                v-for="item in categories"
                :key="item._id"
                :label="item.name"
                :value="item._id"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="难度">
            <el-rate :max="9" show-score style="margin-top:0.6rem" v-model="model.scores.diffcult"></el-rate>
          </el-form-item>
          <el-form-item label="技能">
            <el-rate :max="9" show-score style="margin-top:0.6rem" v-model="model.scores.skills"></el-rate>
          </el-form-item>
          <el-form-item label="攻击">
            <el-rate :max="9" show-score style="margin-top:0.6rem" v-model="model.scores.attack"></el-rate>
          </el-form-item>
          <el-form-item label="生存">
            <el-rate :max="9" show-score style="margin-top:0.6rem" v-model="model.scores.aurvice"></el-rate>
          </el-form-item>
          <el-form-item label="顺风出装">
            <el-select v-model="model.items1" multiple>
              <el-option v-for="item in items" :key="item._id" :label="item.name" :value="item._id"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="逆风出装">
            <el-select v-model="model.items2" multiple>
              <el-option v-for="item in items" :key="item._id" :label="item.name" :value="item._id"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="使用技巧">
            <el-input type="textarea" v-model="model.usageTips"></el-input>
          </el-form-item>
          <el-form-item label="对战技巧">
            <el-input type="textarea" v-model="model.battleTips"></el-input>
          </el-form-item>
          <el-form-item label="团战思路">
            <el-input type="textarea" v-model="model.teamTips"></el-input>
          </el-form-item>
        </el-tab-pane>
        <!-- 技能 -->
        <el-tab-pane label="技能" name="skills">
          <el-button size="smali" @click="model.skills.push({})">
            <i class="el-icon-plus"></i>
            添加技能
          </el-button>
          <el-row type="flex" style="flex-wrap:wrap">
            <el-col :md="12" v-for="(item,i) in model.skills" :key="i">
              <el-form-item label="名称">
                <el-input v-model="item.name"></el-input>
              </el-form-item>
              <el-form-item label="图标">
                <el-upload
                  class="avatar-uploader"
                  :action="uploadUrl"
                  :show-file-list="false"
                  :on-success="res=>$set(item,'icon',res.url)"
                  :headers="getAuthHeaders()"
                >
                  <img v-if="item.icon" :src="item.icon" class="avatar" />
                  <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                </el-upload>
              </el-form-item>
              <el-form-item label="描述">
                <el-input type="textarea" v-model="item.description"></el-input>
              </el-form-item>
              <el-form-item label="小提示">
                <el-input type="textarea" v-model="item.tips"></el-input>
              </el-form-item>
              <el-form-item>
                <el-button size="smali" type="danger" @click="model.skills.splice(i,1)">删除</el-button>
              </el-form-item>
            </el-col>
          </el-row>
        </el-tab-pane>
      </el-tabs>
      <el-form-item style="margin-top:1rem;">
        <el-button type="primary" native-type="submit">保存</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  props: {
    id: {}
  },
  data() {
    return {
      model: {
        name: "",
        avatar: "",
        scores: {
          diffcult: 0,
          skills: 0,
          attack: 0,
          aurvice: 0
        },
        skills: []
      },
      parents: [],
      categories: [],
      items: []
    };
  },
  methods: {
    afterupload(res) {
      // 显示赋值
      this.$set(this.model, "avatar", res.url);
    },
    // 提交
    async save() {
      let res;
      if (this.id) {
        res = await this.$http.put(`rest/heroes/${this.id}`, this.model);
      } else {
        res = await this.$http.post("rest/heroes", this.model);
      }
      // 跳转
      this.$router.push("/heroes/list");
      // 提示信息
      this.$message({
        type: "success",
        message: "保存成功"
      });
    },
    // 获取详情
    async fetch() {
      const res = await this.$http.get(`rest/heroes/${this.id}`);
      this.model = Object.assign({}, this.model, res.data);
    },
    // 获取英雄分类
    async fetchcategories() {
      const res = await this.$http.get(`rest/categories`);
      this.categories = res.data;
    },
    // 获取英雄分类
    async fetchitems() {
      const res = await this.$http.get(`rest/items`);
      this.items = res.data;
    }
  },
  created() {
    this.fetchcategories();
    this.fetchitems();
    this.id && this.fetch();
  }
};
</script>
<style>
</style>