import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Voter } from '../models/voter.model';

@Injectable({
  providedIn: 'root'
})
export class VoterService {
  // Path to the JSON file placed in src/assets/data
  private dataUrl = 'assets/data/voters.json';

  constructor(private http: HttpClient) {}

  getVoters(): Observable<Voter[]> {
    return this.http.get<Voter[]>(this.dataUrl);
  }
}
