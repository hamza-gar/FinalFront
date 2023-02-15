import {Component, OnInit} from '@angular/core';
import {RendesVousService} from "../../../../services/rendes-vous.service";
import {HttpErrorResponse} from "@angular/common/http";
import {RendezvousResponse} from "../../../../classes/RendezvousResponse";
import {GroupsServiceService} from "../../../../services/groups-service.service";
import {EquipeRequirement} from "../../../../classes/EquipeRequirement";
import {Members} from "../../../../classes/members";

@Component({
  selector: 'app-rendes-vous',
  templateUrl: './rendes-vous.component.html',
  styleUrls: ['./rendes-vous.component.css']
})
export class RendesVousComponent implements OnInit {

  public renedsVous!: RendezvousResponse[];
  public renedsVousDate: RendezvousResponse = new RendezvousResponse();

  public equipe: EquipeRequirement = new EquipeRequirement();
  public p: number = 0;

  public counter: number = 0;

  public member!: Members[][];
  public selectedGroup: EquipeRequirement = new EquipeRequirement();

  constructor(private rendesVousService: RendesVousService, private groupService: GroupsServiceService) {
  }

  ngOnInit() {
    this.getRendesVous(this.p)

  }

  public getRendesVous(p: number): void {
    this.p = p;
    this.getCount();
    this.rendesVousService.getAllRendesVous(p, 6).subscribe((operation: RendezvousResponse[]) => {
      this.renedsVous = operation;

    }, (error: HttpErrorResponse) => {
      alert(error.error.message);
    })
  }

  public getCount(): void {
    this.rendesVousService.getallRendezVousCount().subscribe((operation: number) => {
      this.counter = operation;
    }, (error: HttpErrorResponse) => {
      alert(error.error.message);
    })
  }

  public fixRendesVous() {
    this.renedsVousDate.dateRendezvous = new Date(this.renedsVousDate.dateRendezvous)
    this.rendesVousService.fixRendezvous(this.renedsVousDate).subscribe((response: RendezvousResponse) => {
      this.renedsVousDate = response;
      window.location.reload();
    }, (error: HttpErrorResponse) => {
      alert(error.error.message);
    })
  }


  myIndex(index: number) {
    this.renedsVousDate = this.renedsVous[index];

  }

  public getEquipeById(id: string) {
    this.groupService.getEquipeById(id).subscribe(
      (res: EquipeRequirement) => {
        this.equipe = res
        this.selectedGroup = res
      }, error => {
        alert(error.error.message);
      }
    )
  }

  getMemebersOfEquipe(index: number) {
    this.renedsVousDate = this.renedsVous[index];
    this.getEquipeById(this.renedsVousDate.idEquipe)
    this.groupService.getMembersOfEquipe(this.renedsVousDate.idEquipe, this.member).subscribe(
      (operation: Members[][]) => {
        this.member = operation
      }, error => {
        alert(error.error.message);
      })
  }

  changePage(page: number) {
    this.getCount();
    console.log(Math.ceil(this.counter / 6))
    if (page > 0) {
      this.p++;
    } else {
      this.p--;
    }
    if (this.p >= 0 && this.p <= (Math.ceil(this.counter / 6) - 1)) {
      this.getRendesVous(this.p);
    } else {
      this.p = 0;
    }
  }
}
