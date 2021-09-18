import path from 'path'
import assert from "assert"
import puppeteer from 'puppeteer'
import { fileURLToPath  } from "url"

let browser
let page

beforeEach(async () => {
	try {
		browser = await puppeteer.launch({
			headless: true
		})
		page = await browser.newPage()
		await page.goto(`http://localhost:8080`)
		await page.waitForSelector('div')
	} catch(error) {
		console.error(error)
	}
})

afterEach(async () => {
	await browser.close()
})

it('should return domodel-diary', async function() {
	const title = await page.title()
	assert.equal(title, "domodel-diary")
})

it('should have #auth', async function() {
	const authNode = await page.evaluate(() => document.querySelector("#auth"))
	assert.equal(authNode, null)
})
