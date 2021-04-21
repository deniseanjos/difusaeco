import { GithubService } from '../../service/github.service';
import { GithubUser } from '../../model/GithubUser';
import { Component, OnInit } from '@angular/core';
import { Member } from 'src/app/model/Member';
import { OwlOptions } from 'ngx-owl-carousel-o';

@Component({
  selector: 'app-landingpage',
  templateUrl: './landingpage.component.html',
  styleUrls: ['./landingpage.component.css'],
})
export class LandingpageComponent implements OnInit {

  public gitUsers: GithubUser[] = [];
  public members: Member[] = [
    {
      github_user: 'deniseanjos',
      linkedin_url: 'https://www.linkedin.com/in/deniseanjos/',
      bio: 'Desenvolvedora Fullstack',
    },
    {
      github_user: 'JessicaHolanda',
      linkedin_url: 'https://www.linkedin.com/in/jessica-holanda33/',
      bio: 'Desenvolvedora Fullstack',
    },
    {
      github_user: 'marcoshakuro',
      linkedin_url: 'https://www.linkedin.com/in/marcos-dos-santos-1834ab92/',
      bio: 'Desenvolvedor Fullstack',
    },
    {
      github_user: 'scaziti',
      linkedin_url: 'https://www.linkedin.com/in/raphaelscaziti/',
      bio: 'Desenvolvedor Fullstack',
    },
    {
      github_user: 'RuiCoders',
      linkedin_url: 'https://www.linkedin.com/in/rui-almeida-de-andrade/',
      bio: 'Desenvolvedor Fullstack',
    },
  ];

  public gitUsersLoaded: boolean = false;

  constructor(private githubService: GithubService) {}

  ngOnInit(): void {
    this.getGithubUser();
  }

  async getGithubUser() {
    try {
      let resp: any;
      for (let i in this.members) {
        resp = await this.githubService.getUser(this.members[i].github_user);
        this.members[i].github = resp;
      }
      this.gitUsersLoaded = true;
    } catch (e) {
      console.log(e.message);
    }
  }

    // OwlCarousel - Produtos - Responsivo

    customOptionsCardMembers: OwlOptions = {
      loop: true,
      mouseDrag: false,
      touchDrag: false,
      pullDrag: false,
      dots: false,
      navSpeed: 600,
      navText: ['&#8249', '&#8250;'],
      responsive: {
        0: {
          items: 1 
        },
        400: {
          items: 2
        },
        760: {
          items: 5
        }
      },
      nav: true
    }
}
