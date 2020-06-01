import { Entity, ObjectIdColumn, ObjectID, Column } from "typeorm";

@Entity()
export class RSVP {
  @ObjectIdColumn()
  _id: ObjectID;

  @Column()
  rsvpName: string;

  @Column()
  firstName: string;

  @Column()
  lastName: string;
}
