import express from 'express'
import { nanoid } from 'nanoid'

const router = express.Router()

const idLength = 8

/**
 * @swagger
 * components:
 *  schemas:
 *    Car:
 *      type: object
 *      required:
 *          - mark
 *          - model
 *      properties:
 *          id:
 *              type: string
 *              description: The auto-generated id of the car
 *          mark:
 *              type: string
 *              description: The car mark
 *          model:
 *              type: string
 *              description: The car model
 *      example:
 *          id: HBiibIGb
 *          mark: Lexus
 *          model: Ls_500h
 */

/**
 * @swagger
 * tags:
 *  name: Cars
 *  description: The Cars managing API
 */

/**
 * @swagger
 * /cars:
 *    get:
 *      summary: Returns the list of all cars
 *      tags: [Cars]
 *      responses:
 *          200:
 *              description: The list of the cars
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: array
 *                          items:
 *                              $ref: '#/components/schemas/Car'
 */

router.get('/', (req, res) => {
  const cars = req.app.db

  res.send(cars)
})

/**
 * @swagger
 * /cars/{id}:
 *  get:
 *      summary: Get the car by id
 *      tags: [Cars]
 *      parameters:
 *          - in: path
 *            name: id
 *            schema:
 *              type: string
 *            required: true
 *            description: The car id
 *      responses:
 *          200:
 *            description: The car description by id
 *            content:
 *              application/json:
 *                  schema:
 *                      $ref: '#/components/schemas/Car'
 *          404:
 *              description: The Car was not found
 */

router.get('/:id', async (req, res) => {
  const car = req.app.db.find((c) => c.id === req.params.id)

  if (!car) {
    res.sendStatus(404)
  }

  res.send(car)
})

/**
 * @swagger
 * /cars:
 *  post:
 *    summary: Create a new Car
 *    tags: [Cars]
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/Car'
 *    responses:
 *      200:
 *        description: The Car was successfully created
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/Car'
 *      500:
 *        description: Some server error
 */

router.post('/', async (req, res) => {
  try {
    const car = {
      id: nanoid(idLength),
      ...req.body,
    }

    req.app.db.push(car)
    res.send(car)
  } catch (error) {
    console.log(error)
    return res.status(500).send(error)
  }
})

/**
 * @swagger
 * /cars/{id}:
 *  put:
 *    summary: Update the car by id
 *    tags: [Cars]
 *    parameters:
 *      - in: path
 *        name: id
 *        schema:
 *          type: string
 *        required: true
 *        description: The car id
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/Car'
 *    responses:
 *      200:
 *        description: The car was update
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/Car'
 *      404:
 *        description: The car was not found
 *      500:
 *        description: Some error happened
 */

router.put('/:id', (req, res) => {
  try {
    req.app.db.find((c) => c.id === req.params.id)
    console.log(req.body)

    res.send(req.app.db.find((c) => c.id === req.params.id))
  } catch (error) {
    console.log(error)
    return res.status(500).send(error)
  }
})

/**
 * @swagger
 * /cars/{id}:
 *  delete:
 *    summary: Remove the car by id
 *    tags: [Cars]
 *    parameters:
 *      - in: path
 *        name: id
 *        schema:
 *          type: string
 *        required: true
 *        description: The car id
 *    responses:
 *      200:
 *        description: The car was deleted
 *      404:
 *        description: The car was not found
 */

router.delete('/:id', (req, res) => {
  req.app.db.filter((c) => c.id !== req.params.id)

  res.sendStatus(200)
})

export default router
