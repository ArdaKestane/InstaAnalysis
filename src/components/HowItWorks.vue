<template>
  <div class="w-full bg-[#1A1A1D] py-16 h-full">
    <div class="px-6 text-white">
      <h2 class="text-4xl font-semibold text-center mb-8">
        {{ $t('howItWorks') }}
      </h2>

      <div
        class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-12 xl:w-full min-[1900px]:w-3/4 mx-auto"
      >
        <div v-for="step in steps" :key="step.number" class="mb-12">
          <!-- Step Header -->
          <div class="flex items-center mb-4">
            <span
              class="text-2xl font-semibold w-6 h-6 rounded-full bg-blue-400 mr-4 text-white flex items-center justify-center p-4"
            >
              {{ step.number }}
            </span>
            <h3 class="lg:text-xl xl:text-xl font-semibold whitespace-nowrap">
              {{ step.title }}
            </h3>
          </div>

          <!-- Step Image and Description -->
          <div
            class="flex flex-col rounded-lg shadow-lg p-6 bg-white h-full items-center justify-between"
          >
            <img
              v-if="step.imageTr || step.imageEn"
              :src="$i18n.locale == 'tr' ? step.imageTr : step.imageEn"
              :alt="step.title"
              class="w-full h-auto"
            />
            <div
              class="text-center text-black mt-4 font-semibold h-full flex justify-center items-center"
            >
              <p
                class="text-md lg:text-lg xl:text-lg mx-auto font-semibold"
                v-html="$t(step.descriptionKey)"
              ></p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'HowItWorks',
  props: {
    steps: {
      type: Array,
      required: true,
    },
  },
};
</script>
