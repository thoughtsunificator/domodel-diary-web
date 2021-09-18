import path from 'path'
import puppeteer from 'puppeteer'
import { fileURLToPath  } from "url"

let browser
let page

export async function setUp(done) {
	try {
		browser = await puppeteer.launch({
			headless: true
		})
		page = await browser.newPage()
		await page.goto(`http://localhost:8080`)
		await page.waitForSelector('div');
		done()
	} catch(error) {
		console.error(error)
	}
}

export async function tearDown(done) {
	await browser.close()
	done()
}

export async function diary(test) {
	test.expect(1)
	const title = await page.title()
	test.strictEqual(title, "domodel-diary")
	const x = await page.evaluate(() => {
		return document.body.innerHTML
	});
}
