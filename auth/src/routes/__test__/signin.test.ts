import request from "supertest";
import { app } from "../../app";

it("returns a 200 on a successful sign-in", async () => {
  return request(app)
    .post("/api/users/signin")
    .send({
      email: "suleyman@gmail.com",
      password: "123456",
    })
    .expect(400);
});

it("fails when an incorrect password is supplied", async () => {
  await request(app)
    .post("/api/users/signup")
    .send({
      email: "test@test.com",
      password: "password",
    })
    .expect(201);

  await request(app)
    .post("/api/users/signin")
    .send({
      email: "test@test.com",
      password: "qweqwewqe",
    })
    .expect(400);
});

it("Returns successfuly singin", async () => {
  await request(app)
    .post("/api/users/signup")
    .send({
      email: "test@test.com",
      password: "password",
    })
    .expect(201);

  const response = await request(app)
    .post("/api/users/signin")
    .send({
      email: "test@test.com",
      password: "password",
    })
    .expect(200);

  expect(response.get("Set-Cookie")).toBeDefined();
});
