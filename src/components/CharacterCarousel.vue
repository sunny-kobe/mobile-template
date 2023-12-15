<script setup>
import { ref } from 'vue';

const props = defineProps({
  characters: Array,
  startDragging: Function,
  dragCharacter: Function,
  stopDragging: Function,
  scrollX: Number,
});
const emit = defineEmits();

const showModal = ref(false);
const largeImage = ref('');
const largeImageAlt = ref('');

const showLargeImage = (character) => {
  // 触发自定义事件，将要显示的大图数据传递给父组件
  emit('show-large-image', character);
};

</script>

<template>
  <div @mousedown="startDragging" @mousemove="dragCharacter" @mouseup="stopDragging" w-640px h-380px cursor-grab
    absolute-center-x overflow-x-scroll top-400px>
    <div class="scrollable-area" :style="{ transform: `translateX(${scrollX}px)` }">
      <div v-for="character in characters" :key="character.id" flex="[0_0_auto]" flex-col items-center p-10px w-214px
        h-364px>
        <img @click="showLargeImage(character)" :src="character.poster1" :alt="character.role_name" w-212px h-363px
          object-contain>
        <!-- <span absolute-center-y>{{ character.role_name }}</span> -->
      </div>
    </div>
  </div>
</template>

<style scoped>
.scrollable-area {
  display: flex;
  transition: transform 0.3s ease;
}
</style>
