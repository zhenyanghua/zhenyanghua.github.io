import style from './style.module.css';
import { useEffect, useState } from 'preact/hooks';
import TextHighlight from '../TextHighlight';

export default function Search({ posts }) {
    const [term, setTerm] = useState('');
    const [activeIndex, setActiveIndex] = useState(null);
    const [selectedIndex, setSelectedIndex] = useState(null);
    const matches = posts.filter(post => post.title.toLowerCase().includes(term.trim().toLowerCase())).slice(0, 5);

    const handleChange = (e) => {
        setTerm(e.target.value);
        setActiveIndex(0);
    };

    const handleKeyDown = (e) => {
        let newActiveIndex = activeIndex;
        switch(e.key) {
            case 'ArrowDown':
                e.preventDefault();
                newActiveIndex = newActiveIndex === null ? 0 : (newActiveIndex + 1) % matches.length;
                break;
            case 'ArrowUp':
                e.preventDefault();
                newActiveIndex = newActiveIndex === null ? matches.length - 1 : (newActiveIndex - 1 + matches.length) % matches.length;
                break;
            case 'Enter':
                e.preventDefault();
                setSelectedIndex(newActiveIndex);
                break;
            case 'Escape':
                e.preventDefault();
                newActiveIndex = null;
                break;
        }
        setActiveIndex(newActiveIndex);
    }

    const handleBlur = (e) => {
        e.preventDefault();
        setActiveIndex(null);
    }

    const goTo = (url) => {
        location.assign(url);
    }
    
    useEffect(() => {
        if (selectedIndex !== null) {
            goTo(matches[selectedIndex].url)
        }
    }, [selectedIndex]);

    return (
        <div class={style.search} onKeyDown={handleKeyDown} onBlur={handleBlur}>
            <div class={style.searchBox}>
                <label for="search">Search Article</label>
                <input id="search" type="text" autocomplete="off" value={term} onInput={handleChange} />
            </div>
            <ul class={activeIndex === null || !matches[activeIndex] || !term.trim() ? style.hidden : ''}>
                {matches.map(post => 
                    <li key={post.url} 
                        class={activeIndex !== null && matches[activeIndex] && post.url === matches[activeIndex].url ? style.active : ''}
                        onClick={() => { goTo(post.url);}}>
                        <TextHighlight match={term}>{post.title}</TextHighlight>
                    </li>)}
            </ul>
        </div>
    );
}