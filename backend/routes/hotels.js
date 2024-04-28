const express = require('express');
const {getHotels,getHotel,createHotel,updateHotel,deleteHotel,addHotelTags, removeHotelTags} = require('../controllers/hotels');
const {getTags,createTags,deleteTags} = require('../controllers/tags');

// Include other resource routers
const bookingRouter = require('./bookings');
const roomRouter = require('./rooms');
const reviewRouter = require('./reviews');
const replyRouter = require('./replys');

const router = express.Router();

const {protect, authorize} = require('../middleware/auth');

// tags
router.route('/tags').get(getTags).post(protect, authorize('admin', 'staff'), createTags).delete(protect, authorize('admin', 'staff'), deleteTags);

//Re-route into other resource routers
router.use('/:hotelId/bookings', bookingRouter);
router.use('/:hotelId/rooms', roomRouter);
router.use('/:hotelId/reviews', reviewRouter)
router.use('/:hotelId/replys', replyRouter)

router.route('/').get(getHotels).post(protect, authorize('admin'), createHotel);
router.route('/:id/tags').put(protect, authorize('admin', 'staff'), addHotelTags).delete(protect, authorize('admin', 'staff'), removeHotelTags);
router.route('/:id').get(getHotel).put(protect, authorize('admin'), updateHotel).delete(protect, authorize('admin'), deleteHotel);

module.exports = router;

/**
 * @swagger
 * components:
 *  securitySchemes:
 *       bearerAuth:
 *         type: http
 *         scheme: bearer
 *         bearerFormat: JWT
 */

/**
 * @swagger
 * components:
 *  schemas:
 *      Hotel:
 *          type: object
 *          required:
 *            - name
 *            - tags
 *            - address
 *            - district
 *            - province
 *            - postalcode
 *            - tel
 *          properties:
 *              _id:
 *                  type: string
 *                  format: uuid
 *                  description: The auto-generated id of the Hotel
 *              name:
 *                  type: string
 *                  description: The name of the Hotel
 *              tags:
 *                  type: array
 *                  description: The tags of the Hotel
 *              address:
 *                  type: string
 *                  description: The address of the Hotel
 *              district:
 *                  type: string
 *                  description: The district of the Hotel
 *              province:
 *                  type: number
 *                  description: The province of the Hotel
 *              postalcode:
 *                  type: string
 *                  description: The postal code of the Hotel
 *              tel:
 *                 type: string
 *                 description: The telephone number of the Hotel
 *              picture:
 *                 type: string
 *                 description: The link to the picture of the Hotel
 *          example:
 *             _id: 5d725a1b7b292f5f8ceff789
 *             name: The Hotel
 *             tags: [tag1, tag2]
 *             address: 1234 Main St
 *             district: District
 *             province: Province
 *             postalcode: 12345
 *             tel: 1234567890
 *             picture: https://www.google.com
 */

/** 
 * @swagger
 * tags:
 *  name: Hotels
 *  description: The hotels managing API
 */ 

 /** 
 * @swagger
 * /hotels:
 *  get:
 *      summary: Return the list of all the hotels
 *      tags: [Hotels]
 *      responses:
 *          200:
 *              description: The list of the hotels
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: array
 *                          item:
 *                              $ref: '#/components/schemas/Hotel'
 *          400:
 *              description: Some error happended
 */ 

 /** 
 * @swagger
 * /hotels/{id}:
 *  get:
 *      summary: Get the hotel by id
 *      tags: [Hotels]
 *      parameters:
 *          -  in: path
 *             name: id
 *             schema:
 *                  type: string
 *             required: true
 *             description: The hotel id 
 *      responses:
 *          200:
 *              description: The hotel description by id
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: array
 *                          item:
 *                              $ref: '#/components/schemas/Hotel'
 *          404:
 *              description: The hotel was not found
 *          500:
 *              description: Some error happended
 */

 /**
 * @swagger
 * /hotels:
 *  post:
 *      summary: Create a new hotel
 *      tags: [Hotels]
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      $ref: '#/components/schemas/Hotel' 
 *      responses:
 *          201:
 *              description: The hotel was successfully created
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/Hotel'
 *          500:
 *              description: Some error happended
 *          401:
 *              description: Not authorized to access this data
 *      security:
 *         - bearerAuth: []
 */

 /**
 * @swagger
 * /hotels/{id}:
 *  put:
 *      summary: Update the hotel by the id
 *      tags: [Hotels]
 *      parameters:
 *          -  in: path
 *             name: id
 *             schema:
 *                  type: string
 *             required: true
 *             description: The hotel id
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      type: object
 *                      properties:
 *                          name:
 *                              type: string
 *                              description: The name of the Hotel
 *                          address:
 *                              type: string
 *                              description: The address of the Hotel
 *                          district:
 *                              type: string
 *                              description: The district of the Hotel
 *                          province:
 *                              type: number
 *                              description: The province of the Hotel
 *                          postalcode:
 *                              type: string
 *                              description: The postal code of the Hotel
 *                          tel:
 *                             type: string
 *                             description: The telephone number of the Hotel
 *                          picture:
 *                             type: string
 *                             description: The link to the picture of the Hotel 
 *      responses:
 *          200:
 *              description: The hotel was updated
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/Hotel'
 *          400:
 *              description: The Hotel was not found / invalid input / Server error
 *          401:
 *              description: Not authorized to access this data
 *      security:
 *         - bearerAuth: []
 */

