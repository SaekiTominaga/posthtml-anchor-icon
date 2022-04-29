import posthtmlAnchorHost from '../dist/index.js';
import posthtml from 'posthtml';
import { describe, expect, test } from '@jest/globals';

describe('正常系', () => {
	test('class, hostInfo のみ指定', async () => {
		expect(
			(
				await posthtml([
					posthtmlAnchorHost({
						class: 'icon-anchor',
						hostInfo: [
							{
								host: 'example.com',
								site_name: 'Example com',
								icon_src: '/icon/com_example.svg',
							},
						],
					}),
				]).process('<a href="https://example.com/" class="icon-anchor">Link</a>')
			).html
		).toBe('<a href="https://example.com/">Link</a><img src="/icon/com_example.svg" alt="Example com">');
	});
	test('class, hostInfo のみ指定（変換対象外）', async () => {
		expect(
			(
				await posthtml([
					posthtmlAnchorHost({
						class: 'icon-anchor',
						hostInfo: [
							{
								host: 'example.net',
								site_name: 'Example net',
								icon_src: '/icon/net_example.svg',
							},
						],
					}),
				]).process(`
					<a href="https://example.com/">Link</a>
					<a href="https://example.com/" class="foo">Link</a>
					<a href="https://example.com/" class="icon-anchor">Link</a>`)
			).html
		).toBe(`
					<a href="https://example.com/">Link</a>
					<a href="https://example.com/" class="foo">Link</a>
					<a href="https://example.com/">Link</a>`);
	});
	test('全パラメーター設定', async () => {
		expect(
			(
				await posthtml([
					posthtmlAnchorHost({
						class: 'icon-anchor',
						hostInfo: [
							{
								host: 'example.com',
								site_name: 'Example com',
								icon_src: '/icon/com_example.svg',
							},
						],
						icon_class: 'host',
						icon_size: 16,
						icon_parentheses_before: '[',
						icon_parentheses_after: ']',
					}),
				]).process('<a href="https://example.com/" class="icon-anchor">Link</a>')
			).html
		).toBe('<a href="https://example.com/">Link</a><img src="/icon/com_example.svg" alt="[Example com]" width="16" height="16" class="host">');
	});
});

describe('異常系', () => {
	test('href 属性無し', async () => {
		expect((await posthtml([posthtmlAnchorHost({ class: 'icon-anchor' })]).process('<a class="icon-anchor">Link</a>')).html).toBe('<a>Link</a>');
	});
	test('相対パス', async () => {
		expect((await posthtml([posthtmlAnchorHost({ class: 'icon-anchor' })]).process('<a href="/" class="icon-anchor">Link</a>')).html).toBe(
			'<a href="/">Link</a>'
		);
	});
});
