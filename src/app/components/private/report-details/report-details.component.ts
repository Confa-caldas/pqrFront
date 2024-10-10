import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { BodyResponse } from '../../../models/shared/body-response.inteface';
import { FormControl, FormGroup } from '@angular/forms';
import { Users } from '../../../services/users.service';
import { LazyLoadEvent, MessageService } from 'primeng/api';
import {
  Column,
  RequestReportDetail,
  RequestReportStatus,
  RequestReportForStatus,
  RequestReportStatusByAssignedUser,
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
  requestReportStatus: RequestReportStatus [] = [];
  requestReportForStatus: RequestReportForStatus [] = [];
  requestReportStatusByAssignedUser: RequestReportStatusByAssignedUser [] = [];
  cols!: Column[];
  totalRows: number = 0;
  dynamicColumns: string[] = [];
  dynamicColumnsStatus: string[] = [];
  dynamicColumnsForStatus: string[] = [];
  dynamicColumnStatusByUser: string[] = [];
  canvas: any;
  ctx: any;
  showChart: boolean = false;
  searchValue: string | undefined;
  chartInstance: any;

  @ViewChild(' mychart') mychart:any;
  

  ngOnInit() {
    this.reportDetails();
    this.reportStatus();
    this.reportAllForStatus();
    this.reportAllForStatusByUser();
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
          //this.displayChart();
          this.displayChart(this.requestReportDetailAll);
          // Generar columnas dinámicas a partir de las propiedades del primer objeto
          if (this.requestReportDetailAll.length > 0) {
            this.dynamicColumns = Object.keys(this.requestReportDetailAll[0]);
          }
        }
        
      }
    })
  }

  displayChart(filteredData: any) {
    // Verifica que haya datos
    if (!filteredData || filteredData.length === 0) {
      console.log('No hay datos para graficar');
      this.showChart = false;
      return;
    }
  
    const labels = filteredData.map((item: any) => item.tipo); // Extrae el campo 'tipo'
    const data = filteredData.map((item: any) => item.total_solicitudes); // Extrae el campo 'total_solicitudes'
  
    this.canvas = this.mychart.nativeElement;
    this.ctx = this.canvas.getContext('2d');
  
    // Si ya hay una instancia de la gráfica, destrúyela antes de crear una nueva
    if (this.chartInstance) {
      this.chartInstance.destroy();
    }
  
    // Crear un nuevo gráfico y guardarlo en la variable chartInstance
    this.chartInstance = new Chart(this.ctx, {
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
          pointHoverRadius: 15,
          tension: 0.1,
          fill: true,
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
  
  updateChart(filteredData: any) {
    // Si no hay datos filtrados, usa todos los datos
    if (!filteredData) {
      filteredData = this.requestReportDetailAll;
    }
    // Actualiza la gráfica con los datos filtrados
    this.displayChart(filteredData);
  }
  
  clear(dt: any) {
    dt.clear();
    this.updateChart(this.requestReportDetailAll); // Vuelve a mostrar toda la gráfica
  }

  cleanTable(){
    this.requestReportDetailAll = [];
  }

  reportStatus(){
    this.userService.getRequestReportStatus().subscribe({
      next: (response: BodyResponse<RequestReportStatus[]>) => {
        if (response.code === 200){
          console.log('Respuesta del servicio:', response);
          this.requestReportStatus = response.data;
          this.totalRows = Number(response.data.length);
          console.log('Status:', this.requestReportStatus );
          
          if (this.requestReportStatus.length > 0) {
            this.dynamicColumnsStatus = Object.keys(this.requestReportStatus[0]);
          }
          
        }
        
      }
    })
  }

  reportAllForStatus(){
    this.userService.getRequestReportForStatus().subscribe({
      next: (response: BodyResponse<RequestReportForStatus[]>) => {
        if (response.code === 200){
          console.log('Respuesta del servicio:', response);
          this.requestReportForStatus = response.data;
          this.totalRows = Number(response.data.length);
          console.log('ForStatus:', this.requestReportForStatus );
          
          if (this.requestReportForStatus.length > 0) {
            this.dynamicColumnsForStatus = Object.keys(this.requestReportForStatus[0]);
          }
          
        }
        
      }
    })
  }

  reportAllForStatusByUser(){
    this.userService.getRequestReportStatusByAssignedUser().subscribe({
      next: (response: BodyResponse<RequestReportStatusByAssignedUser[]>) => {
        if (response.code === 200){
          console.log('Respuesta del servicio:', response);
          this.requestReportStatusByAssignedUser = response.data;
          this.totalRows = Number(response.data.length);
          console.log('ForStatus:', this.requestReportStatusByAssignedUser );
          
          if (this.requestReportStatusByAssignedUser.length > 0) {
            this.dynamicColumnStatusByUser = Object.keys(this.requestReportStatusByAssignedUser[0]);
          }
          
        }
        
      }
    })
  }

  
}