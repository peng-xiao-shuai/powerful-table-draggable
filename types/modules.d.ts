import { Component } from 'vue';

export type componentAttr<D = any> = {
  label: string;
  type: string;
  icon: string | Component;
  data: D
}