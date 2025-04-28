// @ts-check
import { test, expect, _electron } from '@playwright/test';
let electronApp
let mainPage

async function waitForPreloadScript() {
  return new Promise((resolve) => {
    const interval = setInterval(async () => {
      await mainPage.evaluate(() => {
        return (window as Window & { electron }).electron
      })
    }, 100)
  })
}

// conecting electron with e2e test
test.beforeEach(async () => {
  electronApp = await _electron.launch({
    args: ['.'],
    env: { NODE_ENV: 'development' }
  })
  mainPage = await electronApp.firstWindow();
})

// preventing memeory usage issue
test.afterEach(async () => {
  await electronApp.close()
})


test('should create a custom menu', async () => {
  const menu = await electronApp.evaluate((electron) => {
    return electron.Menu.getApplicationMenu()
  })

  expect(menu).not.toBeNull()
  expect(menu?.items).toHaveLength(2)
  expect(menu?.items[0].submenu?.items).toHaveLength(2)
  expect(menu?.items[1].submenu?.items).toHaveLength(3)
  expect(menu?.items[2].label).toBe('View')

})


// minimize the electron after test run 
// test('custom frame should minimize the mainWindow', async () => {
//   await mainPage.click('#minimize');
//   const isMinimized = await electronApp.evaluate((electron) => {
//     return electron.BrowserWindow.getAllWindows()[0].isMinimized();

//   });
//   expect(isMinimized).toBeTruthy()

// })




