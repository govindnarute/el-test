import { Component, OnInit } from "@angular/core";
import html2canvas from "html2canvas";
import { Voter } from "../models/voter.model";
import { VoterService } from "../services/voter.service";
import { AuthService } from "../services/auth.service";
import { Router } from "@angular/router";

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

  constructor(
    private voterService: VoterService,
    private authService: AuthService,
    private router: Router,
  ) {}

  logout(): void {
    this.authService.logout();
    this.router.navigate(["/login"]);
  }

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

  async downloadCard(card: any, voter: Voter): Promise<void> {
    alert("test");
    // const canvas = await html2canvas(card, {
    //   backgroundColor: "#ffffff",
    //   scale: 2, // down from 3 — still sharp, much faster
    //   useCORS: true,
    //   logging: false, // reduce console overhead
    //   imageTimeout: 5000, // stop wai
    // });
    // const link = document.createElement("a");
    // link.download = `voter-${voter.epic_number}.png`;
    // link.href = canvas.toDataURL("image/png");
    // link.click();
  }

  shareOnWhatsApp(voter: Voter): void {
    const message = this.buildShareText(voter);

    window.open(`https://wa.me/?text=${encodeURIComponent(message)}`, "_blank");
  }

  private buildShareText(v: Voter): string {
    return [
      "🗳️ *Voter Details*",
      "",
      `👤 Name: ${v.name}`,
      `🪪 EPIC No: ${v.epic_number}`,
      `📍 Ward No: ${v.wardNo}`,
      `🔢 Serial No: ${v.serial_number}`,
      `👩‍👦 ${v.relation_type} Relation (${v.relation_type}): ${v.relation_name}`,
      `🏠 House No: ${v.house_number || "—"}`,
      `🎂 Age: ${v.age}`,
    ].join("\n");
  }

  // Optional: vary the relation emoji based on relation type
  private relationEmoji(relationType: string): string {
    const type = (relationType || "").toLowerCase();
    if (type === "husband") return "💍";
    if (type === "mother") return "👩‍👦";
    return "👨‍👦"; // father / default
  }
}
