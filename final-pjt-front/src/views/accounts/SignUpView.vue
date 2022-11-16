<template>
  <div>
    <h1>Sing Up</h1>
    <form @submit.prevent="signUp">
      <input type="text" placeholder="username" v-model="username" />
    </form>
  </div>
</template>

<script>
export default {
  name: "SignUpView",
};
</script>
