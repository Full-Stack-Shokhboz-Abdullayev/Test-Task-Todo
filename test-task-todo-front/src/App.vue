<template>
  <div id="app">
    <a-menu mode="horizontal" class="mb-3">
      <a-menu-item key="Home">
        <router-link :to="{ name: 'Home' }"> Home </router-link>
      </a-menu-item>

      <a-menu-item v-if="!$store.state.loggedIn" key="Auth">
        <router-link :to="{ name: 'Auth' }"> Authorize </router-link>
      </a-menu-item>
      <a-button
        @click="
          $store.dispatch('LOGOUT').then(() => $router.push({ name: 'Auth' }))
        "
        v-if="$store.state.loggedIn"
        class="float-right"
      >
        Logout
      </a-button>
    </a-menu>
    <router-view />
  </div>
</template>

<script>
export default {
  async created() {
    const dataJson = localStorage.getItem("userAuthData");
    if (dataJson) {
      await this.$store.dispatch("PERSIST_USER");
    }
  },
};
</script>
