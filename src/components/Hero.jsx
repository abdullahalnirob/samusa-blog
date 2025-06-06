import { FaCheckCircle } from "react-icons/fa";

const Hero = () => {
  return (
    <section className="bg-white">
      <div className="container mx-auto px-4 py-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Text Section */}
          <div className="order-2 lg:order-1 text-center lg:text-left">
            <span className="inline-block px-5 py-2 bg-green-50 text-[#10B981] rounded-full text-base font-semibold mb-5 border border-green-100">
              Featured Articles
            </span>

            <h1 className="text-5xl md:text-6xl font-extrabold text-gray-900 leading-tight mb-6">
              Discover <span className="text-[#10B981]">Insights</span> That
              Spark Your Imagination
            </h1>

            <p className="text-xl text-gray-600 max-w-xl mx-auto lg:mx-0 mb-10 leading-relaxed">
              Explore thought-provoking articles, expert perspectives, and
              creative ideas to expand your knowledge and perspective.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <button className="cursor-pointer bg-[#10B981] hover:bg-[#15a374] text-white text-base font-medium px-6 py-3 rounded-lg transition duration-300">
                Read Latest Posts
              </button>
              <button className="cursor-pointer border-2 border-gray-200 hover:border-[#10B981] text-gray-700 font-medium text-base px-6 py-3 rounded-lg transition duration-300 bg-white">
                Browse Categories
              </button>
            </div>
          </div>

          {/* Image Section */}
          <div className="order-1 lg:order-2 relative w-full">
            <div className="bg-gray-100 rounded-xl w-full aspect-[4/3] overflow-hidden border border-gray-200">
              <div className="w-full h-full">
                <img
                  src="https://images.unsplash.com/photo-1499750310107-5fef28a66643?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80"
                  alt="Blog featured"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="absolute top-0 right-0 w-16 h-16 bg-[#10B981] rounded-bl-xl"></div>
              <div className="absolute bottom-0 left-0 w-16 h-16 bg-gray-300 rounded-tr-xl"></div>
            </div>

            {/* Tag Box */}
            <div className="absolute bottom-4 right-4 sm:bottom-6 sm:right-6 bg-white p-4 sm:p-6 rounded-xl border border-gray-200 shadow-lg max-w-full sm:max-w-xs w-full sm:w-auto">
              <div className="flex items-center gap-3">
                <div className="bg-green-100 p-2 rounded-lg">
                  <FaCheckCircle className="h-6 w-6 text-green-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 text-base sm:text-lg">
                    Top Article
                  </h3>
                  <p className="text-sm text-gray-600">
                    "Designing for Accessibility"
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
