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
              v-for="(item, i) in elAssets"
              :key="i"
              :id="item.type"
              class="editor-panel-item drop-zone"
              v-draggable
              @stop="onDragEnd"
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
        <ActivePopup :focus="selectedNode" :newEl="newEl" />

        <div v-show="toast.active" id="simpleToast">
          <span :style="`background-color: ${toast.color}`">{{ toast.message }}</span>
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
      bgColor: "#e1795f",
      colorPickerActive: false,
      itemDragged: {},
      newEl: {},
    };
  },
  watch: {
    bgColor(val) {
      this.$store.dispatch("saveBgColor", val);
    },
  },
  methods: {
    onDragEnd(evt) {
      const el =  evt.path[0]

      let value;
        switch (el.id) {
          case "icon":
            value = "star-fill";
            break;
          case "text":
            value = "Enter Text Here";
            break;
          case "input":
            value = "";
            break;
          case "cta":
            value = "Enter CTA Text";
            break;
          default:
            break;
        }

      this.newEl = {
        type: el.id,
        position: {
          pageX: 116,
          pageY: 415,
        },
        bound: "",
        value
      }

      this.resetEl(el)
    },
    resetEl(el) {
      el.style.transform = "translate(0px, 0px)"
    },
    startDrag(evt, i) {
      evt.dataTransfer.dropEffect = "move";
      evt.dataTransfer.effectAllowed = "move";
      evt.dataTransfer.setData("itemID", i)

      this.itemDragged = this.elOrders[i];
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
      const message = "Embedded link copied to clipboard";


      this.$store.dispatch("triggerToast", {active:true,message, color: "4BB543"});
      
    },
    selectNode(type) {
      this.selectedNode = type;
    },
  },
  computed: {
    ...mapState(["elAssets", "toast"]),
  },
};
</script>

<style src="@/assets/styles/base.scss" lang="scss"></style>
