import * as PostHTML from 'posthtml';
interface Options {
    readonly class: string;
    readonly host_info: {
        host: string;
        site_name: string;
        icon_src: string;
    }[];
    readonly icon_class?: string;
    readonly icon_size?: number;
    readonly icon_parentheses_before?: string;
    readonly icon_parentheses_after?: string;
}
declare const _default: (options: Options) => (tree: PostHTML.Node) => PostHTML.Node;
export default _default;
//# sourceMappingURL=index.d.ts.map