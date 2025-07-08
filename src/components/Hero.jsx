import { FaCheckCircle } from "react-icons/fa"
import { Link } from "react-router-dom"
import { motion } from "framer-motion"

const Hero = () => {
  const fadeInUp = {
    hidden: { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } },
  }

  const fadeIn = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 0.6 } },
  }

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
      },
    },
  }

  const scaleIn = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 15,
      },
    },
  }

  const slideIn = (direction) => ({
    hidden: {
      opacity: 0,
      x: direction === "left" ? -60 : direction === "right" ? 60 : 0,
      y: direction === "up" ? 60 : direction === "down" ? -60 : 0,
    },
    visible: {
      opacity: 1,
      x: 0,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 15,
        duration: 0.8,
      },
    },
  })

  const buttonHover = {
    hover: {
      scale: 1.05,
      transition: { duration: 0.2 },
    },
    tap: {
      scale: 0.98,
      transition: { duration: 0.1 },
    },
  }

  return (
    <section className="bg-white overflow-hidden">
      <div className="container mx-auto px-4 py-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
            className="order-2 lg:order-1 text-center lg:text-left"
          >
            <motion.span
              variants={scaleIn}
              className="inline-block px-5 py-2 bg-green-50 text-[#10B981] rounded-full text-base font-semibold mb-5 border border-green-100"
            >
              Featured Articles
            </motion.span>

            <motion.h1
              variants={fadeInUp}
              className="text-5xl md:text-6xl font-extrabold text-gray-900 leading-tight mb-6"
            >
              Discover{" "}
              <motion.span
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6, duration: 0.8 }}
                className="text-[#10B981]"
              >
                Insights
              </motion.span>{" "}
              That Spark Your Imagination
            </motion.h1>

            <motion.p
              variants={fadeInUp}
              className="text-xl text-gray-600 max-w-xl mx-auto lg:mx-0 mb-10 leading-relaxed"
            >
              Explore thought-provoking articles, expert perspectives, and creative ideas to expand your knowledge and
              perspective.
            </motion.p>

            <motion.div
              variants={staggerContainer}
              initial="hidden"
              animate="visible"
              className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start"
            >
              <motion.a href="#latest" variants={slideIn("left")} whileHover="hover" whileTap="tap">
                <motion.button
                  variants={buttonHover}
                  className="cursor-pointer bg-[#10B981] hover:bg-[#15a374] text-white text-base font-medium px-6 py-3 rounded-lg transition duration-300 w-full"
                >
                  Read Latest Posts
                </motion.button>
              </motion.a>

              <motion.div variants={slideIn("right")} whileHover="hover" whileTap="tap">
                <Link to="/all-blogs">
                  <motion.button
                    variants={buttonHover}
                    className="cursor-pointer border-2 border-gray-200 hover:border-[#10B981] text-gray-700 font-medium text-base px-6 py-3 rounded-lg transition duration-300 bg-white w-full"
                  >
                    Browse Categories
                  </motion.button>
                </Link>
              </motion.div>
            </motion.div>
          </motion.div>

          <motion.div
            variants={fadeIn}
            initial="hidden"
            animate="visible"
            transition={{ delay: 0.3 }}
            className="order-1 lg:order-2 relative w-full"
          >
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 1,
                delay: 0.4,
                type: "spring",
                stiffness: 100,
              }}
              className="bg-gray-100 rounded-xl w-full aspect-[4/3] overflow-hidden border border-gray-200"
            >
              <motion.div
                initial={{ scale: 1.2 }}
                animate={{ scale: 1 }}
                transition={{ duration: 1.5, ease: "easeOut" }}
                className="w-full h-full"
              >
                <img
                  src="https://images.unsplash.com/photo-1499750310107-5fef28a66643?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80"
                  alt="Blog featured"
                  className="w-full h-full object-cover"
                />
              </motion.div>

              <motion.div
                initial={{ x: 100, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.7, duration: 0.8, type: "spring" }}
                className="absolute top-0 right-0 w-16 h-16 bg-[#10B981] rounded-bl-xl"
              />

              <motion.div
                initial={{ x: -100, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.9, duration: 0.8, type: "spring" }}
                className="absolute bottom-0 left-0 w-16 h-16 bg-gray-300 rounded-tr-xl"
              />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{
                delay: 1.2,
                duration: 0.8,
                type: "spring",
                stiffness: 100,
                damping: 15,
              }}
              whileHover={{
                y: -5,
                boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
                transition: { duration: 0.3 },
              }}
              className="absolute bottom-4 right-4 sm:bottom-6 sm:right-6 bg-white p-4 sm:p-6 rounded-xl border border-gray-200 shadow-lg max-w-full sm:max-w-xs w-full sm:w-auto"
            >
              <div className="flex items-center gap-3">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 1.5, type: "spring", stiffness: 200 }}
                  className="bg-green-100 p-2 rounded-lg"
                >
                  <motion.div
                    animate={{
                      rotate: [0, 10, -10, 10, 0],
                    }}
                    transition={{
                      delay: 1.8,
                      duration: 0.8,
                      ease: "easeInOut",
                    }}
                  >
                    <FaCheckCircle className="h-6 w-6 text-green-600" />
                  </motion.div>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 1.6, duration: 0.5 }}
                >
                  <motion.h3 className="font-semibold text-gray-900 text-base sm:text-lg">Top Article</motion.h3>
                  <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1.8, duration: 0.5 }}
                    className="text-sm text-gray-600"
                  >
                    "Designing for Accessibility"
                  </motion.p>
                </motion.div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

export default Hero
