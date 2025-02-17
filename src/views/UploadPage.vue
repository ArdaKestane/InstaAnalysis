<template>
  <div
    class="relative flex flex-col justify-between text-white font-montserrat min-h-screen"
  >
    <!-- Background Gradient -->
    <div class="absolute inset-0 bg-black">
      <div
        class="absolute bottom-0 left-0 right-0 top-0 bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] bg-[size:14px_24px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]"
      ></div>
    </div>

    <!-- Header Section -->
    <header
      @click="$router.push('/')"
      class="absolute top-6 left-6 text-lg sm:text-lg md:text-xl xl:text-2xl 2xl:text-3xl font-bold z-50 cursor-pointer"
    >
      {{ $t('Header') }}
    </header>

    <!-- Language Switcher -->
    <div class="absolute top-4 right-6">
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
    <div
      class="flex-1 flex items-center justify-center flex-col px-6 mt-20 z-50"
    >
      <FileUploader
        @file-loaded="handleFileLoaded"
        class="mt-6 w-full max-w-md"
      />
      <button
        v-if="followersData && followingData"
        @click="analyzeData"
        class="px-6 py-3 bg-white text-black font-semibold rounded-full hover:bg-gray-300 transition mt-6"
      >
        {{ $t('analyze') }}
      </button>

      <!-- Analysis Results -->
      <div v-if="analysisResult" class="my-8 text-center space-y-4">
        <div>
          <h3 class="text-xl font-semibold">{{ $t('dontFollowBack') }}:</h3>
          <div
            class="mt-2 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4"
          >
            <div
              v-for="(user, index) in analysisResult.dontFollowBack"
              @click="openInstagram(user)"
              :key="index"
              class="flex items-center justify-between p-4 bg-[#333] rounded-lg shadow-md transition cursor-pointer"
            >
              <span class="flex-1 text-white">{{ user }}</span>
              <button class="p-2 bg-black text-white rounded-full transition">
                <svg
                  width="24px"
                  height="24px"
                  stroke-width="1.5"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  color="#ffffff"
                >
                  <path
                    d="M4.03132 8.91684L19.508 4.58337C19.8835 4.47824 20.2294 4.82421 20.1243 5.19967L15.7908 20.6763C15.6642 21.1284 15.0407 21.1726 14.8517 20.7429L11.6034 13.3605C11.5531 13.246 11.4616 13.1546 11.3471 13.1042L3.96477 9.85598C3.53507 9.66692 3.57926 9.04342 4.03132 8.91684Z"
                    stroke="#ffffff"
                    stroke-width="1.5"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  ></path>
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import FileUploader from '../../src/components/FileUploader.vue';

export default {
  name: 'ModernAnalysisPage',
  components: {
    FileUploader,
  },
  data() {
    return {
      followersData: null,
      followingData: null,
      analysisResult: null,
      dropdownVisible: false,
      currentLanguage: localStorage.getItem('language') || 'tr',
    };
  },
  mounted() {
    const savedFollowersData = localStorage.getItem('followersData');
    const savedFollowingData = localStorage.getItem('followingData');
    const savedAnalysisResult = localStorage.getItem('analysisResult');

    if (savedFollowersData) {
      this.followersData = JSON.parse(savedFollowersData);
    }
    if (savedFollowingData) {
      this.followingData = JSON.parse(savedFollowingData);
    }
    if (savedAnalysisResult) {
      this.analysisResult = JSON.parse(savedAnalysisResult);
    }
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
    handleFileLoaded(data) {
      // Handle followers data
      if (data.type === 'followers') {
        this.followersData = data.data
          .map(
            (item) => item.string_list_data?.[0]?.value || null // Extract username value safely
          )
          .filter(Boolean); // Only keep non-null values

        localStorage.setItem(
          'followersData',
          JSON.stringify(this.followersData)
        );
      }

      // Handle following data
      if (data.type === 'following') {
        this.followingData = data.data.relationships_following
          .map(
            (item) => item.string_list_data?.[0]?.value || null // Extract username value safely
          )
          .filter(Boolean); // Only keep non-null values

        localStorage.setItem(
          'followingData',
          JSON.stringify(this.followingData)
        );
      }
    },
    analyzeData() {
      if (!this.followersData || !this.followingData) {
        alert('Both followers data and following data must be loaded.');
        return;
      }

      console.log('Followers Data:', this.followersData);
      console.log('Following Data:', this.followingData);

      const notFollowBack = this.followingData.filter(
        (user) => !this.followersData.includes(user)
      );

      this.analysisResult = {
        dontFollowBack: notFollowBack,
      };

      localStorage.setItem(
        'analysisResult',
        JSON.stringify(this.analysisResult)
      );
    },
    openInstagram(username) {
      const instagramUrl = `https://www.instagram.com/${username}`;
      window.open(instagramUrl, '_blank'); // Opens Instagram in a new tab
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
