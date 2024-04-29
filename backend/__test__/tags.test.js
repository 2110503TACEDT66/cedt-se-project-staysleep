const mongoose = require("mongoose");
const request = require("supertest");
const app = require("../server.js");

require("dotenv").config();
  
  describe("GET /api/v1/hotels/tags", () => {
    it("should return all tags", async () => {
      const res = await request(app).get("/api/v1/hotels/tags");
      expect(res.statusCode).toBe(200);
      expect(res.body.data.tags.length).toBeGreaterThan(0);
    });
  });