"use client";
import { useState } from "react";
import { motion } from "framer-motion";

type Card = {
  question: string;
  answer: string;
};

export const CardStack = ({
  items,
}: {
  items: Card[];
}) => {
  const [cards] = useState<Card[]>(items);
  const [currentCardIndex, setCurrentCardIndex] = useState<number>(0);
  const [showAnswer, setShowAnswer] = useState<boolean>(false);

  const handleCardClick = () => {
    if (showAnswer) {
      setShowAnswer(false);
      setCurrentCardIndex((prevIndex) => (prevIndex + 1) % cards.length);
    } else {
      setShowAnswer(true);
    }
  };

  return (
    <div className="relative h-60 w-60 md:h-60 md:w-96">
      {cards.length > 0 && (
        <motion.div
          key={currentCardIndex} // Use currentCardIndex as the key
          className="absolute dark:bg-black bg-white h-60 w-60 md:h-60 md:w-96 rounded-3xl p-4 shadow-xl border border-neutral-200 dark:border-white/[0.1] shadow-black/[0.1] dark:shadow-white/[0.05] flex flex-col justify-between"
          style={{
            transformOrigin: "top center",
          }}
          animate={{
            top: 0,
            scale: 1,
            zIndex: 1,
          }}
          onClick={handleCardClick}
        >
          <div className="font-normal text-neutral-700 dark:text-neutral-200">
            {showAnswer ? cards[currentCardIndex].answer : cards[currentCardIndex].question}
          </div>
        </motion.div>
      )}
    </div>
  );
};
