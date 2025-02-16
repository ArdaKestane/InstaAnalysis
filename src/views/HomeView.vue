<template>
  <div id="app">
    <div class="flex justify-between items-center p-4 bg-[#1A1A1D] text-white">
      <h1 class="text-4xl">{{ $t('Header') }}</h1>

      <!-- Language dropdown with flags -->
      <div class="relative">
        <button @click="toggleDropdown" class="flex items-center space-x-2">
          <!-- Flag Icon -->
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
          <span>{{ currentLanguage === 'en' ? 'English' : 'Türkçe' }}</span>
        </button>

        <!-- Dropdown -->
        <div
          v-if="dropdownVisible"
          class="absolute right-0 mt-2 w-40 bg-white shadow-lg rounded-lg"
        >
          <ul>
            <li
              @click="changeLanguage('en')"
              class="px-4 py-2 text-gray-800 hover:bg-gray-100 cursor-pointer"
            >
              <img
                src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/a4/Flag_of_the_United_States.svg/2560px-Flag_of_the_United_States.svg.png"
                alt="English Flag"
                class="w-6 h-4 inline-block mr-2"
              />
              English
            </li>
            <li
              @click="changeLanguage('tr')"
              class="px-4 py-2 text-gray-800 hover:bg-gray-100 cursor-pointer"
            >
              <img
                src="https://upload.wikimedia.org/wikipedia/commons/thumb/b/b4/Flag_of_Turkey.svg/2560px-Flag_of_Turkey.svg.png"
                alt="Turkish Flag"
                class="w-6 h-4 inline-block mr-2"
              />
              Türkçe
            </li>
          </ul>
        </div>
      </div>
    </div>

    <main class="p-6">
      <button
        @click="$router.push('/how-to-use')"
        class="bg-blue-500 text-white px-4 py-2 rounded"
      >
        {{ $t('howItWorks') }}
      </button>

      <FileUploader @file-loaded="handleFileLoaded" />
      <div
        v-if="followersData && followingData"
        class="flex justify-center items-center mt-6"
      >
        <button
          @click="analyzeData"
          class="bg-blue-500 text-white px-4 py-2 rounded"
        >
          {{ $t('analyze') }}
        </button>
      </div>

      <div v-if="analysisResult">
        <div>
          <h3 class="font-semibold text-lg">{{ $t('dontFollowBack') }}:</h3>
          <ul>
            <li
              v-for="(user, index) in analysisResult.dontFollowBack"
              :key="index"
            >
              {{ user }}
            </li>
          </ul>
        </div>

        <div v-if="false">
          <h2 class="text-2xl mt-6">Analysis Results:</h2>
          <h3 class="font-semibold text-lg">{{ $t('followBack') }}:</h3>
          <ul>
            <li v-for="(user, index) in analysisResult.followBack" :key="index">
              {{ user }}
            </li>
          </ul>
        </div>
      </div>
    </main>
  </div>
</template>

<script>
import FileUploader from '../../src/components/FileUploader.vue';

export default {
  name: 'App',
  components: {
    FileUploader,
  },

  data() {
    return {
      followersData: null,
      followingData: null,
      analysisResult: null,
      dropdownVisible: false,
      currentLanguage: null,
    };
  },
  mounted() {
    this.currentLanguage = localStorage.getItem('language') || 'tr';

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
    changeLanguage(language) {
      this.currentLanguage = language;
      localStorage.setItem('language', language);
      this.$i18n.locale = language;
      this.dropdownVisible = false; // Close dropdown after selecting a language
    },
    handleFileLoaded({ type, data }) {
      if (type === 'followers') {
        this.followersData = data;
        localStorage.setItem('followersData', JSON.stringify(data));
      } else if (type === 'following') {
        this.followingData = data;
        localStorage.setItem('followingData', JSON.stringify(data));
      }
    },
    analyzeData() {
      // Check if followersData and followingData are defined and are arrays
      if (!this.followersData || !Array.isArray(this.followersData)) {
        alert('Followers data is missing or not an array.');
        return;
      }

      if (
        !this.followingData ||
        !this.followingData.relationships_following ||
        !Array.isArray(this.followingData.relationships_following)
      ) {
        alert('Following data is missing or not an array.');
        return;
      }

      const followersUsernames = this.followersData
        .map((user) => user.string_list_data[0]?.value)
        .filter(Boolean);

      const followingUsernames = this.followingData.relationships_following
        .map((user) => user.string_list_data[0]?.value)
        .filter(Boolean);

      const notFollowBack = followingUsernames.filter(
        (user) => !followersUsernames.includes(user)
      );

      this.analysisResult = {
        followBack: followingUsernames.filter((user) =>
          followersUsernames.includes(user)
        ),
        dontFollowBack: notFollowBack,
      };
    },
  },
};
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@400;600&display=swap');

body {
  font-family: 'Montserrat', sans-serif;
}

header {
  background-color: #1f2937;
}

button:hover {
  background-color: #3490dc;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  padding: 8px 12px;
}

li:hover {
  background-color: #f1f5f9;
}
</style>
