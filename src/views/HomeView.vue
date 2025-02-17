<template>
  <div
    class="relative h-screen flex items-center justify-center text-white font-montserrat"
  >
    <div class="absolute inset-0 bg-black">
      <div
        class="absolute bottom-0 left-0 right-0 top-0 bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] bg-[size:14px_24px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]"
      ></div>
    </div>

    <!-- Language Selector -->
    <div class="absolute top-4 right-4 text-white">
      <div class="relative">
        <button
          @click="toggleDropdown"
          class="flex items-center space-x-2 px-4 py-2 rounded-full shadow bg-[#1A1A1D]"
        >
          <img
            v-if="currentLanguage === 'en'"
            src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/a4/Flag_of_the_United_States.svg/2560px-Flag_of_the_United_States.svg.png"
            alt="English Flag"
            class="w-6 h-4"
          />
          <img
            v-if="currentLanguage === 'tr'"
            src="https://upload.wikimedia.org/wikipedia/commons/thumb/b/b4/Flag_of_Turkey.svg/2560px-Flag_of_Turkey.svg.png"
            alt="Turkish Flag"
            class="w-6 h-4"
          />
          <p class="uppercase font-semibold">
            {{ currentLanguage === 'en' ? 'English' : 'Türkçe' }}
          </p>
        </button>

        <!-- Dropdown -->
        <div
          v-if="dropdownVisible"
          class="absolute right-0 mt-2 w-40 shadow-lg rounded-lg z-50 bg-[#1A1A1D]"
        >
          <ul>
            <li
              @click="changeLanguage('en')"
              class="px-4 py-2 hover:bg-gray-100 cursor-pointer flex items-center space-x-2 text-white font-bold"
            >
              <img
                src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/a4/Flag_of_the_United_States.svg/2560px-Flag_of_the_United_States.svg.png"
                alt="English Flag"
                class="w-6 h-4"
              />
              <span>English</span>
            </li>
            <li
              @click="changeLanguage('tr')"
              class="px-4 py-2 hover:bg-gray-100 cursor-pointer flex items-center space-x-2 text-white font-bold"
            >
              <img
                src="https://upload.wikimedia.org/wikipedia/commons/thumb/b/b4/Flag_of_Turkey.svg/2560px-Flag_of_Turkey.svg.png"
                alt="Turkish Flag"
                class="w-6 h-4"
              />
              <span>Türkçe</span>
            </li>
          </ul>
        </div>
      </div>
    </div>

    <!-- Content -->
    <div class="relative text-center max-w-2xl px-6">
      <h1 class="text-5xl font-bold">{{ $t('title') }}</h1>
      <p class="mt-4 text-lg text-gray-300">
        {{ $t('description') }}
      </p>

      <!-- Buttons -->
      <div class="mt-6 flex justify-center gap-4">
        <button
          class="px-6 py-3 bg-white text-black font-semibold rounded-full hover:bg-gray-300 transition"
          @click="$router.push('/upload')"
        >
          {{ $t('get_started') }}
        </button>
        <button
          class="px-6 py-3 border border-white rounded-full hover:bg-white hover:text-black transition"
          @click="$router.push('/how-to-use')"
        >
          {{ $t('how_it_works') }}
        </button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'LandingPage',
  data() {
    return {
      currentLanguage: localStorage.getItem('lang') || 'en',
      dropdownVisible: false,
    };
  },

  methods: {
    toggleDropdown() {
      this.dropdownVisible = !this.dropdownVisible;
    },

    changeLanguage(lang) {
      this.currentLanguage = lang;
      this.$i18n.locale = lang;
      localStorage.setItem('lang', lang);
      this.dropdownVisible = false;
    },
  },

  mounted() {
    this.$i18n.locale = this.currentLanguage;
  },
};
</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@400;600;700&display=swap');

.font-montserrat {
  font-family: 'Montserrat', sans-serif;
}
</style>
