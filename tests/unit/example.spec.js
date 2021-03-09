import {createLocalVue, shallowMount } from "@vue/test-utils";
import Home from "@/views/Home.vue";
import Vuetify from 'vuetify'


describe("Home.vue", () => {
     const localVue = createLocalVue()
     let vuetify

    beforeEach(() => {
        vuetify = new Vuetify()
    })

    it('has chartbox', () => {
        const wrapper = shallowMount(Home,{ localVue, vuetify,  });
        expect(wrapper.html()).toMatchSnapshot()
        const title = wrapper.find('h3')
        wrapper.find('chartbox')
        expect(title.text()).toBe('weCharts- simple and customizable Vue component to plot any line chart.')
        //expect().toBe(true)
    })

}); 