"use client";

export default function Hero() {
  return (
    <div
      className="relative bg-cover bg-center h-[70vh] flex flex-col items-center justify-center text-white p-6"
      style={{
        backgroundImage:
          "url('https://i.ibb.co.com/nMf8hHvY/coolbackgrounds-particles-stellar.png')",
      }}
    >
      <div className="absolute inset-0 bg-black/50"></div>

      {/* Content Container */}
      <div className="relative z-10 flex flex-col items-center gap-6 w-full max-w-4xl text-center">
        <h1 className="text-4xl md:text-5xl font-extrabold drop-shadow-lg">
          Find Your Dream University
        </h1>

        <div className="flex flex-col md:flex-row items-center gap-4 w-full justify-center">
          {/* Select Country */}
          <select className="p-3 border rounded-lg text-gray-800 w-full md:w-64 focus:outline-none focus:ring-2 focus:ring-orange-500">
            <option value="">Select Country</option>
            <option>UK</option>
            <option>USA</option>
            <option>Canada</option>
            <option>Germany</option>
            <option>Singapore</option>
            <option>Australia</option>
            <option>Germany</option>
            <option>Singapore</option>
            <option>Netherlands</option>
            <option>Japan</option>
            <option>South Korea</option>
            <option>Bangladesh</option>
          </select>

          {/* Select Degree */}
          <select className="p-3 border rounded-lg text-gray-800 w-full md:w-64 focus:outline-none focus:ring-2 focus:ring-orange-500">
            <option value="">Select Degree</option>
            <option>Bachelor&apos;s</option>
            <option>Master&apos;s</option>
          </select>

          {/* Search Button */}
          <button className="bg-orange-500 hover:bg-orange-600 transition-colors text-white px-8 py-3 rounded-lg font-bold shadow-lg w-full md:w-auto">
            Search
          </button>
        </div>
      </div>
    </div>
  );
}
