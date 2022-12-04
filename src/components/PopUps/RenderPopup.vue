<template>
  <div class="render-active-popup fade-in" ref="renderer">
    <ActivePopup />
  </div>
</template>

<script>
import ActivePopup from "./ActivePopup";

export default {
  components: { ActivePopup },
  mounted() {
    const body = document.querySelector("body")
    const nodeEl = document.createElement("div")
    body.appendChild(nodeEl)
  }
};
</script>

<style lang="scss" scoped>
.render-active-popup {
  position: fixed;
  width: 500px;
  height: 200px;
  background-color: #fff;
  padding: 10px;
  z-index: 200;
  margin: 5% auto;
  left: 0;
  right: 0;

  * {
    clear: both;
  }
}
</style>
