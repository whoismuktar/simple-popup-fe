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
            v-draggable="{
              disabled: !editMode,
            }"
            :id="`${item.type}-${i}`"
            :disabled="!editMode"
            @stop="onDragEnd"
            :ref="`item-${i}`"
            @click="selectEl(i)"
            class="drop-zone"
            :style="{'transforme:': 'item.position'}"
          >
            <i
              v-if="editMode"
              class="bi bi-x-circle-fill close"
              @click="removeEl(i)"
            ></i>
            <!-- {{item.position}} -->

            <div
              v-if="item.type === 'icon'"
              class="popup-item popup-stars popup-icons"
            >
              <div class="popup-item popup-stars">
                <i class="bi bi-star-fill"></i>
                <i class="bi bi-star-fill large"></i>
                <i class="bi bi-star-fill"></i>
              </div>
            </div>

            <div
              v-else-if="item.type === 'input'"
              class="popup-item popup-input"
            >
              <input
                v-model="email"
                type="email"
                placeholder="E-mail"
              />
            </div>

            <div v-else-if="item.type === 'cta'" class="popup-item popup-cta">
              <button>
                <input
                  type="text"
                  v-model="elOrders[i].value"
                  :disabled="!editMode"
                />
              </button>
            </div>

            <div
              v-else-if="item.type === 'text'"
              class="popup-item"
              :class="`popup-${item.type}`"
            >
              <textarea
                :name="`text${i}`"
                v-model="elOrders[i].value"
                :id="`text${i}`"
                maxlength="100"
                :disabled="!editMode"
                cols="10"
                rows="10"
              ></textarea>
            </div>
          </div>

          <div class="popup-item popup-footnote">
            <input
              type="text"
              v-model="$store.state.footNote"
              maxlength="40"
              :disabled="!editMode"
            />
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
    newEl(val) {
      this.$store.dispatch("savePopUpDataUnit", val);
    },
  },
  methods: {
    resetPopUp() {
      const items = []
      for (const key in this.getRefs) {
        const element = this.getRefs[key][0];
        items.push(element)
      }
      items.forEach((el, i) => {
        el.style.transform = this.elOrders[i].position
      })

      const message = "Popup reset to default sucessfully!";
      this.$store.dispatch("triggerToast", {active:true,message, color: "4BB543"});
    },
    onDragEnd(evt) {
      const el = evt.path[0]
      const position = el.style.transform;
      const idx = el.id.split("-")[1];

      this.$store.dispatch("saveUnitPosition", { idx, position });
    },
    removeEl(idx) {
      this.$store.dispatch("removePopUpUnit", idx);
    },
    selectEl(i) {
      if (!this.editMode) return;

      var prevSelected = document.getElementsByClassName("drop-zone--selected");
      if (prevSelected.length) {
        prevSelected[0].classList.remove("drop-zone--selected");
      }

      const el = this.$refs[`item-${i}`];
      if (Array.isArray(el) && el.length) {
        el[0].classList.add("drop-zone--selected");
      }
    },
  },
  computed: {
    ...mapState(["bgColor", "elOrders", "footNote"]),
    editMode() {
      return this.$route.name === "editor";
    },
    getRefs() {
      return this.$refs;
    },
  },
  created() {
    this.$store.dispatch("getPopupSettings");
  },
  mounted() {
    const items = []
    for (const key in this.getRefs) {
      const element = this.getRefs[key][0];
      items.push(element)
    }
    
    setTimeout(() => {
      items.forEach((el, i) => {
        el.style.transform = this.elOrders[i].position
      })
    }, 500);
  }
};
</script>

<style src="@/assets/styles/popup.scss" lang="scss" scoped></style>
