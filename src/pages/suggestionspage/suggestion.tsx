import styles from './suggestion.module.scss';

export default function Suggestion() {

    return (
        <>
            <div className={styles.card__container}>
                <div className={styles.card}>
                    <h1>Submit a suggestion</h1>
                    <form>
                        <label htmlFor="suggestion">Suggestion:</label>
                        <textarea name="suggestion" id="suggestion" rows={5} />
                        <button type="submit">Submit</button>
                    </form>
                </div>
            </div>
        </>
    )
}