<template>
   <div>
    <h1>
        Importar HVI
    </h1>
    <input id="archivoExcel" type="file" multiple @change="subirExcel()"/>
    <button v-if="datos" v-on:click="probarExcel()" class=" h-16 w-16 bg-blue-600">Exportar datos</button>
    <button v-if="recap" v-on:click="generarRecap()" class=" h-16 w-16 bg-red-600">Generar RECAP</button>
   </div>
   <div class="text-center flex items-start justify-center h-screen">
    <table class="table w-3/4">    
    <thead>
      <tr>        
        <th class="w-32">UHML</th>
        <th class="w-32">UI</th>
        <th class="w-32">Strength</th>
        <th class="w-32">SFI</th>
        <th class="w-32">Mic</th>
        <th class="w-32">ColorGrade</th>
        <th class="w-32">TrashID</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="item in items" v-bind:key="item">
        <td>{{item[0]}}</td>                     
        <td>{{item[1]}}</td>                     
        <td>{{item[2]}}</td>                     
        <td>{{item[3]}}</td>                     
        <td>{{item[4]}}</td>                     
        <td>{{item[5]}}</td>                     
        <td>{{item[6]}}</td>                     
      </tr>      
    </tbody>
  </table>
   </div>
</template>

<script>
//import { HVI } from "../stores/HVI";
//const value = HVI();
//import { ref } from "vue";
    
import readXlsFile from "read-excel-file" 
import router from "@/router/index.js";

export default{
  
  data: () => ({
    items: [],
    json: [],
    datos: false,
    recap: false
  }), 
        
  methods:{
      subirExcel(){
          const input = document.getElementById("archivoExcel");
          readXlsFile(input.files[0]).then((rows) => {
          this.items = rows;
          })
          this.datos = true
      },      

      probarExcel(){
        this.json = this.items
        let jsonDatos =  this.json 
        console.log(jsonDatos)
        this.recap = true
      },

      enviarExcel(){
        let jsonDatos =  this.items
        
            axios.post('http://localhost:8000/api/User/datos', jsonDatos).then(res =>{
                console.log(res)
                if(res.status === 200){
                    alert('Se enviaron los datos con exito')                    
                }                               
            })
      }, 

      generarRecap(){        
        router.push("/recap")
      }
  }
      
}     

     
</script>
