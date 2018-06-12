// For authoring Nightwatch tests, see
// http://nightwatchjs.org/guide#usage

module.exports = {
  'adding and modifying items': function (browser) {
    // automatically uses dev Server port from /config.index.js
    // default: http://localhost:8080
    // see nightwatch.conf.js
    const devServer = browser.globals.devServerURL
    browser
      .url(devServer)
      .waitForElementVisible('#app', 1000)

      // add an item
      .setValue('input#new-item-name', 'master')
      .click('button#new-item')
      .assert.value('#item-1 input[placeholder="total"]', '124.80')

      // change width
      .clearValue('#item-1 input[placeholder="width"')
      .setValue('#item-1 input[placeholder="width"]', 254)

      // change unit inch
      .click('#select-unit option[value="inch"]')
      .assert.value('#item-1 input[placeholder="width"]', '100')
      .clearValue('#item-1 input[placeholder="width"]')
      .setValue('#item-1 input[placeholder="width"]', 200)

      // change unit back to cm
      .click('#select-unit option[value="cm"]')
      .assert.value('#item-1 input[placeholder="width"]', '508')

      // add an other item
      .setValue('input#new-item-name', 'living')
      .click('button#new-item')
      .assert.value('#item-2 input[placeholder="total"]', '124.80')

      // modify an item
      .clearValue('#item-2 input[placeholder="width"]')
      .setValue('#item-2 input[placeholder="width"]', 100)
      .assert.urlContains(encodeURI('item[2][width]=100'))
      .assert.value('#item-2 input[placeholder="total"]', '52.00')
      .assert.value('#item-1 input[placeholder="total"]', '264.16')

      // reload page
      .refresh()
      .waitForElementVisible('#app', 1000)
      .assert.urlContains(encodeURI('item[2][width]=100'))
      .assert.value('#item-2 input[placeholder="width"]', '100')
      .assert.value('#item-2 input[placeholder="total"]', '52.00')

      // remove items
      .click('#item-1 button[name="remove"]')
      .click('#item-2 button[name="remove"]')
      .assert.urlEquals(devServer)

      // add an item
      .setValue('input#new-item-name', 'master')
      .click('button#new-item')
      .assert.value('#item-1 input[placeholder="total"]', '124.80')

      // go back
      .back()
      .assert.urlEquals(devServer)

      // change fabric
      .setValue('input#new-item-name', 'master')
      .click('button#new-item')
      .click('#item-1 select[name="fabric"] option[value="chenille"]')
      .click('#item-1 select[name="design"] option[value="19"]')
      .assert.value('#item-1 input[placeholder="color"]', 'red')
      .assert.value('#item-1 input[placeholder="no"]', '018-19')
      .getAttribute('#item-1 img.design', 'src', function (result) {
        this.assert.equal(result.value, devServer + 'static/chenille/19.png')
      })
      .assert.value('#item-1 input[placeholder="price"]', '30')

      .end()
  }
}
