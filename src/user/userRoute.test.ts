import request from "supertest";
import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import express, { Express } from "express";
import {userRoutes} from "./userRoute";
import User from "./userModel";


const app: Express = express();
app.use(express.json());
app.use(userRoutes);


vi.mock("./userModel", () => ({
  default: {
    findOne: vi.fn(),
    create: vi.fn(),
  },
}));

describe("post route for registering a user", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("should return 400 status code if any of the fields are missing", async () => {
    const res = await request(app).post("/users").send({ firstName: "Rekha" });
    expect(res.status).toBe(400);
    expect(res.body).toEqual({ message: "All fields are required" });
  });

  it("should return 409 if user already exists or already registered", async () => {
    (User.findOne as vi.Mock).mockResolvedValueOnce({ id: 1 });

    const res = await request(app).post("/users").send({
      firstName: "Rekha",
      lastName: "Korepu",
      imageUrl: "http://myimage/rekha.jpg",
    });

    expect(res.status).toBe(409);
    expect(res.body).toEqual({ message: "User with this name already exists" });
  });

  it("should return 201 if user is created successfully", async () => {
    (User.findOne as vi.Mock).mockResolvedValueOnce(null);
    (User.create as vi.Mock).mockResolvedValueOnce({
      id: 1,
      firstName: "Rekha",
      lastName: "Korepu",
      imageUrl: "http://myimage/rekha.jpg",
    });

    const res = await request(app).post("/users").send({
      firstName: "Rekha",
      lastName: "Korepu",
      imageUrl: "http://myimage/rekha.jpg",
    });

    expect(res.status).toBe(201);
    expect(res.body).toHaveProperty("message", "User account created");
    expect(res.body).toHaveProperty("user");
  });

  it("should return 500 if an error occurs", async () => {
    (User.findOne as vi.Mock).mockRejectedValueOnce(new Error("Database error"));

    const res = await request(app).post("/users").send({
      firstName: "Rekha",
      lastName: "Korepu",
      imageUrl: "http://myimage/rekha.jpg",
    });

    expect(res.status).toBe(500);
    expect(res.body.message).toBe("Failed while creating a user");
  });
});

