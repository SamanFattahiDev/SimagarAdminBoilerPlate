<template>
  <b-overlay
      :show="overlay"
      rounded="sm"
  >

    <div v-if="comments !== null">

      <!-- Table Container Card -->
      <b-card
          no-body
          class="mb-0"
      >

        <b-table
            ref="refUserListTable"
            class="position-relative"
            :items="comments"
            responsive
            :fields="myTableColumns"
            primary-key="id"
            show-empty
            bordered
            striped
            empty-text="موردی موجود نیست!"
        >

          <template #cell(userId)="data">
            <span class="d-block">{{ data.item.userInfo.name }} {{ data.item.userInfo.familyName }}</span>
            <small class="text-muted">@{{ data.item.userInfo.userId }}</small>
          </template>

          <!--          &lt;!&ndash; Column: createDate &ndash;&gt;-->
          <!--          <template #cell(createDate)="data">-->
          <!--             <span>-->
          <!--              {{data.item.createDate.slice(11,16)}}-->
          <!--              - -->
          <!--              {{createJalaliDate(data.item.createDate.slice(0,10))}}-->
          <!--            </span>-->
          <!--          </template>-->

          <!-- Column: edit -->
          <template #cell(createDate)="data">
            <span>
              {{ data.item.createDate.slice(11, 16) }}
              -
              {{ createJalaliDate(data.item.createDate.slice(0, 10)) }}
            </span>
          </template>

<!--          &lt;!&ndash; Column: edit &ndash;&gt;-->
<!--          <template #cell(edit)="data">-->
<!--            <b-link :to="{ name: 'pages-blog-comments-edit', params: { id: data.item.blogCommentId } }">-->
<!--              <feather-icon size="20" icon="EditIcon"/>-->
<!--            </b-link>-->
<!--          </template>-->

          <!-- Column: delete -->
          <template #cell(delete)="data">
            <b-link class="text-danger" v-b-modal.modal-delete @click="showModal(data.item.postCommentId)">
              <feather-icon size="20" icon="TrashIcon"/>
            </b-link>
          </template>

        </b-table>
        <div class="mx-2 mb-2">
          <b-row>

            <b-col
                cols="12"
                sm="6"
                class="d-flex align-items-center justify-content-center justify-content-sm-start"
            >
              <!--            <span class="text-muted">Showing {{ dataMeta.from }} to {{ dataMeta.to }} of {{ dataMeta.of }} entries</span>-->
            </b-col>
            <!-- Pagination -->
<!--            <b-col-->
<!--                cols="12"-->
<!--                sm="6"-->
<!--                class="d-flex align-items-center justify-content-center justify-content-sm-end"-->
<!--            >-->

<!--              <b-pagination-->
<!--                  v-model="currentPage"-->
<!--                  :total-rows="totalCounts"-->
<!--                  :per-page="perPage"-->
<!--                  first-number-->
<!--                  last-number-->
<!--                  class="mb-0 mt-1 mt-sm-0"-->
<!--                  prev-class="prev-item"-->
<!--                  next-class="next-item"-->
<!--              >-->
<!--                <template #prev-text>-->
<!--                  <feather-icon style="transform: rotate(180deg)"-->
<!--                                icon="ChevronLeftIcon"-->
<!--                                size="18"-->
<!--                  />-->
<!--                </template>-->
<!--                <template #next-text>-->
<!--                  <feather-icon-->
<!--                      icon="ChevronRightIcon"-->
<!--                      size="18"-->
<!--                  />-->
<!--                </template>-->
<!--              </b-pagination>-->

<!--            </b-col>-->

          </b-row>
        </div>
      </b-card>
    </div>
    <b-modal
        id="modal-delete"
        centered
        ok-title="حذف"
        cancelTitle="انصراف"
        @ok="deleteComment(deleteItem)"
    >
      <span>حذف شود؟</span>
    </b-modal>
  </b-overlay>
</template>

<script>
import {
  BCard, BRow, BCol, BFormInput, BButton, BTable, BMedia, BAvatar, BLink,
  BBadge, BDropdown, BDropdownItem, BPagination, BOverlay, BModal,
} from 'bootstrap-vue'
import vSelect from 'vue-select'
import Helper from "@/libs/Helper";
import ToastificationContent from "@core/components/toastification/ToastificationContent";
import {BlogCommentGetAllRequest} from "@/libs/Api/Blog";
import {BlogCommentDeleteRequest} from "@/libs/Api/Blog";
import {PostCommentGetByPostIdRequest} from "@/libs/Api/Post";
import {PostCommentDeleteRequest} from "@/libs/Api/Post";

export default {
  name: "PostComments",
  title: "لیست نظرات پست - پنل ادمین تام بورد",
  data() {
    return {
      postId: this.$route.params.id,
      overlay: false,
      comments: null,
      currentPage: 1,
      totalCounts: null,
      deleteItem: null,
      perPage: 10,
      perPageOptions: [10, 20, 30, 40, 50],
      myTableColumns: [
        {key: 'userId', label: 'شناسه و نام کاربر'},
        {key: 'content', label: 'متن'},
        {key: 'createDate', label: 'تاریخ ثبت'},
        // { key: 'edit',label:'ویرایش'},
        {key: 'delete', label: 'حذف'},
      ],
    }
  },
  async created() {
    await this.getComments();
  },
  methods: {
    async getComments() {
      let _this = this;
      _this.overlay = true;

      let postCommentGetByPostIdRequest = new PostCommentGetByPostIdRequest(_this);
      postCommentGetByPostIdRequest.setId(_this.postId);
      await postCommentGetByPostIdRequest.fetch(function (content) {
        _this.overlay = false;
        _this.comments = content;
        // _this.comments = content.blogComments
        // _this.totalCounts = content.counts;
      }, function (error) {
        _this.overlay = false;
        console.log(error);
      })
    },
    async deleteComment(param) {
      let _this = this;

      let postCommentDeleteRequest = new PostCommentDeleteRequest(_this);
      postCommentDeleteRequest.setId(param);
      await postCommentDeleteRequest.fetch(function (content) {
        _this.$toast({
          component: ToastificationContent,
          position: 'bottom-center',
          props: {
            title: `عملیات موفق`,
            icon: 'CheckIcon',
            variant: 'success',
            text: `حذف شد.`,
          },
        })
        _this.getComments()
      }, function (error) {
        console.log(error)
      })
    },
    createJalaliDate(param) {
      return new Date(param).toLocaleDateString("fa-IR",);
    },
    makePrettyPrice(param) {
      return Helper.prettyPrice(param, 0)
    },
    showModal(param) {
      let _this = this;
      _this.deleteItem = param
    },
  },
  watch: {
    perPage: function (nv, ov) {
      this.getComments(nv, this.currentPage);
    },
    currentPage: function (nv, ov) {
      this.getComments(this.perPage, nv);
    },
  },
  components: {

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
    BModal,

    vSelect,
  },
}
</script>

<style lang="scss" scoped>
.per-page-selector {
  width: 90px;
}
</style>

<style lang="scss">
@import '@core/scss/vue/libs/vue-select.scss';
</style>
