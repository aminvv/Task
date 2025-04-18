import { BaseEntityCustom } from "src/common/abstracts/base.entity";
import { Column, CreateDateColumn, Entity, JoinColumn, OneToMany, OneToOne, UpdateDateColumn } from "typeorm";
import { EntityName } from "src/common/enums/entityName.enum";
import { Roles } from "src/common/enums/role.enums";
import { TaskEntity } from "src/module/task/entities/task.entity";
import { ProfileEntity } from "src/module/profile/entities/profile.entity";
@Entity(EntityName.User)
export class UserEntity extends BaseEntityCustom {

  @Column({ unique: true, nullable: true })
  username: string;

  @Column({ unique: true, nullable: true })
  email: string;


  @Column({ unique: true, nullable: true })
  phone: string;


  @Column()
  password: string;

  @Column({ nullable: true })
  profileId: number;

  @Column({ nullable: true })
  taskId: number;


  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @Column({ type: 'text', nullable: true })
  refreshToken: string | null;

  @Column({ type: 'enum', enum: Roles, default: Roles.User })
  role: Roles;

  @OneToMany(() => TaskEntity, (task) => task.user)
  tasks: TaskEntity[];

  @OneToOne(() => ProfileEntity, (profile) => profile.user, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'profileId' })
  profile: ProfileEntity;
}

 

