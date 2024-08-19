import { NextRequest, NextResponse } from 'next/server';
import { GoogleGenerativeAI, GenerativeModel } from '@google/generative-ai';

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY as string);

interface Flashcard {
  question: string;
  answer: string;
}

export async function POST(request: NextRequest) {
  try {
    const { topic } = await request.json();

    if (!topic) {
      return NextResponse.json({ error: 'Topic is required' }, { status: 400 });
    }

    const model: GenerativeModel = genAI.getGenerativeModel({ model: 'gemini-pro' });

    const prompt = `Create 10 flashcards for the topic: "${topic}".
      Make questions regarding the topic on your own, for the front side, and answers for the back side.
      Format the response as a JSON array of objects, each containing "question" and "answer" keys.
      Do not include any additional wrapper object or keys. The response should start and end with square brackets.
      Example format:
      [
        {
          "question": "What is the capital of France?",
          "answer": "Paris"
        },
        ...
      ]`;

    const result = await model.generateContent(prompt);
    const responseText = await result.response.text();

    console.log('Raw response:', responseText);

    const cleanedText = responseText
      .replace(/```json|```/g, '') // Remove unwanted code block markers
      .trim();

    let flashcards: Flashcard[];

    try {
      flashcards = JSON.parse(cleanedText);
    } catch (jsonError) {
      console.error('Error parsing JSON:', jsonError);
      return NextResponse.json({ error: 'Failed to parse flashcard data' }, { status: 500 });
    }

    if (!Array.isArray(flashcards) || flashcards.length === 0 || !flashcards.every(isValidFlashcard)) {
      return NextResponse.json({ error: 'Invalid flashcard data format' }, { status: 500 });
    }

    return NextResponse.json(flashcards);
  } catch (error) {
    console.error('Error generating flashcards:', error);
    return NextResponse.json({ error: 'Failed to generate flashcards' }, { status: 500 });
  }
}

function isValidFlashcard(flashcard: any): flashcard is Flashcard {
  return (
    typeof flashcard === 'object' &&
    flashcard !== null &&
    typeof flashcard.question === 'string' &&
    typeof flashcard.answer === 'string'
  );
}