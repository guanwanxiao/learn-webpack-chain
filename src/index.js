import { Button } from 'element-ui';
import Vue from 'vue'
import './a.js'
import { cube } from './treeShaking'
console.log('Button', Button,cube)
Vue.use(Button)