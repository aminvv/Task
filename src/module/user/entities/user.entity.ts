import { BaseEntityCustom } from "src/common/abstracts/base.entity";
import { Column, CreateDateColumn, Entity, UpdateDateColumn } from "typeorm";
import { UserRole } from "../enums/userRole.enum";
import { EntityName } from "src/common/enums/entityName.enum";
@Entity(EntityName.User)
export class UserEntity extends BaseEntityCustom {
    
    @Column({ unique: true })
    username: string;
  
    @Column({ unique: true })
    email: string;
  
    
    @Column({ unique: true })
    phone: string;
  
    
    @Column()
    password: string;
  
    
    @Column({ nullable: true })
    profileImage: string;
    
    @CreateDateColumn()
    createdAt: Date;
    
    @UpdateDateColumn()
    updatedAt: Date;

    @Column({ type: 'enum', enum: UserRole, default: UserRole.USER })
    role: UserRole;
    
    // @OneToMany(() => Task, (task) => task.user)
    // tasks: Task[];
  }

