import React,{useState} from 'react'

import commons from '../css/commons.module.css'
import attendances from '../css/attendances.module.css'

export default function AttendanceTableProfessor() 
{
	let [nrWeeks,setNrWeeks]=useState(14);
	let [students,setStudents]=useState([]);

	function disciplineDropDownOptionsChanged()
	{
		fillTable(true);
	}

	function categoryDropDownOptionsChanged()
	{
		fillTable(true);
	}

	function groupNumberDropDownOptionsChanged()
	{
		fillTable(false);
	}

    return (
        <div className={commons.container}>
            <h1 className={attendances.title}>Prezențe</h1>

			<div id={attendances.dropDownContainer}>
	            <fieldset className={`${commons.fieldset} ${attendances.fieldset}`}>
	                <select id="disciplineDropDown" className={`${commons.dropDown} ${attendances.dropDown}`} onChange={disciplineDropDownOptionsChanged}>
	                    {getSelectOptionsDiscipline()}
	                </select>
	            </fieldset>

	            <fieldset className={`${commons.fieldset} ${attendances.fieldset}`}>
	                <select id="categoryDropDown" className={`${commons.dropDown} ${attendances.dropDown}`} onChange={categoryDropDownOptionsChanged}>
	                    {getSelectOptionsCategory()}
	                </select>
	            </fieldset>

	            <fieldset className={`${commons.fieldset} ${attendances.fieldset}`}>
	                <select id="groupNumberDropDown" className={`${commons.dropDown} ${attendances.dropDown}`} onChange={groupNumberDropDownOptionsChanged}>
	                    {getSelectOptionsGroupNumber()}
	                </select>
	            </fieldset>
            </div>
			
			<div id={attendances.containerAttendancesProfessor}>
	            <table id="tableAttendances" className={commons.table}>
	            	<thead id={attendances.theadAttendances}>
		                <tr id="headers">
		                    {getHeader(nrWeeks)}
		                </tr>
		            </thead>

		            <tbody id="tbody">

		            </tbody>
	            </table>
            </div>
        </div>
    );

    function fillTable(request)
    {
    	let discipline=document.getElementById("disciplineDropDown").value;
    	let category=document.getElementById("categoryDropDown").value;
    	let groupNumber=document.getElementById("groupNumberDropDown").value;
    	
    	if(discipline!=="nothing" && category!=="nothing")
    	{
			fillRows(discipline,category,groupNumber,request);
		}
    }

    function fillRows(discipline,category,groupNumber,request)
	{
		if(request)
		{
			getStudents();
		}

		let tableBody=document.getElementById("tbody");
		tableBody.innerHTML="";

		for(let i=0;i<students.length;i++)
		{
			if(groupNumber==="nothing" || students[i].groupNumber===groupNumber)
			{
				let trStudent=document.createElement("tr");
				let thNameStudent=document.createElement("th");
				thNameStudent.innerHTML=students[i].name;
				thNameStudent.classList.add(attendances.stickyColumn);
				trStudent.appendChild(thNameStudent);

				for(let j=0;j<nrWeeks;j++)
				{
					let tdAttendance=document.createElement("td");
					tdAttendance.classList.add(attendances.tdAttendance);
					tdAttendance.innerHTML=students[i].attendances[j];
					tdAttendance.addEventListener("click", function(){markAttendance(tdAttendance)});
					trStudent.appendChild(tdAttendance);
				}

				tableBody.appendChild(trStudent);
			}
		}
	}

	function markAttendance(e)
	{
		let discipline=document.getElementById("disciplineDropDown").value;
    	let category=document.getElementById("categoryDropDown").value;
    	let studentName=e.parentElement.firstChild.innerText;
    	let attendance=false;

		if(e.innerText==="x")
		{
			e.innerText="";
		}
		else
		{
			e.innerHTML="x";
			attendance=true;
		}

		sendAttendanceData(discipline,category,studentName,attendance);
	}

	function sendAttendanceData(discipline,category,studentName,attendance)
	{
		
	}

    function getStudents(discipline,category,groupNumber)
    {
    	students=JSON.parse('{"students":[ {"name":"Celeste Gale","groupNumber":"211","attendances":["x","x","x","x","x","x","x","x","x","x","x","x","x","x"]},{"name":"Nisha Deacon","groupNumber":"211","attendances":["x","x","","","x","x","x","x","","x","x","x","x","x"]},{"name":"Malcolm Horn","groupNumber":"212","attendances":["","","","","x","x","x","x","x","x","x","x","x","x"]},{"name":"Maurice Nielsen","groupNumber":"213","attendances":["x","","x","","x","","x","","x","","x","x","x","x"]}]}').students;
    }

    function getSelectOptionsDiscipline()
	{
		let options=[];
     
	     options.push(
	        <option disabled selected value="nothing"> --- alege materia --- </option>
	     )

	     options.push(
	        <option value="FP">FP</option>
	     )

	     options.push(
	        <option value="OOP">OOP</option>
	     )

	     return options;
	}

	function getSelectOptionsCategory()
	{
		let options=[];
     
	     options.push(
	        <option disabled selected value="nothing"> --- alege categoria --- </option>
	     )

	     options.push(
	        <option value="Curs">Curs</option>
	     )

	     options.push(
	        <option value="Seminar">Seminar</option>
	     )

	     options.push(
	        <option value="Laborator">Laborator</option>
	     )

	     return options;
	}

	function getSelectOptionsGroupNumber()
	{
		let options=[];
     
	     options.push(
	        <option selected value="nothing"> --- alege grupa --- </option>
	     )

	     options.push(
	        <option value="211">211</option>
	     )

	     options.push(
	        <option value="212">212</option>
	     )

	     options.push(
	        <option value="213">213</option>
	     )

	     options.push(
	        <option value="214">214</option>
	     )

	     options.push(
	        <option value="215">215</option>
	     )

	     options.push(
	        <option value="216">216</option>
	     )

	     options.push(
	        <option value="217">217</option>
	     )

	     return options;
	}

	function getHeader()
	{
		let headers=[];

	    headers.push(<th className={attendances.stickyColumn}>&nbsp;</th>);

	    for(let i=1;i<=nrWeeks;i++)
	    {
	        headers.push(
	            <th>Săptămâna {i}</th>
	        );
	    }

	    return headers;
	}
}