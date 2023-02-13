import './styles/main.scss'

const notesHTML = document.querySelector('.notes .row');
const addBtn = document.querySelector('#addBtn');
//cменить имя модалке
const modal = document.getElementById('modalId');

class Note {
    public title: string;
    public text: string;

    constructor(title: string, text: string) {
        this.title = title;
        this.text = text;
    }

    public renderNote() {
        const note: HTMLDivElement = document.createElement('div');
        note.className = 'col-md-4 col-sm-6 content-card'

        note.innerHTML = ` 
            <div class="card border border-dark border-4 p-4 card-just-text" data-background="color" data-color="blue" data-radius="none">
                <div class="content">
                    <h4 class="title">
                    <a class="card-link" href="#">${this.title}</a>
                    </h4>
                    <p class="description">${this.title} </p>
                </div>
            </div> 
         </div>
     `

        notesHTML.appendChild(note)
    }
}

class NotesApp {
    public notes: Note[] = []

    public addNote(note: Note | Note[]): void {
        if (Array.isArray(note)) {
            this.notes = [...note]
        } else {
            this.notes.push(note)
        }
    }

    public renderAddNewNoteCard() {
        const card: HTMLDivElement = document.createElement('div')
        card.className = 'col-md-4 col-sm-6 content-card'

        card.innerHTML = ` 
            <div class="card border border-dark border-4 p-4 card-just-text d-flex justify-content-center align-items-center" 
            data-background="color" 
            data-color="blue" data-radius="none" 
            data-bs-toggle="modal" 
            data-bs-target="#modalId">
                <div class="content">
                    <h4 class="title text-primary">
                    Add new note
                    </h4>
                </div>
            </div> 
         </div>
     `

        notesHTML.appendChild(card)
    }

    public renderNotes() {
        this.notes.forEach((note) => {
            note.renderNote();
        });
        this.renderAddNewNoteCard();
    }
}
const newNote = new Note(
    'Main title note 1',
    'Main text note'
)

const newNote2 = new Note(
    'Main title note 2',
    'Main text note'
)
const newNote3 = new Note(
    'Main title note 3',
    'Main text note'
)
const newNote4 = new Note(
    'Main title note 4',
    'Main text note'
)

const notes = new NotesApp(
    // new Note(
    //     'Main title note',
    //     'Main text note'
    // )
)

let post = {
    title: '',
    body: ''
}
async function noteNewApi() {
    let data = await fetch ('https://jsonplaceholder.typicode.com/posts',
    {
        method: 'GET',
        headers:{
            'Content-type': 'application/json; charset=UTF-8',
          },
          body: JSON.stringify(post)
        })


        //POST


notes.renderNotes(); 




};
notes.addNote([newNote, newNote2, newNote3, newNote4])
// console.log(notes);

notes.renderNotes(); 

addBtn.addEventListener('click', () => {
    const titleControl = <HTMLInputElement>document.getElementById('titleControl');
    const textControl = <HTMLTextAreaElement>document.getElementById('textControl');
    
    notes.addNote(new Note(titleControl.value, textControl.value)); 
    notesHTML.innerHTML = "";
    titleControl.value = "";
    textControl.value = "";
    notes.renderNotes(); 
});
