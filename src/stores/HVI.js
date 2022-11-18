import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import { useRouter } from 'vue-router';

//import axios from "axios";


export const HVI = defineStore('HVI', () => {
   
        const items = ref([])
        const subirExcel = () => {
            const input = document.getElementById("archivoExcel");
            readXlsFile(input.files[0]).then((rows) => {
            items.value = rows;
            })
        }
        
        return {
              items
            , subirExcel
        }
})