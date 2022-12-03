<template>
  <div class="popup popup__default">
    <div
      class="popup-wrapper allChildrenCenter"
      :style="`background-color: ${bgColor}`"
    >
      <div class="popup-inner">
        <div class="popup-inner__wrapper">
          <div
            v-for="(item, i) in popUpData"
            :key="i"
            class="drop-zone"
            draggable
            @dragstart="startDrag($event, i)"
            @drop="onDrop($event, i)"
            @dragover.prevent
            @dragenter.prevent
          >
            <i class="bi bi-grip-horizontal grabber"></i>

            <div
              v-if="item.type === 'icons'"
              ref="icons"
              class="popup-item popup-stars popup-icons"
            >
              <i class="bi bi-star-fill"></i>
              <i class="bi bi-star-fill large"></i>
              <i class="bi bi-star-fill"></i>
            </div>
            <div
              v-if="item.type === 'text'"
              ref="text"
              contenteditable
              class="popup-item popup-text"
              v-html="text"
            ></div>
            <div v-if="item.type === 'input'" class="popup-item popup-input">
              <input
                v-model="email"
                ref="input"
                type="email"
                placeholder="E-mail"
              />
            </div>
            <div v-if="item.type === 'cta'" class="popup-item popup-cta">
              <button ref="cta">Signup Now</button>
            </div>
          </div>
          <div class="popup-item popup-footnote">
            No credit card required. No Surprises
          </div>
        </div>

        <!-- <div class="popup-inner__wrapper">
          <div ref="icons" class="popup-item popup-stars">
            <i class="bi bi-star-fill"></i>
            <i class="bi bi-star-fill large"></i>
            <i class="bi bi-star-fill"></i>
          </div>
          <div
            ref="text"
            contenteditable
            class="popup-item popup-text"
            @input="handleInput"
            v-html="text"
          ></div>
          <div class="popup-item popup-input">
            <input ref="input" type="email" placeholder="E-mail" />
          </div>
          <div class="popup-item popup-cta">
            <button ref="button">Signup Now</button>
          </div>
          <div class="popup-item popup-footnote">
            No credit card required. No Surprises
          </div>
        </div> -->
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";

export default {
  props: {
    focus: String,
  },
  data() {
    return {
      text: "All the text and elements in this popup should be editable and dragable",
      email: "",
      itemDragged: {},
    };
  },
  watch: {
    focus(val) {
      console.log(val, this.getRefs[val]);
      const el = this.$refs[val];
      if (el) {
        this.getRefs[val][0].focus();
      }
    },
    bgColor(val) {
      console.log({ val });
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
  },
  computed: {
    ...mapState(["bgColor", "elOrders"]),
    popUpData() {
      const data = this.elOrders;
      return data.map((item) => {
        let value;
        switch (item.type) {
          case "icons":
            value = this.$refs.icons;
            break;
          case "text":
            value = this.text;
            break;
          case "input":
            value = this.email;
            break;
          case "cta":
            value = this.$refs.cta;
            break;
          default:
            break;
        }
        // console.log({ ...item, ...{ value } });
        return { ...item, ...{ value } };
      });
    },
    getRefs() {
      return this.$refs
    }
  },
};
</script>

<style src="@/assets/styles/popup.scss" lang="scss" scoped></style>
