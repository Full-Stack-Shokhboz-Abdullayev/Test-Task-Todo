<template>
  <div class="center">
    <a-card title="Add New Task">
      <a-form
        :wrapper-row="{ span: 12 }"
        :form="form"
        @submit.prevent="handleSubmit"
      >
        <a-form-item label="Name">
          <a-input
            v-decorator="[
              'name',
              {
                rules: [{ required: true, message: 'Please input your note!' }],
              },
            ]"
          />
        </a-form-item>

        <a-form-item label="Email">
          <a-input
            v-decorator="[
              'email',
              {
                rules: [
                  {
                    required: true,
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
                rules: [
                  {
                    required: true,
                    message: 'Please input your text!',
                  },
                ],
              },
            ]"
          />
        </a-form-item>
        <a-form-item>
          <a-button block type="primary" html-type="submit" :loading="saving">
            Submit
          </a-button>
        </a-form-item>
      </a-form>
    </a-card>
  </div>
</template>
<script>
import { notification } from "ant-design-vue";

export default {
  name: "AddTask",
  data() {
    return {
      saving: false,
      form: this.$form.createForm(this, { name: "coordinated" }),
    };
  },
  methods: {
    handleSubmit() {
      this.form.validateFields(async (errors, values) => {
        this.saving = true;
        if (errors) {
          this.saving = false;
          return;
        }
        await this.$store.dispatch("ADD_TASK", values);

        notification.success({
          placement: "bottomLeft",
          message: "Success",
          description: `The task "${values.name}" was added successfully`,
        });
        this.form.resetFields();
        this.$emit("task-created");
        this.saving = false;
      });
    },
  },
};
</script>
