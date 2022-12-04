<template>
  <div class="popup popup__default">
    <div
      class="popup-wrapper allChildrenCenter"
      :style="`background-color: ${bgColor}`"
    >
    <!-- <div v-draggable="{ bounds: '.popup-wrapper' }" :draggable-options="{ bounds: 'body' }" class="box">I use a directive to make myself draggable</div> -->

      <div class="popup-inner">
        <div class="popup-inner__wrapper">
          <div
            v-for="(item, i) in elOrders"
            :key="i"
            class="drop-zone"
            v-draggable
            :ref="`item-${i}`"
            @click="selectEl(item, i)"
          >
            <div
              v-if="item.type === 'icon'"
              ref="icons"
              class="popup-item popup-stars popup-icons"
            >
              <div class="popup-item popup-stars">
                <i class="bi bi-star-fill"></i>
                <i class="bi bi-star-fill large"></i>
                <i class="bi bi-star-fill"></i>
              </div>
            </div>

            <div v-else-if="item.type === 'input'" class="popup-item popup-input">
              <input
                v-model="email"
                ref="input"
                type="email"
                placeholder="E-mail"
              />
            </div>

            <div v-else-if="item.type === 'cta'" class="popup-item popup-cta">
              <button ref="cta">
                <input type="text" v-model="elOrders[i].value" :disabled="!editMode" />
              </button>
            </div>

            <div v-else-if="item.type === 'text'" class="popup-item" :class="`popup-${item.type}`">
              <textarea name="" v-model="elOrders[i].value" id="" cols="30" rows="10"></textarea>
            </div>
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
import { mapState } from "vuex";

export default {
  props: {
    focus: String,
    newEl: Object,
  },
  data() {
    return {
      text: "",
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
    newEl(val) {
      this.$store.dispatch("savePopUpDataUnit", val);
      // console.log(this.elOrders.lenght,this.elOrders);
    },
    elOrders() {
      // if (newVal.length > oldVal.length) {
      // }
      // const lastItem = val[val.length-1]
      // const lastElItem = newVal.findIndex((item, i)=> i === lastItemIdx)

      // const idx = state.elOrders.findIndex((el) => el.type == unit.type);
      // state.elOrders[idx].value = unit.value;

      // this.$nextTick(()=> {
      //   const lastElItem = Object.values(this.$refs).pop();
      //   console.log(this.$refs, lastElItem, {lastItem});

      //   var rect = lastElItem[0].getBoundingClientRect();
      //   lastElItem[0].style.left = rect.x + lastItem.position.pageX + 'px';
      //   lastElItem[0].style.top  = rect.x + lastItem.position.pageX + 'px';
      //   // lastElItem[0].style.transform = `translate(${lastItem.position.pageX}px, ${lastItem.position.pageY}px)`
      //   // console.log(lastElItem[0].getBoundingClientRect());
      // })


    },
    // text(val) {
    //   const item = this.elOrders.find((el) => el.type == "text");
    //   const unit = { ...item, ...{ value: val } };
    //   this.$store.dispatch("savePopUpDataUnit", unit);
    // },
    // email(val) {
    //   const item = this.elOrders.find((el) => el.type == "input");
    //   const unit = { ...item, ...{ value: val } };
    //   this.$store.dispatch("savePopUpDataUnit", unit);
    // },
  },
  methods: {
    selectEl(item, i) {
      var prevSelected = document.getElementsByClassName("drop-zone--selected");
      if (prevSelected.length) {
        prevSelected[0].classList.remove("drop-zone--selected")
      }

      const el = this.$refs[`item-${i}`]
      if (Array.isArray(el)) {
        el[0].classList.add("drop-zone--selected");
      }
    },
    startDrag(evt, i) {
      if (!this.editMode) return;

      evt.dataTransfer.dropEffect = "move";
      evt.dataTransfer.effectAllowed = "move";
      evt.dataTransfer.setData("itemID", i);

      this.itemDragged = this.elOrders[i];
    },
    onDrop(evt, i) {
      if (!this.editMode) return;

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
        orders.insert(i + 1, this.itemDragged);
        orders.splice(itemDraggedIdx, 1);
      }

      this.$store.dispatch("savePopUpData", orders);
    },
  },
  computed: {
    ...mapState(["bgColor", "elOrders"]),
    // popUpData() {
    //   const data = this.elOrders;
    //   return data.map((item) => {
    //     let value;
    //     switch (item.type) {
    //       case "icons":
    //         value = this.$refs.icons;
    //         break;
    //       case "text":
    //         value = this.text;
    //         break;
    //       case "input":
    //         value = this.email;
    //         break;
    //       case "cta":
    //         value = this.$refs.cta;
    //         break;
    //       default:
    //         break;
    //     }
    //     // console.log({ ...item, ...{ value } });
    //     return { ...item, ...{ value } };
    //   });
    // },
    editMode() {
      return this.$route.name === "editor";
    },
    getRefs() {
      return this.$refs;
    },
    // defaultText() {
    //   const item = this.elOrders.find((el) => el.type == "text");
    //   return item.value
    // }
  },
  created() {
    this.text = this.defaultText || "All the text and elements in this popup should be editable and dragable"
  },
};
</script>

<style src="@/assets/styles/popup.scss" lang="scss" scoped></style>
