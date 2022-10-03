<template>
  <b-overlay
      :show="posts === null"
      rounded="sm"
  >

    <b-row>
      <!-- post -->
      <b-col
          cols="12"
          class="mx-auto"
      >
        <profile-post  :posts="posts" />
      </b-col>
      <!-- post -->
    </b-row>

  </b-overlay>
</template>

<script>
import {
  BCard, BRow, BCol, BFormInput, BButton, BTable, BMedia, BAvatar, BLink,
  BBadge, BDropdown, BDropdownItem, BPagination,BOverlay,
} from 'bootstrap-vue'
import ProfilePost from "@/views/pages/profile/ProfilePost";
import {PostGetAllRequest} from "@/libs/Api/Post";
import {PostDeleteRequest} from "@/libs/Api/Post";
export default {
  title: 'لیست پست ها - پنل ادمین تام بورد',
  name: "PostList",
  data(){
    return{
      posts:null,
      totalCount:null,
      currentPage:1,
      perPage:10,
      defaultGetData:{
        pageNumber:0,
        count:0,
      },
    }
  },
  async created(){
    await this.getPosts(this.defaultGetData.pageNumber,this.defaultGetData.count);
  },
  methods:{
    async getPosts(pageNumber,count){
      let _this = this;
      let data={
        pageNumber:pageNumber,
        count:count
      }

      let postGetAllRequest = new PostGetAllRequest(_this)
      postGetAllRequest.setParams(data);
      await postGetAllRequest.fetch(function (content){
        _this.posts = content.posts;
        _this.totalCount = content.postCount;
      },function (error){
        console.log(error)
      })
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
    ProfilePost,

  },
}
</script>

<style scoped>

</style>
