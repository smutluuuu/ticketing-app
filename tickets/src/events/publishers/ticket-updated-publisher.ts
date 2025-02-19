import { Publisher, Subjects, TicketUpdatedEvent } from "@tickets-sm/common";

export class TicketUpdatedPublisher extends Publisher<TicketUpdatedEvent> {
  subject: Subjects.TicketUpdated = Subjects.TicketUpdated;
}
