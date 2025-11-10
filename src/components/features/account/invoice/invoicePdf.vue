<template>
    <div style="width:0px; height:0px; overflow:hidden;" v-if="licensFeeData != ''">
        <div id="element-to-print" style="width: 612px;">
        <p style="text-indent: 0pt;text-align: left;"><br /></p>
        <div style="display: grid;padding-left: 5pt;grid-template-columns: 50% 50%;">
            <div class="pdf_h1" style="text-indent: 0pt;text-align: left;">Invoice</div>
            <div style="text-align: right;">
                <img width="150" height="26" src="https://decoratorimages.blob.core.windows.net/clipartimage/images/6307282124857254-DarkLogo.png" />
            </div>
        </div>
        <div class=".pdf_h2" style="padding-top: 17pt;padding-left: 5pt;text-indent: 0pt;text-align: left;">Receipt number {{pdfData.receipt_number}}</div>
        <p class="s1" style="padding-top: 3pt;padding-left: 5pt;text-indent: 0pt;text-align: left;">Date of issue {{pdfData.createdDate}},</p>
        <p style="text-indent: 0pt;text-align: left;"><br /></p>
        <table style="border-collapse:collapse;margin-left:5pt" cellspacing="0">
            <tr style="height:106pt">
                <td style="width:276pt">
                    <p class="s2" style="padding-top: 3pt;text-indent: 0pt;text-align: left;">SellersCommerce</p>
                    <p class="s3" style="padding-top: 3pt;text-indent: 0pt;text-align: left;">1880 Oak Ave</p>
                    <p class="s3" style="padding-top: 3pt;text-indent: 0pt;text-align: left;">Suite 135</p>
                    <p class="s3" style="padding-right: 111pt;text-indent: 0pt;line-height: 14pt;text-align: left;">Evanston
                        - 60201, Illinois 60201 United States</p>
                    <p class="s3" style="padding-top: 3pt;text-indent: 0pt;text-align: left;">+1 847-656-3374</p>
                    <p style="padding-top: 3pt;text-indent: 0pt;text-align: left;"><a
                            href="mailto:integrations@sellerscommerce.com" class="s4">integrations@sellerscommerce.com</a>
                    </p>
                </td>
                <td style="width:186pt">
                    <p class="s2" style="padding-top: 3pt;text-indent: 0pt;text-align: left;">Bill to</p>
                    <p class="s3"
                        style="padding-top: 3pt;padding-right: 52pt;text-indent: 0pt;line-height: 130%;text-align: left;">
                        <a href="mailto:harikiran@sellerscommerce.co" class="s4" target="_blank">
                            {{pdfData.toEmail}}
                        </a>
                    </p>
                </td>
                <td style="width:90pt" rowspan="3">
                    <p style="text-indent: 0pt;text-align: left;"><br /></p>
                </td>
            </tr>
            <tr style="height:35pt">
                <td style="width:276pt">
                    <p class="s5" style="padding-top: 14pt;text-indent: 0pt;text-align: left;">${{pdfData.amount_captured}} {{pdfData.createdDate}}
                    </p>
                </td>
                <td style="width:186pt">
                    <p style="text-indent: 0pt;text-align: left;"><br /></p>
                </td>
            </tr>
            
        </table>
        <div style="display:grid;grid-template-columns: 33.3% 33.3% 33.3%;border-bottom-style:solid;border-bottom-width:1pt;border-bottom-color:#767474;padding: 4px 0;margin-top: 20px;" >
            <div class="s7">Discription</div>
            <div class="s7 text-center">Unit price</div>
            <div class="s7 text-right">Amount</div>
        </div>
        <div style="display:grid;grid-template-columns: 47% 53%;">
            <div>
                <p class="s2" data-v-09731b7b="" style="padding-top: 5pt; text-indent: 0pt; text-align: left;">{{pdfData.name}}</p>
                <p class="s3" data-v-09731b7b="" style="padding-top: 3pt; text-indent: 0pt; text-align: left;">{{pdfData.createdDate}}</p>
            </div>
            <div style="display:grid;grid-template-columns: 50% 50%;">
                <div style="display:contents;">
                    <p class="s3" data-v-09731b7b="" style="padding-top: 5pt;padding-bottom: 5pt; text-indent: 0pt;  ">${{pdfData.amount_captured}}</p>
                    <p class="s3" data-v-09731b7b="" style="padding-top: 5pt;padding-bottom: 5pt; text-indent: 0pt; text-align: right;">${{pdfData.amount_captured}}</p>
                </div>
                
                 <div style="display:contents; ">
                    <p class="s3" data-v-09731b7b="" style="padding-top: 5pt;padding-bottom: 5pt; text-indent: 0pt;  border-bottom: 1px solid #eaeaea; border-top: 1px solid #eaeaea;">Subtotal</p>
                    <p class="s3" data-v-09731b7b="" style="padding-top: 5pt;padding-bottom: 5pt; text-indent: 0pt; text-align: right; border-bottom: 1px solid #eaeaea; border-top: 1px solid #eaeaea;">${{pdfData.amount_captured}}</p>
                </div>
                <div style="display:contents; ">
                    <p class="s3" data-v-09731b7b="" style="padding-top: 5pt;padding-bottom: 5pt; text-indent: 0pt;  ">Total</p>
                    <p class="s3" data-v-09731b7b="" style="padding-top: 5pt;padding-bottom: 5pt; text-indent: 0pt; text-align: right;">${{pdfData.amount_captured}}</p>
                </div>
            </div>
        </div>
        </div>
    </div>
