import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

import { AuroraBackground } from "@/components/ui/aurora-background";
import { HoverBorderGradient } from "@/components/ui/hover-border-gradient";

const WelcomePage = () => {
  const navigation = useNavigate();

  const handleNavigateToUsers = () => {
    navigation("/users");
  };

  return (
    <AuroraBackground>
      <motion.div
        initial={{ opacity: 0.0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{
          delay: 0.3,
          duration: 0.8,
          ease: "easeInOut",
        }}
        className="relative flex flex-col gap-4 items-center justify-center px-4 w-full"
      >
        <div className="text-3xl md:text-7xl font-bold dark:text-white text-center">
          Welcome to Forwrd AI
        </div>

        <div className="font-extralight text-center text-pretty text-base md:text-4xl dark:text-neutral-200 py-4">
          Discover how we can help you leverage AI for better decision-making.
        </div>
        <div className="flex gap-10">
          <HoverBorderGradient
            containerClassName="rounded-full"
            as="button"
            className="dark:bg-black bg-zinc-100 text-black dark:text-white flex items-center space-x-2"
            onClick={handleNavigateToUsers}
          >
            Get started
          </HoverBorderGradient>
        </div>
      </motion.div>
    </AuroraBackground>
  );
};

export default WelcomePage;
