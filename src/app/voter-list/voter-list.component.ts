import { Component, OnInit } from "@angular/core";
import { Voter } from "../models/voter.model";
import { VoterService } from "../services/voter.service";

@Component({
  selector: "app-voter-list",
  templateUrl: "./voter-list.component.html",
  styleUrls: ["./voter-list.component.css"],
})
export class VoterListComponent implements OnInit {
  allVoters: Voter[] = [];
  filteredVoters: Voter[] = [];

  nameFilter: string = "";
  epicFilter: string = "";

  loading = true;
  errorMsg = "";

  constructor(private voterService: VoterService) {}

  ngOnInit(): void {
    this.voterService.getVoters().subscribe({
      next: (data) => {
        this.allVoters = data;
        this.filteredVoters = data;
        this.loading = false;
      },
      error: (err) => {
        console.error("Error loading voters.json", err);
        this.errorMsg = "Failed to load voter data.";
        this.loading = false;
      },
    });
  }

  applyFilters(): void {
    const nameTerm = this.nameFilter.trim().toLowerCase();
    const epicTerm = this.epicFilter.trim().toLowerCase();

    this.filteredVoters = this.allVoters.filter((voter) => {
      const matchesName = nameTerm
        ? voter.name_english.toLowerCase().includes(nameTerm)
        : true;
      const matchesEpic = epicTerm
        ? voter.epic_number.toLowerCase().includes(epicTerm)
        : true;
      return matchesName && matchesEpic;
    });
  }

  resetFilters(): void {
    this.nameFilter = "";
    this.epicFilter = "";
    this.filteredVoters = this.allVoters;
  }
}
