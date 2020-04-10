
import Vue from 'vue'
// @ts-ignore
import Cloudinary from 'cloudinary-vue';
Vue.use(Cloudinary, {
  configuration: {
    cloudName: "topzdev"
  }
});