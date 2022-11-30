<template>
  <div id="editor-page">
    <div class="editor">
      <div class="editor-panel">
        <div class="editor-panel-section">
          <div class="editor-panel-wrapper editor-panel-wrapper__action">
            <div class="editor-panel-section__title">ACTION</div>
            <label for="popupBgColor">
              <div class="editor-panel-item"">
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
            >
              <span class="drag-icon">
                <i class="bi bi-grip-vertical"></i>
              </span>
              <div class="editor-panel-item drop-zone">
                <div class="drag-item">
                  <div class="editor-panel-item__icon">
                    <i :class="`bi bi-${item.icon}`"></i>
                  </div>
                  <div class="editor-panel-item__title">{{ item.title }}</div>
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

              <div class="editor-panel-item">
                <div class="editor-panel-item__icon">
                  <i class="bi bi-code-slash"></i>
                </div>
                <div class="editor-panel-item__title">Embed</div>
              </div>
          </div>
        </div>

      </div>

      <div class="editor-field">
        <ActivePopup :bgColor="bgColor" />
      </div>
    </div>
  </div>
</template>

<script>
import ActivePopup from "@/components/PopUps/ActivePopup";
// import { mapState } from "vuex";
export default {
  name: "App",
  components: {
    ActivePopup,
  },
  data() {
    return {
      bgColor: "#e1795f",
      colorPickerActive: false,
      elOrders: [
        {
          id: 1,
          title: "Stars",
          icon: "star-fill",
        },
        {
          id: 2,
          title: "Text",
          icon: "type",
        },
        {
          id: 3,
          title: "Email",
          icon: "envelope-at",
        },
        {
          id: 4,
          title: "CTA",
          icon: "menu-button-wide-fill",
        },
      ],
      itemDragged: {},
    };
  },
  methods: {
    startDrag(evt, i) {
      evt.dataTransfer.dropEffect = "move";
      evt.dataTransfer.effectAllowed = "move";
      evt.dataTransfer.setData("itemID", i);
      // console.log({ evt, i });

      this.itemDragged = this.elOrders[i];
      console.log("dragged", this.itemDragged);
    },
    onDrop(evt, i) {
      Array.prototype.insert = function (index, ...items) {
        this.splice(index, 0, ...items);
      };

      const itemDraggedIdx = this.elOrders.indexOf(this.itemDragged);
      if (itemDraggedIdx > i) {
        this.elOrders.splice(itemDraggedIdx, itemDraggedIdx - i);
      } else {
        this.elOrders.splice(itemDraggedIdx, itemDraggedIdx + i);
      }
      this.elOrders.insert(i, this.itemDragged);
      this.itemDragged = {};
    },
  },
  computed: {
    // ...mapState(["elOrder"]),
  },
  mounted() {
    setTimeout(() => {
      // this.$refs.colorPicker.click()
      this.$refs.colorPicker.focus()
      this.$refs.colorPicker.click()
      console.log("done", {rr: this.$refs.colorPicker});
    }, 3000);
  }
};
</script>

<style src="@/assets/styles/base.scss" lang="scss"></style>
