const express = require("express");
const { register, login, getMe, logout } = require("../controllers/auth");

const router = express.Router();

const { protect } = require("../middleware/auth");

router.post("/register", register);
router.post("/login", login);
router.get("/me", protect, getMe);
router.get("/logout", protect, logout);

module.exports = router;

/**
 * @swagger
 * components:
 *  schemas:
 *      User:
 *          type: object
 *          properties:
 *              _id:
 *                  type: string
 *                  format: uuid
 *                  description: The auto-generated id of the reply
 *              name:
 *                  type: string
 *                  description: User name
 *              email:
 *                  type: string
 *                  description: User email
 *              role:
 *                  type: string
 *                  description: User role
 *              password:
 *                  type: string
 *                  description: User password
 *              tel:
 *                  type: string
 *                  description: User telephone number
 *          example:
 *             _id: 661a276f6e931d62b5eb8a22
 *             name: John Doe
 *             email: john@gmail.com
 *             role: user
 *             password: 123456
 *             tel: 0123456789
 */

/** 
 * @swagger
 * tags:
 *  name: Auths
 *  description: The authentication managing API
 */ 

 /** 
 * @swagger
 * /auth/login:
 *  post:
 *      summary: Login to the application
 *      tags: [Auths]
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      $ref: '#/components/schemas/User'
 *      responses:
 *          200:
 *              description: Login successful
 */ 
