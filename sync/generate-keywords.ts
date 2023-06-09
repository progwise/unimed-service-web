import "dotenv/config";

import { documentToPlainTextString } from "@contentful/rich-text-plain-text-renderer";
import { Configuration, OpenAIApi } from "openai";
import contentful from "contentful";

const ITEM_LIMIT = 1;

const contentfulClient = contentful.createClient({
  space: process.env.CONTENTFUL_SPACE_ID!,
  accessToken: process.env.CONTENTFUL_ACCESS_TOKEN!,
});

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY!,
});
const openai = new OpenAIApi(configuration);

const entries = await contentfulClient.getEntries({
  content_type: "service",
  limit: ITEM_LIMIT,
});

entries.items.forEach(async (entry) => {
  const shortDescription = documentToPlainTextString(
    // @ts-expect-error wrong type
    entry.fields.kurzbeschreibung
  );

  const name = entry.fields.name;

  const response = await openai.createChatCompletion({
    model: "gpt-3.5-turbo",
    messages: [
      {
        role: "system",
        content:
          "Erzeuge eine List, die die wichtigsten META Keywords für SEO für den Text, die der User sendet, enthält.",
      },
      {
        role: "system",
        content:
          "Die Liste muss 10 Einträge haben. Sortiert nach der Wichtigkeit.",
      },
      {
        role: "system",
        content:
          "Die List soll folgendes Format haben: 'Keyword1, Keyword2, Keyword3, ..., Keyword10'.",
      },
      {
        role: "system",
        content: "Antworte nur mit den Keywords, ohne ein Prefix.",
      },
      { role: "user", content: name + ": " + shortDescription },
    ],
  });

  const responseAsString = response.data.choices.at(0)?.message?.content;
  const keywords = responseAsString
    ?.split(",")
    .map((keyword) => keyword.trim());

  console.log(name, keywords);
});
