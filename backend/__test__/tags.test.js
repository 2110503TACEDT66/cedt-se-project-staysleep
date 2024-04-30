const mongoose = require("mongoose");
const request = require("supertest");
const app = require("../server.js");

require("dotenv").config();

const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY2MjBlODBkNzZkZTZiNzA5NWQzNzIyYiIsImlhdCI6MTcxNDM5NjU1OSwiZXhwIjoxNzE2OTg4NTU5fQ.Y1pBYkHX1RBmTmEduA115ffblhDRu-4_vxzvsS6OGm8";
  describe("GET /api/v1/hotels/tags", () => {
    it("should return all tags", async () => {
      const res = await request(app).get("/api/v1/hotels/tags");
      expect(res.statusCode).toBe(200);
      expect(res.body.data.tags.length).toBeGreaterThan(0);
    });
  });

  describe("POST /api/v1/hotels/tags", () => {
    it("shouldn't create a tag", async () => {
      const res = await request(app).post("/api/v1/hotels/tags").send({tags: ""}).set('Authorization', `Bearer ${token}`);
      expect(res.statusCode).toBe(400);
      //expect(res.body.name).toBe("");
    });

    it("should create a tag", async () => {
      const res = await request(app).post("/api/v1/hotels/tags").send({_id: "5d725a1b7b292f5f8ceff789",
      "tags": ["test"]}).set('Authorization', `Bearer ${token}`);
      expect(res.statusCode).toBe(201);
    });
  });

  describe("DELETE /api/v1/hotels/tags", () => {
    it("delete a tag", async () => {
      const res = await request(app).delete("/api/v1/hotels/tags").send({_id: "5d725a1b7b292f5f8ceff789",
      "tags": ["test"]}).set('Authorization', `Bearer ${token}`);
      expect(res.statusCode).toBe(200);
      //expect(res.body.name).toBe("");
    });
  });

  // npx jest --coverage --collectCoverageFrom=controllers/tags.js --collectCoverageFrom=models/Tags.js
