# posthtml-anchor-icon

[![npm version](https://badge.fury.io/js/posthtml-anchor-icon.svg)](https://badge.fury.io/js/posthtml-anchor-icon)
[![Build Status](https://app.travis-ci.com/SaekiTominaga/posthtml-anchor-icon.svg?branch=main)](https://app.travis-ci.com/SaekiTominaga/posthtml-anchor-icon)
[![Coverage Status](https://coveralls.io/repos/github/SaekiTominaga/posthtml-anchor-icon/badge.svg)](https://coveralls.io/github/SaekiTominaga/posthtml-anchor-icon)

<img src="https://posthtml.github.io/posthtml/logo.svg" alt="PostHTML logo" height="100">

Insert icon immediately after `<a href>` using PostHTML

## Transform sample

### Examples of specifying only required parameters

`{ class: 'icon-anchor', host_info: [ { host: 'example.com', site_name: 'Example', icon_src: '/icon/example.svg' }] }`

Before:
``` html
<a href="https://example.com/" class="icon-anchor">Link</a>
<a href="https://example.com/" class="foo icon-anchor bar">Link</a>
```

After:
``` html
<a href="https://example.com/">Link</a><img src="/icon/example.svg" alt="Example">
<a href="https://example.com/" class="foo bar">Link</a><img src="/icon/example.svg" alt="Example">
```

### Examples of specifying all parameters

`{ class: 'icon-anchor', host_info: [ { host: 'example.com', site_name: 'Example', icon_src: '/icon/example.svg' }], icon_class: 'icon', icon_size: 16, icon_parentheses_before: '[', icon_parentheses_after: ']' }`

Before:
``` html
<a href="https://example.com/" class="icon-anchor">Link</a>
```

After:
``` html
<a href="https://example.com/">Link</a><img src="/icon/example.svg" alt="[Example]" width="16" height="16" class="icon">
```

### Examples of no transform

``` html
<a class="icon-anchor">Link</a><!-- No `href` attribute -->
<a href="/" class="icon-anchor">Link</a><!-- The `href` attribute value must be an absolute URL for this feature to work -->
```

## Install

```bash
npm i -D posthtml-anchor-icon
```

## Usage

``` js
import posthtml from 'posthtml';
import posthtmlAnchorIcon from 'posthtml-anchor-icon';

const beforeHtml = '<!DOCTYPE html>...';

const result = posthtml([
	posthtmlAnchorIcon({
		class: 'host-anchor',
		host_info: [
			{
				host: 'foo.example.com',
				site_name: 'Example com - foo',
				icon_src: '/icon/com_example_foo.svg',
			},
			{
				host: 'bar.example.com',
				site_name: 'Example com - bar',
				icon_src: '/icon/com_example_bar.svg',
			},
			{
				host: 'example.net',
				site_name: 'Example net',
				icon_src: '/icon/net_example.png',
			},
		],
		icon_class: 'host',
		icon_size: 16,
		icon_parentheses_before: '[',
		icon_parentheses_after: ']',
	})
]).process(beforeHtml);

const afterHtml = result.html;
```

## Options

<dl>
<dt><code>class</code> [Required]</dt>
<dd>Class name of the <code>&lt;a&gt;</code> element to process.</dd>
<dt><code>host_info</code> [Required]</dt>
<dd>List of the following objects:
<ul>
<li><code>host</code> [Required]: Domain name (Exact domain name must be defined, including subdomains)</li>
<li><code>site_name</code> [Required]: Site name (Used in <code>alt</code> attribute values)</li>
<li><code>icon_src</code> [Required]: Address of the icon file (Used in <code>src</code> attribute values)</li>
</ul>
</dd>
<dt><code>icon_class</code> [Optional]</dt>
<dd>Class name of the <code>&lt;img&gt;</code> element displaying icon.</dd>
<dt><code>icon_size</code> [Optional]</dt>
<dd>Icon size. (Used in <code>width</code> and <code>height</code> attribute values)</dd>
<dt><code>icon_parentheses_before</code> [Optional]</dt>
<dd>Opening parentheses at site name. (Used in <code>alt</code> attribute values)</dd>
<dt><code>icon_parentheses_after</code> [Optional]</dt>
<dd>Closing parentheses at site name. (Used in <code>alt</code> attribute values)</dd>
</dl>
