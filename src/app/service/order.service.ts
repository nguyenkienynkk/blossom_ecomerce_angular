import { Injectable } from "@angular/core";
import { enviroment } from "../enviroments";
import { HttpClient, HttpParams } from "@angular/common/http";
import { OrderDTO } from "../dtos/order/order.dto";
import { Observable } from "rxjs";
import { OrderResponse } from "../responses/order/order.response";

@Injectable({
    providedIn: 'root'
})
export class OrderService {

    private apiUrl = `${enviroment.apiBaseUrl}/orders`;
    private apiGetAllOrders = `${enviroment.apiBaseUrl}/orders/get-orders-by-keyword`;


    constructor(private http: HttpClient) { }

    placeOrder(orderData: OrderDTO): Observable<any> {
        return this.http.post(this.apiUrl, orderData)
    }
    getOrderById(orderId: number): Observable<any> {
        const url = `${enviroment.apiBaseUrl}/orders/${orderId}`
        return this.http.get(url);
    }
    getAllOrders(keyword: string,
        page: number, limit: number
    ): Observable<OrderResponse[]> {
        const params = new HttpParams()
            .set('keyword', keyword)
            .set('page', page.toString())
            .set('limit', limit.toString());
        return this.http.get<any>(this.apiGetAllOrders, { params });
    }
    deleteOrder(orderId: number): Observable<any> {
        const url = `${enviroment.apiBaseUrl}/orders/${orderId}`;
        return this.http.delete(url, { responseType: 'text' });
    }

}