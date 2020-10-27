import {Request, Response} from 'express'
import CustomerModel, {Customer} from "../models/Customer";

class CustomerController {
    public async index(request: Request, response: Response): Promise<void> {
        const customers: Customer[] = await CustomerModel.find().lean()
         response.render('customer/list_customer.hbs',{customers,title:'Danh sách khách hàng'})
    }
}

export const customerController = new CustomerController()