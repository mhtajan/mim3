const { MongoClient, ServerApiVersion } = require('mongodb');
require('dotenv').config();
const CircularJSON = require('circular-json');
class MongoDB {
  constructor() {
    const uri = process.env.MONGO_URI;
    this.client = new MongoClient(uri, {
      serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
      }
    });
  }

  async connect() {
    try {
      await this.client.connect();
    } catch (error) {
      console.error("Error connecting to MongoDB:", error);
    }
  }

  async close() {
    try {
      await this.client.close();
      console.log("MongoDB connection closed.");
    } catch (error) {
      console.error("Error closing MongoDB connection:", error);
    }
  }


async insertDocument(database, collectionName, document) {
    try {
        const db = this.client.db(database);
        const collection = db.collection(collectionName);

        // Stringify the document while handling circular references
        const serializedDocument = CircularJSON.stringify(document);

        // Parse the serialized document back to JSON
        const parsedDocument = CircularJSON.parse(serializedDocument);

        // Use updateOne with upsert option to insert only if no matching document is found
        const result = await collection.updateOne({ code: parsedDocument.code }, { $set: parsedDocument }, { upsert: true });

        if (result.upsertedCount > 0) {
            //console.log("Inserted new document:", parsedDocument);
        } else {
            //console.log("Document already exists, not inserted:", parsedDocument);
        }

        return result.upsertedId || null;
    } catch (error) {
        console.error("Error inserting/updating document in MongoDB:", error);
        return null;
    }
}

async insertBlacklist(database, collectionName, document) {
    try {
        const db = this.client.db(database);
        const collection = db.collection(collectionName);

        // Stringify the document while handling circular references
        const serializedDocument = CircularJSON.stringify(document);

        // Parse the serialized document back to JSON
        const parsedDocument = CircularJSON.parse(serializedDocument);

        // Use updateOne with upsert option to insert only if no matching document is found
        const result = await collection.updateOne({ userId: parsedDocument.userId }, { $set: parsedDocument }, { upsert: true });

        if (result.upsertedCount > 0) {
            //console.log("Inserted new document:", parsedDocument);
        } else {
            //console.log("Document already exists, not inserted:", parsedDocument);
        }

        return result.upsertedId || null;
    } catch (error) {
        console.error("Error inserting/updating document in MongoDB:", error);
        return null;
    }
}
async getDocument(database, collectionName, query) {
    try {
        const db = this.client.db(database);
        const collection = db.collection(collectionName);

        // Find a single document based on the query
        const document = await collection.findOne(query);

        if (document) {
            console.log("Retrieved document:", document);
        } else {
            console.log("Document not found with the specified query:", query);
        }

        return document;
    } catch (error) {
        console.error("Error retrieving document from MongoDB:", error);
        return null;
    }
}
async getAllDocuments(database, collectionName) {
    try {
        const db = this.client.db(database);
        const collection = db.collection(collectionName);

        const cursor = collection.find({});

        const allDocuments = await cursor.toArray();

        //console.log("All documents in the collection:", allDocuments);

        return allDocuments;
    } catch (error) {
        console.error("Error retrieving all documents from MongoDB:", error);
        return [];
    }
}
}

module.exports = MongoDB;