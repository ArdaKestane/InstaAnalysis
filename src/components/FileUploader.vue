<template>
  <div class="space-y-6">
    <!-- Followers Upload -->
    <div class="flex flex-col space-y-2">
      <label class="font-semibold">{{ $t('uploadFollowers') }}</label>
      <input
        type="file"
        id="followers-upload"
        @change="handleFileUpload('followers', $event)"
        accept=".json"
        ref="followersInput"
        hidden
      />
      <button
        class="bg-white text-black px-4 py-2 rounded-md focus:outline-none font-semibold italic"
        @click="triggerFileInput('followers')"
      >
        {{ $t('chooseFile') }}
      </button>
      <p class="text-gray-300 italic">
        {{ followersFileName || $t('noFileChosen') }}
      </p>
    </div>

    <!-- Followings Upload -->
    <div class="flex flex-col space-y-2">
      <label class="font-semibold">{{ $t('uploadFollowings') }}</label>
      <input
        type="file"
        id="following-upload"
        @change="handleFileUpload('following', $event)"
        accept=".json"
        ref="followingInput"
        hidden
      />
      <button
        class="bg-white text-black px-4 py-2 rounded-md focus:outline-none font-semibold italic"
        @click="triggerFileInput('following')"
      >
        {{ $t('chooseFile') }}
      </button>
      <p class="text-gray-300 italic">
        {{ followingFileName || $t('noFileChosen') }}
      </p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'FileUploader',
  data() {
    return {
      followersFileName: '',
      followingFileName: '',
    };
  },
  methods: {
    triggerFileInput(type) {
      if (type === 'followers') {
        this.$refs.followersInput.click();
      } else if (type === 'following') {
        this.$refs.followingInput.click();
      }
    },
    handleFileUpload(type, event) {
      const file = event.target.files[0];

      if (file) {
        // Update file name for UI
        if (type === 'followers') {
          this.followersFileName = file.name;
        } else if (type === 'following') {
          this.followingFileName = file.name;
        }

        // Read file content
        const reader = new FileReader();
        reader.onload = (e) => {
          try {
            const parsedData = JSON.parse(e.target.result);
            this.$emit('file-loaded', { type, data: parsedData });
          } catch (error) {
            console.error(`Error reading or parsing file: ${file.name}`, error);
          }
        };
        reader.readAsText(file);
      }
    },
  },
};
</script>
