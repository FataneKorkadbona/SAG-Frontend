import { useEffect, useState } from 'react';
import styles from './suggestion.module.scss';

type CharLimits = {
    suggestion: number;
    title: number;
    budget: number;
};

export default function Suggestion() {
    const [charCount, setCharCount] = useState<CharLimits>({
        suggestion: 2500,
        title: 50,
        budget: 6
    });

    useEffect(() => {
        const textareas = document.querySelectorAll('textarea');

        const handleInput = (event: Event) => {
            const target = event.target as HTMLTextAreaElement;
            const limits: CharLimits = {
                suggestion: 2500,
                title: 50,
                budget: 6
            };
            const maxLength = limits[target.id as keyof CharLimits];
            if (target.value.length > maxLength) {
                target.value = target.value.slice(0, maxLength);
            }
            setCharCount(prevCount => ({
                ...prevCount,
                [target.id]: maxLength - target.value.length
            }));
        };

        const handleBudgetInput = (event: Event) => {
            const target = event.target as HTMLTextAreaElement;
            target.value = target.value.replace(/[^0-9]/g, '');
        };

        textareas.forEach(textarea => {
            textarea.addEventListener('input', handleInput);
            if (textarea.id === 'budget') {
                textarea.addEventListener('input', handleBudgetInput);
            }
        });

        return () => {
            textareas.forEach(textarea => {
                textarea.removeEventListener('input', handleInput);
                if (textarea.id === 'budget') {
                    textarea.removeEventListener('input', handleBudgetInput);
                }
            });
        };
    }, []);

    return (
        <>
            <div className={styles.card__container}>
                <div className={styles.card}>
                    <h1>Submit a suggestion</h1>
                    <form>
                        <div className={styles.suggestions__container}>
                            <div className={styles.suggestions__left}>
                                <label htmlFor="suggestion">Suggestion</label>
                                <textarea name="suggestion" id="suggestion" placeholder={"write a description of the suggestion here"}/>
                                <div className={styles.countdown}>{charCount.suggestion} characters left</div>
                            </div>
                            <div className={styles.suggestions__right}>
                                <label htmlFor="title">Title</label>
                                <textarea name="title" id="title" rows={1} placeholder={"title"}/>
                                <div className={styles.countdown}>{charCount.title} characters left</div>
                                <label htmlFor="budget">Estimated Budget</label>
                                <textarea name="budget" id="budget" rows={1} placeholder={"budget: kr"}/>
                                <div className={styles.countdown}>{charCount.budget} characters left</div>
                                <label htmlFor="category_list">Choose a category:</label>
                                <select name="category_list" id="category_list" defaultValue="category">
                                    <option value="category" className={styles.hiddenOption}>none</option>
                                    <option value="category2">category2</option>
                                    <option value="category3">category3</option>
                                    <option value="category4">category4</option>
                                    <option value="category5">category5</option>
                                </select>
                                <button type="submit">Submit</button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </>
    );
}