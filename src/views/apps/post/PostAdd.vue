<template>
  <b-overlay :show="showLoading">
    <b-row>
      <b-col cols="12">
        <b-card>

          <quill-editor
              v-model="createData.content"
          />

          <!-- Action Buttons -->
          <b-button
              variant="primary"
              class="mt-1 mb-sm-0 mr-0 mr-sm-1 col-12 col-md-2"
              :block="$store.getters['app/currentBreakPoint'] === 'xs'"
              @click="createPost"
          >
            ثبت
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

import {PostCreateRequest} from "@/libs/Api/Post";
import ToastificationContent from "@core/components/toastification/ToastificationContent";
export default {
  name: "PostAdd",
  title: 'ساخت پست - پنل ادمین تام بورد',
  data(){
    return{
      createData:{
        isDeleted: false,
        postId: 0,
        userId: 0,
        content: null,
        // createDate: "2022-06-23T12:10:25.905Z",
        // status: 0,
        // isLikedByMe: true,
        // isReportedByMe: true,
      },
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
  methods:{
    async createPost(){
      let _this = this;

      _this.showLoading=true;
      let postCreateRequest = new PostCreateRequest(_this);
      postCreateRequest.setParams(_this.createData);
      await postCreateRequest.fetch(function (content){
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
        _this.$router.push({name:'apps-post-list'})
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
