import Link from 'next/link'

export default function Home() {
  return (
    <>
      <section className="hero">
        <video
          className="hero-video"
          autoPlay
          muted
          loop
          playsInline
          preload="none"
          poster="https://via.placeholder.com/1200x600?text=FalconTrade"
        >
          <source src="https://www.w3schools.com/html/mov_bbb.mp4" type="video/mp4" />
        </video>
        <img
          src="https://via.placeholder.com/1200x600?text=FalconTrade"
          alt="FalconTrade"
          className="hero-image"
        />
        <div className="overlay">
          <h1 className="text-2xl">FalconTrade — Niche B2B Board</h1>
          <p className="mt-2">
            Fertilizers · Grains · Edible Oils · Textiles · Panels · Poultry · Fruits.
          </p>
          <Link className="btn btn-primary mt-3" href="/signup">
            Join Now
          </Link>
        </div>
      </section>

      <section className="how-it-works">
        <h2 className="text-2xl">How it works</h2>
        <div className="steps">
          <div className="step">
            <h3>1. Sign up</h3>
            <p>Create your free account to get started.</p>
          </div>
          <div className="step">
            <h3>2. Post offers or needs</h3>
            <p>List your products or request supplies.</p>
          </div>
          <div className="step">
            <h3>3. Connect & trade</h3>
            <p>Reach out and make deals.</p>
          </div>
        </div>
      </section>

      <style jsx>{`
        .hero {
          position: relative;
          text-align: center;
        }
        .hero-video,
        .hero-image {
          width: 100%;
          height: auto;
          object-fit: cover;
        }
        .hero-image {
          display: none;
        }
        .overlay {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          background: rgba(0, 0, 0, 0.4);
          color: #e8f0f2;
          padding: 20px;
        }
        .how-it-works {
          margin-top: 40px;
        }
        .steps {
          display: flex;
          gap: 20px;
          margin-top: 20px;
        }
        .step {
          flex: 1;
          background: #0f1720;
          border: 1px solid #1f2a36;
          border-radius: 14px;
          padding: 20px;
        }
        @media (max-width: 768px) {
          .hero-video {
            display: none;
          }
          .hero-image {
            display: block;
          }
          .steps {
            flex-direction: column;
          }
        }
      `}</style>
    </>
  )
}
