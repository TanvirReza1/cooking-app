import React from "react";

const About = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      {/* Header */}
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-900 dark:text-white">
          About GhoreyRanna
        </h1>
        <p className="mt-4 text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
          GhoreyRanna is a home-style cooking platform where people can
          discover, share, and enjoy authentic homemade meals.
        </p>
      </div>

      {/* Who We Are */}
      <section className="mb-10">
        <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-100 mb-3">
          Who We Are
        </h2>
        <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
          We are passionate about bringing homemade food closer to everyone.
          GhoreyRanna connects home cooks with food lovers, making it easy to
          explore delicious meals prepared with care and tradition.
        </p>
      </section>

      {/* Mission */}
      <section className="mb-10">
        <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-100 mb-3">
          Our Mission
        </h2>
        <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
          Our mission is to promote homemade food culture, empower local cooks,
          and provide healthy, affordable meal options for everyone.
        </p>
      </section>

      {/* What We Offer */}
      <section className="mb-10">
        <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-100 mb-3">
          What We Offer
        </h2>
        <ul className="list-disc list-inside text-gray-600 dark:text-gray-300 space-y-2">
          <li>Wide variety of homemade meals</li>
          <li>Easy recipe discovery and ordering</li>
          <li>Trusted home chefs</li>
          <li>User-friendly dashboard and features</li>
        </ul>
      </section>

      {/* Why Choose Us */}
      <section>
        <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-100 mb-3">
          Why Choose GhoreyRanna
        </h2>
        <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
          We focus on quality, trust, and community. Every meal shared on our
          platform reflects real home cooking, ensuring authenticity and care in
          every bite.
        </p>
      </section>
    </div>
  );
};

export default About;
