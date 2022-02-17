<template>
  <div>
    <sorts @sort-change="sortChange"></sorts>
    <pagination
      class="mb-3 mr-2"
      @page-change="pageChange"
      :current="current"
    ></pagination>
    <div class="flex-center">
      <add-task @task-created="getTasks"></add-task>
      <list-view :loading="loading"></list-view>
    </div>
  </div>
</template>

<script>
import { mapActions } from "vuex";
import ListView from "../components/ListView.vue";
import Pagination from "../components/Pagination.vue";
import Sorts from "../components/Sorts.vue";
import AddTask from "../components/AddTask.vue";

export default {
  name: "Home",
  components: {
    ListView,
    Pagination,
    Sorts,
    AddTask,
  },
  data: () => ({
    loading: true,
    current: 1,
    sort: [],
  }),
  methods: {
    changeRoute() {
      const routeOptions = {
        name: "Home",
        query: {
          page: this.current,
        },
      };

      for (const sort of this.sort) {
        if (sort.value.key !== "select") {
          routeOptions.query[sort.label.toLowerCase()] = sort.value.key;
        }
      }

      this.$router.push(routeOptions);
    },
    pageChange(current) {
      this.current = parseInt(current);
      this.changeRoute();
    },
    sortChange(value) {
      this.sort = value;
      this.changeRoute();
    },
    ...mapActions(["GET_TASKS"]),
    async getTasks() {
      this.loading = true;
      await this.GET_TASKS({ ...this.$route.query });
      this.loading = false;
    },
  },
  watch: {
    $route(to) {
      this.current = parseInt(to.query.page) || 1;
      this.getTasks();
    },
  },

  async mounted() {
    this.current = parseInt(this.$route.query.page) || 1;
    await this.getTasks();
  },
};
</script>
