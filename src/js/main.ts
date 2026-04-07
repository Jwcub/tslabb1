addEventListener("DOMContentLoaded", () => {

    getStoredCourses ()

    const form = document.querySelector<HTMLFormElement>(".add-new-course");
    if (!form) return;
    form.addEventListener("submit", addCourse);

});

//Interface för kurs
interface Course {
    code: string;
    name: string;
    progression: Progression;
    syllabus: string;
}

// Enums fungerade inte (erasableSyntaxOnly)
type Progression = "A" | "B" | "C";

function addCourse(event: SubmitEvent) {
    event.preventDefault();

    // Hämta värden från formuläret
    const codeInputEl = document.querySelector("#course-code") as HTMLInputElement;
    const nameInputEl = document.querySelector("#course-name") as HTMLInputElement;
    const progressionInputEl = document.querySelector("#progression") as HTMLInputElement;
    const syllabusInputEl = document.querySelector("#syllabus") as HTMLInputElement;

    // Validering av inputfält
    const errorMessageEl = document.getElementById("error-message") as HTMLDivElement;
    if(errorMessageEl) { errorMessageEl.textContent = ""; }
    let error: string[] = [];

    // Skapa felmeddelanden
    if(codeInputEl.value.length < 2) {
        error.push("Fyll i kurskod");
    } if (nameInputEl.value.length < 2) {
        error.push("Fyll i kursnamn");
    } if(syllabusInputEl.value.length < 2) {
        error.push("Fyll i länk till kursplan");
    }if (!progressionInputEl) {
        error.push("Ange progression");
    }
    let progressionValue = progressionInputEl.value as Progression;
    

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
        progression: progressionValue,
        syllabus: syllabusInputEl.value,
    };

    // Använd printUserDetails för att skriva ut användardetaljer
    printCourseDetails(newCourse);

    // Lagra kurs i localStorage
    storeCourse(newCourse);
}

function printCourseDetails(course: Course):void {
    const courseTable = document.querySelector("tbody") as HTMLElement;
    let tableRow: HTMLElement = document.createElement("tr");
    tableRow.innerHTML = `
        <td>${course.code}</td>
        <td>${course.name}</td>
        <td>${course.progression}</td>
        <td>${course.syllabus}</td>
    `;

    // Skapa knapp för radering av kurs
    const deleteBtn: HTMLElement = document.createElement("td");
    deleteBtn.innerHTML = `<span class="material-symbols-outlined remove">delete</span>`;
    tableRow.appendChild(deleteBtn);

    deleteBtn.addEventListener("click", () => {
        tableRow.remove();
        const courses: Course[] = JSON.parse(localStorage.getItem("courses") || "[]");
        
        const index = courses.findIndex(c  => c.code === course.code);

        if (index !== -1) {
            courses.splice(index, 1);
            localStorage.setItem("courses", JSON.stringify(courses));
        }
    });

    // Lägg till i DOM
    if(courseTable) {
        courseTable.appendChild(tableRow);
    }
}

function storeCourse(course: Course):void {
    const storedCourses: Course[] = JSON.parse(localStorage.getItem("courses") || "[]");
    storedCourses.push(course);
    localStorage.setItem("courses", JSON.stringify(storedCourses));
}

function getStoredCourses () {
    if (localStorage.length < 1) {
        return
    }
    const courseArr = JSON.parse(localStorage.getItem("courses") || "[]");
    const courseTable = document.querySelector("tbody") as HTMLElement;

    console.log(courseArr);

    if (courseArr && courseTable) {
        courseArr.forEach((course: Course)  => {
            printCourseDetails(course);
        });
    }
}


