<template>
  <div class="center mb-3">
    <a-list
      bordered
      :loading="loading"
      item-layout="horizontal"
      :data-source="tasks"
    >
      <a-list-item slot="renderItem" slot-scope="item">
        <a-list-item-meta :description="item.text">
          <a slot="title">{{ item.name }}</a>
        </a-list-item-meta>
        <router-link
          v-if="$store.state.loggedIn"
          slot="actions"
          :to="{ name: 'Edit', params: { _id: item._id } }"
          >Edit</router-link
        >
        <p>
          <a :href="'mailto:' + item.email">{{ item.email }}</a> |
          <strong>
            {{
              item.status +
              (item.status === "Open" ? "⚠️" : "✅") +
              (item.editedByAdmin ? " (Edited by Admin)" : "")
            }}
          </strong>
        </p>
      </a-list-item>
      <div slot="header">Todo Items</div>
    </a-list>
  </div>
</template>

<script>
import { mapState } from "vuex";

export default {
  props: {
    loading: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    ...mapState(["tasks"]),
  },
};
</script>
