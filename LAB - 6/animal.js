// =============================================
// LAB 6 – MongoDB Basic Commands
// Question 2: Animal (Zoo) Database
// =============================================


// 1. Create database called ‘animal’
use animal


// 2. Display all databases
show dbs


// 3. Create collections
db.createCollection("wild_animals", {
    capped: true,
    size: 500000,
    max: 10
})

db.createCollection("domestic_animals")


// 4. Insert 5 wild animals
db.wild_animals.insertMany([
{
    animal_name: "Lion",
    nature: "harm",
    favorite_foods: ["meat", "deer"],
    care_taker_name: "Ramesh",
    life_span: 14,
    timestamp: new Date(),
    expenses: 50000
},
{
    animal_name: "Tiger",
    nature: "harm",
    favorite_foods: ["meat"],
    care_taker_name: "Suresh",
    life_span: 15,
    timestamp: new Date(),
    expenses: 60000
},
{
    animal_name: "Elephant",
    nature: "harmless",
    favorite_foods: ["grass", "banana"],
    care_taker_name: "Mahesh",
    life_span: 60,
    timestamp: new Date(),
    expenses: 70000
},
{
    animal_name: "Deer",
    nature: "harmless",
    favorite_foods: ["grass"],
    care_taker_name: "Ramesh",
    life_span: 20,
    timestamp: new Date(),
    expenses: 30000
},
{
    animal_name: "Bear",
    nature: "harm",
    favorite_foods: ["fish", "meat"],
    care_taker_name: "Suresh",
    life_span: 25,
    timestamp: new Date(),
    expenses: 55000
}
])


// 5. Insert 5 domestic animals
db.domestic_animals.insertMany([
{
    animal_name: "Dog",
    gender: "male",
    favorite_foods: ["meat"],
    animal_petname: "Rocky",
    life_span: 12,
    timestamp: new Date(),
    expenses: 10000
},
{
    animal_name: "Cat",
    gender: "female",
    favorite_foods: ["fish"],
    animal_petname: "Kitty",
    life_span: 10,
    timestamp: new Date(),
    expenses: 8000
},
{
    animal_name: "Cow",
    gender: "female",
    favorite_foods: ["grass"],
    animal_petname: "Lakshmi",
    life_span: 20,
    timestamp: new Date(),
    expenses: 15000
},
{
    animal_name: "Goat",
    gender: "male",
    favorite_foods: ["leaves"],
    animal_petname: "Raja",
    life_span: 15,
    timestamp: new Date(),
    expenses: 9000
},
{
    animal_name: "Rabbit",
    gender: "female",
    favorite_foods: ["carrot"],
    animal_petname: "Bunny",
    life_span: 8,
    timestamp: new Date(),
    expenses: 5000
}
])


// 6. Display all documents
db.wild_animals.find()
db.domestic_animals.find()


// 7. Display animal name and expenses
db.wild_animals.find({}, { animal_name: 1, expenses: 1, _id: 0 })
db.domestic_animals.find({}, { animal_name: 1, expenses: 1, _id: 0 })


// 8. Display domestic animals with particular lifespan (example: 12 years)
db.domestic_animals.find({ life_span: 12 })


// 9. Display wild animals under particular caretaker (Ramesh)
db.wild_animals.find({ care_taker_name: "Ramesh" })


// 10. Display animals name, favorite_foods and expenses where lifespan > 5
db.wild_animals.find(
    { life_span: { $gt: 5 } },
    { animal_name: 1, favorite_foods: 1, expenses: 1, _id: 0 }
)