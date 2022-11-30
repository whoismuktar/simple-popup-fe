<template>
  <div id="app">
    <div class="editor">
      <div class="editor-panel">
        <div class="editor-panel-section">
          <div class="editor-panel-wrapper">
            <div class="editor-panel-section__title">ACTION</div>
            <div class="editor-panel-item" @click="showColorPicker()">
              <div class="editor-panel-item__icon">
                <i class="bi bi-palette"></i>
              </div>
              <div class="editor-panel-item__title">Background</div>

              <div class="editor-panel-tooltip color-picker">
                <input
                  v-if="colorPickerActive"
                  v-model="bgColor"
                  type="color"
                  id="popupBgColor"
                  name="popupBgColor"
                />
              </div>
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
          title: "Text",
          icon: "type",
        },
        {
          id: 2,
          title: "Email",
          icon: "envelope-at",
        },
        {
          id: 3,
          title: "CTA",
          icon: "menu-button-wide-fill",
        },
        {
          id: 4,
          title: "Stars",
          icon: "star-fill",
        },
      ],
      itemDragged: {},
    };
  },
  methods: {
    showColorPicker() {
      this.colorPickerActive = true;
    },
    startDrag(evt, i) {
      evt.dataTransfer.dropEffect = "move";
      evt.dataTransfer.effectAllowed = "move";
      evt.dataTransfer.setData("itemID", i);
      // console.log({ evt, i });

      this.itemDragged = this.elOrders[i];
      console.log("dragged",this.itemDragged);
    },
    onDrop(evt, i) {
      Array.prototype.insert = function ( index, ...items ) {
        this.splice( index, 0, ...items );
      };

      const itemDraggedIdx = this.elOrders.indexOf(this.itemDragged)
      if (itemDraggedIdx > i) {
        this.elOrders.splice(itemDraggedIdx, itemDraggedIdx-i)
      } else {
        this.elOrders.splice(itemDraggedIdx, itemDraggedIdx+i)
      }
      this.elOrders.insert(i, this.itemDragged)
      this.itemDragged = {}
    },
  },
  computed: {
    // ...mapState(["elOrder"]),
  },
};
</script>

<style src="@/assets/styles/base.scss" lang="scss"></style>
