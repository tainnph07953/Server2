// @ts-ignore
import {Request, Response} from 'express'
import OrderModel, {Order} from "../models/Order";
import mongoose, {Schema} from "mongoose";
import {mongodb} from "../key";


class StatisticalController {
    public async index(request: Request, response: Response): Promise<void> {
        const listOrder = await OrderModel.find().lean()
        const listIdProductInOrder: Set<string> = new Set<string>();
        const listCountProduct: number[] = []
        const listNameCountProduct: string[] = []
        // tslint:disable-next-line:prefer-for-of
        for (let i = 0; i < listOrder.length; i++) {
            // tslint:disable-next-line:prefer-for-of
            for (let j = 0; j < listOrder[i].listProduct.length; j++) {
                // tslint:disable-next-line:no-unused-expression
                listIdProductInOrder.add(String(listOrder[i].listProduct[j].idProduct))
            }
        }
        listIdProductInOrder.forEach(value => {
            // tslint:disable-next-line:no-console
            let count = 0;
            let name=''
            // tslint:disable-next-line:no-console
            // tslint:disable-next-line:prefer-for-of
            for (let i = 0; i < listOrder.length; i++) {
                // tslint:disable-next-line:prefer-for-of
                for (let j = 0; j < listOrder[i].listProduct.length; j++) {
                    // tslint:disable-next-line:no-unused-expression
                    if (String(listOrder[i].listProduct[j].idProduct) === String(mongoose.Types.ObjectId(value))
                    && listOrder[i].status===true
                    ) {
                        count += Number(listOrder[i].listProduct[j].amount)
                        name=listOrder[i].listProduct[j].nameProduct
                    }

                }
            }
            if(count>0){
                listCountProduct.push(count)
                listNameCountProduct.push(name)
            }
        })
        let tempCount = listCountProduct[0];
        let tempCountName = listNameCountProduct[0];
        for (let i = 0 ; i < listCountProduct.length - 1; i++) {
            for (let j = i + 1; j < listCountProduct.length; j++) {
                if (Number(listCountProduct[i]) < Number(listCountProduct[j])) {
                    tempCount=listCountProduct[j];
                    tempCountName=listNameCountProduct[j];
                    listCountProduct[j]=listCountProduct[i];
                    listNameCountProduct[j]=listNameCountProduct[i];
                    listCountProduct[i]=tempCount;
                    listNameCountProduct[i]=tempCountName;
                }
            }
        }
        let listCountProductSend=''
        let listNameCountProductSend=''
        // tslint:disable-next-line:prefer-for-of
        for(let i=0;i<listNameCountProduct.length;i++){
            if(i===listNameCountProduct.length-1){
                listNameCountProductSend+=`"${listNameCountProduct[i]}"`
            }else {
                listNameCountProductSend+=`"${listNameCountProduct[i]}",`
            }
        }
        for(let i=0;i<listCountProduct.length;i++){
            if(i===listCountProduct.length-1){
                listCountProductSend+=`${listCountProduct[i]}`
            }else {
                listCountProductSend+=`${listCountProduct[i]},`
            }
        }

        // tslint:disable-next-line:no-console
        response.render('statistical/index', {listCountProductSend,listNameCountProductSend,title: 'Thống kê'})
    }
}

export const statisticalController = new StatisticalController()