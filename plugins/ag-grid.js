import Vue from 'vue'
import { AgGridVue } from 'ag-grid-vue'
import { LicenseManager } from 'ag-grid-enterprise'

LicenseManager.setLicenseKey('CompanyName=S&J Retail Ltd,LicensedApplication=Forecaster,LicenseType=SingleApplication,LicensedConcurrentDeveloperCount=1,LicensedProductionInstancesCount=0,AssetReference=AG-034444,SupportServicesEnd=13_December_2023_[v2]_MTcwMjQyNTYwMDAwMA==20aed75c73ae71845e8f31fdf3372b4f')
Vue.component('AgGridVue', AgGridVue)
