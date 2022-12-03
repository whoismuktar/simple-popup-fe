<template>
  <div id="editor-page">
    <div class="editor">
      <div class="editor-panel">
        <div class="editor-panel-section">
          <div class="editor-panel-wrapper editor-panel-wrapper__action">
            <div class="editor-panel-section__title">ACTION</div>
            <label for="popupBgColor">
              <div class="editor-panel-item">
                <div class="editor-panel-item__icon">
                  <i class="bi bi-palette"></i>
                </div>
                <div class="editor-panel-item__title">Background</div>
              </div>
            </label>

            <div class="editor-panel-tooltip color-picker">
              <input
                v-model="bgColor"
                ref="colorPicker"
                type="color"
                id="popupBgColor"
                name="popupBgColor"
              />
            </div>
          </div>
        </div>

        <div class="editor-panel-section">
          <div class="editor-panel-wrapper">
            <div class="editor-panel-section__title">ORDER</div>

            <div
              v-for="(item, i) in elOrders"
              :key="i"
              class="editor-panel-item drop-zone"
              draggable
              @dragstart="startDrag($event, i)"
              @drop="onDrop($event, i)"
              @dragover.prevent
              @dragenter.prevent
              @click="selectNode(item.type)"
            >
              <span class="drag-icon">
                <i class="bi bi-grip-vertical"></i>
              </span>
              <div class="editor-panel-item drop-zone">
                <div class="drag-item">
                  <div class="editor-panel-item__icon">
                    <i :class="`bi bi-${item.icon}`"></i>
                  </div>
                  <div class="editor-panel-item__title">
                    {{ item.title }}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="editor-panel-section">
          <div class="editor-panel-wrapper editor-panel-wrapper__action">
            <div class="editor-panel-item" @click="savePopUp()">
              <div class="editor-panel-item__icon">
                <i class="bi bi-hdd-fill"></i>
              </div>
              <div class="editor-panel-item__title">Save</div>
            </div>

            <div class="editor-panel-item" @click="getLink()">
              <div class="editor-panel-item__icon">
                <i class="bi bi-code-slash"></i>
              </div>
              <div class="editor-panel-item__title">Embed</div>
            </div>
          </div>
        </div>
      </div>

      <div class="editor-field">
        <ActivePopup :focus="selectedNode" />

        <div v-show="showToast" id="simpleToast">
          <span>{{ toastMessage }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import ActivePopup from "@/components/PopUps/ActivePopup";
import { mapState } from "vuex";
export default {
  name: "App",
  components: {
    ActivePopup,
  },
  data() {
    return {
      selectedNode: "",
      showToast: false,
      toastMessage: "",
      bgColor: "#e1795f",
      colorPickerActive: false,
      itemDragged: {},
    };
  },
  watch: {
    bgColor(val) {
      this.$store.dispatch("saveBgColor", val);
    },
  },
  methods: {
    startDrag(evt, i) {
      evt.dataTransfer.dropEffect = "move";
      evt.dataTransfer.effectAllowed = "move";
      evt.dataTransfer.setData("itemID", i)

      this.itemDragged = this.elOrders[i];
    },
    onDrop(evt, i) {
      // implement array prototype construct
      Array.prototype.insert = function (index, ...items) {
        this.splice(index, 0, ...items);
      };

      const itemDraggedIdx = this.elOrders.indexOf(this.itemDragged);
      const isUpDrag = itemDraggedIdx > i;
      const isDownDrag = i > itemDraggedIdx;

      if (i === itemDraggedIdx) {
        return;
      }

      let orders = this.elOrders;

      if (isUpDrag) {
        orders.insert(i, this.itemDragged);
        orders.splice(itemDraggedIdx + 1, 1);
      } else if (isDownDrag) {
        orders.insert(i+1, this.itemDragged);
        orders.splice(itemDraggedIdx, 1);
      }

      this.$store.dispatch("savePopUpData", orders);
    },
    savePopUp() {
      this.$store.dispatch("savePopupSettings");
    },
    getLink() {
      let url = "https://simple-popup.onrender.com/cdn";
      
      process.env.NODE_ENV === "development"? (url = "http://localhost:3001/cdn")
      : (url = "https://simple-popup.onrender.com/cdn");

      //eslint-disable-next-line
      const code = `<script async type="text/javascript" src="${url}` + "<\/script>"

      navigator.clipboard.writeText(code);

      this.showToast = true;
      this.toastMessage = "Embedded link copied to clipboard";

      setTimeout(() => {
        this.showToast = false;
        this.toastMessage = "";
      }, 3000);
    },
    selectNode(type) {
      this.selectedNode = type;
    },
  },
  computed: {
    ...mapState(["elOrders"]),
  },
  created() {
    this.$store.dispatch("getPopupSettings");
  },
};
</script>

<style src="@/assets/styles/base.scss" lang="scss"></style>
