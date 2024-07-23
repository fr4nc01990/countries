import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { debounceTime, Subject } from 'rxjs';

@Component({
  selector: 'shared-search-box',
  templateUrl: './search-box.component.html',
  styleUrls: []
})
export class SearchBoxComponent implements OnInit {
  
  
  private debouncer: Subject<string> = new Subject<string>();
  //Subject: tipo especial de observable
  
  @Input()
  public placeholder: string ='';
  
  @Output()
  public onValue = new EventEmitter<string>();

  @Output()
  public onDebounce = new EventEmitter<string>();
  
  ngOnInit(): void {
    this.debouncer
    .pipe(
      debounceTime(500)
    )

    .subscribe( (value) => {
      this.onDebounce.emit( value );
      
    } )
  }

  emitVaule( value:string ): void {
    this.onValue.emit(value);
  }

  onKeyPress( searchTerm: string ) {
    this.debouncer.next( searchTerm );
    
  }

}
