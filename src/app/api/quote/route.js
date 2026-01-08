import { MongoClient } from "mongodb";
import formidable from "formidable";
import fs from "fs";

export const config = {
  api: {
    bodyParser: false, // disable default parser to handle files
  },
};

const client = new MongoClient(process.env.MONGODB_URI);

export async function POST(req) {
  try {
    await client.connect();
    const db = client.db("zs_digitizing");
    const quotes = db.collection("quotes");

    const form = formidable({ multiples: true });

    const data = await new Promise((resolve, reject) => {
      form.parse(req, (err, fields, files) => {
        if (err) reject(err);
        resolve({ fields, files });
      });
    });

    // Save file path (optional: upload to S3 or public folder)
    const fileData = data.files.designFile
      ? {
          name: data.files.designFile.originalFilename,
          size: data.files.designFile.size,
        }
      : null;

    await quotes.insertOne({
      name: data.fields.name,
      email: data.fields.email,
      details: data.fields.details,
      file: fileData,
      createdAt: new Date(),
    });

    return new Response(JSON.stringify({ message: "Quote submitted!" }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (err) {
    console.log(err);
    return new Response(JSON.stringify({ error: "Failed to submit" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
