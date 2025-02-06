import express, { Request, Response } from "express";
import { Ticket } from "../models/ticket";
import { natsWrapper } from "../nats-wrapper";

const router = express.Router();

router.get("/api/tickets", async (req: Request, res: Response) => {
  const tickets = await Ticket.find({});

  res.send(tickets);
});

export { router as indexTicketRouter };
