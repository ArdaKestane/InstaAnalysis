<template>
  <div class="relative w-full bg-[#1A1A1D] py-16 h-full">
    <!-- Background Gradient -->
    <div class="absolute inset-0 bg-black">
      <div
        class="absolute bottom-0 left-0 right-0 top-0 bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] bg-[size:14px_24px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]"
      ></div>
    </div>

    <!-- Header Section -->
    <header
      @click="$router.push('/')"
      class="absolute top-6 left-6 text-lg sm:text-lg md:text-xl xl:text-2xl 2xl:text-3xl font-bold z-50 cursor-pointer text-white"
    >
      {{ $t('Header') }}
    </header>

    <!-- Language Switcher -->
    <div class="absolute top-4 right-6 text-white z-50">
      <div class="relative">
        <button
          @click="toggleDropdown"
          class="flex items-center space-x-2 px-4 py-2 rounded-full shadow bg-[#333]"
        >
          <img
            v-if="currentLanguage === 'en'"
            src="https://upload.wikimedia.org/wikipedia/commons/a/a4/Flag_of_the_United_States.svg"
            alt="English Flag"
            class="w-6 h-4"
          />
          <img
            v-if="currentLanguage === 'tr'"
            src="https://upload.wikimedia.org/wikipedia/commons/b/b4/Flag_of_Turkey.svg"
            alt="Turkish Flag"
            class="w-6 h-4"
          />
          <p class="uppercase font-semibold">
            {{ currentLanguage === 'en' ? 'English' : 'Türkçe' }}
          </p>
        </button>

        <div
          v-if="dropdownVisible"
          class="absolute right-0 mt-2 w-40 bg-[#333] shadow-lg rounded-lg"
        >
          <ul>
            <li
              @click="changeLanguage('en')"
              class="px-4 py-2 hover:bg-gray-700 cursor-pointer flex items-center space-x-2"
            >
              <img
                src="https://upload.wikimedia.org/wikipedia/commons/a/a4/Flag_of_the_United_States.svg"
                class="w-6 h-4"
              />
              <span>English</span>
            </li>
            <li
              @click="changeLanguage('tr')"
              class="px-4 py-2 hover:bg-gray-700 cursor-pointer flex items-center space-x-2"
            >
              <img
                src="https://upload.wikimedia.org/wikipedia/commons/b/b4/Flag_of_Turkey.svg"
                class="w-6 h-4"
              />
              <span>Türkçe</span>
            </li>
          </ul>
        </div>
      </div>
    </div>

    <!-- Main Content -->
    <div class="px-6 text-white relative z-10">
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
              <p v-if="!step.link" class="font-medium">
                {{ $t(step.descriptionKey) }}
              </p>
              <div v-else>
                <p style="display: inline-block" class="mr-1 font-medium">
                  {{ $t(step.descriptionFirst) }}
                </p>
                <a
                  :href="step.link"
                  target="_blank"
                  class="text-blue-400 underline font-semibold"
                >
                  {{ $t('getDataLink') }}
                </a>
                <p class="font-medium">
                  {{ $t(step.descriptionSecond) }}
                </p>
              </div>
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
      dropdownVisible: false,
      currentLanguage: localStorage.getItem('language') || 'tr',
      steps: [
        {
          number: 1,
          imageTr: require('../../public/assets/img/step1Tr.png'),
          imageEn: require('../../public/assets/img/step1En.png'),
          link: 'https://www.instagram.com/download/request',
          title: this.$t('getDataTitle'),
          descriptionFirst: this.$t('getDataFirst'),
          descriptionSecond: this.$t('getDataSecond'),
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

  methods: {
    toggleDropdown() {
      this.dropdownVisible = !this.dropdownVisible;
    },

    changeLanguage(lang) {
      this.currentLanguage = lang;
      this.$i18n.locale = lang;
      localStorage.setItem('language', lang);
      this.dropdownVisible = false;
    },
  },
};
</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@400;600;700&display=swap');
.font-montserrat {
  font-family: 'Montserrat', sans-serif;
}
</style>
