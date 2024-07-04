import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

interface MenuItem {
  title: string;
  url: string;
  icon: string;
}
@Component({
  selector: 'app-root',
  templateUrl: './root.component.html',
  styleUrls: ['./root.component.scss'],
})
export class RootComponent implements OnInit {
  public fontsLoaded = false;

  public appPages = [
    { title: 'Portal', url: 'portal', icon: 'Home' },
    { title: 'Blog', url: 'blog', icon: 'documents' },
    { title: 'Mapa', url: 'map', icon: 'map' },
    { title: 'Bacias sedimentares', url: 'basins/map', icon: 'locate' },
    { title: 'Ativos ANP', url: 'anp-assets', icon: 'cube' },
    {
      title: 'Poços',
      url: 'wells',
      icon: 'golf',
    },
    { title: 'Operadores', url: 'operators/dashboard', icon: 'business' },
  ];

  constructor(
    public router: Router,
  ) { }

  async ngOnInit() {
  }



  /**
   * Remove an item from an array by its title
   */
  removeFromArray(array: MenuItem[], title: string) {
    array = array.filter((item) => item.title !== title);
    return array;
  }

  navigateTo(string: string) {
    this.router.navigate([string]);
  }

  /**
   * Function to set a state called isOpen
   */
  public toggleOpen = (item: any): void => {
    if (item.isOpen) {
      item.isOpen = false;
    } else {
      item.isOpen = true;
    }
  };
}
