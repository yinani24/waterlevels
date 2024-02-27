/*
// import React from 'react';
// import { useState } from 'react';
// import './App.css';
// // import { Bar } from "react-chartjs-2";
// // import Chart from 'chart.js/auto';
// import MonthYearPicker from 'react-month-year-picker';

// //const [SMonth, monthSelector] = useState("April");

// function App() {
//   const [Text, SetText] = useState("See More");
//   const [Present, SetChart] = useState(false);
//   const [Cal, SetCal] = useState(false);
//   let month = "April";
//   let year = "2022";
//   let s = month+ " " +year;
//   // document.getElementById("Choker").style.visibility = "hidden";
//   return (
//     <main>
//       <div id = "head"><p id = "Tinh">Water storage in California reservoirs</p></div>
//       <div id = "tile">
//         <div id = "part1">
//           <p>
//           California's reservoirs are part of a <a href="https://www.ppic.org/wp-content/uploads/californias-water-storing-water-november-2018.pdf">complex water storage system</a>.  The State has very variable weather, both seasonally and from year-to-year, so storage and water management is essential.  Natural features - the Sierra snowpack and vast underground aquifers - provide more storage capacity,  but reservoirs are the part of the system that people control on a day-to-day basis.  Managing the flow of surface water through rivers and aqueducts, mostly from North to South, reduces flooding and attempts to provide a steady flow of water to cities and farms, and to maintain natural riparian habitats.  Ideally, it also transfers some water from the seasonal snowpack into long-term underground storage.  Finally, hydro-power from the many dams provides carbon-free electricity. 
//           </p><p>
//         California's water managers monitor the reservoirs carefully, and the state publishes daily data on reservoir storage.
//           </p>
//           <div className="buttonHolder">
            
//             <button id="ButtonML" onClick={() => {
//               if (Text === "See More"){
//                 SetText("See Less");
//                 SetChart(true);
//                 let Red = document.getElementsByClassName("RedBox");
//                 for (let i = 0; i < Red.length; i++){
//                   Red[i].style.visibility = "visible";
//                 }
                
//               }
//               else if (Text === "See Less"){
//                 SetChart(false);
//                 SetText("See More");
//                 let Red = document.getElementsByClassName("RedBox");
//                 for (let i = 0; i < Red.length; i++){
//                   Red[i].style.visibility = "hidden";
//                 }
//               }
//             }}>
//                {Text}
//             </button>
//           </div>
//           <div class="RedBox" id = "BoxRed">
//             Hi
//           </div>
//         </div>
//         <div id= "part2">
//           <div id = "Choker">
//             <MonthPicker month={month} year={year}> </MonthPicker>
//           </div>
//           <p id = "NfText" class = "RedBox">
          
//         Here's a quick look at some of the data on reservoirs from the <a href="https://cdec.water.ca.gov/index.html">California Data Exchange Center</a>, which consolidates climate and water data from multiple federal and state government agencies, and  electric utilities.  Select a month and year to see storage levels in the eleven largest in-state reservoirs.
//             <br />
//             <br />
//             <p id = "MonthChange">Change month:</p>
//             <button id = "but" class = "RedBox" onClick = {() => {
//             SetCal(true);
//             if (Cal == true){
//               document.getElementById("Choker").style.visibility = "visible";
//             }
//           }}>
//               {s}
//           </button>
//           </p>
          
//           <div id = "partimg">
//             <img id = "img1" src="https://cdn.theatlantic.com/thumbor/HYdYHLTb9lHl5ds-IB0URvpSut0=/900x583/media/img/photo/2014/09/dramatic-photos-of-californias-historic-drought/c01_53834006/original.jpg
//             "/>
//             <span id = "imgText">
//               Lake Oroville in the 2012-2014 drought. Image credit Justin Sullivan, from The Atlatic article Dramatic Photos of California's Historic Drought.
//             </span>
//           </div>
          
//         </div>
//       </div>
      
//     </main>
//   );
// }

// //added by yash 
// function MonthPicker(props) {
  
//     const [month, SetMonth] = useState(props.month);
//     const [year, SetYear] = useState(props.year);
//     console.log("monthpicker");
//     return (
//       <div>
//         <MonthYearPicker
//           selectedMonth={month}
//           selectedYear={year}
//           minYear={2000}
//           maxYear={2030}
//           onChangeYear={function(year){
//             SetYear(year);
//             let str = document.getElementById("but").value;
//             let month = str.split(" ")[1];
//             document.getElementById("but").value = month + " " + year;
//           }}
//           //year => SetYear(year)}
//           onChangeMonth={month => SetMonth(month)}
//         />
//         <h3>Selected month: {month}</h3>
//         <h3>Selected year: {year}</h3>
//       </div>
//     );
//   }
*/

