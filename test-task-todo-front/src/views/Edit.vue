<template>
  <div class="center">
    <a-card :title="'Update a Task - ' + $route.params._id">
      <a-form :form="form" @submit.prevent="handleSubmit">
        <a-form-item label="Name">
          <a-input
            v-decorator="[
              'name',

              {
                initialValue: taskData.name,
                rules: [{ message: 'Please input your note!' }],
              },
            ]"
          />
        </a-form-item>

        <a-form-item label="Email">
          <a-input
            v-decorator="[
              'email',
              {
                initialValue: taskData.email,
                rules: [
                  {
                    type: 'email',
                    message: 'Please input your email correctly!',
                  },
                ],
              },
            ]"
          />
        </a-form-item>
        <a-form-item label="Text">
          <a-input
            type="textarea"
            v-decorator="[
              'text',
              {
                initialValue: taskData.text,
                rules: [
                  {
                    message: 'Please input your text!',
                  },
                ],
              },
            ]"
          />
        </a-form-item>
        <a-form-item label="Status">
          <a-select
            v-decorator="[
              'status',
              {
                initialValue: taskData.status,
                rules: [
                  {
                    message: 'Please select the status!',
                  },
                ],
              },
            ]"
          >
            <a-select-option
              v-for="(status, index) in statuses"
              :key="status + index + 'status'"
              :value="status.key"
            >
              {{ status.label }}
            </a-select-option>
          </a-select>
        </a-form-item>
        <a-form-item>
          <a-button type="primary" html-type="submit" :loading="saving">
            Update
          </a-button>
        </a-form-item>
      </a-form>
    </a-card>
  </div>
</template>
<script>
import { notification } from "ant-design-vue";
import axiosService from "../services/axios.service";

export default {
  name: "Edit",
  beforeRouteEnter(to, from, next) {
    if (!to.params._id) {
      return next({
        name: "Home",
      });
    }

    next((vm) => {
      vm.fetchTask(to.params._id);
    });
  },
  data() {
    return {
      saving: false,
      taskData: {},
      form: this.$form.createForm(this, { name: "coordinated" }),

      statuses: [
        { key: "Open", label: "Open" },
        { key: "Done", label: "Done" },
      ],
    };
  },
  methods: {
    fetchTask(_id) {
      axiosService
        .get(`/tasks/${_id}`)
        .then(({ data }) => {
          this.taskData = data;
        })
        .catch((err) => {
          notification.error({
            message: "Cannot set task values to edit.",
            description: err.message,
          });
        });
    },
    handleSubmit() {
      this.form.validateFields(async (errors, values) => {
        this.saving = true;
        if (errors) {
          this.saving = false;
          return;
        }
        try {
          await this.$store.dispatch("UPDATE_TASK", {
            values: {
              ...values,
              editedByAdmin:
                this.taskData.editedByAdmin ||
                values.text !== this.taskData.text,
            },
            _id: this.$route.params._id,
          });
          this.saving = false;

          this.$router.push({
            name: "Home",
          });
          notification.success({
            placement: "bottomLeft",
            message: "Success",
            description: `The task with the id - "${this.$route.params._id}" was updated successfully`,
          });
        } catch ({ response: { data } }) {
          this.saving = false;
          if (data.statusCode === 401) {
            this.$store.dispatch("LOGOUT");
          }
          notification.error({
            placement: "bottomLeft",
            message: "Error",
            description: data.message,
          });
          this.$router.push({
            name: "Auth",
          });
        }
      });
    },
  },
};
</script>
