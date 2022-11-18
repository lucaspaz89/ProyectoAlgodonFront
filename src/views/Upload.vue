<template>
   <div>
    <h1>
        Importar HVI
    </h1>
    <input id="archivoExcel" type="file" multiple @change="subirExcel()"/>
    <button v-on:click="probarExcel()" class=" h-16 w-16 bg-blue-600">Exportar datos</button>
   </div>
   <div class="flex items-start justify-center h-screen">
        <table class="table w-3/4">
    <!-- head -->
    <thead>
      <tr>        
        <th class="w-32">UHML</th>
        <th class="w-32">UI</th>
        <th class="w-32">Strength</th>
        <th class="w-32">SFI</th>
        <th class="w-32">Mic</th>
        <th class="w-32">ColorGrade</th>
      </tr>
    </thead>
    <tbody>
      <!-- row 1 -->
      <tr v-for="item in items" v-bind:key="item">
        <td>{{item[0]}}</td>                     
        <td>{{item[1]}}</td>                     
        <td>{{item[2]}}</td>                     
        <td>{{item[3]}}</td>                     
        <td>{{item[4]}}</td>                     
        <td>{{item[5]}}</td>                     
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

export default{
  
  data: () => ({
    items: [],
  }), 
        
  methods:{
      subirExcel(){
          const input = document.getElementById("archivoExcel");
          readXlsFile(input.files[0]).then((rows) => {
          this.items = rows;
          })
      },      

      probarExcel(){
        let jsonDatos =  this.items         

            console.log(jsonDatos)
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
  }
      
}     

     
</script>
