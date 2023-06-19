import { defineStore } from "pinia";

export const useUiStore = defineStore('ui', {
    state: () => ({
        scrolled: false,
        theme: 'light'
    }),
    actions: {
        setScrolled(value: boolean) {
            this.scrolled = value;
        },
    },
    getters: {
        getScrolled: (state) => state.scrolled,
        getTheme: (state) => state.theme
    },
})
