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
      .assert.value('#total-item-1', '124.8')
      .assert.urlContains(encodeURI('item[1][width]=240'))

      // change width
      .clearValue('input#width-item-1')
      .setValue('input#width-item-1', 254)

      // change unit inch
      .click('#select-unit option[value="inch"]')
      .assert.value('input#width-item-1', '100')
      .clearValue('input#width-item-1')
      .setValue('input#width-item-1', 200)

      // change unit back to cm
      .click('#select-unit option[value="cm"]')
      .assert.value('input#width-item-1', '508')

      // add an other item
      .setValue('input#new-item-name', 'living')
      .click('button#new-item')
      .assert.value('#total-item-2', '124.8')
      .assert.urlContains(encodeURI('item[2][width]=240'))

      // modify an item
      .clearValue('input#width-item-2')
      .setValue('input#width-item-2', 100)
      .assert.urlContains(encodeURI('item[2][width]=100'))
      .assert.value('#total-item-2', '52')
      .assert.value('#total-item-1', '264.16')

      // reload page
      .refresh()
      .waitForElementVisible('#app', 1000)
      .assert.urlContains(encodeURI('item[2][width]=100'))
      .assert.value('input#width-item-2', '100')
      .assert.value('#total-item-2', '52')

      // remove items
      .click('button#remove-item-1')
      .click('button#remove-item-2')
      .assert.urlEquals(devServer)

      // add an item
      .setValue('input#new-item-name', 'master')
      .click('button#new-item')
      .assert.value('#total-item-1', '124.8')
      .assert.urlContains(encodeURI('item[1][width]=240'))

      // go back
      .back()
      .assert.urlEquals(devServer)

      // change fabric
      .setValue('input#new-item-name', 'master')
      .click('button#new-item')
      .click('#item-1 select.fabric option[value="chenille"]')
      .click('#item-1 select.design option[value="19"]')
      .assert.value('#item-1 input.color', 'red')
      .assert.value('#item-1 input.no', '018-19')
      .getAttribute('#item-1 img.design', 'src', function (result) {
        this.assert.equal(result.value, devServer + 'static/chenille/19.png')
      })
      .assert.value('#item-1 input.price', '30')

      .end()
  }
}
