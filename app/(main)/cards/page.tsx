"use client";
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Pencil, Trash2 } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { CardStack } from '@/components/ui/card-stack'; // Ensure correct import path

interface Flashcard {
  question: string;
  answer?: string;
}

interface Card extends Flashcard {
  answer: string;
}

export default function Cards() {
  const [flashcards, setFlashcards] = useState<Flashcard[]>([]);
  const [newFlashcard, setNewFlashcard] = useState<string>('');
  const [selectedCard, setSelectedCard] = useState<Card | null>(null);
  const [cardStackContent, setCardStackContent] = useState<Card[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [editingCard, setEditingCard] = useState<Flashcard | null>(null);
  const [editingQuestion, setEditingQuestion] = useState<string>('');
  const [isCardStackVisible, setIsCardStackVisible] = useState<boolean>(false);
  const router = useRouter();

  const handleAddFlashcard = () => {
    if (newFlashcard.trim() !== '') {
      const newCard: Flashcard = {
        question: newFlashcard,
      };
      setFlashcards([...flashcards, newCard]);
      setNewFlashcard('');
    }
  };

  const handleEditFlashcard = (oldQuestion: string, newQuestion: string) => {
    const updatedFlashcards = flashcards.map((card) =>
      card.question === oldQuestion ? { ...card, question: newQuestion } : card
    );
    setFlashcards(updatedFlashcards);
    setIsEditing(false);
  };

  const handleDeleteFlashcard = (question: string) => {
    const updatedFlashcards = flashcards.filter((card) => card.question !== question);
    setFlashcards(updatedFlashcards);
  };

  const generateFlashcardContent = async (topic: string): Promise<Card[]> => {
    setIsLoading(true);
    try {
      const response = await fetch('/api/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ topic }),
      });

      if (!response.ok) {
        throw new Error('Failed to generate flashcard content');
      }

      const data = await response.json();
      console.log('API Response:', data);

      if (!Array.isArray(data)) {
        throw new Error('Unexpected response format: data is not an array');
      }

      const flashcardsWithAnswer = data.map((item: any) => ({
        ...item,
        answer: item.answer || "",
      }));

      return flashcardsWithAnswer;
    } catch (error) {
      console.error('Error generating flashcard content:', error);
      return [];
    } finally {
      setIsLoading(false);
    }
  };

  const handleCardClick = async (card: Flashcard) => {
    setIsCardStackVisible(true);
    if (!card.answer) {
      const content = await generateFlashcardContent(card.question);
      if (content) {
        setCardStackContent(content);
        setSelectedCard({ ...card, answer: content[0]?.answer || '' });
      }
    } else {
      setCardStackContent([{ ...card, answer: card.answer || '' }]);
      setSelectedCard({ ...card, answer: card.answer || '' });
    }
  };

  const openEditDialog = (card: Flashcard) => {
    setEditingCard(card);
    setEditingQuestion(card.question);
    setIsEditing(true);
  };

  const closeEditDialog = () => {
    setIsEditing(false);
    setEditingCard(null);
  };

  const handleEditSubmit = () => {
    if (editingCard) {
      handleEditFlashcard(editingCard.question, editingQuestion);
      closeEditDialog();
    }
  };

  return (
    <div className="p-4 sm:p-6 bg-[#f5f1e9] min-h-screen">
      <div className="max-w-4xl mx-auto">
        <div className="flex flex-col lg:flex-row justify-between items-center mb-6 space-y-4 lg:space-y-0 lg:space-x-4">
          <h1 className="text-2xl lg:text-3xl font-bold text-cards">BRAINDASH</h1>
          <div className="flex flex-col lg:flex-row items-center space-y-2 lg:space-y-0 lg:space-x-2">
            <input
              type="text"
              value={newFlashcard}
              onChange={(e) => setNewFlashcard(e.target.value)}
              placeholder="Enter new flashcard"
              className="border-2 border-cards rounded p-2 w-full lg:w-auto focus:border-primary text-primary focus:ring-primary focus:outline-none"
            />
            <Button
              onClick={handleAddFlashcard}
              variant="outline"
              className="border-2 border-cards text-cards hover:bg-cards hover:text-quaternary"
            >
              Add Flashcard
            </Button>
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {flashcards.map((card) => (
            <Dialog key={card.question} open={isCardStackVisible} onOpenChange={setIsCardStackVisible}>
              <div className="relative">
                <DialogTrigger asChild>
                  <div
                    className="bg-white border-cards p-4 rounded-lg shadow-md border  cursor-pointer"
                    onClick={() => handleCardClick(card)}
                  >
                    <p className="text-sm font-medium text-primary mb-4 min-h-[3rem]">
                      {card.question}
                    </p>
                  </div>
                </DialogTrigger>
                <div className="absolute top-2 right-2 flex space-x-2">
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => openEditDialog(card)}
                  >
                    <Pencil className="w-4 h-4 text-cards hover:text-primary" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => handleDeleteFlashcard(card.question)}
                  >
                    <Trash2 className="w-4 h-4 text-cards hover:text-primary" />
                  </Button>
                </div>
              </div>
              <DialogContent className="sm:max-w-[425px] text-primary border-cards backdrop-blur-md bg-opacity-80 bg-[#f5f1e9] shadow-lg">
                <DialogHeader>
                  <DialogTitle>Flip Cards</DialogTitle>
                </DialogHeader>
                <div className="mt-4 text-primary">
                  {isLoading ? (
                    <p>Loading content...</p>
                  ) : (
                    <CardStack items={cardStackContent} /> // Correct prop name
                  )}
                </div>
              </DialogContent>
            </Dialog>
          ))}
        </div>
      </div>
      {isEditing && (
        <Dialog open={isEditing} onOpenChange={closeEditDialog}>
          <DialogContent className="sm:max-w-[425px] text-primary backdrop-blur-md bg-opacity-80 bg-[#f5f1e9] shadow-lg">
            <DialogHeader>
              <DialogTitle>Edit Flashcard</DialogTitle>
            </DialogHeader>
            <div className="mt-4">
              <input
                type="text"
                value={editingQuestion}
                onChange={(e) => setEditingQuestion(e.target.value)}
                className="border border-cards focus:border-primary text-primary focus:ring-primary focus:outline-none rounded p-2 w-full"
              />
            </div>
            <div className="flex justify-end mt-4 space-x-2">
              <Button
                variant="outline"
                onClick={closeEditDialog}
                className="border-cards text-cards hover:bg-cards hover:text-quaternary"
              >
                Cancel
              </Button>
              <Button
                onClick={handleEditSubmit}
                className="bg-cards text-quaternary hover:bg-nonary"
              >
                Save
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
}
