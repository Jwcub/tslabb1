//Interface
interface Course {
    code: string;
    name: string;
    progression: string;
    syllabus: string;
}

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

  // Hämta värden från formuläret
const codeInputEl = document.querySelector("#course-code") as HTMLInputElement;
const nameInputEl = document.querySelector("#course-name") as HTMLInputElement;
const progressionInputEl = document.querySelector("#progression") as HTMLInputElement;
const syllabusInputEl = document.querySelector("#syllabus") as HTMLInputElement;

    // Notering: här borde inputvalidering läggas till

  // Skapa ett användarobjekt
  const newCourse: Course = {
    code: codeInputEl.value,
    name: nameInputEl.value,
    progression: progressionInputEl.value,
    syllabus: syllabusInputEl.value,
  };

  // Använd printUserDetails för att skriva ut användardetaljer
  printCourseDetails(newCourse);
  });
}
