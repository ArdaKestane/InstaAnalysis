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
  data() {
    return {
      steps: [
        {
          number: 1,
          imageTr: require('../../public/assets/img/step1Tr.png'),
          imageEn: require('../../public/assets/img/step1En.png'),
          title: this.$t('getDataTitle'),
          descriptionKey: 'getDataDescription',
        },
        {
          number: 2,
          imageTr: require('../../public/assets/img/step2Tr.png'),
          imageEn: require('../../public/assets/img/step2En.png'),
          title: this.$t('howMuchDataTitle'),
          descriptionKey: 'howMuchDataDescription',
        },
        {
          number: 3,
          imageTr: require('../../public/assets/img/step3Tr.png'),
          imageEn: require('../../public/assets/img/step3En.png'),
          title: this.$t('dataCategoryTitle'),
          descriptionKey: 'dataCategoryDescription',
        },
        {
          number: 4,
          imageTr: require('../../public/assets/img/step4Tr.png'),
          imageEn: require('../../public/assets/img/step4En.png'),
          title: this.$t('downloadToDeviceTitle'),
          descriptionKey: 'downloadToDeviceDescription',
        },
        {
          number: 5,
          imageTr: require('../../public/assets/img/step5Tr.png'),
          imageEn: require('../../public/assets/img/step5En.png'),
          title: this.$t('dataFormatTitle'),
          descriptionKey: 'dataFormatDescription',
        },
        {
          number: 6,
          imageTr: null,
          imageEn: null,
          title: this.$t('awaitingDataTitle'),
          descriptionKey: 'awaitingDataDescription',
        },
      ],
    };
  },
};
</script>
