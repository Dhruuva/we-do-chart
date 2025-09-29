import { expect, test ,describe,it} from 'vitest'
import { page, userEvent } from '@vitest/browser/context'
import { render } from 'vitest-browser-vue'
import WeDoChart from '../src/components/WeDoChart.vue'
import {Bank} from '../src/components/bank.js'
const bank1 = new Bank()
const rows =bank1.getData("sto");

describe('chart all parts ', () => {

  test('svg sheet ', async () => {
    const { getByText, getByRole } = render(WeDoChart, {
      props: { ds:{width:300,height:300} ,points:rows },
    });
    await expect.element(page.getByTestId('sheet').first()).toBeVisible()
  })

  test('chart sheet ', async () => {
    const { getByText, getByRole } = render(WeDoChart, {
      props: { ds:{width:300,height:300} ,points:rows },
    });
    await expect.element(page.getByTestId('chart-sheet').first()).toBeVisible()
  })

  test('render title on plot aria', async () => {
    const { getByText, getByRole } = render(WeDoChart, {
      props: { ds:{width:300,height:300} ,points:rows },
    });
    await expect.element(getByText('sto')).toBeInTheDocument()
  })

  test('click on date 2019-01-16', async () => {
    const { getByText, getByRole } = render(WeDoChart, {
      props: { ds:{width:300,height:300} ,points:rows },
    });
      const lable  =  await page.getByText(/^2019/);
      await userEvent.click(lable);
      // await lable.click();
  })

  // test('render legend on plot aria', async () => {
  //   const { getByText, getByRole } = render(WeDoChart, {
  //     props: { ds:{width:300,height:300} ,points:rows },
  //   });
  //    await expect.element(page.getByTestId('legend-up').first()).toBeVisible()
  // })

  test('render axis x ', async () => {
    const { getByText, getByRole } = render(WeDoChart, {
      props: { ds:{width:300,height:300} ,points:rows },
    });
    await expect.element(page.getByTestId('axis-X').first()).toBeInTheDocument()
  })

  test('render axis y ', async () => {
    const { getByText, getByRole } = render(WeDoChart, {
      props: { ds:{width:300,height:300} ,points:rows },
    });
    await expect.element(page.getByTestId('axis-Y').first()).toBeInTheDocument()
  })

  test('render Y ticks  ', async () => {
    const { getByText, getByRole } = render(WeDoChart, {
      props: { ds:{width:300,height:300} ,points:rows },
    });
    await expect.element(page.getByTestId('ticksY').first()).toBeVisible()
  })

  test('render X grid ', async () => {
    const { getByText, getByRole } = render(WeDoChart, {
      props: { ds:{width:300,height:300} ,points:rows },
    });
    await expect.element(page.getByTestId('grid-X').first()).toBeInTheDocument()
  })

  test('render Y grid ', async () => {
    const { getByText, getByRole } = render(WeDoChart, {
      props: { ds:{width:300,height:300} ,points:rows },
    });
    await expect.element(page.getByTestId('grid-Y').first()).toBeInTheDocument()
  })

})  

//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
describe('Chart props ', () => {

  test('switch off grid ', async () => {
    const { getByText, getByRole } = render(WeDoChart, {
      props: { ds:{width:300,height:300} ,points:rows, showGrid:false},
    });
    await expect.element(page.getByTestId('grid-Y').first()).not.toBeInTheDocument()
    await expect.element(page.getByTestId('grid-X').first()).not.toBeInTheDocument()
  })

  test('adding shape ', async () => {
    const { getByText, getByRole } = render(WeDoChart, {
      props: { ds:{width:300,height:300} ,points:rows, showGrid:false 
      ,shapes:[{type:'&#128545;',x:-9,y:6,price:142.87,tm:'2019-12-14',class:'emoj',title:'fall'}] },
    });
    //await expect.element(page.getByTitle('fall').first()).toBeInTheDocument()
    await expect.element(page.getByTestId('foreigno').first()).toBeVisible()
    await page.getByTestId('foreigno').first().click()

  })

  test('legend is up ', async () => {
    const { getByText, getByRole } = render(WeDoChart, {
      props: { ds:{width:300,height:300} ,points:rows, showGrid:false 
      ,shapes:[{type:'&#128545;',x:-9,y:6,price:142.87,tm:'2019-12-14',class:'emoj',title:'fall'}] },
    });
   
    await expect.element(page.getByTestId('foreigno').first()).toBeVisible()
    await page.getByTestId('foreigno').first().click()
    await expect.element(page.getByTestId('legend-up').first()).toBeVisible()
     await expect.element(page.getByTestId('rightThumb').first()).toBeVisible()
    
  })

  test('turn off slider ', async () => {
    const { getByText, getByRole } = render(WeDoChart, {
      props: { ds:{width:300,height:300} ,points:rows, showGrid:false 
      ,shapes:[{type:'&#128545;',x:-9,y:6,price:142.87,tm:'2019-12-14',class:'emoj',title:'fall'}]
      ,scl:0 }
    });
    await expect.element(page.getByTestId('rightThumb').first()).not.toBeVisible()
  })

  test('change format y-axis labels  ', async () => {
    const { getByText, getByRole } = render(WeDoChart, {
      props: { ds:{width:300,height:300} ,points:rows, showGrid:false 
      ,shapes:[{type:'&#128545;',x:-9,y:6,price:142.87,tm:'2019-12-14',class:'emoj',title:'fall'}]
      ,scl:0 ,tky:2}
    });
    await page.getByRole('text').filter({ hasText: '86' }).first()
    await page.getByRole('text').filter({ hasText: '215' }).first()
    
  })

  test('change format x-axis labels  ', async () => {
    const fmt = new Intl.DateTimeFormat("en-GB", { month: "short", timeZone: "Asia/Tokyo" });
    const { getByText, getByRole } = render(WeDoChart, {
      props: { ds:{width:300,height:300} ,points:rows, showGrid:false 
      ,shapes:[{type:'&#128545;',x:-9,y:6,price:142.87,tm:'2019-12-14',class:'emoj',title:'fall'}]
      ,scl:0 , timefotmat:fmt,theme:"monaco" ,tky:3 },
    });
    await page.getByRole('text').filter({ hasText: 'Mar' }).first()
    await page.getByRole('text').filter({ hasText: 'Feb' }).first()
  })

  test('change font-size  ', async () => {
    const fmt = new Intl.DateTimeFormat("en-GB", { month: "short", timeZone: "Asia/Tokyo" });
    const { getByText, getByRole } = render(WeDoChart, {
      props: { ds:{width:300,height:300} ,points:rows, showGrid:false 
      ,shapes:[{type:'&#128545;',x:-9,y:6,price:142.87,tm:'2019-12-14',class:'emoj',title:'fall'}]
      ,scl:0 , timefotmat:fmt,theme:"monaco" ,tky:3 ,fs:35},
    });
    await expect.element(page.getByTestId('lbl-X').filter({ hasText: 'Dec' }).first()).toBeVisible();

    await expect.element(page.getByTestId('lbl-X').filter({ hasText: 'Feb' })).not.toBeInTheDocument();

  })

  test('drag slider ', async () => {
    const { getByText, getByRole } = render(WeDoChart, {
      props: { ds:{width:300,height:300} ,points:rows, showGrid:false 
      ,shapes:[{type:'&#128545;',x:-9,y:6,price:142.87,tm:'2019-12-14',class:'emoj',title:'fall'}] },
    });
    const to =page.getByTestId('rightThumb')
    const from =page.getByTestId('leftThumb')
   
    await userEvent.dragAndDrop(from, to);q

    await to.hover();
  })


})





