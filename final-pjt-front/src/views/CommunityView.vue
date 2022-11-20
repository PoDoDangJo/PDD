<template>
  <div>
    <TheHeader />
    <h1></h1>
  </div>
</template>

<script>
import TheHeader from "@/components/TheHeader/TheHeader";

export default {
  name: "CommunityView",
  components: {
    TheHeader,
  },
  methods: {
    inToCommunity() {
      // token 없이 CommunityView에 들어간다면 HomeView로 이동
      if (this.$store.state.token) {
        this.$store.dispatch("inToCommunity");
      } else {
        this.$router.push({ name: "HomeView" });
      }
    },
  },
  created() {
    this.inToCommunity();
  },
};
</script>

<style></style>
