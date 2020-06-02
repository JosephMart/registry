import { Entity, ObjectIdColumn, ObjectID, Column } from "typeorm";
import { RSVP } from "./rsvp";

export class RegisteredPerson {
  name: string;
}

@Entity()
export class Registered {
  @ObjectIdColumn()
  _id: ObjectID;

  @Column(type => RSVP)
  rsvpUser: RSVP;

  @Column(type => RegisteredPerson)
  users: RegisteredPerson[];

  @Column()
  message: string;

  @Column()
  attending: boolean;
}
