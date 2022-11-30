<template>
  <div class="render-active-popup fade-in">
    <ActivePopup />
  </div>
</template>

<script>
import ActivePopup from "./ActivePopup";

export default {
  components: { ActivePopup },
};
</script>

<style scoped>
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
}
</style>
