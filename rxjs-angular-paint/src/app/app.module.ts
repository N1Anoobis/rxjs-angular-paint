import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { PaintService } from './paint/paint.service';
import { PaintComponent } from './paint/paint.component';

@NgModule({
  declarations: [AppComponent, PaintComponent],
  imports: [BrowserModule, FormsModule],
  providers: [PaintService],
  bootstrap: [AppComponent],
})
export class AppModule {}
