import { Entity, ObjectIdColumn, ObjectID, Column } from "typeorm";
import { RSVP } from "./rsvp";

export class RegisteredPerson {
  firstName: string;
  lastName: string;
  diet: {
    vegetarian: boolean;
    celiac: boolean;
    diary: boolean;
  };
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
