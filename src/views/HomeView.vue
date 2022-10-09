<template>
  <div class="home"></div>
  <textarea
    class="input-header"
    placeholder="Untitled"
    v-model="docName"
  ></textarea>
  <textarea class="input-block" placeholder="Type anywhere..."></textarea>
</template>

<style lang="scss">
$textColor: #e1e1e1;
$primaryColor: #1f1f1f;
$highlightColor: #323232;

.input-header {
  font-family: "Poppins";
  font-weight: 500;
  font-size: 1.5rem;
  // padding: 40px;
  background: none;
  outline: none;
  box-shadow: none;
  border-radius: 2px;
  width: 50vw;
  margin-top: 100px;
  border: 1px #1f1f1f solid;
  height: 2rem;
  color: $textColor;
  resize: none;
}
.input-block {
  font-family: "Poppins";
  font-weight: 300;
  font-size: 1rem;
  padding: 40px;
  background: none;
  outline: none;
  box-shadow: none;
  border-radius: 2px;
  width: 50vw;

  border: 1px #1f1f1f solid;
  height: 50rem;
  color: $textColor;
  resize: none;
}
</style>
<script>
import HelloWorld from "@/components/HelloWorld.vue";

export default {
  name: "HomeView",
  components: {
    HelloWorld,
  },
};
</script>