/**
 * @swagger
 * /hotels/{id}:
 *  delete:
 *      summary: Remove the Hotel by id
 *      tags: [Hotels]
 *      parameters:
 *          -  in: path
 *             name: id
 *             schema:
 *                  type: string
 *             required: true
 *             description: The Hotel id
 *      responses:
 *          200:
 *              description: The Hotel was deleted
 *          400:
 *              description: The Hotel was not found / The is an error
 *          401:
 *              description: Not authorized to access this data
 *      security:
 *         - bearerAuth: []
 */

/**
 * @swagger
 * /hotels/{id}/tags:
 *  put:
 *      summary: Add tags to the hotel
 *      tags: [Hotels]
 *      parameters:
 *          -  in: path
 *             name: id
 *             schema:
 *                  type: string
 *             required: true
 *             description: The hotel id
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      $ref: '#/components/schemas/Tag' 
 *      responses:
 *          200:
 *              description: The hotel's tags was updated
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/Hotel'
 *          400:
 *              description: The Hotel was not found / invalid input / Server error
 *          401:
 *              description: Not authorized to access this data
 *      security:
 *         - bearerAuth: []
 */

/**
 * @swagger
 * /hotels/{id}/tags:
 *  delete:
 *      summary: Remove the hotel's tag
 *      tags: [Hotels]
 *      parameters:
 *          -  in: path
 *             name: id
 *             schema:
 *                  type: string
 *             required: true
 *             description: The Hotel id
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      $ref: '#/components/schemas/Tag' 
 *      responses:
 *          200:
 *              description: The Hotel's tag was updated
 *          400:
 *              description: The Hotel was not found / The is an error
 *          401:
 *              description: Not authorized to access this data
 *      security:
 *         - bearerAuth: []
 */

/**
 * @swagger
 * components:
 *  schemas:
 *      Tag:
 *          type: object
 *          properties:
 *             _id:
 *                type: string
 *                format: uuid
 *                description: The auto-generated id of the Tag
 *             tags:
 *                type: array
 *                description: The tags of the Hotel
 *          example:
 *                _id: 5d725a1b7b292f5f8ceff789
 *                tags: [tag1, tag2]
 */

/** 
 * @swagger
 * tags:
 *  name: Tags
 *  description: The tags managing API
 */ 

 /** 
 * @swagger
 * /hotels/tags:
 *  get:
 *      summary: Return the list of all the tags
 *      tags: [Tags]
 *      responses:
 *          200:
 *              description: The list of the tags
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: array
 *                          item:
 *                              $ref: '#/components/schemas/Tag'
 *          400:
 *              description: Some server error
 */ 

 /**
 * @swagger
 * /hotels/tags:
 *  post:
 *      summary: Create a new tag
 *      tags: [Tags]
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      $ref: '#/components/schemas/Tag'
 *      responses:
 *          201:
 *              description: The hotel was successfully created
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/Tag'
 *          400:
 *              description: Some error happended
 *          401:
 *              description: Not authorized to access this data
 *      security:
 *         - bearerAuth: []
 */

/**
 * @swagger
 * /hotels/tags:
 *  delete:
 *      summary: Remove the tag
 *      tags: [Tags]
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      $ref: '#/components/schemas/Tag'
 *      responses:
 *          200:
 *              description: The tag was deleted
 *          400:
 *              description: The is an error
 *          401:
 *              description: Not authorized to access this data
 *      security:
 *         - bearerAuth: []
 */