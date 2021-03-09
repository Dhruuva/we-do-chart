module.exports = {
  preset: '@vue/cli-plugin-unit-jest', 
   setupFiles: ["<rootDir>/tests/unit/index.js"],
  moduleFileExtensions: [
    'js',
    'jsx',
    'json',
    'vue'
  ],
  transform: {
    '^.+\\.vue$': 'vue-jest',
    '.+\\.(css|styl|less|sass|scss|png|jpg|ttf|woff|woff2)$': 'jest-transform-stub',
    '^.+\\.js$': 'babel-jest'
  },
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1'
  },
  snapshotSerializers: [
    'jest-serializer-vue'
  ],
  //transformIgnorePatterns: ['/node_modules/(?!@ionic/vue|@ionic/vue-router)']
 // transformIgnorePatterns: [ '<rootDir>/node_modules/(?!vuetify)']
 // transformIgnorePatterns: ['<rootDir>/node_modules/']
}
