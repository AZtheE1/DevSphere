import { AppMetadata } from "@devsphere/types";

export const APPS: AppMetadata[] = [
  {
    id: "calculator",
    name: "Calculator",
    emoji: "🔢",
    category: "Tools",
    description: "Advanced scientific calculator.",
    path: process.env.NEXT_PUBLIC_CALCULATOR_URL || "http://localhost:3001",
    color: "#00d4ff",
  },
  {
    id: "quiz-app",
    name: "Quiz App",
    emoji: "❓",
    category: "Tools",
    description: "Test your knowledge.",
    path: process.env.NEXT_PUBLIC_QUIZ_URL || "http://localhost:3003",
    color: "#00d4ff",
  },
  // More apps will be added here
];
