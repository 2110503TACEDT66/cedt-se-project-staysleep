const express = require('express');
const {getReviews,getReview,createReview,updateReview,deleteReview,getReviewByBookingID} = require('../controllers/reviews');

// Include other resource routers
//const replyRouter = require('./replys');

const router = express.Router({mergeParams: true});

const {protect, authorize} = require('../middleware/auth');
//router.use('/:hotelId/replys', replyRouter)

router.route('/').get(getReviews).post(protect, authorize('admin','user'), createReview);
router.route('/:id').get(getReview).put(protect, authorize('admin','user'), updateReview).delete(protect, authorize('admin','user'), deleteReview);

module.exports = router;

/**
 * @swagger
 * components:
 *  schemas:
 *      Review:
 *          type: object
 *          properties:
 *              _id:
 *                  type: string
 *                  format: uuid
 *                  description: The auto-generated id of the review
 *              hotel:
 *                  type: string
 *                  format: uuid
 *                  description: The object id of the review that the review is associated with
 *              booking:
 *                  type: string
 *                  format: uuid
 *                  description: The object id of the booking that the review is associated with
 *              user:
 *                  type: string
 *                  format: uuid
 *                  description: The object id of the user that created the review
 *              message:
 *                  type: string
 *                  description: The review message
 *              star:
 *                  type: number
 *                  description: The review rating
 *              createdAt:
 *                  type: Date
 *                  description: The date and time the review was created
 *          example:
 *             _id: 662118a00a07e7778f2173eb
 *             hotel : 66026dd5078c681403eb908b
 *             user: 66211415c9d5dad6dfbb03aa
 *             booking: 66211439e5f4c1c26b3c09ec
 *             message: This is a review message
 *             createdAt: 2021-05-12T19:00:00.000+00:00
 */

/** 
 * @swagger
 * tags:
 *  name: Reviews
 *  description: The reviews managing API
 */ 

 /** 
 * @swagger
 * /reviews:
 *  get:
 *      summary: Return the list of all the reviews
 *      tags: [Reviews]
 *      responses:
 *          200:
 *              description: The list of the reviews
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: array
 *                          item:
 *                              $ref: '#/components/schemas/Review'
 *          500:
 *              description: Some server error
 */ 

 /** 
 * @swagger
 * /reviews/{id}:
 *  get:
 *      summary: Get the review by id
 *      tags: [Reviews]
 *      parameters:
 *          -  in: path
 *             name: id
 *             schema:
 *                  type: string
 *             required: true
 *             description: The review id 
 *      responses:
 *          200:
 *              description: The review description by id
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: array
 *                          item:
 *                              $ref: '#/components/schemas/Review'
 *          400:
 *              description: The review was not found
 *          500:
 *              description: Some error happended
 */

 /**
 * @swagger
 * /reviews:
 *  post:
 *      summary: Create a new review
 *      tags: [Reviews]
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      $ref: '#/components/schemas/Review' 
 *      responses:
 *          201:
 *              description: The Review was successfully created
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/Review'
 *          400:
 *              description: The rating must be between 1 and 5 stars
 *          500:
 *              description: Some error happended
 */

 /**
 * @swagger
 * /reviews/{id}:
 *  put:
 *      summary: Update the review by the id
 *      tags: [Reviews]
 *      parameters:
 *          -  in: path
 *             name: id
 *             schema:
 *                  type: string
 *             required: true
 *             description: The review id
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      $ref: '#/components/schemas/Review' 
 *      responses:
 *          200:
 *              description: The Review was updated
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/Review'
 *          400:
 *              description: The Review was not found / The rating must be between 1 and 5 stars
 *          500:
 *              description: Some error happended
 */

/**
 * @swagger
 * /reviews/{id}:
 *  delete:
 *      summary: Remove the review by id
 *      tags: [Reviews]
 *      parameters:
 *          -  in: path
 *             name: id
 *             schema:
 *                  type: string
 *             required: true
 *             description: The review id
 *      responses:
 *          200:
 *              description: The review was deleted
 *          400:
 *              description: The review was not found / The is an error
 *          500:
 *              description: Some error happended
 */

 /** 
 * @swagger
 * /bookings/{id}/reviews/:
 *  get:
 *      summary: Get the review by its booking id
 *      tags: [Reviews]
 *      parameters:
 *          -  in: path
 *             name: id
 *             schema:
 *                  type: string
 *             required: true
 *             description: The booking id 
 *      responses:
 *          200:
 *              description: The review description by booking id
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: array
 *                          item:
 *                              $ref: '#/components/schemas/Review'
 *          400:
 *              description: The review was not found
 *          500:
 *              description: Some error happended
 */