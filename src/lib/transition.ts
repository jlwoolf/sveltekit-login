import { cubicOut } from 'svelte/easing';

export function slide(node: Element, { delay = 0, duration = 400, axis = 'x', amount = "100%", reverse = false }) {
    const translate_function = axis === 'x' ? "translateX" : "translateY";
    const amount_number = parseFloat(amount.match(/(\d+)/)![0]);
    const amount_type = amount.match(/(px|%|vh|vw)/)![0];
    return {
        delay,
        duration,
        cubicOut,
        css: (t: number) =>
            `transform: ${translate_function}(${(reverse ? "-" : "")}${(1 - t) * amount_number}${amount_type});`
    }
}

export function multimedia(node: Element, args: { size: number, transition: Function, props: Object }[] = []) {
    const window_width = window.innerWidth;
    const filtered_functions = args
        .sort((a, b) => { return a.size < b.size ? -1 : a.size < b.size ? 1 : 0 })
        .filter((a) => { return a.size < window_width });

    const transition_function = filtered_functions.length > 0 ? filtered_functions[filtered_functions.length - 1] : null;

    return transition_function ? transition_function.transition(node, transition_function.props) : {
        delay: 0, duration: 0, cubicOut, css: (t: number) => { }
    }
}