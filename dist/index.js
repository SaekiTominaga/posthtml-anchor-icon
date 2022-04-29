import PostHTMLMatchClass from '@saekitominaga/posthtml-match-class';
export default (options) => {
    const targetElementInfo = {
        class: options.class,
    };
    const iconElementInfo = {
        hostInfo: options.hostInfo,
        class: options.icon_class,
        size: options.icon_size,
        parentheses_before: options.icon_parentheses_before ?? '',
        parentheses_after: options.icon_parentheses_after ?? '',
    };
    return (tree) => {
        tree.match({ tag: 'a' }, (node) => {
            const content = node.content;
            const attrs = node.attrs;
            const postHTMLMatchClass = new PostHTMLMatchClass(node);
            if (!postHTMLMatchClass.refine(targetElementInfo.class)) {
                return node;
            }
            if (attrs?.href === undefined) {
                console.warn('No `href` attribute', node);
                return node;
            }
            let url;
            try {
                url = new URL(attrs.href);
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
            }
            catch (e) {
                console.warn(e.message, node);
                return node;
            }
            const hostInfo = iconElementInfo.hostInfo.find((hostInfo) => hostInfo.host === url.host);
            if (hostInfo === undefined) {
                console.warn('Undefined host name', node);
                return node;
            }
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            return [
                {
                    tag: 'a',
                    attrs: attrs,
                    content: content,
                },
                {
                    tag: 'img',
                    attrs: {
                        src: hostInfo.icon_src,
                        alt: `${iconElementInfo.parentheses_before}${hostInfo.site_name}${iconElementInfo.parentheses_after}`,
                        width: iconElementInfo.size,
                        height: iconElementInfo.size,
                        class: iconElementInfo.class,
                    },
                },
            ];
        });
        return tree;
    };
};
//# sourceMappingURL=index.js.map