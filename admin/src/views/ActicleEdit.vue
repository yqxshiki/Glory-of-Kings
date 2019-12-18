<template>
  <div id="CategoryEdit">
    <h1>{{id?'编辑':'新建'}}文章</h1>
    <el-form label-width="120px" @submit.native.prevent="save">
      <el-form-item label="所属分类">
        <el-select v-model="model.categories" multiple>
          <el-option
            v-for="item in categories"
            :key="item._id"
            :label="item.name"
            :value="item._id"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="标题">
        <el-input v-model="model.title"></el-input>
      </el-form-item>
      <el-form-item label="详情">
        <vue-editor v-model="model.body" useCustomImageHandler @image-added="handleImageAdded"></vue-editor>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" native-type="submit">保存</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
// 富文本编辑器
import { VueEditor } from "vue2-editor";
export default {
  components: {
    VueEditor
  },
  props: {
    id: {}
  },
  data() {
    return {
      model: {},
      categories: []
    };
  },
  methods: {
    // 富文本上传文件
    async handleImageAdded(file, Editor, cursorLocation, resetUploader) {
      const formData = new FormData();
      formData.append("file", file);
      const res = await this.$http.post("upload", formData);
      Editor.insertEmbed(cursorLocation, "image", res.data.url);
      resetUploader();
    },
    // 提交
    async save() {
      let res;
      if (this.id) {
        res = await this.$http.put(`rest/acticles/${this.id}`, this.model);
      } else {
        res = await this.$http.post("rest/acticles", this.model);
      }
      // 跳转
      this.$router.push("/acticles/list");
      // 提示信息
      this.$message({
        type: "success",
        message: "保存成功"
      });
    },
    // 获取详情
    async fetch() {
      const res = await this.$http.get(`rest/acticles/${this.id}`);
      this.model = res.data;
    },
    async fetchCategories() {
      const res = await this.$http.get("rest/categories");
      this.categories = res.data;
    }
  },
  created() {
    this.fetchCategories();
    this.id && this.fetch();
  }
};
</script>
<style>
</style>