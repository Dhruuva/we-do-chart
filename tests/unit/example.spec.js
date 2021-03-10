import {createLocalVue, shallowMount ,mount} from "@vue/test-utils";
import Home from "@/views/Home.vue";
import Mainlook from "@/views/MainLook.vue";
import code from "@/components/codeSample.vue";
import Vuetify from 'vuetify'
import VueCodeHighlight  from 'vue-code-highlight';


describe("views and component", () => {
     const localVue = createLocalVue()
     localVue.use(VueCodeHighlight)
     let vuetify

    beforeEach(() => {
        vuetify = new Vuetify()
    })
    
  //  mount(code, { stubs: ['vue-code-highlight'] })

    it('has chartbox', () => {
        const wrapper = shallowMount(Home,{ localVue, vuetify,  });
       // expect(wrapper.html()).toMatchSnapshot()
        const title = wrapper.find('h3')
        
        let msg = 'weCharts- simple and customizable Vue component to plot any line chart.'
        expect(title.text()).toBe(msg)
        expect(wrapper.find("h3").text()).toBe(msg);
        
    })


     it('code', () => {
        const wrapper = shallowMount(code, { localVue ,vuetify, stubs: ['vue-code-highlight']},);

        const barRef = wrapper.findComponent({ ref: 'hlight' }) 
        expect(barRef.exists()).toBe(true)
      
    })

}); 