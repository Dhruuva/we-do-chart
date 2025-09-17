

https://stackoverflow.com/questions/58347746/automating-the-build-and-publish-process-with-github-actions-and-github-package

## From CDN or without a Bundler
https://github.com/vuejs/core/tree/main/packages/vue#which-dist-file-to-use


# CDN 
https://vuejs.org/guide/best-practices/production-deployment.html#without-build-tools

https://github.com/devstark-com/vue-google-charts/blob/master/package.json

https://github.com/dumptyd/vue-css-donut-chart/blob/master/package.json

https://github.com/dmtrbrl/vue-trend-chart/blob/master/package.json
 "private": false,
  "license": "MIT",
  "prepare": "npm run build",

  "packageManager": "pnpm@8.6.7",
  "peerDependencies": {
    "vue": "3.x"
  },

# this merge from branch pages if original was updated there ( you must be in branch pub)
git checkout --merge pages src/components/WeDoChart.vue
git checkout --merge pages src/components/offset.js
git checkout --merge pages src/components/slide.js
git checkout --merge pages src/components/doAxes.js
git checkout --merge pages src/components/mouse.js
#  you must be in branch pages
git checkout --merge pub src/components/WeDoChart.vue

## to build execute:    npm run build   
this make files  in dist folder 

### for publish copy all files in bin folder from dist  and all other 
cp ~/apps/2025/wechart/README.md  ~/apps/2025/wechart/bin
cp ~/apps/2025/wechart/dist/*  ~/apps/2025/wechart/bin
cp ~/apps/2025/wechart/src/assets/theme.styl  ~/apps/2025/wechart/bin
cp ~/apps/2025/wechart/LICENSE  ~/apps/2025/wechart/bin
cp ~/apps/2025/wechart/package.json  ~/apps/2025/wechart/bin

# to publish go folder cd ~/apps/2025/wechart/bin
npm version patch
npm publish 

**build and deploy  gh-pages**
build and after this 
copy all three folders here to ~/apps/2025/wechart/docs
cp -R ~/apps/2025/v2/* ~/apps/2025/wechart/docs
 rm ~/apps/2025/wechart/docs/info.txt
and remove info file 

## go to 
git checkout www
git checkout --merge pages docs
git push -u origin www