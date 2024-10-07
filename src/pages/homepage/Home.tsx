import styles from './home.module.scss';

export default function HomePage(){

    return(
        <>
            <div className={styles.hero__section}>
                <h1>category-name</h1>
                <div className={styles.hero__cards}>
                    <div className={styles.card__second} id={styles.hero_card}>
                        <div className={styles.card__top}>
                            <h2>title</h2>
                            <p>categories</p>
                        </div>
                        <div className={styles.bottom__second}>
                            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec lobortis mi sagittis lacus tincidunt, at fringilla urna vulputate. Praesent quis ex aliquam lacus dignissim porttitor tempus non tortor. Pellentesque in mollis est. Suspendisse nec commodo massa. Duis congue eleifend porta. Praesent vitae elementum tortor. Ut at neque ac nibh pharetra convallis id porta ligula. Sed maximus iaculis auctor.</p>
                            <p className={styles.card__date}>date-added</p>
                            <button className={styles.card__votes}>xxx votes</button>
                        </div>
                    </div>
                    <div className={styles.card__first} id={styles.hero_card}>
                        <div className={styles.card__top}>
                            <h2>title</h2>
                            <p>categories</p>
                        </div>
                        <div className={styles.bottom__first}>
                            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec lobortis mi sagittis lacus tincidunt, at fringilla urna vulputate. Praesent quis ex aliquam lacus dignissim porttitor tempus non tortor. Pellentesque in mollis est. Suspendisse nec commodo massa. Duis congue eleifend porta. Praesent vitae elementum tortor. Ut at neque ac nibh pharetra convallis id porta ligula. Sed maximus iaculis auctor.</p>
                            <p className={styles.card__date}>date-added</p>
                            <button className={styles.card__votes}>xxx votes</button>
                        </div>
                    </div>
                    <div className={styles.card__third} id={styles.hero_card}>
                        <div className={styles.card__top}>
                            <h2>title</h2>
                            <p>categories</p>
                        </div>
                        <div className={styles.bottom__third}>
                            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec lobortis mi sagittis lacus tincidunt, at fringilla urna vulputate. Praesent quis ex aliquam lacus dignissim porttitor tempus non tortor. Pellentesque in mollis est. Suspendisse nec commodo massa. Duis congue eleifend porta. Praesent vitae elementum tortor. Ut at neque ac nibh pharetra convallis id porta ligula. Sed maximus iaculis auctor.</p>
                            <p className={styles.card__date}>date-added</p>
                            <button className={styles.card__votes}>xxx votes</button>
                        </div>
                    </div>
                </div>

            </div>

            <div className={styles.info__section}>
                <button className={styles.info__categories}>Categories</button>
                <div className={styles.info__container}>
                    <h2>Category</h2>
                    <div className={styles.info__cards}>
                        <div className={styles.info__card}>
                            <div className={styles.card__text}>
                                <h2>Title</h2>
                                <p>text</p>
                            </div>
                            <div className={styles.card__info}>
                                <li>Read More</li>
                                <p>budget</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}