
const Meals = require("../models/meals");

exports.fetchMeals = async (req, res) => {
    try {
        const meals = await Meals.find({
            userId: { $in: [req.query.userId] },
        });
        res.status(200).json(meals);
    } catch (err) {
        res.status(500).json(err);
    }
}

exports.fetchMeal = async (req, res) => {
    try {
        const meals = await Meals.find({
            _id: { $in: [req.query._id] },
        });
        res.status(200).json(meals);
    } catch (err) {
        res.status(500).json(err);
    }
}

exports.addMeal = async (req, res) => {
    const newMeal = new Meals(req.body);

    try {
        const savedMeal = await newMeal.save();
        res.status(200).json(savedMeal);
    } catch (err) {
        res.status(500).json(err);
    }
}


exports.deleteMeal = async (req, res) => {
        try {
            const meals = await Meals.deleteOne({
                _id: { $in: [req.query._id] },
            });
            res.status(200).json(meals);
        } catch (err) {
            res.status(500).json(err);
        }
    }


exports.updateMeal = async (req, res) => {
    const newMeal = new Meals(req.body);
    try {
        const meals = await Meals.updateOne({
            _id: { $in: [newMeal._id] }
        },newMeal);
        res.status(200).json(meals);
    } catch (err) {
        res.status(500).json(err);
    }
}

