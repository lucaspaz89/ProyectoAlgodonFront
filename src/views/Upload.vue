<template>
  <div>
    <h1>
      Importar HVI
    </h1>
    <!-- <input id="archivoExcel" type="file" multiple @change="subirExcel()" /> -->

    <div>
      <input type="file" class="form-control" id="import" style="height:0%;" aria-describedby="imporExcel"
        v-on:change="imporExcel($event)">
    </div>

    <button v-if="datos" v-on:click="probarExcel()" class=" h-16 w-16 bg-blue-600">Exportar datos</button>
    <button v-if="recap" v-on:click="generarRecap()" class=" h-16 w-16 bg-red-600">Generar RECAP</button>
  </div>
  <div class="text-center flex items-start justify-center h-screen">
    <table class="table w-3/4">
      <thead>
        <tr>
          <th>#</th>
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
        <tr v-for="(item, im) in items" v-bind:key="item">
          <!-- <td>{{ item[0] }}</td>
          <td>{{ item[1] }}</td>
          <td>{{ item[2] }}</td>
          <td>{{ item[3] }}</td>
          <td>{{ item[4] }}</td>
          <td>{{ item[5] }}</td>
          <td>{{ item[6] }}</td> -->
          <td>{{ im }}</td>
          <td>{{ item.UHML }}</td>
          <td>{{ item.UI }}</td>
          <td>{{ item.STRENGTH }}</td>
          <td>{{ item.SFI }}</td>
          <td>{{ item.MIC }}</td>
          <td>{{ item.COLORGRADE }}</td>
          <td>{{ item.TRASHID }}</td>
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

export default {

  data: () => ({
    items: [],
    json: [],
    datos: false,
    recap: false
  }),

  methods: {
    // subirExcel() {
    //   const input = document.getElementById("archivoExcel");
    //   readXlsFile(input.files[0]).then((rows) => {
    //     this.items = rows;
    //   })
    //   this.datos = true
    // },

    imporExcel(evt) {
      let self = this,
        excel = evt.target.files[0],
        data = [{
          "name": "jayanth",
          "data": "scd",
          "abc": "sdef"
        }];

      if (!window.XLSX) { console.error('Navegador no soporta XLSX'); return; };

      XLSX.utils.json_to_sheet(data, 'out.xlsx');
      if (excel) {
        //pasamos a extrae los datos del excel.
        let fileReader = new FileReader();
        fileReader.readAsBinaryString(excel);

        fileReader.onload = (event) => {

          let data = event.target.result,
            workbook = XLSX.read(data, { type: "binary" });

          workbook.SheetNames.forEach(sheet => {
            let rowObject = XLSX.utils.sheet_to_row_object_array(workbook.Sheets[sheet]);

            let resultCtoDif = 0;

            //let results = rowObject.map(x => x);
            //console.log(results);

            let restX2 = rowObject.map((x, ix) => {
              let UHML = x['UHML'];
              let UI = x['UI'];
              let STRENGTH = x['Strength'];
              let SFI = x['SFI'];
              let MIC = ['Mic'];
              let COLORGRADE = x['ColorGrade'];
              let TRASHID = x['TrashID']
              return { UHML, UI, STRENGTH, SFI, MIC, COLORGRADE, TRASHID };
            });
            console.log(restX2);
            self.items = restX2;
            console.log(self.items);

            //console.log(self.itemx2);
            //self.itemx2 = self.items.map(x => x);
            //console.log(self.itemx2);

            //console.log(self.items);
            //undefined

            // let xw = {
            //   UHML: x['UHML'],
            //   UI: x['UI'],
            //   STRENGTH: x['Strength'],
            //   SFI: x['SFI'],
            //   MIC: ['Mic'],
            //   COLORGRADE: x['ColorGrade'],
            //   TRASHID: x['TrashID']
            // };
            // return xw;
            //this.items.push(restX2);


            //{
            //console.log(x);
            //colocar nombre de las columnas
            /*return self.CaptureFolio.map((col, ol) => {
              if (col.IdMpPt === x['Codigo']) {
                if (x['Cantidad Fisica'] != 0) {
                  resultCtoDif = (x['Cantidad Teorica'] - x['Cantidad Fisica']) * -1;
                } else {
                  resultCtoDif = 0;
                }
                return {
                  IdCnsFolIntArt: col.IdCnsFolIntArt,
                  IdFolInv: col.IdFolInv,
                  IdMpPt: x['Codigo'],
                  CantTeorica: x['Cantidad Teorica'],
                  CantFis: x['Importe Teorico'],
                  DifUniComp: x['Cantidad Fisica'],
                  CtoProm: col.CtoProm,
                  CtoDif: resultCtoDif,
                  CtoTotalDif: col.CtoProm * x['Cantidad Fisica'],
                  BitCaptManual: false,
                  Almacen: col.Almacen,
                  DescTipoInv: col.DescTipoInv,
                  Descripcion: x['Descripción']
                };
              } else {
                return 0;
              }
            })[ix];
            */
            //});



            //obtenemos los datos de una array muy larga...
            //los que son 'undefined', no se colocara en la nueva array...
            /*let rx = self.CaptureFolio.map((x, col) => {
              return results.filter(item => item)[col];
            });

            let resX = results.map(x => x)[0] !== 0 ? true : false; //!= 'undefined'
            //validar el resultado...
            if (resX) {
              self.errorXarchivo = false;
              //limpiamos el arrey.
              self.CaptureFolio = [];
              //Guardamos los nuevos Datos.
              self.CaptureFolio = rx; //results;
            } else {
              self.errorXarchivo = true;
            }*/
            //var result = JSON.stringify(rowObject, undefined, 4);
            //console.log(result);
            //document.getElementById("jsondata").append(JSON.stringify(rowObject, undefined, 4));
          });
        }
      }


    },

    probarExcel() {
      this.json = this.items
      let jsonDatos = this.json
      console.log(jsonDatos)
      this.recap = true
    },

    enviarExcel() {
      let jsonDatos = this.items

      axios.post('http://localhost:8000/api/User/datos', jsonDatos).then(res => {
        console.log(res)
        if (res.status === 200) {
          alert('Se enviaron los datos con exito')
        }
      })
    },

    generarRecap() {
      router.push("/recap")
    }
  }

}


</script>
