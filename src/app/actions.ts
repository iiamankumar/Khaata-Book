
"use server";

import { getPersonalizedSavingTips as getTips, PersonalizedSavingTipsInput } from "@/ai/flows/personalized-saving-tips";

export async function getPersonalizedSavingTips(input: PersonalizedSavingTipsInput) {
  try {
    const result = await getTips(input);
    return result;
  } catch (error) {
    console.error("Error getting personalized saving tips:", error);
    return { tips: "" };
  }
}
