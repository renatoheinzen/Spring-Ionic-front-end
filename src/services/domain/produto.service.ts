import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { API_CONFIG } from "../../config/api.config";
import { Observable } from "rxjs/Rx";
import { ProdutoDTO } from "../../models/produto.dto";

@Injectable()
export class ProdutoService {

    constructor(public http: HttpClient) {

    }

    findByCategoria(categoria_id: string) {
        return this.http.get(`${API_CONFIG.baseUrl}/produtos/?categorias=${categoria_id}`);
    }

    getSmallImageFromBucket(id: string) : Observable<any> {
        let url = `${API_CONFIG.buckectBaseUrl}/prod${id}-small.jpg`;
        return this.http.get(url, {responseType : 'blob'});
    }

    findById(produto_id: string) {
        return this.http.get<ProdutoDTO>(`${API_CONFIG.baseUrl}/produtos/${produto_id}`);
    }

    getImageFromBucket(id: string) : Observable<any> {
        let url = `${API_CONFIG.buckectBaseUrl}/prod${id}.jpg`;
        return this.http.get(url, {responseType : 'blob'});
    }


    

}