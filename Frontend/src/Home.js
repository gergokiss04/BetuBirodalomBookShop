import "./App.css";
import KonyvListPage from "./KonyvListPage";
import KonyvRecommendation from "./KonyvRecommendation";
import KonyvAboutUs from "./KonyvAboutUs";
import KonyvContact from "./KonyvContact";
import KonyvCarousel from "./KonyvCarousel";
import ScrollToTopButton from "./ScrollToTopButton";
import { useEffect } from "react";
import Orderdelivery from "./Orderdelivery";
function Home() {
  //Az oldal tetejére ugrik kattintásra:
  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "instant",
    });
  }, []);

  return (
    <div id="home">
      {/*CAROUSEL KEZDETE*/}
      <div
        id="carouselExampleInterval"
        className="carousel slide  "
        data-bs-ride="carousel"
      >
        <KonyvCarousel></KonyvCarousel>
      </div>
      {/*CAROUSEL VÉGE*/}
      {/*SCROLLSPY KEZDETE*/}
      <div>
        {/*HETI KÖNYVAJÁNLÓ RÉSZ KEZDETE*/}
        <KonyvRecommendation></KonyvRecommendation>
        {/*HETI KÖNYVAJÁNLÓ VÉGE*/}

        {/*RENDELÉSI TUDNIVALÓK RÉSZ KEZDETE*/}
        <Orderdelivery></Orderdelivery>
        {/*RENDELÉSI TUDNIVALÓK VÉGE*/}

        {/*TETEJÉRE FELUGRÓ GOMB KEZDETE*/}
        <ScrollToTopButton></ScrollToTopButton>
        {/*TETEJÉRE FELUGRÓ GOMB VÉGE*/}

        {/*KÖNYVEK ELEJE*/}
        <KonyvListPage></KonyvListPage>
        {/*KÖNYVEK VÉGE*/}

        {/*RÓLUNK ELEJE*/}
        <KonyvAboutUs></KonyvAboutUs>
        {/*RÓLUNK VÉGE*/}

        {/*KAPCSOLAT ELEJE*/}
        <KonyvContact></KonyvContact>
        {/*KAPCSOLAT VÉGE*/}
      </div>
      {/*SCROLLSPY VÉGE*/}
    </div>
  );
}

export default Home;