// export default App;
//added by yash
import React, { useEffect } from 'react';
import { useState } from 'react';
import './App.css';
import { Bar } from "react-chartjs-2";
import Chart from 'chart.js/auto';
import MonthYearPicker from 'react-month-year-picker';
import PropTypes from 'prop-types';
// import {sendGetRequest, sendPostRequest} from "./AJAX.jsx"
import useAsyncFetch from './useAsyncFetch'

function App() {
  const [Text, SetText] = useState("See More");
  const [Present, SetChart] = useState(false);
  const [Cal, SetCal] = useState(false);
  let month_default = 4;
  let year_default = "2022";
  let s = "April" + " " + year_default;
  const [vis,updVis] = useState(false);
  
  const [month, SetMonth] = useState(month_default);
  const [year, SetYear] = useState(year_default);
  //let s = month+ " " +year;
  // document.getElementById("Choker").style.visibility = "hidden";

  function monthDeterminer(month){
    //let month = String(month);
    if(month === 1)
      return "January";
    else if(month === 2)
      return "February";
    else if(month === 3)
      return "March";
    else if(month === 4)
      return "April";
    else if(month === 5)
      return "May";
    else if(month === 6)
      return "June";
    else if(month === 7)
      return "July";
    else if(month === 8)
      return "August";
    else if(month === 9)
      return "September";
    else if(month === 10)
      return "October";
    else if(month === 11)
      return "November";
    else if(month === 12)
      return "December";
  }

  function Chart(props){
    const [chartData, setChartdata] = useState({current:[]});
    
    console.log("draw chart")

    useAsyncFetch("/query/getWaterLevels", {month:month, year:year}, thenFunction, catchFunction);
    
    function thenFunction(data){
      setChartdata(data);
    }
    function catchFunction(err){
      console.log(err);
    }

    const nicknames = new Map();
    nicknames.set(0, 'Shasta');
    nicknames.set(1, 'Oroville');
    nicknames.set(2, 'Trinity Lake');
    nicknames.set(3, 'New Melones');
    nicknames.set(4, 'San Luis');
    nicknames.set(5, 'Don Pedro');
    nicknames.set(6, 'Berryessa');
  
  if (chartData.current.length > 0) {
    
    // objects containing row values
    let maxCap = {label: "max Capacity",data: [], backgroundColor: ["rgb(66,145,152)"]};
  //the values are given in the design spec -- just trying a few things
    let current = {label: "Current value", data: [], backgroundColor: ["rgb(120,199,227)"]};
    
    let labels = [];
    for (let i=0; i<7; i++) {
      maxCap.data.push(chartData.max[i]);
      current.data.push(chartData.current[i].value);
      labels.push(nicknames.get(i));
    }


  let userData = {};
  userData.labels = labels;
  userData.datasets = [maxCap, current];

    // console.log(userData);
    // let options = {
    //   plugins: {
    //     title: {
    //       display: true,
    //       text: '',
    //     },
    //   },
    //   responsive: true,
    //   maintainAspectRatio: false,
    //   scales: {
    //     x: {
    //       grid: {
    //         stacked: true
    //       : fla  di
    //       }
    //     },
    //     y: {
    //       grid: {
    //         display: false
    //       }
    //     }
    //   }
    // };

    console.log(userData);
// let options = {
//   plugins: {
//     title: {
//       display: true,
//       text: '',
//     },
//   },
//   responsive: true,
//   maintainAspectRatio: false,
//   scales: {
//     x: {
//       grid: {
//         // display: false
//         stacked: true
//       }
//     },
//     y: {
//       grid: {
//         display: false
//       }
//     }
//   }
// };
    // let options = {xAxes: [{ stacked: true }],
    //               yAxes: [{
    //                 stacked: false,
    //                 ticks: {
    //                   beginAtZero: true,
    //                 },
    //                 grid: {
    //                     display: false
    //                 }
    //               }]
    //             }

    let options = {
                  responsive: true,
                  scales:{
                    
                    x: { 
                      stacked: true, 
                      grid: {
                          display: false
                      }
                    },
                    y: {
                    
                      stacked: true,
                      ticks: {
                        beginAtZero: true,
                      },
                      grid: {
                        display: false
                      }
                    }
                  }
                }
    return (
      <div id="chart-container" class="kali">
        <Bar options={options} data={userData} />
      </div>
    ) 
    
  }
    return null;
  }
  //id="chart-container"
  function MonthPicker(props) {
    // const [month, SetMonth] = useState(props.month);
    // const [year, SetYear] = useState(props.year);
    console.log("monthpicker");
    useEffect(() => {
      let month_words = monthDeterminer(month);
      document.getElementById("but").textContent = month_words + " " + year; }
    , [month, year]);
    if (vis){
      return (
        <div>
          <MonthYearPicker
            caption=""
            selectedMonth={month}
            selectedYear={year}
            minYear={2000}
            maxYear={2022}
            onChangeYear={year => SetYear(year)}
            onChangeMonth={month => SetMonth(month)}
          />
        </div>
      );
    }
    else {
      return (
      <button id = "but">{month+" "+ year}</button>
      );
    }
  }
  
  return (
    <main>
      <div id = "head"><p id = "Tinh">Water storage in California reservoirs</p></div>
      <div id = "tile">
        <div id = "part1">
          <p>
          California's reservoirs are part of a <a class = "link" href="https://www.ppic.org/wp-content/uploads/californias-water-storing-water-november-2018.pdf">complex water storage system</a>.  The State has very variable weather, both seasonally and from year-to-year, so storage and water management is essential.  Natural features - the Sierra snowpack and vast underground aquifers - provide more storage capacity,  but reservoirs are the part of the system that people control on a day-to-day basis.  Managing the flow of surface water through rivers and aqueducts, mostly from North to South, reduces flooding and attempts to provide a steady flow of water to cities and farms, and to maintain natural riparian habitats.  Ideally, it also transfers some water from the seasonal snowpack into long-term underground storage.  Finally, hydro-power from the many dams provides carbon-free electricity. 
          </p><p id = "SText">
        California's water managers monitor the reservoirs carefully, and the state publishes daily data on reservoir storage.
          </p>
          <div className="buttonHolder">
            
            <button id="ButtonML" onClick={() => {
              if (Text === "See More"){
                SetText("See Less");
                //SetChart(true);
                let Red = document.getElementsByClassName("RedBox");
                for (let i = 0; i < Red.length; i++){
                  Red[i].style.visibility = "visible";
                }
                
                // let kk = document.getElementsByClassName("kali");
                // for (let j = 0; j < kk.length; j++){
                //    kk[j].style.visibility = "visible";
                // }
                //document.getElementById("chart-container").style.visibility = "visible";

              }
              else if (Text === "See Less"){
                //SetChart(false);
                SetText("See More");
                let Red = document.getElementsByClassName("RedBox");
                for (let i = 0; i < Red.length; i++){
                  Red[i].style.visibility = "hidden";
                }
                // document.getElementById("chart-container").style.visibility = "hidden";
                document.getElementById("Choker").style.visibility = "hidden";
                // let kk = document.getElementsByClassName("kali");
                // for (let i = 0; i < kk.length; i++){
                //   kk[i].style.visibility = "hidden";

                // }
              }
            }}>
               {Text}
            </button>
          </div>
          {//<div class="RedBox" id = "chart">
            }
            <Chart />
          {//</div>
          }
        </div>
        <div id= "part2">
          <div id = "Choker">
            <MonthPicker month={month_default} year={year_default}> </MonthPicker>
          </div>
          <p id = "NfText" class = "RedBox">
          
        Here's a quick look at some of the data on reservoirs from the <a class = "link" href="https://cdec.water.ca.gov/index.html">California Data Exchange Center</a>, which consolidates climate and water data from multiple federal and state government agencies, and  electric utilities.  Select a month and year to see storage levels in the eleven largest in-state reservoirs.
            <br />
            <br />
            <p id = "MonthChange">Change month:</p>
            <button id = "but" class = "RedBox" onClick = {() => {
            if (Cal == false){
              SetCal(true);
                  document.getElementById("Choker").style.visibility = "visible";
              updVis(true);
            }
            else if(Cal == true){
              SetCal(false);
              document.getElementById("Choker").style.visibility = "hidden";
              updVis(false);
            }
          }}>
              {s}
          </button>
          </p>
          
          <div id = "partimg">
            <img id = "img1" src="https://cdn.theatlantic.com/thumbor/HYdYHLTb9lHl5ds-IB0URvpSut0=/900x583/media/img/photo/2014/09/dramatic-photos-of-californias-historic-drought/c01_53834006/original.jpg
            "/>
            <span id = "imgText">
              Lake Oroville in the 2012-2014 drought. Image credit Justin Sullivan, from The Atlatic article Dramatic Photos of California's Historic Drought.
            </span>
          </div>
          
        </div>
      </div>
      
    </main>
  );
}

// const config = {
//     options: {
//         scales: {
//             x: {
//                 stacked: true
//             },
//             y: {
//                 ticks:{beginAtZero:true}
//
//             }
//         }
//     }
// };
 

//   <div className="App">
//       <div style={{ width: 700 }}>
//         <BarChart chartData={userData} options = {config} />


export default App;