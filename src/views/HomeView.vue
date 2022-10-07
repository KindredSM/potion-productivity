<template>
  <div class="home"></div>
  <textarea class="input_block"></textarea>
</template>

<style lang="scss">
$textColor: #e1e1e1;
$primaryColor: #1f1f1f;
$highlightColor: #323232;

.input_block {
  font-family: "Poppins";
  font-weight: 300;
  font-size: 1.2rem;
  padding: 40px;
  background: none;
  outline: none;
  box-shadow: none;
  border-radius: 2px;
  width: 50vw;
  margin-top: 100px;
  border: 1px #1f1f1f solid;
  height: 50rem;
  color: $textColor;
  resize: none;
}
</style>
<script>
// @ is an alias to /src
import HelloWorld from "@/components/HelloWorld.vue";

export default {
  name: "HomeView",
  components: {
    HelloWorld,
  },
};
</script>
