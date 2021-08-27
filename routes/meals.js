
const express = require('express')
const { fetchMeals, addMeal, fetchMeal, deleteMeal, updateMeal} = require('../controller/meals')
// const { candidateAuth, upload } = require('../controller/middleware')

const router = express.Router()

// router.patch('/candidate/updateProfile', candidateAuth, updateCandidateProfile )

router.get('/meals', fetchMeals)
router.post('/add/meal', addMeal)
router.get('/single/meal', fetchMeal)
router.post('/delete/meal', deleteMeal)
router.put('/update/meal', updateMeal)

module.exports = router

