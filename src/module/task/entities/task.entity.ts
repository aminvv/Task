import { BaseEntityCustom } from "src/common/abstracts/base.entity";
import { Column, CreateDateColumn, Entity, ManyToOne, UpdateDateColumn } from "typeorm";
import { EntityName } from "src/common/enums/entityName.enum";
import { UserEntity } from "src/module/user/entities/user.entity";
@Entity(EntityName.Task)
export class TaskEntity extends BaseEntityCustom {
    
 ;
    
    @ManyToOne(() => UserEntity, (user) => user.tasks, { onDelete: 'CASCADE' })
    user: UserEntity;
  }

