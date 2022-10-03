<template>
  <b-overlay :show="showLoading">
    <b-row v-if="post !== null">
      <b-col cols="12">
        <b-card>

          <quill-editor
              v-model="post.content"
          />

          <!-- Action Buttons -->
          <b-button
              variant="primary"
              class="mt-1 mb-sm-0 mr-0 mr-sm-1 col-12 col-md-2"
              :block="$store.getters['app/currentBreakPoint'] === 'xs'"
              @click="updatePost"
          >
            ویرایش
          </b-button>

        </b-card>
      </b-col>
    </b-row>
  </b-overlay>
</template>

<script>
import {
  BCard, BRow, BCol, BFormInput, BButton, BTable, BMedia, BAvatar, BLink,
  BBadge, BDropdown, BDropdownItem, BPagination,BOverlay,
} from 'bootstrap-vue'
// eslint-disable-next-line
import 'quill/dist/quill.core.css'
// eslint-disable-next-line
import 'quill/dist/quill.snow.css'
// eslint-disable-next-line
import 'quill/dist/quill.bubble.css'

import { quillEditor } from 'vue-quill-editor'

import ToastificationContent from "@core/components/toastification/ToastificationContent";
import {PostGetRequest} from "@/libs/Api/Post";
import {PostUpdateRequest} from "@/libs/Api/Post";
export default {
  name: "PostEdit",
  title: 'ساخت پست - پنل ادمین تام بورد',
  data(){
    return{
      post:null,
      postId:this.$route.params.id,
      showLoading:false,
      editorOption: {
        // Some Quill options...
        theme: "snow",
        modules: {
          imageCompress: {
            quality: 0.7, // default
            maxWidth: 500,
            maxHeight: 500,
            imageType: "image/jpeg", // default
            debug: true, // default
            suppressErrorLogging: false, // default
          },
          imageResize: {
            // See optional "config" below
          },
          toolbar: [
            ["bold", "italic", "underline", "strike"],
            ["blockquote", "code-block"],
            [{ header: 1 }, { header: 2 }],
            [{ list: "ordered" }, { list: "bullet" }],
            [{ script: "sub" }, { script: "super" }],
            [{ indent: "-1" }, { indent: "+1" }],
            [{ direction: "rtl" }],
            [{ size: ["small", false, "large", "huge"] }],
            [{ header: [1, 2, 3, 4, 5, 6, false] }],
            [{ font: [] }],
            [{ color: [] }, { background: [] }],
            [{ align: [] }],
            ["clean"],
            ["link", "image", "video"],
            ["emoji"],
          ],
        },
      },
    }
  },
  async created(){
    await this.getPost();
  },
  methods:{
    async getPost(){
      let _this = this;

      _this.showLoading=true;
      let postGetRequest = new PostGetRequest(_this);
      postGetRequest.setId(_this.postId);
      await postGetRequest.fetch(function (content){
        _this.showLoading=false;
        _this.post = content;
      },function (error){
        _this.showLoading=false;
        console.log(error)
      })
    },
    async updatePost(){
      let _this = this;
      // let data={
      //   postId:_this.postId,
      //   content:_this.post.content
      // }

      _this.showLoading=true;
      let postUpdateRequest = new PostUpdateRequest(_this);
      postUpdateRequest.setParams(_this.post);
      await postUpdateRequest.fetch(function (content){
        _this.showLoading=false;
        _this.$toast({
          component: ToastificationContent,
          position: 'bottom-center',
          props: {
            title: `عملیات موفق`,
            icon: 'CheckIcon',
            variant: 'success',
            text: `عملیات انجام شد.`,
          },
        })
      },function (error){
        _this.showLoading=false;
        console.log(error)
      })
    },
    test(){
      console.log(this.createData.content)
    },
  },
  components:{
    BCard,
    BRow,
    BCol,
    BFormInput,
    BButton,
    BTable,
    BMedia,
    BAvatar,
    BLink,
    BBadge,
    BDropdown,
    BDropdownItem,
    BPagination,
    BOverlay,
    quillEditor,
  },
}
</script>

<style scoped>

</style>
