import { useEffect, useState } from "react";
import { shortList, list, longList } from "./data";
import { FaQuoteRight } from "react-icons/fa";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";

const Slideshowcase = () => {
  const [people, setPeople] = useState(longList);
  const [currentperson, setCurrentperson] = useState(0);

  const nextSlide = () => {
    setCurrentperson((oldperson) => {
      const result = (oldperson + 1) % people.length;
      return result;
    });
  };

  const prevSlide = () => {
    setCurrentperson((oldperson) => {
      const result = (oldperson - 1 + people.length) % people.length;
      return result;
    });
  };

  useEffect(() => {
    const slideId = setInterval(() => {
      nextSlide();
    }, 2000);

    return () => {
      clearInterval(slideId);
    };
  }, [currentperson]);
  return (
    <section className="slider-container">
      {people.map((person, personIndex) => {
        const { id, image, name, title, quote } = person;
        return (
          <article
            className="slide"
            style={{
              transform: `translateX(${100 * (personIndex - currentperson)}%)`,
              opacity: personIndex === currentperson ? 1 : 0,
              visibility: personIndex === currentperson ? "visible" : "hidden",
            }}
            key={id}
          >
            <img src={image} alt={name} className="person-img" />
            <h5 className="name">{name}</h5>
            <p className="title">{title}</p>
            <p className="text">{quote}</p>
            <FaQuoteRight className="icon" />
          </article>
        );
      })}
      <button type="button" onClick={prevSlide} className="prev">
        <FiChevronLeft />
      </button>
      <button type="button" onClick={nextSlide} className="next">
        <FiChevronRight />
      </button>
    </section>
  );
};
export default Slideshowcase;
