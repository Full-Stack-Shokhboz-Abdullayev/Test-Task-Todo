<template>
  <div class="center">
    <h2 class="text-center">Authorization Form</h2>
    <a-form layout="horizontal" :form="form" @submit.prevent="handleSubmit">
      <a-form-item label="Username">
        <a-input
          v-decorator="[
            'username',
            {
              rules: [
                {
                  required: true,
                  message: 'Please input your Username correctly!',
                },
              ],
            },
          ]"
          placeholder="Username"
        >
        </a-input>
      </a-form-item>
      <a-form-item label="Password">
        <a-input
          v-decorator="[
            'password',
            {
              rules: [
                {
                  required: true,
                  message: 'Please input your Password correctly!',
                },
              ],
            },
          ]"
          type="password"
          placeholder="Password"
        >
        </a-input>
      </a-form-item>
      <a-form-item>
        <a-button
          block
          type="primary"
          html-type="submit"
          :loading="authorizing"
        >
          Log in
        </a-button>
      </a-form-item>
    </a-form>
  </div>
</template>

<script>
import { notification } from "ant-design-vue";

export default {
  data() {
    return {
      authorizing: false,
      form: this.$form.createForm(this, { name: "horizontal_login" }),
    };
  },

  methods: {
    handleSubmit() {
      this.authorizing = true;
      this.form.validateFields(async (err, values) => {
        if (err) {
          this.authorizing = false;
          return;
        }
        try {
          await this.$store.dispatch("AUTHORIZE", values);
          notification.success({
            message: "Login successful!",
            description: "You now can edit tasks.",
          });
          this.form.resetFields();
          this.$router.push({ name: "Home" });
        } catch {
          this.form.resetFields();

          notification.error({
            message: "Login failed",
            description: "Please, check your username and password.",
          });
          this.form.validateFields();
        }
        this.authorizing = false;
      });
    },
  },
};
</script>
