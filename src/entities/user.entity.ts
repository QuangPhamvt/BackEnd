import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm'

@Entity({
  /**
   * Table name.
   * If not specified then naming strategy will generate table name from entity name.
   */
  name: 'USER',
})
export default class USER {
  @PrimaryGeneratedColumn('uuid')
  id: number

  @Column({
    name: 'first_name',
    type: 'varchar',
    length: '50',
    comment: 'The first name of the user',
    nullable: true,
  })
  firstName!: string

  @Column({
    name: 'last_name',
    type: 'varchar',
    length: '50',
    comment: 'The last name of the user.',
    nullable: true,
  })
  lastName!: string

  @Column({
    name: 'mobile',
    type: 'varchar',
    length: '50',
    comment: 'The mobile number of the use. It can be used for login and registration purpose.',
    nullable: true,
  })
  mobile!: string

  @Column({
    name: 'email',
    type: 'varchar',
    length: '50',
    comment: 'The email of the use. It can be used for login and registration purpose.',
    unique: true,
  })
  email: string

  @Column({
    name: 'password',
    type: 'varchar',
    comment:
      'The password hash generated by the appropriate algorithm. We must avoid storing plain password.',
  })
  password: string

  @Column({
    name: 'registered_at',
    type: 'datetime',
    comment: 'This column can be used to calculate the life of the user with the blog.',
    nullable: true,
  })
  registeredAt!: Date

  @Column({
    name: 'photo',
    type: 'varchar',
    comment: 'This column is use to storing the photo of the user',
    nullable: true,
  })
  photo!: string
}