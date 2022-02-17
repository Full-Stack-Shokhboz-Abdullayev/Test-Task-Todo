<template>
  <div class="flex-right">
    <a-pagination
      :total="total"
      :current="current"
      @change="pageChange"
      :page-size="3"
    />
  </div>
</template>

<script>
import { mapState } from "vuex";

export default {
  name: "Pagination",
  props: {
    current: {
      type: Number,

      default: 1,
    },
  },
  methods: {
    pageChange(val) {
      this.$emit("page-change", val);
    },
  },
  computed: {
    ...mapState(["total"]),
  },
};
</script>
