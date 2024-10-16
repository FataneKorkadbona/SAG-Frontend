import {useState, FormEvent, useContext} from 'react';
import styles from './home.module.scss';
import ReactModal from 'react-modal';
import {useMutation} from "@tanstack/react-query";
import axios from "axios"
import {useNavigate} from "react-router-dom";
import { UserContext } from "../../providers.tsx";


export default function HomePage() {

    const [isCategoryWindowVisible, setCategoryWindowVisible] = useState(false);
    const [email, setEmail] = useState("");
    const navigate = useNavigate();
    const user = useContext(UserContext);

    const loginRequest = useMutation({
        mutationFn: () => {
            console.log("Sending email:", email);
            return axios.post(import.meta.env.VITE_API_URL + "/login", { email }, {
                headers: {
                    'Content-Type': 'application/json'
                }
            });
        },
        onSuccess: (res) => {
            user.setUser(res.data);
            navigate("/");
        },
        onError: (error) => {
            console.error("Login request failed:", error);
        }
    });

    function handleSubmit(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();
        if (email.trim() === "") {
            console.error("Email is required");
            return;
        }
        console.log("Form submitted with email:", email);
        loginRequest.mutate();
    }

    const toggleCategoryWindow = () => {
        setCategoryWindowVisible(!isCategoryWindowVisible);
    };

    const hideCategoryWindow = () => {
        setCategoryWindowVisible(false);
    };

    const [modalIsOpen, setModalIsOpen] = useState(false);

    const openModal = () => setModalIsOpen(true);
    const closeModal = () => setModalIsOpen(false);

    return (
        <>
            {/* JSX content */}
            <div className={styles.hero__section}>
                <h1>category-name</h1>
                <div className={styles.hero__cards}>
                    <div className={styles.card__second} id={styles.hero_card}>
                        <div className={styles.card__top}>

                            <h2 className={styles.no__margin}>title</h2>
                            <div className={styles.cat__box}>
                                <p className={styles.category}>123456789012345</p>
                                <p className={styles.category}>Bonmussadsdadsd</p>
                                <p className={styles.category}>BraBardsadsdadd</p>
                            </div>
                        </div>
                        <div className={styles.bottom__second}>
                            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec lobortis mi sagittis
                                lacus tincidunt, at fringilla urna vulputate. Praesent quis ex aliquam lacus
                                dignissim porttitor tempus non tortor. Pellentesque in mollis est. Suspendisse nec
                                commodo massa. Duis congue eleifend porta. Praesent vitae elementum tortor. Ut at
                                neque ac nibh pharetra convallis id porta ligula. Sed maximus iaculis auctor.</p>
                            <p className={styles.card__date}>date-added</p>
                            <button className={styles.card__votes} onClick={openModal}>xxx votes</button>
                        </div>
                    </div>
                    <div className={styles.card__first} id={styles.hero_card}>
                        <div className={styles.card__top}>
                            <h2 className={styles.no__margin}>title</h2>
                            <div className={styles.cat__box}>
                                <p className={styles.category}>123456789012345</p>
                                <p className={styles.category}>BraBardsadsdadd</p>
                                <p className={styles.category}>BraBardsadsdadd</p>
                            </div>
                        </div>
                        <div className={styles.bottom__first}>
                            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec lobortis mi sagittis
                                lacus
                                tincidunt, at fringilla urna vulputate. Praesent quis ex aliquam lacus dignissim
                                porttitor tempus non tortor. Pellentesque in mollis est. Suspendisse nec commodo
                                massa. Duis congue eleifend porta. Praesent vitae elementum tortor. Ut at neque ac
                                nibh pharetra convallis id porta ligula. Sed maximus iaculis auctor.</p>
                            <p className={styles.card__date}>date-added</p>
                            <button className={styles.card__votes} onClick={openModal}>xxx votes</button>
                        </div>
                    </div>
                    <div className={styles.card__third} id={styles.hero_card}>
                        <div className={styles.card__top}>
                            <h2 className={styles.no__margin}>title</h2>
                            <div className={styles.cat__box}>
                                <p className={styles.category}>BraBardsadsdadd</p>
                                <p className={styles.category}>BraBardsadsdadd</p>
                                <p className={styles.category}>BraBardsadsdadd</p>
                            </div>
                        </div>
                        <div className={styles.bottom__third}>
                            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec lobortis mi sagittis
                                lacus tincidunt, at fringilla urna vulputate. Praesent quis ex aliquam lacus
                                dignissim porttitor tempus non tortor. Pellentesque in mollis est. Suspendisse nec
                                commodo massa. Duis congue eleifend porta. Praesent vitae elementum tortor. Ut at
                                neque ac nibh pharetra convallis id porta ligula. Sed maximus iaculis auctor.</p>
                            <p className={styles.card__date}>date-added</p>
                            <button className={styles.card__votes} onClick={openModal}>xxx votes</button>
                        </div>
                    </div>
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
                                <button onClick={openModal}><p>antal</p>Votes</button>
                                <p>budget</p>
                            </div>
                        </div>
                        <div className={styles.card__list}>
                            <div className={styles.info__card}>
                                <div className={styles.card__text}>
                                    <h2>Title</h2>
                                    <p>Nam quis nulla. Integer malesuada. In in enim a arcu imperdiet malesuada. Sed
                                        vel
                                        lectus. Donec odio urna, tempus molestie, porttitor ut, iaculis quis, sem.
                                        Phasellus
                                        rhoncus. Aenean id metus id velit ullamcorper pulvinar. Vestibulum fermentum
                                        tortor
                                        id mi. Pellentesque ipsum. Nulla non arcu lacinia neque faucibus fringilla.
                                        Nulla
                                        non lectus sed nisl molestie malesuada. Proin in tellus sit amet nibh
                                        dignissim
                                        sagittis. Vivamus luctus egestas leo. Maecenas sollicitudin. Nullam rhoncus
                                        aliquam
                                        metus. Etiam egestas wisi a erat.
                                        Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Nullam feugiat,
                                        turpis
                                        at
                                        pulvinar vulputate, erat libero tristique tellus, nec bibendum odio risus
                                        sit
                                        amet
                                        ante. Aliquam erat volutpat. Nunc auctor. Mauris pretium quam et urna. Fusce
                                        nibh.
                                        Duis risus. Curabitur sagittis hendrerit ante. Aliquam erat volutpat.
                                        Vestibulum
                                        erat nulla, ullamcorper nec, rutrum non, nonummy ac, erat. Duis condimentum
                                        augue id
                                        magna semper rutrum. Nullam justo enim, consectetuer nec, ullamcorper ac,
                                        vestibulum
                                        in, elit. Proin pede metus, vulputate nec, fermentum fringilla, vehicula
                                        vitae,
                                        justo. Fusce consectetuer risus a nunc. Aliquam ornare wisi eu metus.
                                        Integer
                                        pellentesque quam vel velit. Duis pulvinar.
                                        Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Morbi gravida
                                        libero
                                        nec
                                        velit. Morbi scelerisque luctus velit. Etiam dui sem, fermentum vitae,
                                        sagittis
                                        id,
                                        malesuada in, quam. Proin mattis lacinia justo. Vestibulum facilisis auctor
                                        urna.
                                        Aliquam in lorem sit amet leo accumsan lacinia. Integer rutrum, orci
                                        vestibulum
                                        ullamcorper ultricies, lacus quam ultricies odio, vitae placerat pede sem
                                        sit
                                        amet
                                        enim. Phasellus et lorem id felis nonummy placerat. Fusce dui leo, imperdiet
                                        in,
                                        aliquam sit amet, feugiat eu, orci. Aenean vel massa quis mauris vehicula
                                        lacinia.
                                        Quisque tincidunt scelerisque libero. Maecenas libero. Etiam dictum
                                        tincidunt
                                        diam.
                                        Donec ipsum massa, ullamcorper in, auctor et, scelerisque sed, est.
                                        Suspendisse
                                        nisl. Sed convallis magna eu sem. Cras pede libero, dapibus nec, pretium sit
                                        amet,
                                        tempor quis, urna.
                                        Etiam posuere quam ac quam. Maecenas aliquet accumsan leo. Nullam dapibus
                                        fermentum
                                        ipsum. Etiam quis quam. Integer lacinia. Nulla est. Nulla turpis magna,
                                        cursus
                                        sit
                                        amet, suscipit a, interdum id, felis. Integer vulputate sem a nibh rutrum
                                        consequat.
                                        Maecenas lorem. Pellentesque pretium lectus id turpis. Etiam sapien elit,
                                        consequat
                                        eget, tristique non, venenatis quis, ante. Fusce wisi. Phasellus faucibus
                                        molestie
                                        ni</p>
                                </div>
                                <div className={styles.card__info}>
                                    <button>Read More</button>
                                    <p>budget</p>
                                </div>
                            </div>
                            <div className={styles.info__card}>
                                <div className={styles.card__text}>
                                    <h2>Title</h2>
                                    <p>Nam quis nulla. Integer malesuada. In in enim a arcu imperdiet malesuada. Sed
                                        vel
                                        lectus. Donec odio urna, tempus molestie, porttitor ut, iaculis quis, sem.
                                        Phasellus
                                        rhoncus. Aenean id metus id velit ullamcorper pulvinar. Vestibulum fermentum
                                        tortor
                                        id mi. Pellentesque ipsum. Nulla non arcu lacinia neque faucibus fringilla.
                                        Nulla
                                        non lectus sed nisl molestie malesuada. Proin in tellus sit amet nibh
                                        dignissim
                                        sagittis. Vivamus luctus egestas leo. Maecenas sollicitudin. Nullam rhoncus
                                        aliquam
                                        metus. Etiam egestas wisi a erat.
                                        Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Nullam feugiat,
                                        turpis
                                        at
                                        pulvinar vulputate, erat libero tristique tellus, nec bibendum odio risus
                                        sit
                                        amet
                                        ante. Aliquam erat volutpat. Nunc auctor. Mauris pretium quam et urna. Fusce
                                        nibh.
                                        Duis risus. Curabitur sagittis hendrerit ante. Aliquam erat volutpat.
                                        Vestibulum
                                        erat nulla, ullamcorper nec, rutrum non, nonummy ac, erat. Duis condimentum
                                        augue id
                                        magna semper rutrum. Nullam justo enim, consectetuer nec, ullamcorper ac,
                                        vestibulum
                                        in, elit. Proin pede metus, vulputate nec, fermentum fringilla, vehicula
                                        vitae,
                                        justo. Fusce consectetuer risus a nunc. Aliquam ornare wisi eu metus.
                                        Integer
                                        pellentesque quam vel velit. Duis pulvinar.
                                        Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Morbi gravida
                                        libero
                                        nec
                                        velit. Morbi scelerisque luctus velit. Etiam dui sem, fermentum vitae,
                                        sagittis
                                        id,
                                        malesuada in, quam. Proin mattis lacinia justo. Vestibulum facilisis auctor
                                        urna.
                                        Aliquam in lorem sit amet leo accumsan lacinia. Integer rutrum, orci
                                        vestibulum
                                        ullamcorper ultricies, lacus quam ultricies odio, vitae placerat pede sem
                                        sit
                                        amet
                                        enim. Phasellus et lorem id felis nonummy placerat. Fusce dui leo, imperdiet
                                        in,
                                        aliquam sit amet, feugiat eu, orci. Aenean vel massa quis mauris vehicula
                                        lacinia.
                                        Quisque tincidunt scelerisque libero. Maecenas libero. Etiam dictum
                                        tincidunt
                                        diam.
                                        Donec ipsum massa, ullamcorper in, auctor et, scelerisque sed, est.
                                        Suspendisse
                                        nisl. Sed convallis magna eu sem. Cras pede libero, dapibus nec, pretium sit
                                        amet,
                                        tempor quis, urna.
                                        Etiam posuere quam ac quam. Maecenas aliquet accumsan leo. Nullam dapibus
                                        fermentum
                                        ipsum. Etiam quis quam. Integer lacinia. Nulla est. Nulla turpis magna,
                                        cursus
                                        sit
                                        amet, suscipit a, interdum id, felis. Integer vulputate sem a nibh rutrum
                                        consequat.
                                        Maecenas lorem. Pellentesque pretium lectus id turpis. Etiam sapien elit,
                                        consequat
                                        eget, tristique non, venenatis quis, ante. Fusce wisi. Phasellus faucibus
                                        molestie
                                        ni</p>
                                </div>
                                <div className={styles.card__info}>
                                    <button>Read More</button>
                                    <p>budget</p>
                                </div>
                            </div>
                            <div className={styles.info__card}>
                                <div className={styles.card__text}>
                                    <h2>Title</h2>
                                    <p>Nam quis nulla. Integer malesuada. In in enim a arcu imperdiet malesuada. Sed
                                        vel
                                        lectus. Donec odio urna, tempus molestie, porttitor ut, iaculis quis, sem.
                                        Phasellus
                                        rhoncus. Aenean id metus id velit ullamcorper pulvinar. Vestibulum fermentum
                                        tortor
                                        id mi. Pellentesque ipsum. Nulla non arcu lacinia neque faucibus fringilla.
                                        Nulla
                                        non lectus sed nisl molestie malesuada. Proin in tellus sit amet nibh
                                        dignissim
                                        sagittis. Vivamus luctus egestas leo. Maecenas sollicitudin. Nullam rhoncus
                                        aliquam
                                        metus. Etiam egestas wisi a erat.
                                        Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Nullam feugiat,
                                        turpis
                                        at
                                        pulvinar vulputate, erat libero tristique tellus, nec bibendum odio risus
                                        sit
                                        amet
                                        ante. Aliquam erat volutpat. Nunc auctor. Mauris pretium quam et urna. Fusce
                                        nibh.
                                        Duis risus. Curabitur sagittis hendrerit ante. Aliquam erat volutpat.
                                        Vestibulum
                                        erat nulla, ullamcorper nec, rutrum non, nonummy ac, erat. Duis condimentum
                                        augue id
                                        magna semper rutrum. Nullam justo enim, consectetuer nec, ullamcorper ac,
                                        vestibulum
                                        in, elit. Proin pede metus, vulputate nec, fermentum fringilla, vehicula
                                        vitae,
                                        justo. Fusce consectetuer risus a nunc. Aliquam ornare wisi eu metus.
                                        Integer
                                        pellentesque quam vel velit. Duis pulvinar.
                                        Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Morbi gravida
                                        libero
                                        nec
                                        velit. Morbi scelerisque luctus velit. Etiam dui sem, fermentum vitae,
                                        sagittis
                                        id,
                                        malesuada in, quam. Proin mattis lacinia justo. Vestibulum facilisis auctor
                                        urna.
                                        Aliquam in lorem sit amet leo accumsan lacinia. Integer rutrum, orci
                                        vestibulum
                                        ullamcorper ultricies, lacus quam ultricies odio, vitae placerat pede sem
                                        sit
                                        amet
                                        enim. Phasellus et lorem id felis nonummy placerat. Fusce dui leo, imperdiet
                                        in,
                                        aliquam sit amet, feugiat eu, orci. Aenean vel massa quis mauris vehicula
                                        lacinia.
                                        Quisque tincidunt scelerisque libero. Maecenas libero. Etiam dictum
                                        tincidunt
                                        diam.
                                        Donec ipsum massa, ullamcorper in, auctor et, scelerisque sed, est.
                                        Suspendisse
                                        nisl. Sed convallis magna eu sem. Cras pede libero, dapibus nec, pretium sit
                                        amet,
                                        tempor quis, urna.
                                        Etiam posuere quam ac quam. Maecenas aliquet accumsan leo. Nullam dapibus
                                        fermentum
                                        ipsum. Etiam quis quam. Integer lacinia. Nulla est. Nulla turpis magna,
                                        cursus
                                        sit
                                        amet, suscipit a, interdum id, felis. Integer vulputate sem a nibh rutrum
                                        consequat.
                                        Maecenas lorem. Pellentesque pretium lectus id turpis. Etiam sapien elit,
                                        consequat
                                        eget, tristique non, venenatis quis, ante. Fusce wisi. Phasellus faucibus
                                        molestie
                                        ni</p>
                                </div>
                                <div className={styles.card__info}>
                                    <button>Read More</button>
                                    <p>budget</p>
                                </div>
                            </div>
                            <div className={styles.info__card}>
                                <div className={styles.card__text}>
                                    <h2>Title</h2>
                                    <p>Nam quis nulla. Integer malesuada. In in enim a arcu imperdiet malesuada. Sed
                                        vel
                                        lectus. Donec odio urna, tempus molestie, porttitor ut, iaculis quis, sem.
                                        Phasellus
                                        rhoncus. Aenean id metus id velit ullamcorper pulvinar. Vestibulum fermentum
                                        tortor
                                        id mi. Pellentesque ipsum. Nulla non arcu lacinia neque faucibus fringilla.
                                        Nulla
                                        non lectus sed nisl molestie malesuada. Proin in tellus sit amet nibh
                                        dignissim
                                        sagittis. Vivamus luctus egestas leo. Maecenas sollicitudin. Nullam rhoncus
                                        aliquam
                                        metus. Etiam egestas wisi a erat.
                                        Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Nullam feugiat,
                                        turpis
                                        at
                                        pulvinar vulputate, erat libero tristique tellus, nec bibendum odio risus
                                        sit
                                        amet
                                        ante. Aliquam erat volutpat. Nunc auctor. Mauris pretium quam et urna. Fusce
                                        nibh.
                                        Duis risus. Curabitur sagittis hendrerit ante. Aliquam erat volutpat.
                                        Vestibulum
                                        erat nulla, ullamcorper nec, rutrum non, nonummy ac, erat. Duis condimentum
                                        augue id
                                        magna semper rutrum. Nullam justo enim, consectetuer nec, ullamcorper ac,
                                        vestibulum
                                        in, elit. Proin pede metus, vulputate nec, fermentum fringilla, vehicula
                                        vitae,
                                        justo. Fusce consectetuer risus a nunc. Aliquam ornare wisi eu metus.
                                        Integer
                                        pellentesque quam vel velit. Duis pulvinar.
                                        Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Morbi gravida
                                        libero
                                        nec
                                        velit. Morbi scelerisque luctus velit. Etiam dui sem, fermentum vitae,
                                        sagittis
                                        id,
                                        malesuada in, quam. Proin mattis lacinia justo. Vestibulum facilisis auctor
                                        urna.
                                        Aliquam in lorem sit amet leo accumsan lacinia. Integer rutrum, orci
                                        vestibulum
                                        ullamcorper ultricies, lacus quam ultricies odio, vitae placerat pede sem
                                        sit
                                        amet
                                        enim. Phasellus et lorem id felis nonummy placerat. Fusce dui leo, imperdiet
                                        in,
                                        aliquam sit amet, feugiat eu, orci. Aenean vel massa quis mauris vehicula
                                        lacinia.
                                        Quisque tincidunt scelerisque libero. Maecenas libero. Etiam dictum
                                        tincidunt
                                        diam.
                                        Donec ipsum massa, ullamcorper in, auctor et, scelerisque sed, est.
                                        Suspendisse
                                        nisl. Sed convallis magna eu sem. Cras pede libero, dapibus nec, pretium sit
                                        amet,
                                        tempor quis, urna.
                                        Etiam posuere quam ac quam. Maecenas aliquet accumsan leo. Nullam dapibus
                                        fermentum
                                        ipsum. Etiam quis quam. Integer lacinia. Nulla est. Nulla turpis magna,
                                        cursus
                                        sit
                                        amet, suscipit a, interdum id, felis. Integer vulputate sem a nibh rutrum
                                        consequat.
                                        Maecenas lorem. Pellentesque pretium lectus id turpis. Etiam sapien elit,
                                        consequat
                                        eget, tristique non, venenatis quis, ante. Fusce wisi. Phasellus faucibus
                                        molestie
                                        ni</p>
                                </div>
                                <div className={styles.card__info}>
                                    <button>Read More</button>
                                    <p>budget</p>
                                </div>
                            </div>
                            <div className={styles.info__card}>
                                <div className={styles.card__text}>
                                    <h2>Title</h2>
                                    <p>Nam quis nulla. Integer malesuada. In in enim a arcu imperdiet malesuada. Sed
                                        vel
                                        lectus. Donec odio urna, tempus molestie, porttitor ut, iaculis quis, sem.
                                        Phasellus
                                        rhoncus. Aenean id metus id velit ullamcorper pulvinar. Vestibulum fermentum
                                        tortor
                                        id mi. Pellentesque ipsum. Nulla non arcu lacinia neque faucibus fringilla.
                                        Nulla
                                        non lectus sed nisl molestie malesuada. Proin in tellus sit amet nibh
                                        dignissim
                                        sagittis. Vivamus luctus egestas leo. Maecenas sollicitudin. Nullam rhoncus
                                        aliquam
                                        metus. Etiam egestas wisi a erat.
                                        Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Nullam feugiat,
                                        turpis
                                        at
                                        pulvinar vulputate, erat libero tristique tellus, nec bibendum odio risus
                                        sit
                                        amet
                                        ante. Aliquam erat volutpat. Nunc auctor. Mauris pretium quam et urna. Fusce
                                        nibh.
                                        Duis risus. Curabitur sagittis hendrerit ante. Aliquam erat volutpat.
                                        Vestibulum
                                        erat nulla, ullamcorper nec, rutrum non, nonummy ac, erat. Duis condimentum
                                        augue id
                                        magna semper rutrum. Nullam justo enim, consectetuer nec, ullamcorper ac,
                                        vestibulum
                                        in, elit. Proin pede metus, vulputate nec, fermentum fringilla, vehicula
                                        vitae,
                                        justo. Fusce consectetuer risus a nunc. Aliquam ornare wisi eu metus.
                                        Integer
                                        pellentesque quam vel velit. Duis pulvinar.
                                        Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Morbi gravida
                                        libero
                                        nec
                                        velit. Morbi scelerisque luctus velit. Etiam dui sem, fermentum vitae,
                                        sagittis
                                        id,
                                        malesuada in, quam. Proin mattis lacinia justo. Vestibulum facilisis auctor
                                        urna.
                                        Aliquam in lorem sit amet leo accumsan lacinia. Integer rutrum, orci
                                        vestibulum
                                        ullamcorper ultricies, lacus quam ultricies odio, vitae placerat pede sem
                                        sit
                                        amet
                                        enim. Phasellus et lorem id felis nonummy placerat. Fusce dui leo, imperdiet
                                        in,
                                        aliquam sit amet, feugiat eu, orci. Aenean vel massa quis mauris vehicula
                                        lacinia.
                                        Quisque tincidunt scelerisque libero. Maecenas libero. Etiam dictum
                                        tincidunt
                                        diam.
                                        Donec ipsum massa, ullamcorper in, auctor et, scelerisque sed, est.
                                        Suspendisse
                                        nisl. Sed convallis magna eu sem. Cras pede libero, dapibus nec, pretium sit
                                        amet,
                                        tempor quis, urna.
                                        Etiam posuere quam ac quam. Maecenas aliquet accumsan leo. Nullam dapibus
                                        fermentum
                                        ipsum. Etiam quis quam. Integer lacinia. Nulla est. Nulla turpis magna,
                                        cursus
                                        sit
                                        amet, suscipit a, interdum id, felis. Integer vulputate sem a nibh rutrum
                                        consequat.
                                        Maecenas lorem. Pellentesque pretium lectus id turpis. Etiam sapien elit,
                                        consequat
                                        eget, tristique non, venenatis quis, ante. Fusce wisi. Phasellus faucibus
                                        molestie
                                        ni</p>
                                </div>
                                <div className={styles.card__info}>
                                    <button>Read More</button>
                                    <p>budget</p>
                                </div>
                            </div>
                            <div className={styles.info__card}>
                                <div className={styles.card__text}>
                                    <h2>Title</h2>
                                    <p>Nam quis nulla. Integer malesuada. In in enim a arcu imperdiet malesuada. Sed
                                        vel
                                        lectus. Donec odio urna, tempus molestie, porttitor ut, iaculis quis, sem.
                                        Phasellus
                                        rhoncus. Aenean id metus id velit ullamcorper pulvinar. Vestibulum fermentum
                                        tortor
                                        id mi. Pellentesque ipsum. Nulla non arcu lacinia neque faucibus fringilla.
                                        Nulla
                                        non lectus sed nisl molestie malesuada. Proin in tellus sit amet nibh
                                        dignissim
                                        sagittis. Vivamus luctus egestas leo. Maecenas sollicitudin. Nullam rhoncus
                                        aliquam
                                        metus. Etiam egestas wisi a erat.
                                        Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Nullam feugiat,
                                        turpis
                                        at
                                        pulvinar vulputate, erat libero tristique tellus, nec bibendum odio risus
                                        sit
                                        amet
                                        ante. Aliquam erat volutpat. Nunc auctor. Mauris pretium quam et urna. Fusce
                                        nibh.
                                        Duis risus. Curabitur sagittis hendrerit ante. Aliquam erat volutpat.
                                        Vestibulum
                                        erat nulla, ullamcorper nec, rutrum non, nonummy ac, erat. Duis condimentum
                                        augue id
                                        magna semper rutrum. Nullam justo enim, consectetuer nec, ullamcorper ac,
                                        vestibulum
                                        in, elit. Proin pede metus, vulputate nec, fermentum fringilla, vehicula
                                        vitae,
                                        justo. Fusce consectetuer risus a nunc. Aliquam ornare wisi eu metus.
                                        Integer
                                        pellentesque quam vel velit. Duis pulvinar.
                                        Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Morbi gravida
                                        libero
                                        nec
                                        velit. Morbi scelerisque luctus velit. Etiam dui sem, fermentum vitae,
                                        sagittis
                                        id,
                                        malesuada in, quam. Proin mattis lacinia justo. Vestibulum facilisis auctor
                                        urna.
                                        Aliquam in lorem sit amet leo accumsan lacinia. Integer rutrum, orci
                                        vestibulum
                                        ullamcorper ultricies, lacus quam ultricies odio, vitae placerat pede sem
                                        sit
                                        amet
                                        enim. Phasellus et lorem id felis nonummy placerat. Fusce dui leo, imperdiet
                                        in,
                                        aliquam sit amet, feugiat eu, orci. Aenean vel massa quis mauris vehicula
                                        lacinia.
                                        Quisque tincidunt scelerisque libero. Maecenas libero. Etiam dictum
                                        tincidunt
                                        diam.
                                        Donec ipsum massa, ullamcorper in, auctor et, scelerisque sed, est.
                                        Suspendisse
                                        nisl. Sed convallis magna eu sem. Cras pede libero, dapibus nec, pretium sit
                                        amet,
                                        tempor quis, urna.
                                        Etiam posuere quam ac quam. Maecenas aliquet accumsan leo. Nullam dapibus
                                        fermentum
                                        ipsum. Etiam quis quam. Integer lacinia. Nulla est. Nulla turpis magna,
                                        cursus
                                        sit
                                        amet, suscipit a, interdum id, felis. Integer vulputate sem a nibh rutrum
                                        consequat.
                                        Maecenas lorem. Pellentesque pretium lectus id turpis. Etiam sapien elit,
                                        consequat
                                        eget, tristique non, venenatis quis, ante. Fusce wisi. Phasellus faucibus
                                        molestie
                                        ni</p>
                                </div>
                                <div className={styles.card__info}>
                                    <button>Read More</button>
                                    <p>budget</p>
                                </div>
                            </div>
                            <div className={styles.info__card}>
                                <div className={styles.card__text}>
                                    <h2>Title</h2>
                                    <p>Nam quis nulla. Integer malesuada. In in enim a arcu imperdiet malesuada. Sed
                                        vel
                                        lectus. Donec odio urna, tempus molestie, porttitor ut, iaculis quis, sem.
                                        Phasellus
                                        rhoncus. Aenean id metus id velit ullamcorper pulvinar. Vestibulum fermentum
                                        tortor
                                        id mi. Pellentesque ipsum. Nulla non arcu lacinia neque faucibus fringilla.
                                        Nulla
                                        non lectus sed nisl molestie malesuada. Proin in tellus sit amet nibh
                                        dignissim
                                        sagittis. Vivamus luctus egestas leo. Maecenas sollicitudin. Nullam rhoncus
                                        aliquam
                                        metus. Etiam egestas wisi a erat.
                                        Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Nullam feugiat,
                                        turpis
                                        at
                                        pulvinar vulputate, erat libero tristique tellus, nec bibendum odio risus
                                        sit
                                        amet
                                        ante. Aliquam erat volutpat. Nunc auctor. Mauris pretium quam et urna. Fusce
                                        nibh.
                                        Duis risus. Curabitur sagittis hendrerit ante. Aliquam erat volutpat.
                                        Vestibulum
                                        erat nulla, ullamcorper nec, rutrum non, nonummy ac, erat. Duis condimentum
                                        augue id
                                        magna semper rutrum. Nullam justo enim, consectetuer nec, ullamcorper ac,
                                        vestibulum
                                        in, elit. Proin pede metus, vulputate nec, fermentum fringilla, vehicula
                                        vitae,
                                        justo. Fusce consectetuer risus a nunc. Aliquam ornare wisi eu metus.
                                        Integer
                                        pellentesque quam vel velit. Duis pulvinar.
                                        Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Morbi gravida
                                        libero
                                        nec
                                        velit. Morbi scelerisque luctus velit. Etiam dui sem, fermentum vitae,
                                        sagittis
                                        id,
                                        malesuada in, quam. Proin mattis lacinia justo. Vestibulum facilisis auctor
                                        urna.
                                        Aliquam in lorem sit amet leo accumsan lacinia. Integer rutrum, orci
                                        vestibulum
                                        ullamcorper ultricies, lacus quam ultricies odio, vitae placerat pede sem
                                        sit
                                        amet
                                        enim. Phasellus et lorem id felis nonummy placerat. Fusce dui leo, imperdiet
                                        in,
                                        aliquam sit amet, feugiat eu, orci. Aenean vel massa quis mauris vehicula
                                        lacinia.
                                        Quisque tincidunt scelerisque libero. Maecenas libero. Etiam dictum
                                        tincidunt
                                        diam.
                                        Donec ipsum massa, ullamcorper in, auctor et, scelerisque sed, est.
                                        Suspendisse
                                        nisl. Sed convallis magna eu sem. Cras pede libero, dapibus nec, pretium sit
                                        amet,
                                        tempor quis, urna.
                                        Etiam posuere quam ac quam. Maecenas aliquet accumsan leo. Nullam dapibus
                                        fermentum
                                        ipsum. Etiam quis quam. Integer lacinia. Nulla est. Nulla turpis magna,
                                        cursus
                                        sit
                                        amet, suscipit a, interdum id, felis. Integer vulputate sem a nibh rutrum
                                        consequat.
                                        Maecenas lorem. Pellentesque pretium lectus id turpis. Etiam sapien elit,
                                        consequat
                                        eget, tristique non, venenatis quis, ante. Fusce wisi. Phasellus faucibus
                                        molestie
                                        ni</p>
                                </div>
                                <div className={styles.card__info}>
                                    <button>Read More</button>
                                    <p>budget</p>
                                </div>
                            </div>
                            <div className={styles.info__card}>
                                <div className={styles.card__text}>
                                    <h2>Title</h2>
                                    <p>Nam quis nulla. Integer malesuada. In in enim a arcu imperdiet malesuada. Sed
                                        vel
                                        lectus. Donec odio urna, tempus molestie, porttitor ut, iaculis quis, sem.
                                        Phasellus
                                        rhoncus. Aenean id metus id velit ullamcorper pulvinar. Vestibulum fermentum
                                        tortor
                                        id mi. Pellentesque ipsum. Nulla non arcu lacinia neque faucibus fringilla.
                                        Nulla
                                        non lectus sed nisl molestie malesuada. Proin in tellus sit amet nibh
                                        dignissim
                                        sagittis. Vivamus luctus egestas leo. Maecenas sollicitudin. Nullam rhoncus
                                        aliquam
                                        metus. Etiam egestas wisi a erat.
                                        Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Nullam feugiat,
                                        turpis
                                        at
                                        pulvinar vulputate, erat libero tristique tellus, nec bibendum odio risus
                                        sit
                                        amet
                                        ante. Aliquam erat volutpat. Nunc auctor. Mauris pretium quam et urna. Fusce
                                        nibh.
                                        Duis risus. Curabitur sagittis hendrerit ante. Aliquam erat volutpat.
                                        Vestibulum
                                        erat nulla, ullamcorper nec, rutrum non, nonummy ac, erat. Duis condimentum
                                        augue id
                                        magna semper rutrum. Nullam justo enim, consectetuer nec, ullamcorper ac,
                                        vestibulum
                                        in, elit. Proin pede metus, vulputate nec, fermentum fringilla, vehicula
                                        vitae,
                                        justo. Fusce consectetuer risus a nunc. Aliquam ornare wisi eu metus.
                                        Integer
                                        pellentesque quam vel velit. Duis pulvinar.
                                        Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Morbi gravida
                                        libero
                                        nec
                                        velit. Morbi scelerisque luctus velit. Etiam dui sem, fermentum vitae,
                                        sagittis
                                        id,
                                        malesuada in, quam. Proin mattis lacinia justo. Vestibulum facilisis auctor
                                        urna.
                                        Aliquam in lorem sit amet leo accumsan lacinia. Integer rutrum, orci
                                        vestibulum
                                        ullamcorper ultricies, lacus quam ultricies odio, vitae placerat pede sem
                                        sit
                                        amet
                                        enim. Phasellus et lorem id felis nonummy placerat. Fusce dui leo, imperdiet
                                        in,
                                        aliquam sit amet, feugiat eu, orci. Aenean vel massa quis mauris vehicula
                                        lacinia.
                                        Quisque tincidunt scelerisque libero. Maecenas libero. Etiam dictum
                                        tincidunt
                                        diam.
                                        Donec ipsum massa, ullamcorper in, auctor et, scelerisque sed, est.
                                        Suspendisse
                                        nisl. Sed convallis magna eu sem. Cras pede libero, dapibus nec, pretium sit
                                        amet,
                                        tempor quis, urna.
                                        Etiam posuere quam ac quam. Maecenas aliquet accumsan leo. Nullam dapibus
                                        fermentum
                                        ipsum. Etiam quis quam. Integer lacinia. Nulla est. Nulla turpis magna,
                                        cursus
                                        sit
                                        amet, suscipit a, interdum id, felis. Integer vulputate sem a nibh rutrum
                                        consequat.
                                        Maecenas lorem. Pellentesque pretium lectus id turpis. Etiam sapien elit,
                                        consequat
                                        eget, tristique non, venenatis quis, ante. Fusce wisi. Phasellus faucibus
                                        molestie
                                        ni</p>
                                </div>
                                <div className={styles.card__info}>
                                    <button>Read More</button>
                                    <p>budget</p>
                                </div>
                            </div>
                            <div className={styles.info__card}>
                                <div className={styles.card__text}>
                                    <h2>Title</h2>
                                    <p>Nam quis nulla. Integer malesuada. In in enim a arcu imperdiet malesuada. Sed
                                        vel
                                        lectus. Donec odio urna, tempus molestie, porttitor ut, iaculis quis, sem.
                                        Phasellus
                                        rhoncus. Aenean id metus id velit ullamcorper pulvinar. Vestibulum fermentum
                                        tortor
                                        id mi. Pellentesque ipsum. Nulla non arcu lacinia neque faucibus fringilla.
                                        Nulla
                                        non lectus sed nisl molestie malesuada. Proin in tellus sit amet nibh
                                        dignissim
                                        sagittis. Vivamus luctus egestas leo. Maecenas sollicitudin. Nullam rhoncus
                                        aliquam
                                        metus. Etiam egestas wisi a erat.
                                        Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Nullam feugiat,
                                        turpis
                                        at
                                        pulvinar vulputate, erat libero tristique tellus, nec bibendum odio risus
                                        sit
                                        amet
                                        ante. Aliquam erat volutpat. Nunc auctor. Mauris pretium quam et urna. Fusce
                                        nibh.
                                        Duis risus. Curabitur sagittis hendrerit ante. Aliquam erat volutpat.
                                        Vestibulum
                                        erat nulla, ullamcorper nec, rutrum non, nonummy ac, erat. Duis condimentum
                                        augue id
                                        magna semper rutrum. Nullam justo enim, consectetuer nec, ullamcorper ac,
                                        vestibulum
                                        in, elit. Proin pede metus, vulputate nec, fermentum fringilla, vehicula
                                        vitae,
                                        justo. Fusce consectetuer risus a nunc. Aliquam ornare wisi eu metus.
                                        Integer
                                        pellentesque quam vel velit. Duis pulvinar.
                                        Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Morbi gravida
                                        libero
                                        nec
                                        velit. Morbi scelerisque luctus velit. Etiam dui sem, fermentum vitae,
                                        sagittis
                                        id,
                                        malesuada in, quam. Proin mattis lacinia justo. Vestibulum facilisis auctor
                                        urna.
                                        Aliquam in lorem sit amet leo accumsan lacinia. Integer rutrum, orci
                                        vestibulum
                                        ullamcorper ultricies, lacus quam ultricies odio, vitae placerat pede sem
                                        sit
                                        amet
                                        enim. Phasellus et lorem id felis nonummy placerat. Fusce dui leo, imperdiet
                                        in,
                                        aliquam sit amet, feugiat eu, orci. Aenean vel massa quis mauris vehicula
                                        lacinia.
                                        Quisque tincidunt scelerisque libero. Maecenas libero. Etiam dictum
                                        tincidunt
                                        diam.
                                        Donec ipsum massa, ullamcorper in, auctor et, scelerisque sed, est.
                                        Suspendisse
                                        nisl. Sed convallis magna eu sem. Cras pede libero, dapibus nec, pretium sit
                                        amet,
                                        tempor quis, urna.
                                        Etiam posuere quam ac quam. Maecenas aliquet accumsan leo. Nullam dapibus
                                        fermentum
                                        ipsum. Etiam quis quam. Integer lacinia. Nulla est. Nulla turpis magna,
                                        cursus
                                        sit
                                        amet, suscipit a, interdum id, felis. Integer vulputate sem a nibh rutrum
                                        consequat.
                                        Maecenas lorem. Pellentesque pretium lectus id turpis. Etiam sapien elit,
                                        consequat
                                        eget, tristique non, venenatis quis, ante. Fusce wisi. Phasellus faucibus
                                        molestie
                                        ni</p>
                                </div>
                                <div className={styles.card__info}>
                                    <button>Read More</button>
                                    <p>budget</p>
                                </div>
                            </div>
                            <div className={styles.info__card}>
                                <div className={styles.card__text}>
                                    <h2>Title</h2>
                                    <p>Nam quis nulla. Integer malesuada. In in enim a arcu imperdiet malesuada. Sed
                                        vel
                                        lectus. Donec odio urna, tempus molestie, porttitor ut, iaculis quis, sem.
                                        Phasellus
                                        rhoncus. Aenean id metus id velit ullamcorper pulvinar. Vestibulum fermentum
                                        tortor
                                        id mi. Pellentesque ipsum. Nulla non arcu lacinia neque faucibus fringilla.
                                        Nulla
                                        non lectus sed nisl molestie malesuada. Proin in tellus sit amet nibh
                                        dignissim
                                        sagittis. Vivamus luctus egestas leo. Maecenas sollicitudin. Nullam rhoncus
                                        aliquam
                                        metus. Etiam egestas wisi a erat.
                                        Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Nullam feugiat,
                                        turpis
                                        at
                                        pulvinar vulputate, erat libero tristique tellus, nec bibendum odio risus
                                        sit
                                        amet
                                        ante. Aliquam erat volutpat. Nunc auctor. Mauris pretium quam et urna. Fusce
                                        nibh.
                                        Duis risus. Curabitur sagittis hendrerit ante. Aliquam erat volutpat.
                                        Vestibulum
                                        erat nulla, ullamcorper nec, rutrum non, nonummy ac, erat. Duis condimentum
                                        augue id
                                        magna semper rutrum. Nullam justo enim, consectetuer nec, ullamcorper ac,
                                        vestibulum
                                        in, elit. Proin pede metus, vulputate nec, fermentum fringilla, vehicula
                                        vitae,
                                        justo. Fusce consectetuer risus a nunc. Aliquam ornare wisi eu metus.
                                        Integer
                                        pellentesque quam vel velit. Duis pulvinar.
                                        Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Morbi gravida
                                        libero
                                        nec
                                        velit. Morbi scelerisque luctus velit. Etiam dui sem, fermentum vitae,
                                        sagittis
                                        id,
                                        malesuada in, quam. Proin mattis lacinia justo. Vestibulum facilisis auctor
                                        urna.
                                        Aliquam in lorem sit amet leo accumsan lacinia. Integer rutrum, orci
                                        vestibulum
                                        ullamcorper ultricies, lacus quam ultricies odio, vitae placerat pede sem
                                        sit
                                        amet
                                        enim. Phasellus et lorem id felis nonummy placerat. Fusce dui leo, imperdiet
                                        in,
                                        aliquam sit amet, feugiat eu, orci. Aenean vel massa quis mauris vehicula
                                        lacinia.
                                        Quisque tincidunt scelerisque libero. Maecenas libero. Etiam dictum
                                        tincidunt
                                        diam.
                                        Donec ipsum massa, ullamcorper in, auctor et, scelerisque sed, est.
                                        Suspendisse
                                        nisl. Sed convallis magna eu sem. Cras pede libero, dapibus nec, pretium sit
                                        amet,
                                        tempor quis, urna.
                                        Etiam posuere quam ac quam. Maecenas aliquet accumsan leo. Nullam dapibus
                                        fermentum
                                        ipsum. Etiam quis quam. Integer lacinia. Nulla est. Nulla turpis magna,
                                        cursus
                                        sit
                                        amet, suscipit a, interdum id, felis. Integer vulputate sem a nibh rutrum
                                        consequat.
                                        Maecenas lorem. Pellentesque pretium lectus id turpis. Etiam sapien elit,
                                        consequat
                                        eget, tristique non, venenatis quis, ante. Fusce wisi. Phasellus faucibus
                                        molestie
                                        ni</p>
                                </div>
                                <div className={styles.card__info}>
                                    <button>Read More</button>
                                    <p>budget</p>
                                </div>
                            </div>
                            <div className={styles.info__card}>
                                <div className={styles.card__text}>
                                    <h2>Title</h2>
                                    <p>Nam quis nulla. Integer malesuada. In in enim a arcu imperdiet malesuada. Sed
                                        vel
                                        lectus. Donec odio urna, tempus molestie, porttitor ut, iaculis quis, sem.
                                        Phasellus
                                        rhoncus. Aenean id metus id velit ullamcorper pulvinar. Vestibulum fermentum
                                        tortor
                                        id mi. Pellentesque ipsum. Nulla non arcu lacinia neque faucibus fringilla.
                                        Nulla
                                        non lectus sed nisl molestie malesuada. Proin in tellus sit amet nibh
                                        dignissim
                                        sagittis. Vivamus luctus egestas leo. Maecenas sollicitudin. Nullam rhoncus
                                        aliquam
                                        metus. Etiam egestas wisi a erat.
                                        Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Nullam feugiat,
                                        turpis
                                        at
                                        pulvinar vulputate, erat libero tristique tellus, nec bibendum odio risus
                                        sit
                                        amet
                                        ante. Aliquam erat volutpat. Nunc auctor. Mauris pretium quam et urna. Fusce
                                        nibh.
                                        Duis risus. Curabitur sagittis hendrerit ante. Aliquam erat volutpat.
                                        Vestibulum
                                        erat nulla, ullamcorper nec, rutrum non, nonummy ac, erat. Duis condimentum
                                        augue id
                                        magna semper rutrum. Nullam justo enim, consectetuer nec, ullamcorper ac,
                                        vestibulum
                                        in, elit. Proin pede metus, vulputate nec, fermentum fringilla, vehicula
                                        vitae,
                                        justo. Fusce consectetuer risus a nunc. Aliquam ornare wisi eu metus.
                                        Integer
                                        pellentesque quam vel velit. Duis pulvinar.
                                        Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Morbi gravida
                                        libero
                                        nec
                                        velit. Morbi scelerisque luctus velit. Etiam dui sem, fermentum vitae,
                                        sagittis
                                        id,
                                        malesuada in, quam. Proin mattis lacinia justo. Vestibulum facilisis auctor
                                        urna.
                                        Aliquam in lorem sit amet leo accumsan lacinia. Integer rutrum, orci
                                        vestibulum
                                        ullamcorper ultricies, lacus quam ultricies odio, vitae placerat pede sem
                                        sit
                                        amet
                                        enim. Phasellus et lorem id felis nonummy placerat. Fusce dui leo, imperdiet
                                        in,
                                        aliquam sit amet, feugiat eu, orci. Aenean vel massa quis mauris vehicula
                                        lacinia.
                                        Quisque tincidunt scelerisque libero. Maecenas libero. Etiam dictum
                                        tincidunt
                                        diam.
                                        Donec ipsum massa, ullamcorper in, auctor et, scelerisque sed, est.
                                        Suspendisse
                                        nisl. Sed convallis magna eu sem. Cras pede libero, dapibus nec, pretium sit
                                        amet,
                                        tempor quis, urna.
                                        Etiam posuere quam ac quam. Maecenas aliquet accumsan leo. Nullam dapibus
                                        fermentum
                                        ipsum. Etiam quis quam. Integer lacinia. Nulla est. Nulla turpis magna,
                                        cursus
                                        sit
                                        amet, suscipit a, interdum id, felis. Integer vulputate sem a nibh rutrum
                                        consequat.
                                        Maecenas lorem. Pellentesque pretium lectus id turpis. Etiam sapien elit,
                                        consequat
                                        eget, tristique non, venenatis quis, ante. Fusce wisi. Phasellus faucibus
                                        molestie
                                        ni</p>
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

            <ReactModal
                isOpen={modalIsOpen}
                onRequestClose={closeModal}
                className={styles.login__container}
                overlayClassName={styles.overlay}
            >
                <button onClick={closeModal}>x</button>
                <div className={styles.login__content}>
                    <h1>Log In on (name)</h1>
                    <form onSubmit={handleSubmit}>
                        <label htmlFor="enter_email">Enter your school email</label>
                        <input
                            type="email"
                            value={email}
                            placeholder={"School email"}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                        <button
                            type="submit"
                            disabled={loginRequest.isPending}
                        >
                            Log in
                        </button>
                    </form>
                </div>
            </ReactModal>
        </>
    )
}