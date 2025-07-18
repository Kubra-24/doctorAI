const { getDefaultConfig, mergeConfig } = require('@react-native/metro-config');

const config = {
  resolver: {
    // WebContainer ortamında çalışması için gerekli ayarlar
    platforms: ['native', 'android', 'ios', 'web'],
  },
  transformer: {
    // Ortam kurulum betiği hatalarını önlemek için
    getTransformOptions: async () => ({
      transform: {
        experimentalImportSupport: false,
        inlineRequires: true,
      },
    }),
  },
};

module.exports = mergeConfig(getDefaultConfig(__dirname), config);
