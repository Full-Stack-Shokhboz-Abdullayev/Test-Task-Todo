<template>
  <div class="flex-right mb-3">
    <div v-for="(sort, idx) in sorts" :key="'sort' + idx" class="mr-2">
      Sort by {{ sort.label }}
      <a-select
        :value="sort.value"
        label-in-value
        class="w-10"
        @change="handleChange($event, idx)"
      >
        <a-select-option
          v-for="(item, index) in sort.options"
          :value="item.value"
          :key="'sort.options' + index + idx"
        >
          {{ item.label }}
        </a-select-option>
      </a-select>
    </div>
  </div>
</template>
<script>
const ascDescOptions = [
  { value: "select", label: "Not Selected" },
  { value: "asc", label: "Ascending Order" },
  { value: "desc", label: "Descending Order" },
];

export default {
  props: {
    value: {
      type: Object,
      default: () => ({
        key: "asc",
      }),
    },
  },
  data: () => ({
    sorts: [
      { label: "Name", value: { key: "select" }, options: ascDescOptions },
      { label: "Email", value: { key: "select" }, options: ascDescOptions },
      {
        label: "Status",
        value: { key: "select" },

        options: [
          { value: "select", label: "Not Selected" },

          {
            value: "desc",
            label: "Open",
          },
          {
            value: "asc",
            label: "Done",
          },
        ],
      },
    ],
  }),
  methods: {
    handleChange(value, index) {
      this.sorts[index].value = value;
      this.$emit("sort-change", this.sorts);
    },
  },
};
</script>
