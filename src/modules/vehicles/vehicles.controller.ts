import { Request, Response } from "express";
import { vehicleServices } from "./vehicles.service";

const postVehicle = async (req: Request, res: Response) =>{
    try{
        const result = await vehicleServices.postVehicle(req.body)
        if(result){
            return res.status(201).json({
                success: true,
                message: "Vehicle created successfully",
                data: result.rows[0]
            })
        }
        else{
            return res.status(400).json({
                success: false,
                message: "Vehicle not created"
            })
        }
    }
    catch(err: any) {
        return res.status(500).json({
            success: false,
            message: err.message || "Something went wrong"
        })
    }
}

const getVehicles = async (req: Request, res: Response) =>{
    try{
        const result = await vehicleServices.getVehicles()
        if(result){
            return res.status(200).json({
                success: true,
                message: "Vehicles retrieved successfully",
                data: result.rows
            })
        }
        else{
            return res.status(400).json({
                success: false,
                message: "Vehicles not fetched"
            })
        }
    }
    catch(err: any) {
        return res.status(500).json({
            success: false,
            message: err.message || "Something went wrong"
        })
    }
}

const getSingleVehicle = async (req: Request, res:Response) =>{
    const id = Number(req.params.id)
    try{
        const result = await vehicleServices.getSingleVehicle(id)
        if(result){
            return res.status(200).json({
                success: true,
                message: "Vehicle retrieved successfully",
                data: result.rows[0]
            })
        }
        else{
            return res.status(400).json({
                success: false,
                message: "Vehicle not fetched"
            })
        }
    }
    catch(err: any){
        return res.status(500).json({
            success: false,
            message: err.message || "Something went wrong"
        })
    }
}

const updateVehicle = async(req: Request, res: Response) =>{

    try{
        const result = await vehicleServices.updateVehicle(
            req.body.vehicle_name,
            req.body.type,
            req.body.registration_number,
            req.body.daily_rent_price,
            req.body.availability_status,
            Number(req.params.id)
        )
        if(result){
            return res.status(200).json({
                success: true,
                message: "Vehicle updated successfully",
                data: result.rows[0]
            })
        }
        else{
            return res.status(400).json({
                success: false,
                message: "Vehicle not updated"
            })
        }
    }
    catch(err: any) {
        return res.status(500).json({
            success: false,
            message: err.message || "Something went wrong"
        })
    }
}

export const vehicleController = {
    postVehicle,
    getVehicles,
    getSingleVehicle,
    updateVehicle
}