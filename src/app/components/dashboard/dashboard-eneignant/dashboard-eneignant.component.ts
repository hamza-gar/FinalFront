import {Component, OnInit} from '@angular/core';
import {SujetService} from "../../../services/sujet.service";
import {GroupsServiceService} from "../../../services/groups-service.service";
import {sujetRequirement} from "../../../classes/sujetRequirement";
import {EquipeRequirement} from "../../../classes/EquipeRequirement";
import {SoutenanceService} from "../../../services/soutenance.service";
import {SoutenanceResponse} from "../../../classes/SoutenanceResponse";
import {Members} from "../../../classes/members";
import {EnseignantService} from "../../../services/enseignant.service";
import {enseignantSignUp} from "../../../classes/enseignantSignUp";
import {JuryResponse} from "../../../classes/JuryResponse";
import {HttpErrorResponse} from "@angular/common/http";

@Component({
  selector: 'app-dashboard-eneignant',
  templateUrl: './dashboard-eneignant.component.html',
  styleUrls: ['./dashboard-eneignant.component.css']
})
export class DashboardEneignantComponent implements OnInit {

  public subjects: sujetRequirement = new sujetRequirement();
  public lisSubjects!: sujetRequirement[];
  public fullEquipe!: EquipeRequirement[];
  public enseignant!: enseignantSignUp[];
  public Jury!: JuryResponse[];

  public IdSoutenance: SoutenanceResponse = new SoutenanceResponse();

  enseignantSelected: enseignantSignUp = new enseignantSignUp();
  public equipeRequirement: EquipeRequirement = new EquipeRequirement();

  public soutenanceResponse: SoutenanceResponse = new SoutenanceResponse();

  public member!: Members[][];

  public typeJury!: string;

  public UpdateDate!: Date;

  public p: number = 0;

  public counter: number = 0;

  constructor(private sujet: SujetService,
              private groupService: GroupsServiceService,
              private soutenanceService: SoutenanceService,
              private enseignantService: EnseignantService) {
  }


  public getMyLockedSujets(p: number) {
    this.p = p;
    this.sujet.getMyLockedSujets(this.p, 6).subscribe((response: sujetRequirement[]) => {
        this.lisSubjects = response;
      }, error => {
      alert(error.error.message);
      }
    )
  }


  public validateSujet() {
    this.subjects.done = true;
    this.sujet.validateSujet(this.subjects).subscribe(res => {
      window.location.reload();
    }, error => {
      alert(error.error.message);
    })
  }

  myIndex(index: number) {
    this.subjects = this.lisSubjects[index]
    this.soutenanceResponse.idSujet = this.subjects.idSujet;
  }

  public addSoutenance() {
    this.soutenanceService.addSoutenance(this.soutenanceResponse, this.subjects.idSujet).subscribe((response: SoutenanceResponse) => {
      window.location.reload();
    }, error => {
      alert(error.error.message);
    })
  }

  getMemebersOfEquipe() {
    this.member = [];
    this.groupService.getMembersOfEquipe(this.equipeRequirement.idEquipe, this.member).subscribe(
      (operation: Members[][]) => {
        this.member = operation
      }, error => {
        alert(error.error.message);
      })
  }

  public getAllEnseignant() {

    this.enseignantService.getAllEnseignantToInvite(0, 6).subscribe((res: enseignantSignUp[]) => {
      this.enseignant = res
    }, error => {
      alert(error.error.message);
    })
  }

  enseignantIndex(index: number) {
    this.enseignantSelected = this.enseignant[index];
  }

  invite() {
    this.soutenanceResponse.dateSoutenance = new Date(this.soutenanceResponse.dateSoutenance)
    this.soutenanceService.inviteJury(this.soutenanceResponse, this.enseignantSelected.email, this.typeJury).subscribe(
      res => {
        window.location.reload();
      },error => {
        alert(error.error.message);
      }
    );
  }

  public getSoutenanceByIdSujet() {
    this.soutenanceService.getSoutenanceByIdSujet(this.subjects.idSujet).subscribe((response: SoutenanceResponse) => {
      this.soutenanceResponse = response;
      this.invite()
    }, error => {
      alert(error.error.message);
    })
  }

  public getInvitedJury() {
    this.enseignantService.getInvitedJurys(this.subjects.idSujet, 0, 6).subscribe((res: JuryResponse[]) => {
      this.getEquipeOfSujet();
      this.Jury = res;
    }, error => {
      alert(error.error.message);
    });
  }

  public getEquipeOfSujet() {

    this.groupService.getEquipesOfSujet(this.subjects.idSujet, 0, 10).subscribe((response: EquipeRequirement[]) => {
      this.fullEquipe = response;
      if (response.length != 0) {
        this.equipeRequirement = response[0]
      } else {
        this.equipeRequirement = {} as EquipeRequirement;
      }

      this.getMemebersOfEquipe()
    }, error => {
      alert(error.error.message);
    })
  }

  public Update() {
    this.soutenanceService.getSoutenanceByIdSujet(this.subjects.idSujet).subscribe((response: SoutenanceResponse) => {
      this.soutenanceResponse = response;
      this.UpdateDateSoutenance()

    }, error => {
      alert(error.error.message);
    })
  }

  public UpdateDateSoutenance() {
    this.soutenanceResponse.dateSoutenance = this.UpdateDate
    console.log(this.soutenanceResponse.idSoutenance)
    console.log(this.soutenanceResponse.dateSoutenance)
    this.soutenanceService.updateSoutenance(this.soutenanceResponse).subscribe((res) => {
        window.location.reload();
      },
      error => {
        alert(error.error.message);
      })
  }

  shareDriveLink() {

    this.groupService.shareDriveLink(this.fullEquipe[0]).subscribe((res: Boolean) => {

    }, error => {
      alert(error.error.message);
    })
  }

  public getCount(): void {
    this.sujet.getMyLockedSujetsCount().subscribe(
      (response: number) => {
        this.counter = response;
      },
      (error: HttpErrorResponse) => {
        alert(error.error.message);
      }
    );
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
      this.getMyLockedSujets(this.p);
    } else {
      this.p = 0;
    }
  }

  ngOnInit(): void {
    this.getMyLockedSujets(this.p);

  }


}
