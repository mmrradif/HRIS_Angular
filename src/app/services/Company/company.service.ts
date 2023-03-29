

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Company } from 'src/app/models/Company/company';


@Injectable({
  providedIn: 'root'
})
export class CompanyService {

  private baseUrl = 'http://localhost:5228/'; // replace with your base URL

  constructor(private http: HttpClient) { }

  getCompanies(): Observable<Company[]> {
    return this.http.get<Company[]>(`${this.baseUrl}Company/GetAll`);
  }

  getCompanyById(id: number): Observable<Company> {
    return this.http.get<Company>(`${this.baseUrl}Company/GetById/${id}`);
  }

  createCompany(company: Company): Observable<Company> {
    return this.http.post<Company>(`${this.baseUrl}Company/Insert/Insert`, company);
  }

  updateCompany(company: Company): Observable<Company> {
    return this.http.put<Company>(`${this.baseUrl}Company/Update/Update/${company.companyId}`, company);
  }

  deleteCompany(id: number): Observable<Company> {
    return this.http.delete<Company>(`${this.baseUrl}Company/Remove/${id}`);
  }


  // getDataById(id: number): Observable<Company> {
  //   return this.http.get<Company>(`http://localhost:18486/Company/GetById/${id}`);
  // }

  
  updateData(data: Company): Observable<Company> {
    return this.http.put<Company>(`${this.baseUrl}Company/UpdateWithStoreProcedure`, data);
  }
}
