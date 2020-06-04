import { Entity, ObjectIdColumn, ObjectID, Column } from "typeorm";
import { RSVP } from "./rsvp";

@Entity()
export class Registered {
  @ObjectIdColumn()
  _id: ObjectID;

  @Column(type => RSVP)
  rsvpUser: RSVP;

  @Column()
  users: [{ name: string }];

  @Column()
  message: string;

  @Column()
  attending: boolean;
}
