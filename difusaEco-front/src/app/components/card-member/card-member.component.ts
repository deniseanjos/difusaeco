import { Component, Input, OnInit } from '@angular/core';
import { Member } from 'src/app/model/Member';

@Component({
  selector: 'app-card-member',
  templateUrl: './card-member.component.html',
  styleUrls: ['./card-member.component.css']
})
export class CardMemberComponent implements OnInit {

  public groupMember: Member;
  public bio: string = "";



  constructor() { }

  ngOnInit(): void {
  }

  @Input() set member(val: Member) {

    if (val) {
        this.groupMember = val;


          this.bio = val.bio.substr(0, 60);
          if (val.bio.length > 60) {
            this.bio += '...';

        }

    }
}

}
