const express = require('express');
const {getReplys,getReply,createReply,updateReply,deleteReply} = require('../controllers/replys');

// Include other resource routers
//const replyRouter = require('./replys');
const router = express.Router({mergeParams: true});

const {protect, authorize} = require('../middleware/auth');
//router.use('/:hotelId/replys', replyRouter)

router.route('/').get(getReplys).post(protect, authorize('admin','staff'), createReply);
router.route('/:id').get(getReply).put(protect, authorize('admin','staff'), updateReply).delete(protect, authorize('admin','staff'), deleteReply);

module.exports = router;

/**
 * @swagger
 * components:
 *  schemas:
 *      Reply:
 *          type: object
 *          required:
 *              - message
 *          properties:
 *              _id:
 *                  type: string
 *                  format: uuid
 *                  description: The auto-generated id of the reply
 *              review:
 *                  type: string
 *                  format: uuid
 *                  description: The object id of the review that the reply is associated with
 *              user:
 *                  type: string
 *                  format: uuid
 *                  description: The object id of the user that created the reply
 *              message:
 *                  type: string
 *                  description: The reply message
 *              createdAt:
 *                  type: Date
 *                  description: The date and time the reply was created
 *          example:
 *             _id: 661a276f6e931d62b5eb8a22
 *             review: 661a13370a1052c3458f505d
 *             user: 65ff3b1823f6e6e0420e108d
 *             message: This is a reply message
 *             createdAt: 2021-05-12T19:00:00.000+00:00
 */

/** 
 * @swagger
 * tags:
 *  name: Replys
 *  description: The replys managing API
 */ 

 /** 
 * @swagger
 * /replys:
 *  get:
 *      summary: Return the list of all the replys
 *      tags: [Replys]
 *      responses:
 *          200:
 *              description: The list of the replys
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: array
 *                          item:
 *                              $ref: '#/components/schemas/Reply'
 */ 

 /** 
 * @swagger
 * /replys/{id}:
 *  get:
 *      summary: Get the reply by id
 *      tags: [Replys]
 *      parameters:
 *          -  in: path
 *             name: id
 *             schema:
 *                  type: string
 *             required: true
 *             description: The reply id 
 *      responses:
 *          200:
 *              description: The reply description by id
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: array
 *                          item:
 *                              $ref: '#/components/schemas/Reply'
 *          404:
 *              description: The reply was not found
 */

 /**
 * @swagger
 * /replys:
 *  post:
 *      summary: Create a new reply
 *      tags: [Replys]
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      $ref: '#/components/schemas/Reply' 
 *      responses:
 *          201:
 *              description: The Reply was successfully created
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/Reply'
 *          500:
 *              description: Some server error
 */

 /**
 * @swagger
 * /replys/{id}:
 *  put:
 *      summary: Update the reply by the id
 *      tags: [Replys]
 *      parameters:
 *          -  in: path
 *             name: id
 *             schema:
 *                  type: string
 *             required: true
 *             description: The reply id
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      $ref: '#/components/schemas/Reply' 
 *      responses:
 *          200:
 *              description: The reply was updated
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/Reply'
 *          404:
 *              description: The Reply was not found
 *          500:
 *              description: Some error happended
 */

/**
 * @swagger
 * /replys/{id}:
 *  delete:
 *      summary: Remove the reply by id
 *      tags: [Replys]
 *      parameters:
 *          -  in: path
 *             name: id
 *             schema:
 *                  type: string
 *             required: true
 *             description: The reply id
 *      responses:
 *          200:
 *              description: The reply was deleted
 *          404:
 *              description: The reply was not found
 */