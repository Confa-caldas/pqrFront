import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { BodyResponse } from '../../../models/shared/body-response.inteface';
import { FormControl, FormGroup } from '@angular/forms';
import { Users } from '../../../services/users.service';
import { LazyLoadEvent, MessageService } from 'primeng/api';
import {
  Column,
  RequestReportDetail,
} from '../../../models/users.interface';
import { Chart } from 'chart.js/auto';

@Component({
  selector: 'app-report-details',
  templateUrl: './report-details.component.html',
  styleUrl: './report-details.component.scss'
})
export class ReportDetailsComponent implements OnInit{
  formGroup: FormGroup<any> = new FormGroup<any>({});

  requestReportDetailAll: RequestReportDetail [] = [];
  cols!: Column[];
  totalRows: number = 0;
  dynamicColumns: string[] = [];
  canvas: any;
  ctx: any;
  showChart: boolean = false;

  @ViewChild(' mychart') mychart:any;
  

  ngOnInit() {
  }

  constructor(
    private userService: Users,
    private router: Router,
    private messageService: MessageService,
  ){
    
  }

  /*
  cleanForm() {
    this.first = 0;
    this.page = 1;
    this.rows = 10;
    this.formGroup.reset();
    this.requestReportList = [];
    this.searhRequests();
  } */

  reportDetails(){
    this.userService.getRequestReportDetail().subscribe({
      next: (response: BodyResponse<RequestReportDetail[]>) => {
        if (response.code === 200){
          console.log('Respuesta del servicio:', response);
          this.requestReportDetailAll = response.data;
          this.totalRows = Number(response.data.length);
          console.log('Cantidad:', this.totalRows );
          this.displayChart();
          // Generar columnas dinámicas a partir de las propiedades del primer objeto
          if (this.requestReportDetailAll.length > 0) {
            this.dynamicColumns = Object.keys(this.requestReportDetailAll[0]);
          }
        }
        
      }
    })
  }

  displayChart() {
    // Verifica que haya datos
    if (!this.requestReportDetailAll || this.requestReportDetailAll.length === 0) {
      console.log('No hay datos para graficar');
      this.showChart = false;
      return;
    }
  
    const labels = this.requestReportDetailAll.map((item: any) => item.tipo); // Extrae el campo 'tipo'
    const data = this.requestReportDetailAll.map((item: any) => item.total_solicitudes); // Extrae el campo 'total_solicitudes'
  
    this.canvas = this.mychart.nativeElement;
    this.ctx = this.canvas.getContext('2d');
  
    new Chart(this.ctx, {
      type: 'line',  // Cambié a 'bar' para una mejor visualización con datos categóricos
      data: {
        labels: labels,  // Etiquetas dinámicas
        datasets: [{
          label: 'Total Solicitudes',
          data: data,  // Datos dinámicos
          backgroundColor: 'rgba(75, 192, 192, 0.2)',
          borderColor: 'rgba(75, 192, 192, 1)',
          pointStyle: 'circle',
          pointRadius: 10,
          pointHoverRadius: 15
        }]
      },
      options: {
        responsive: true,
        scales: {
          y: {
            beginAtZero: true
          }
        }
      }
    });
    this.showChart = true;
  }
    

  cleanTable(){
    this.requestReportDetailAll = [];
  }
    
}