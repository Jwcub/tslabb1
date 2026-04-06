//Interface
interface Course {
    code: string;
    name: string;
    progression: string;
    syllabus: string;
}

getStoredCourses ();

// Funktion för att skriva ut kurs
function printCourseDetails (course: Course):void {
    const courseTable = document.querySelector("tbody") as HTMLElement;

    if(courseTable) {
        courseTable.innerHTML += `
        <tr>
            <td>${course.code}</td>
            <td>${course.name}</td>
            <td>${course.progression}</td>
            <td>${course.syllabus}</td>
            <td>X</td>
        </tr>
        `;
    }
}

// Hämta DOM-element för formulär och användardetaljer
const courseForm = document.querySelector(".add-new-course") as HTMLFormElement;

// Lägg till händelselyssnare på formuläret
if(courseForm) {
    courseForm.addEventListener("submit", (event) => {
    event.preventDefault();
    createCourse();
    });
}

function createCourse():void {
    // Hämta värden från formuläret
    const codeInputEl = document.querySelector("#course-code") as HTMLInputElement;
    const nameInputEl = document.querySelector("#course-name") as HTMLInputElement;
    const progressionInputEl = document.querySelector("#progression") as HTMLInputElement;
    const syllabusInputEl = document.querySelector("#syllabus") as HTMLInputElement;

    // Validering av inputfält
    const errorMessageEl = document.getElementById("error-message") as HTMLDivElement;
    if(errorMessageEl) { errorMessageEl.textContent = ""; }
    let error: string[] = [];

    if(codeInputEl.value.length < 2) {
        error.push("Fyll i kurskod");
    } if (nameInputEl.value.length < 2) {
        error.push("Fyll i kursnamn");
    } if(syllabusInputEl.value.length < 2) {
        error.push("Fyll i länk till kursplan");
    }

    // Utskrift av felmeddelande
    if(errorMessageEl && error.length > 0) {
        for (let message of error) {
            errorMessageEl.innerHTML += message;
        }
        return;
    }

  // Skapa ett kursobjekt
  const newCourse: Course = {
    code: codeInputEl.value,
    name: nameInputEl.value,
    progression: progressionInputEl.value,
    syllabus: syllabusInputEl.value,
  };

    //Lagra i LocalStorage
    const storedCourses: Course[] = JSON.parse(localStorage.getItem("courses") || "[]");
    storedCourses.push(newCourse);
    localStorage.setItem("courses", JSON.stringify(storedCourses));

    // Använd printUserDetails för att skriva ut användardetaljer
    printCourseDetails(newCourse);
}

function getStoredCourses () {
    if (localStorage.length < 1) {
        return
    }
    const courseArr = JSON.parse(localStorage.getItem("courses") || "[]");
    const courseTable = document.querySelector("tbody") as HTMLElement;


    if (courseArr && courseTable) {
        courseArr.forEach(course  => {
            courseTable.innerHTML += `
            <tr>
                <td>${course.code}</td>
                <td>${course.name}</td>
                <td>${course.progression}</td>
                <td>${course.syllabus}</td>
            `
        });
    }
    
}
