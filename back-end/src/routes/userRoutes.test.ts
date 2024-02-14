import request from "supertest";
import app from "../app";

let server: any;

beforeAll(() => {
  server = app.listen(() => {
    console.log("Test server started");
  });
});

afterAll((done) => {
  server.close(() => {
    console.log("Test server stopped");
    done();
  });
});

describe("User Routes", () => {
  it("should get all users", async () => {
    const response = await request(app).get("/api/v1/users");
    expect(response.status).toBe(200);
    expect(response.body.data).toEqual(expect.any(Array));
  });

  it("should create a user", async () => {
    const response = await request(app).post("/api/v1/users").send({
      firstName: "John",
      lastName: "Doe",
      job: "Doer",
    });
    expect(response.status).toBe(201);
    expect(response.body).toEqual(expect.any(Object));
    expect(response.body.status).toBe("success");
  });

  it("should get a user by ID", async () => {
    const response = await request(app).get("/api/v1/users/1");
    expect(response.status).toBe(200);
    expect(response.body).toEqual(expect.any(Object));
  });
});
