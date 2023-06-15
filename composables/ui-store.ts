import { defineStore } from "pinia";

export const useUiStore = defineStore('ui', {
    state: () => ({
        scrolled: false,
    }),
    actions: {
        setScrolled(value: boolean) {
            this.scrolled = value;
        },
    },
    getters: {
        getScrolled: (state) => state.scrolled,
    },
})