</template>
<script>
import { jsPDF } from "jspdf";
import {useStore} from "vuex";
import { ref } from "vue"
import { QSpinnerClock, Loading} from 'quasar'

export default {
    setup(){
        const $store = useStore();
        const licensFeeData = ref('');
        const pdfData = ref({})
        const downloadPDF = () => {
            let pWidth = 595; 
            let srcWidth = document.getElementById('element-to-print').scrollWidth;
            let margin = 22; 
            let scale = (pWidth - margin * 1.5) / srcWidth;
            let pdf = new jsPDF('p', 'pt', [612, 792]);
            pdf.setFontSize(8);
            pdf.html(document.getElementById('element-to-print'), {
                x: margin,
                y: margin,
                html2canvas: {
                    scale: scale,
                },
                callback: function () {
                    pdf.save('test.pdf');
                }
            });
        }
        
        $store.subscribe((data) => {
            switch(data.type){
                case "common/savePdf" : {
                    pdfData.value = {}
                    licensFeeData.value = data.payload._value
                    const month = ["January","February","March","April","May","June","July","August","September","October","November","December"];

                    let date = new Date(licensFeeData.value.created * 1000)
                    pdfData.value.createdDate = ""+month[date.getMonth()]+" "+date.getDate()+" "+date.getFullYear()+""
                    pdfData.value.toEmail = licensFeeData._value.charges.data[0].receipt_email
                    pdfData.value.receipt_number = licensFeeData._value.charges.data[0].receipt_number
                    pdfData.value.name = licensFeeData._value.description
                    pdfData.value.amount_captured = (licensFeeData._value.charges.data[0].amount_captured/100).toFixed(2)
                    
                    setTimeout(() => {
                        let pWidth = 595; // 595.28 is the width of a4
                        let srcWidth = document.getElementById('element-to-print').scrollWidth;
                        let margin = 22; 
                        let scale = (pWidth - margin * 1.5) / srcWidth;
                        let pdf = new jsPDF('p', 'pt', [612, 792]);
                        pdf.html(document.getElementById('element-to-print'), {
                            x: margin,
                            y: margin,
                            html2canvas: {
                                scale: scale,
                            },
                            callback: function () {
                                pdf.save('test.pdf');
                                Loading.hide()
                            }
                        });
                    },1000)
                    break;
                }
            }
        })

        return {
            pdfData,
            downloadPDF,
            licensFeeData
        }
    }
}
</script>


<style scoped>
* {
            margin: 0;
            padding: 0;
            text-indent: 0;
        }

        .pdf_h1 {
            color: black;
            font-family: Arial, sans-serif;
            font-style: normal;
            font-weight: bold;
            text-decoration: none;
            font-size: 15pt;
        }

        .pdf_h2 {
            color: black;
            font-family: Arial, sans-serif;
            font-style: normal;
            font-weight: bold;
            text-decoration: none;
            font-size: 8pt;
        }

        .s1 {
            color: black;
            font-family: Arial, sans-serif;
            font-style: normal;
            font-weight: normal;
            text-decoration: none;
            font-size: 8pt;
        }

        .s2 {
            color: black;
            font-family: Arial, sans-serif;
            font-style: normal;
            font-weight: 700;
            text-decoration: none;
            font-size: 8pt;
        }

        .s3 {
            color: black;
            font-family: Arial, sans-serif;
            font-style: normal;
            font-weight: 600;
            text-decoration: none;
            font-size: 8pt;
        }

        .s4 {
            color: black;
            font-family: Arial, sans-serif;
            font-style: normal;
            font-weight: 500;
            text-decoration: none;
            font-size: 8pt;
        }

        .s5 {
            color: black;
            font-family: Arial, sans-serif;
            font-style: normal;
            font-weight: bold;
            text-decoration: none;
            font-size: 12.5pt;
        }

        .s6 {
            color: #625AFF;
            font-family: Arial, sans-serif;
            font-style: normal;
            font-weight: bold;
            text-decoration: underline;
            font-size: 8pt;
        }

        .s7 {
            color: black;
            font-family: Arial, sans-serif;
            font-style: normal;
            font-weight: normal;
            text-decoration: none;
            font-size: 6.5pt;
        }

        p {
            color: black;
            font-family: Arial, sans-serif;
            font-style: normal;
            font-weight: normal;
            text-decoration: none;
            font-size: 6.5pt;
            margin: 0pt;
        }

        table,
        tbody {
            vertical-align: top;
            overflow: visible;
        }
</style>