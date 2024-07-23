import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CountriesService } from '../../services/countries.service';
import { switchMap } from 'rxjs';
import { Country } from '../../services/interfaces/country';

@Component({
  selector: 'app-country-page',
  templateUrl: './country-page.component.html',
  styles: ``
})
export class CountryPageComponent implements OnInit {

  public country?: Country;

  constructor ( 
    private activatedRoute: ActivatedRoute, 
    private router: Router,
    private countiesService: CountriesService,
  ) {}
  
  ngOnInit(): void {
    this.activatedRoute.params
      .pipe(
        switchMap ( ({id}) => this.countiesService.searchCountryByAlphaCode( id ) )
         
      )
      .subscribe( country => {
        if (!country) {
          return this.router.navigateByUrl('');
        }

        this.country = country;
        return;    
          
      });

    
      

  }


}

//ngOnInit(): void {
//this.activatedRoute.params
//    .subscribe( ({id}) => {
//
//      this.countiesService.searchCountryByAlphaCode( id )
//        .subscribe( country => {
//          console.log({ country });
//          
//        })
//      
//    });
//}