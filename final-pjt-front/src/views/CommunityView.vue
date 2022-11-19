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
      this.$store.dispatch("inToCommunity");
    },
  },
  created() {
    this.inToCommunity();
  },
};
</script>

<style></style>
