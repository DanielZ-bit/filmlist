require('dotenv').config();
const connectDB = require('./db/connect');
const Film = require('./models/schema');
const jsonFilms = require('./films.json');

const seedDatabase = async () => {
    try {
        await connectDB(process.env.MONGO_URI);
        await Film.deleteMany();
        await Film.insertMany(jsonFilms);
        console.log("Database seeded successfully!");
        process.exit(0); // Exit successfully
    } catch (error) {
        console.error("Error seeding the database:", error);
        process.exit(1); // Exit with failure
    }
};

seedDatabase();