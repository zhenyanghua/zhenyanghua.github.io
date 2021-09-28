import style from './style.module.css';

export default function TextHighlight ({ children, match }) {
    if (typeof children !== 'string' || !match.trim()) return children;

    const nodes = [];
    let i = 0;
    let noMatchStartIndex = 0;
    while (i < children.length) {
        let substring = children.substring(i, i + match.length);
        if (substring.toLowerCase() === match.toLowerCase()) {
            nodes.push(children.substring(noMatchStartIndex, i));
            nodes.push(<span class={style.textHighlight}>{substring}</span>);
            i = i + match.length;
            noMatchStartIndex = i;
        } else {
            i++;
        }
    }
    if(noMatchStartIndex < i) {
        nodes.push(children.substring(noMatchStartIndex));
    }
    return (
        <>
            {nodes}
        </>
    )
}