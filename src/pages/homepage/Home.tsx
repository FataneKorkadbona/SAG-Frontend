import styles from './home.module.scss';

export default function HomePage(){

    return(
        <>

            <div className={styles.top}>
                <p>
                    Silver Text
                </p>
    ff        </div>

            <div className={styles.hero__section}>
                <h1>category-name</h1>
                <div className={styles.hero__cards}>
                    <div className={styles.card__second} id={styles.hero_card}>
                        <div className={styles.card__top}>
                            <h2>title</h2>
                            <p>categories</p>
                        </div>
                        <div className={styles.bottom__second}>
                            <p>description</p>
                            <button className={styles.card__votes}>xxx votes</button>
                        </div>
                    </div>
                    <div className={styles.card__first} id={styles.hero_card}>
                        <div className={styles.card__top}>
                            <h2>title</h2>
                            <p>categories</p>
                        </div>
                        <div className={styles.bottom__first}>
                            <p>description</p>
                            <button className={styles.card__votes}>xxx votes</button>
                        </div>
                    </div>
                    <div className={styles.card__third} id={styles.hero_card}>
                        <div className={styles.card__top}>
                            <h2>title</h2>
                            <p>categories</p>
                        </div>
                        <div className={styles.bottom__third}>
                            <p>description</p>
                            <button className={styles.card__votes}>xxx votes</button>
                        </div>
                    </div>
                </div>

            </div>


        </>
    )
}