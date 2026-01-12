const Contact = () => {
  return (
    <div className="max-w-4xl mx-auto px-6 py-16">
      <h1 className="text-3xl font-bold mb-4">Contact Us</h1>

      <p className="text-gray-600 mb-8">
        Have questions or feedback? Reach out to us and we’ll get back to you soon.
      </p>

      <div className="space-y-3 mb-10">
        <p><strong>Email:</strong> ghoreyranna@gmail.com</p>
        <p><strong>Phone:</strong> +880 1797-421860</p>
        <p><strong>Address:</strong> Mirpur-10, Dhaka, Bangladesh</p>
      </div>

      <form className="space-y-4 max-w-md">
        <input
          type="text"
          placeholder="Your Name"
          className="w-full border rounded p-2"
          required
        />
        <input
          type="email"
          placeholder="Your Email"
          className="w-full border rounded p-2"
          required
        />
        <textarea
          placeholder="Your Message"
          rows="4"
          className="w-full border rounded p-2"
          required
        ></textarea>

        <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
          Send Message
        </button>
      </form>
    </div>
  );
};

export default Contact;
