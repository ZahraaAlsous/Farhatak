import Navbar from "../Components/Navbar";

const AboutUs = () => (
  <main className="font-[Inter] overflow-hidden">
    <Navbar />
    {/* <section className="relative w-full h-[500px] flex items-center justify-center text-center bg-[#F5F0ED] overflow-hidden">
      <img
        src="/aboutus.jpg"
        alt="Team collaborating on event planning"
        className="absolute inset-0 w-full h-full object-cover -z-10"
      />
      <div className="relative z-10 max-w-3xl px-4">
        <h1 className="text-4xl md:text-5xl font-bold text-white drop-shadow-lg mb-4">
          Our Story
        </h1>
        <p className="text-xl text-white drop-shadow-md">
          Making celebrations simpler, smarter, and truly memorable.
        </p>
      </div>
    </section> */}
    <section
      id="home"
      className="relative h-screen w-full flex items-center justify-center text-center overflow-hidden"
    >
      <img
        src="aboutus2.webp"
        alt="Couple walking in field"
        className="absolute inset-0 w-full h-full object-cover -z-10 min-w-full"
      />
      <div className="relative z-10 max-w-3xl px-4">
        <h1 className="text-4xl md:text-5xl font-bold text-white drop-shadow-lg mb-4">
          Our Story
        </h1>
        <p className="text-xl text-white drop-shadow-md">
          Making celebrations simpler, smarter, and truly memorable.
        </p>
      </div>
    </section>

    <section className="w-full bg-white py-20 px-6 md:px-16">
      <div className="max-w-4xl mx-auto text-center mb-12">
        <h2 className="text-3xl md:text-4xl font-bold text-[#6C4C3F] mb-6">
          Who We Are
        </h2>
        <p className="text-lg text-[#4C3B33] leading-relaxed">
          We’re a passionate team of developers, designers, and event
          specialists who came together with one mission: to make event planning
          effortless. Whether it’s your wedding day or a surprise party for a
          friend, we believe every celebration deserves the best — and finding
          the right vendors should be joyful, not stressful.
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-12 max-w-5xl mx-auto">
        <div>
          <h3 className="text-2xl font-semibold text-[#6C4C3F] mb-4">
            Why We Built This
          </h3>
          <p className="text-[#4C3B33] text-md leading-relaxed">
            After years of watching loved ones scramble through spreadsheets,
            endless calls, and confusing websites to plan their events, we
            thought: there has to be a better way. So we built a platform where
            everything you need — trusted vendors, clear pricing, instant
            booking — is in one beautiful place.
          </p>
        </div>
        <div>
          <h3 className="text-2xl font-semibold text-[#6C4C3F] mb-4">
            What We Value
          </h3>
          <ul className="text-[#4C3B33] text-md leading-relaxed list-disc list-inside">
            <li>
              ✨ Simplicity: User-friendly tools that make planning feel fun.
            </li>
            <li>
              🤝 Trust: Verified vendors, real reviews, transparent pricing.
            </li>
            <li>
              🎉 Joy: Because every event — big or small — deserves magic.
            </li>
          </ul>
        </div>
      </div>
    </section>

    <section className="w-full bg-[#F5F0ED] py-20 px-6 md:px-16">
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-[#6C4C3F] mb-6">
          Join Us On This Journey
        </h2>
        <p className="text-lg text-[#4C3B33] leading-relaxed mb-8">
          We're constantly growing, listening, and evolving. Whether you're
          planning a party or you're a service provider, we invite you to be
          part of this movement to create joyful, seamless celebrations for
          everyone.
        </p>
        <button className="bg-[#6C4C3F] hover:bg-[#8a6758] text-white font-semibold px-6 py-3 rounded transition">
          Contact Us
        </button>
      </div>
    </section>
  </main>
);

export default AboutUs;
