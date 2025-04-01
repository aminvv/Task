import { Entity, Column, OneToOne, JoinColumn } from 'typeorm';
import {  UserEntity } from '../../user/entities/user.entity';
import { BaseEntityCustom } from 'src/common/abstracts/base.entity';
import { EntityName } from 'src/common/enums/entityName.enum';

@Entity(EntityName.Profile)
export class ProfileEntity extends BaseEntityCustom {

  
  @Column({ nullable: true })
  firstName?: string;
  
  @Column({ nullable: true })
  lastName?: string;
  
  @Column({ nullable: true, unique: true })
  email?: string;
  
  @Column({ nullable: true })
  avatar?: string; 
  
  @Column({ nullable: true })
  userId: number; 
 

  @OneToOne(() => UserEntity, (user) => user.profile, { onDelete: 'CASCADE' })
  user: UserEntity;
}
 