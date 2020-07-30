import { Entity, ObjectIdColumn, ObjectID, Column } from "typeorm";
import { RSVP } from "./rsvp";

@Entity()
export class Registered {
  @ObjectIdColumn()
  _id: ObjectID;

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  @Column(type => RSVP)
  rsvpUser: RSVP;

  @Column()
  users: [{ name: string }];

  @Column()
  message: string;

  @Column()
  attending: boolean;

  @Column()
  timestamp: Date;

  @Column()
  email: string;
}
