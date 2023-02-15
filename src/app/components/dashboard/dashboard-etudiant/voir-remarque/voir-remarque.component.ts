import {Component, OnInit} from '@angular/core';
import {sujetRequirement} from "../../../../classes/sujetRequirement";
import {EquipeRequirement} from "../../../../classes/EquipeRequirement";
import {Members} from "../../../../classes/members";
import {SujetService} from "../../../../services/sujet.service";
import {TokenService} from "../../../../services/token.service";
import {GroupsServiceService} from "../../../../services/groups-service.service";
import {Router} from "@angular/router";
import {HttpErrorResponse} from "@angular/common/http";
import {RemarqueResponse} from "../../../../classes/RemarqueResponse";
import {EtudiantService} from "../../../../services/etudiant.service";

@Component({
  selector: 'app-voir-remarque',
  templateUrl: './voir-remarque.component.html',
  styleUrls: ['./voir-remarque.component.css']
})
export class VoirRemarqueComponent implements OnInit {

  remarqueResponse!: RemarqueResponse[];
  public p: number = 0;

  public limit: number = 0;

  constructor(private sujetService: SujetService,
              private tokenService: TokenService,
              private groupService: GroupsServiceService,
              private etudiantService: EtudiantService,
              private router: Router) {
  }

  public getMyRemarque() {
    this.etudiantService.voiRemarque(this.p, 6).subscribe((res: RemarqueResponse[]) => {
      this.remarqueResponse = res
    }, error => {
      (console.log(error))
    })
  }

  public getRemarqueCount() {
    this.etudiantService.getRemarqueCount().subscribe((res: number) => {
      this.limit = res
    }, error => {
      (console.log(error))
    })
  }

  public changePage(k: number) {
    this.p += k;
    if (this.p >= 0 && this.p <= (Math.ceil(this.limit / 6) - 1)) {
      this.getMyRemarque();
    } else {
      if (this.p < 0) {
        this.p = 0;
      } else {
        this.p = Math.ceil(this.limit / 6) - 1;
      }
    }
    console.log(this.p);
  }

  ngOnInit(): void {
    this.getRemarqueCount()
    this.getMyRemarque()
  }

}
