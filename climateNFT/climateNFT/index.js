
// OR use the below to import using the require syntax
const { Revise } = require("revise-sdk");
const AUTH_TOKEN = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImFlYmE2YjI2LTMyYTgtNGQzYS1iNWZlLTIzMzNmODVhNmM5MCIsImtleSI6Im03eG02MjIxIiwiaWF0IjoxNjY3NzIwNDQ4fQ.MevTyrJ6nsJEL0zPMoZILrsN2Ukzi45Z4Fd_SJCAWDA";
const revise = new Revise({auth: AUTH_TOKEN});

const API = async function() {
    const options = [
      {Carbon_Emission : '0-2 %', impact : "Neutral" , image: "https://www.linkpicture.com/q/2_301.png"},
      {Carbon_Emission: '3-5%',  impact : "Neutral" , image: "https://www.linkpicture.com/q/10_160.png"},
      {Carbon_Emission: '6-8%', impact : "Be aware " , image: "https://www.linkpicture.com/q/5_317.png"},
      {Carbon_Emission: '9-11%', impact : "Entering in Danger stage" , image: "https://www.linkpicture.com/q/7_214.png"},
      {Carbon_Emission: '12-14%', impact : "Entering in Danger stage" , image: "https://www.linkpicture.com/q/9_150.png"},
      {Carbon_Emission: '15-17%', impact : "Danger" , image: "https://www.linkpicture.com/q/8_100.png"},
      {Carbon_Emission: '18-20%', impact : "Danger" , image: "https://www.linkpicture.com/q/11_146.png"},
      {Carbon_Emission: '21-23%', impact : "Very Danger" , image: "https://www.linkpicture.com/q/4_129.png"},
      {Carbon_Emission: '24-26%', impact : "Time to slow the carbon emission" , image: "https://www.linkpicture.com/q/6_259.png"},
      {Carbon_Emission: '27-29%', impact : "Time to slow the carbon emission" , image: "https://www.linkpicture.com/q/1_599.png"},
    ]
    const randomIndex =  Math.floor(Math.random() * 10)
    return options[randomIndex];
  }

async function run() {

   const climate = await revise.fetchNFT('cbd8df3c-f150-4cd3-afdc-3e652f10eb9e')
   const nft = revise.nft(climate)

   revise.every('30s').listenTo(API).start(async(data)=>{
    nft.setProperty('Carbon_Emission',data.Carbon_Emission)
        .setProperty("impact",data.impact)
        .setImage(data.image)
        .save()

        console.log("The emission rate is ${data.Carbon_Emission} ");
   })
}
run()