export function KonyvCarousel() {
  return (
    <div>
      <div className="carousel-inner">
        <div className="carousel-item active" data-bs-interval="9000">
          <img
            src="img/fokep.webp"
            max-width={1791}
            max-height={900}
            className="d-block w-100"
            alt="fokep"
          />
        </div>
        <div className="carousel-item" data-bs-interval="7000">
          <img
            src="img/ingyenes_szallitas.webp"
            decoding="async"
            max-width={1791}
            max-height={900}
            className="d-block w-100"
            alt="ingyenes_szallitas"
          />
        </div>
        <div className="carousel-item" data-bs-interval="7000">
          <img
            src="img/konyv_minden_korosztalynak.webp"
            decoding="async"
            max-width={1791}
            max-height={900}
            className="d-block w-100"
            alt="konyv_minden_korosztalynak"
          />
        </div>
        <div className="carousel-item" data-bs-interval="7000">
          <img
            src="img/ajandekot_keres.webp"
            decoding="async"
            max-width={1791}
            max-height={900}
            className="d-block w-100"
            alt="ajandekot_keres"
          />
        </div>
      </div>
      <button
        className="carousel-control-prev"
        type="button"
        data-bs-target="#carouselExampleInterval"
        data-bs-slide="prev"
      >
        <span className="carousel-control-prev-icon" aria-hidden="true"></span>
        <span className="visually-hidden">Previous</span>
      </button>
      <button
        className="carousel-control-next"
        type="button"
        data-bs-target="#carouselExampleInterval"
        data-bs-slide="next"
      >
        <span className="carousel-control-next-icon" aria-hidden="true"></span>
        <span className="visually-hidden">Next</span>
      </button>
    </div>
  );
}

export default KonyvCarousel;
