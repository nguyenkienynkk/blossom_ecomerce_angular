import { Injectable } from "@angular/core";
import { enviroment } from "../enviroments";
import { HttpClient } from "@angular/common/http";
import { OrderDTO } from "../dtos/order/order.dto";
import { Observable } from "rxjs";

@Injectable({
    providedIn: 'root'
})
export class OrderService {

    private apiUrl = `${enviroment.apiBaseUrl}/orders`;

    constructor(private http: HttpClient) { }

    placeOrder(orderData: OrderDTO): Observable<any> {
        return this.http.post(this.apiUrl, orderData)
    }
    getOrderById(orderId: number): Observable<any> {
        const url = `${enviroment.apiBaseUrl}/orders/${orderId}`
        return this.http.get(url);
    }

}