import { CredenciaisDTO } from "../models/credenciais.dto";
import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { API_CONFIG } from "../config/api.config";
import { LocalUser } from "../models/local_user";
import { StorageService } from "./storage.service";

@Injectable()
export class AuthService{

    constructor(public http: HttpClient,
                public Storage: StorageService) {

    }
    authenticate(creds: CredenciaisDTO){
        return this.http.post(
                    `${API_CONFIG.baseUrl}/login`,
                       creds,
                        {
                            observe: 'response', 
                            responseType: 'text'
                        });
    }

    successfullLogin(authorizationValue: string) {
        console.log(authorizationValue);
        
        let tok = authorizationValue.substring(7);
        let user : LocalUser = {
            token: tok
        };
        this.Storage.setLocalUser(user);

    }

    logout() {
        this.Storage.setLocalUser(null);
    }

}