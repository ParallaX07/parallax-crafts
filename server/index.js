const express = require("express");
const cors = require("cors");
require("dotenv").config();
const app = express();
const port = process.env.PORT || 5000;

// Middleware
app.use(
    cors({
        origin: ["https://parallax-crafts.web.app"],
    })
);
app.use(express.json());

// Routes
app.get("/", (req, res) => {
    res.send("Parallax Crafts API is running!");
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});

const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");
const uri = `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@parallax-crafts.dew8or4.mongodb.net/?retryWrites=true&w=majority&appName=Parallax-Crafts`;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    },
});

async function run() {
    try {
        const database = client.db("parallax-crafts");
        const items = database.collection("items");
        const categories = database.collection("categories");

        // get all items from the items collection
        app.get("/allItems", async (req, res) => {
            try {
                const allItems = await items.find().toArray();
                res.send(allItems);
            } catch (error) {
                console.error(error);
            }
        });

        // get specific item
        app.get("/item/:id", async (req, res) => {
            try {
                const id = req.params.id;
                const item = await items.findOne({ _id: new ObjectId(id) });
                res.send(item);
            } catch (error) {
                console.error(error);
            }
        });

        //get all items by user_email
        app.get("/items/:user_email", async (req, res) => {
            try {
                const userEmail = req.params.user_email;
                const query = { user_email: userEmail };
                const userItems = await items.find(query).toArray();
                res.send(userItems);
            } catch (error) {
                console.error(error);
            }
        });

        // get items by user_email and customization
        app.get("/items/:user_email/:customization", async (req, res) => {
            try {
                const userEmail = req.params.user_email;
                const customization = req.params.customization;

                const query = {
                    user_email: userEmail,
                    customization: customization,
                };
                const matchedItems = await items.find(query).toArray();

                res.send(matchedItems);
            } catch (error) {
                console.error(error);
                res.status(500).send("Internal Server Error");
            }
        });

        //get items by category
        app.get("/category/items/:category", async (req, res) => {
            try {
                const category = req.params.category;
                const query = { subcategory_name: category };
                const categoryItems = await items.find(query).toArray();
                res.send(categoryItems);
            } catch (error) {
                console.error(error);
            }
        });

        // get all categories from the categories collection
        app.get("/allCategories", async (req, res) => {
            try {
                const allCategories = await categories.find().toArray();
                res.send(allCategories);
            } catch (error) {
                console.error(error);
            }
        });

        //get single category
        app.get("/allCategories/:id", async (req, res) => {
            try {
                const id = req.params.id;
                const category = await categories.findOne({
                    _id: new ObjectId(id),
                });
                res.send(category);
            } catch (error) {
                console.error(error);
            }
        });

        //get category by name
        app.get("/category/:name", async (req, res) => {
            try {
                const name = req.params.name;
                const category = await categories.findOne({ name: name });
                res.send(category);
            } catch (error) {
                console.error(error);
            }
        });

        //randomly get 6 items
        app.get("/randomItems", async (req, res) => {
            try {
                const randomItems = items.aggregate([{ $sample: { size: 8 } }]);
                res.send(await randomItems.toArray());
            } catch (error) {
                console.error(error);
            }
        });

        //update category quantity
        app.patch("/allCategories/:id", async (req, res) => {
            try {
                const id = req.params.id;
                const updatedCategory = req.body;
                const result = await categories.updateOne(
                    { _id: new ObjectId(id) },
                    { $set: { quantity: updatedCategory.quantity } }
                );
                res.send(result);
            } catch (error) {
                console.error("Failed to update category quantity:", error);
                res.status(500).send("Failed to update category quantity");
            }
        });

        //update item
        app.put("/item/:id", async (req, res) => {
            try {
                const id = req.params.id;
                const updatedItem = req.body;
                const result = await items.updateOne(
                    { _id: new ObjectId(id) },
                    { $set: updatedItem }
                );
                res.send(result);
            } catch (error) {
                console.error("Failed to update item:", error);
                res.status(500).send("Failed to update item");
            }
        });

        // add an item to the items collection
        app.post("/allItems", async (req, res) => {
            try {
                const newItem = req.body;
                const result = await items.insertOne(newItem);
                console.log(result);
                res.send(result);
            } catch (error) {
                console.error(error);
            }
        });

        //delete an item from the items collection
        app.delete("/item/:id", async (req, res) => {
            try {
                const id = req.params.id;
                const result = await items.deleteOne({ _id: new ObjectId(id) });
                res.send(result);
            } catch (error) {
                console.error(error);
            }
        });

        console.log(
            "Pinged your deployment. You successfully connected to MongoDB!"
        );
    } finally {
        // Ensures that the client will close when you finish/error
        // await client.close();
    }
}
run().catch(console.dir);
