// store.js
import { writable } from 'svelte/store';

export const hoveredZipcode = writable(null);
export const selectedYear = writable(null);