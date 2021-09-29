import style from './style.module.css';
import { kmpSearch } from '../../utils/string';

export default function TextHighlight ({ children, match }) {
    if (typeof children !== 'string' || !match.trim()) return children;

    const nodes = [];
    const matched = kmpSearch(match.trim().toLowerCase(), children.trim().toLocaleLowerCase());

    if (matched.length === 0) return children;

    // i to track the start of the plain text
    let i = 0;
    // j to track the start of the highlight, in other words, the end of plain text
    let j = 0;

    while (i < children.length && j < matched.length) {
        const matchingStartingIndex = matched[j];
        const matchingEndingIndexExclusive = matched[j] + match.trim().length;
        // plain text range [i, j)
        const plainText = children.substring(i, matchingStartingIndex);
        // highlight text range [m[j], m[j] + len(pattern))
        const highlight = children.substring(matchingStartingIndex, matchingEndingIndexExclusive);
        nodes.push(plainText);
        nodes.push(<span class={style.textHighlight}>{highlight}</span>);
        // move i to the letter after j's matching pattern
        i = matchingEndingIndexExclusive;
        // moveup j to read the next matching starting index
        j++;
    }
    
    // tailing plain text
    if(i < children.length) {
        nodes.push(children.substring(i));
    }
    return (
        <>
            {nodes}
        </>
    )
}