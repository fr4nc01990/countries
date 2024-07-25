import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { debounceTime, Subject, Subscription } from 'rxjs';

@Component({
  selector: 'shared-search-box',
  templateUrl: './search-box.component.html',
  styleUrls: []
})
export class SearchBoxComponent implements OnInit, OnDestroy {
  
  
  private debouncer: Subject<string> = new Subject<string>();
  //Subject: tipo especial de observable
  private debouncerSuscription?: Subscription;

  
  @Input()
  public placeholder: string ='';
  
  @Output()
  public onValue = new EventEmitter<string>();
  
  @Output()
  public onDebounce = new EventEmitter<string>();
  
  ngOnInit(): void {
    this.debouncerSuscription = this.debouncer
    .pipe(
      debounceTime(500)
    )
    .subscribe( (value) => {
      this.onDebounce.emit( value );
      
    } )
  }
  
  ngOnDestroy(): void {//esto se implementara cada vez q se haya implementado una suscripción en un ngOnInit o se hayan implementado en cualquier parte del componente y este escuchando los cambios y las emisiones
  this.debouncerSuscription?.unsubscribe();
  ;
}
  
  
  emitVaule( value:string ): void {
    this.onValue.emit(value);
  }

  onKeyPress( searchTerm: string ) {
    this.debouncer.next( searchTerm );
    
  }

}
