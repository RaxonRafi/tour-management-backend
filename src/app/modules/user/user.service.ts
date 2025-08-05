import AppError from "../../errorHelpers/AppError";
import { IAuthProvider, Iuser, Role } from "./user.interface";
import { User } from "./user.model";
import bcryptjs from "bcryptjs"
import { envVars } from "../../config/env";
import { JwtPayload } from "jsonwebtoken";
import httpStatus from "http-status-codes"
import { QueryBuilder } from "../../utils/QueryBuilder";
import { userSearchableFields } from "./user.constant";
const createUser = async(payload: Partial<Iuser>)=>{
    const { email,password, ...rest} = payload
    const isUserExist = await User.findOne({ email })

    if(isUserExist){
        throw new AppError(httpStatus.BAD_REQUEST,"user already exists")
    }

    const hashedPassword =await bcryptjs.hash(password as string,Number(envVars.BCRYPT_SALT_ROUND))


    const authProvider: IAuthProvider = {provider:"credentials",providerId:email as string}
    const user = await User.create({
        email,
        password:hashedPassword,
        auths:[authProvider],
        ...rest
    })
    return user
}

const getAllUsers = async (query: Record<string,string>)=>{

    const queryBuilder = new QueryBuilder(User.find(),query)
    const userData = queryBuilder
    .filter()
    .search(userSearchableFields)
    .sort()
    .fields()
    .paginate()
    
    const [data,meta] = await Promise.all([
        userData.build(),
        queryBuilder.getMeta()
    ])
    return{
      data,
      meta
    }
}

const updateUser = async (userId: string, payload: Partial<Iuser>, decodedToken:JwtPayload)=>{


    if (decodedToken.role === Role.USER || decodedToken.role === Role.GUIDE) {
        if (userId !== decodedToken.userId) {
            throw new AppError(401, "You are not authorized")
        }
    }

    const ifUserExists = await User.findById(userId);

    if(!ifUserExists){
        throw new AppError(httpStatus.NOT_FOUND,"User Not Found!")
    }

    if (decodedToken.role === Role.ADMIN && ifUserExists.role === Role.SUPER_ADMIN) {
        throw new AppError(401, "You are not authorized")
    }

    if(payload.role){

        if (decodedToken.role === Role.USER || decodedToken.role === Role.GUIDE) {
            throw new AppError(httpStatus.FORBIDDEN, "You are not authorized");
        }

    }
    if (payload.isActive || payload.isDeleted || payload.isVerified) {
        if (decodedToken.role === Role.USER || decodedToken.role === Role.GUIDE) {
            throw new AppError(httpStatus.FORBIDDEN, "You are not authorized");
        }
    }


    const newUpdatedUser = await User.findByIdAndUpdate(userId, payload, { new: true, runValidators: true })

    return newUpdatedUser
}
const getSingleUser = async (id: string) => {
    const user = await User.findById(id).select("-password");
    return {
        data: user
    }
}
const getMe = async (userId: string) => {
    const user = await User.findById(userId).select("-password");
    return {
        data: user
    }
}
export const UserServices = {
    createUser,
    updateUser,
    getAllUsers,
    getSingleUser,
    getMe
}