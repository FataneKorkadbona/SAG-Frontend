import  {useState, useContext} from 'react';
import styles from './home.module.scss';
import {useNavigate} from "react-router-dom";
import { HeroCard } from './card.tsx';
import { UserContext } from '../../providers.tsx';


export default function HomePage() {

    const [isCategoryWindowVisible, setCategoryWindowVisible] = useState(false);
    const navigate = useNavigate();
    const user = useContext(UserContext); // Define user using useContext


    const toggleCategoryWindow = () => {
        setCategoryWindowVisible(!isCategoryWindowVisible);
    };

    const hideCategoryWindow = () => {
        setCategoryWindowVisible(false);
    };

    const buttonlogin = () => {
        if (!user) {
            navigate("/login");
        }
    }

    return (
        <>
            {/* JSX content */}
            <div className={styles.hero__section}>
                <h1>category-name</h1>
                <div className={styles.hero__cards}>
                    <HeroCard
                        title="title"
                        category="category"
                        text="text"
                        dateAdded="date-added"
                        votes="xxx"
                        cardClass={styles.card__second}
                        bottomClass={styles.bottom__second}
                        topID={styles.top__second}
                        onButtonClick={buttonlogin}
                    />
                    <HeroCard
                        title="title"
                        category="category"
                        text="text"
                        dateAdded="date-added"
                        votes="xxx"
                        cardClass={styles.card__first}
                        bottomClass={styles.bottom__first}
                        topID={styles.top__first}
                        onButtonClick={buttonlogin}
                    />
                    <HeroCard
                        title="title"
                        category="category"
                        text="text"
                        dateAdded="date-added"
                        votes="xxx"
                        cardClass={styles.card__third}
                        bottomClass={styles.bottom__third}
                        topID={styles.top__third}
                        onButtonClick={buttonlogin}
                    />
                </div>
            </div>

            <div className={styles.info__section}>
                <button className={styles.info__categories} onClick={toggleCategoryWindow}>Categories</button>
                <div className={`${styles.category__window} ${isCategoryWindowVisible ? styles.visible : ''}`}>
                    <div className={styles.window__list}>
                        <button>category1</button>
                    </div>
                    <button onClick={hideCategoryWindow}>Search</button>
                </div>
                <div className={styles.info__container}>
                    <h2>Category</h2>
                    <div className={styles.info__cards}>
                        <div className={styles.info__fullcard}>
                            <div className={styles.fullcard__text}>
                                <h2>Title</h2>
                                <p>Nam quis nulla. Integer malesuada. In in enim a arcu imperdiet malesuada. Sed
                                    vel
                                    lectus. Donec odio urna, tempus molestie, porttitor ut, iaculis quis, sem.
                                    Phasellus
                                    rhoncus. Aenean id metus id velit ullamcorper pulvinar. Vestibulum fermentum
                                    tortor
                                    id mi. Pellentesque ipsum. Nulla non arcu lacinia neque faucibus fringilla.
                                    Nulla
                                    non lectus sed nisl molestie malesuada. Proin in tellus sit amet nibh dignissim
                                    sagittis. Vivamus luctus egestas leo. Maecenas sollicitudin. Nullam rhoncus
                                    aliquam
                                    metus. Etiam egestas wisi a erat.
                                    Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Nullam feugiat, turpis
                                    at
                                    pulvinar vulputate, erat libero tristique tellus, nec bibendum odio risus sit
                                    amet
                                    ante. Aliquam erat volutpat. Nunc auctor. Mauris pretium quam et urna. Fusce
                                    nibh.
                                    Duis risus. Curabitur sagittis hendrerit ante. Aliquam erat volutpat. Vestibulum
                                    erat nulla, ullamcorper nec, rutrum non, nonummy ac, erat. Duis condimentum
                                    augue id
                                    magna semper rutrum. Nullam justo enim, consectetuer nec, ullamcorper ac,
                                    vestibulum
                                    in, elit. Proin pede metus, vulputate nec, fermentum fringilla, vehicula vitae,
                                    justo. Fusce consectetuer risus a nunc. Aliquam ornare wisi eu metus. Integer
                                    pellentesque quam vel velit. Duis pulvinar.
                                    Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Morbi gravida libero
                                    nec
                                    velit. Morbi scelerisque luctus velit. Etiam dui sem, fermentum vitae, sagittis
                                    id,
                                    malesuada in, quam. Proin mattis lacinia justo. Vestibulum facilisis auctor
                                    urna.
                                    Aliquam in lorem sit amet leo accumsan lacinia. Integer rutrum, orci vestibulum
                                    ullamcorper ultricies, lacus quam ultricies odio, vitae placerat pede sem sit
                                    amet
                                    enim. Phasellus et lorem id felis nonummy placerat. Fusce dui leo, imperdiet in,
                                    aliquam sit amet, feugiat eu, orci. Aenean vel massa quis mauris vehicula
                                    lacinia.
                                    Quisque tincidunt scelerisque libero. Maecenas libero. Etiam dictum tincidunt
                                    diam.
                                    Donec ipsum massa, ullamcorper in, auctor et, scelerisque sed, est. Suspendisse
                                    nisl. Sed convallis magna eu sem. Cras pede libero, dapibus nec, pretium sit
                                    amet,
                                    tempor quis, urna.
                                    Etiam posuere quam ac quam. Maecenas aliquet accumsan leo. Nullam dapibus
                                    fermentum
                                    ipsum. Etiam quis quam. Integer lacinia. Nulla est. Nulla turpis magna, cursus
                                    sit
                                    amet, suscipit a, interdum id, felis. Integer vulputate sem a nibh rutrum
                                    consequat.
                                    Maecenas lorem. Pellentesque pretium lectus id turpis. Etiam sapien elit,
                                    consequat
                                    eget, tristique non, venenatis quis, ante. Fusce wisi. Phasellus faucibus
                                    molestie
                                    ni</p>
                            </div>
                            <div className={styles.fullcard__categories}>
                                <p>Category</p>
                            </div>
                            <div className={styles.fullcard__info}>
                                <button onClick={buttonlogin}><p>antal</p>Votes</button>
                                <p>budget</p>
                            </div>
                        </div>
                        <div className={styles.card__list}>
                            <div className={styles.info__card}>
                                <div className={styles.card__text}>
                                    <h2>Title</h2>
                                    <p>Nam quis nulla. Integer malesuada. In in enim a arcu imperdiet malesuada. Sed
                                        vel lectus. Donec odio urna, tempus molestie, porttitor ut, iaculis quis, sem.
                                        Phasellus rhoncus. Aenean id metus id velit ullamcorper pulvinar. Vestibulum
                                        fermentum
                                        tortor id mi. Pellentesque ipsum. Nulla non arcu lacinia neque faucibus
                                        fringilla.
                                        Nulla non lectus sed nisl molestie malesuada. Proin in tellus sit amet nibh
                                        dignissim sagittis. Vivamus luctus egestas leo. Maecenas sollicitudin. Nullam
                                        rhoncus
                                        aliquam metus. Etiam egestas wisi a erat. Lorem ipsum dolor sit amet,
                                        consectetuer adipiscing elit. Nullam feugiat, turpis
                                        at pulvinar vulputate, erat libero tristique tellus, nec bibendum odio risus
                                        sit amet ante. Aliquam erat volutpat. Nunc auctor. Mauris pretium quam et urna.
                                        Fusce nibh.</p>
                                </div>
                                <div className={styles.card__info}>
                                    <button>Read More</button>
                                    <p>budget</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}