import { useEffect, useState } from "react";
import "./ScrollToTop.css";
import { FaArrowUp } from "react-icons/fa";

function ScrollToTop() {

    const [visible, setVisible] = useState(false);

    useEffect(() => {

        const toggleVisibility = () => {

            if (window.scrollY > 300) {
                setVisible(true);
            } else {
                setVisible(false);
            }

        };

        window.addEventListener("scroll", toggleVisibility);

        return () => window.removeEventListener("scroll", toggleVisibility);

    }, []);

    const scrollTop = () => {

        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });

    };

    return (

        <button
            className={`scroll-top ${visible ? "show" : ""}`}
            onClick={scrollTop}
        >

            <FaArrowUp />

        </button>

    );

}

export default ScrollToTop;