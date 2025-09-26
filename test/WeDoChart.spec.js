import { expect, test ,describe,it} from 'vitest'
import { page, userEvent } from '@vitest/browser/context'
import { render } from 'vitest-browser-vue'
import WeDoChart from '../src/components/WeDoChart.vue'
import {Bank} from '../src/components/bank.js'
const bank1 = new Bank()

test('renders title on plot aria', async () => {
  const rows =bank1.getData("sto");
  const { getByText, getByRole } = render(WeDoChart, {
    props: { ds:{width:300,height:300} ,points:rows, theme:"default" },
  });

  await expect.element(getByText('sto')).toBeInTheDocument()
  //await expect.page(getByText('sto')).toBeInTheDocument()

   // await expect.element(
  //   page.getByRole('text', { name: 'sto' })
  // ).toBeVisible()

  //await getByRole('text', { name: 'sto' }).click()

  
})

test('change theme', async () => {
   const rows =bank1.getData("sto");
   const { getByText, getByRole } = render(WeDoChart, {
    props: { ds:{width:300,height:300} ,points:rows, theme:"berry" },
  });

  await expect.element(page.getByText('sto')).toBeVisible()

  //  await page.getByRole('text', { name: 'sto' }).toBeVisible()  // this produce error
   //q await page.getByRole('line', { name: 'cross' }).hover()
     //await expect.element(page.getByRole('line', { name: 'cross' })).toBeVisible()
   
   // const logo = page.getByRole('text', { name: /sto/ })
   // await userEvent.click(logo)
   // await logo.click()
})



// describe('cross', () => {
//   const rows =bank1.getData("sto");
//    const { getByText, getByRole } = render(WeDoChart, {
//     props: { ds:{width:300,height:300} ,points:rows, theme:"berry" },
//   });
//   it('Searching cross', async () => {
//    await page.getByRole('cross').first()

//   });
// });

