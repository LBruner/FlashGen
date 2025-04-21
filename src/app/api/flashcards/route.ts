import { addFlashcards } from "@/lib/anki";
import { Flashcard } from "@/models/Flashcard";
import { FlashcardSchema } from "@/models/schemas/flashcard-schema";
import { z } from "zod";

const FlashcardArraySchema = z.array(FlashcardSchema);

export async function GET(request: Request) {
  console.log("oi");
}

export async function POST(request: Request) {
  try {
    const reqBody = await request.json();

    const parsed = FlashcardArraySchema.parse(reqBody);
    console.log(parsed);
    const flashcards: Flashcard[] = parsed.map((item) => new Flashcard(item));

    if (flashcards.length === 0) {
      return new Response("Nenhum flashcard foi enviado.", { status: 400 });
    }

    await addFlashcards(flashcards);
  } catch (error) {
    if (error instanceof z.ZodError) {
      console.error("Erro de validação Zod:", error.errors);
      return new Response("Formato inválido de flashcards.", { status: 400 });
    }

    console.error("Erro interno:", error);
    return new Response("Erro no servidor.", { status: 500 });
  }
}
