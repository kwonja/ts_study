// import { UserDuplicateError, UserNotFoundError, PasswordNotMatchError } from "../exception/serverErrors"
import { userRequestModel } from "../models/user.model"
import { mySqlClient } from "../config/db.config.ts";
import { User } from "../entity/user.entity.ts";
import * as crypto from 'crypto' 

export class UserService {

    async signUp(signUpRequest:userRequestModel): Promise<any> {
        // const existingUser = await mySqlClient
        //                         .getRepository(User)
        //                         .findOne({ where: { name:signUpRequest.name } })

        // if (existingUser) {
        //     // return new UserDuplicateError("username already exists")
        // }
    
        const user = new User()
        user.name = signUpRequest.name
        user.salt = this.generateSalt()
        user.password = signUpRequest.password
    
        await mySqlClient.getRepository(User).save(user)

        return `${user.name} has created`
    }

    async signIn(signInRequest: userRequestModel): Promise<any> {
        const user = await mySqlClient
                            .getRepository(User)
                            .findOne({where: { name: signInRequest.name }})

        // if (!user) {
        //     // return new UserNotFoundError('username has not found, must signup first')
        // }
        
        // const inputPassword = this.hashPassword(signInRequest.password, user.salt)

        // if(user.password != inputPassword){
        //     // return new PasswordNotMatchError('password is incorrect')
        // }

        return `${user.name} has log in`
    }

    private generateSalt(): string {
        return crypto.randomBytes(16).toString('hex');
    }
    
    private hashPassword(password: string, salt: string): string {
        return crypto
            .pbkdf2Sync(password, salt, 1000, 64, 'sha512')
            .toString('hex');
    }
}