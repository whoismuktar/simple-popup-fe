<template>
  <div class="popup popup__default">
    <div class="popup-wrapper">
      <div class="popup-inner">
        <div class="popup-inner__wrapper">
          <div class="popup-item popup-stars"></div>
          <div class="popup-item popup-text">
            All the text and elements in this popup should be editable and dragable
          </div>
          <div class="popup-item popup-input">
            <input type="email" placeholder="E-mail" />
          </div>
          <div class="popup-item popup-cta">
            <button>Signup Now</button>
          </div>
          <div class="popup-item popup-footnote">
            No credit card required. No Surprises
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {

}
</script>

<style src="@/assets/styles/popup.scss" lang="scss" scoped></style>