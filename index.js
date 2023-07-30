import { categories, dateOptions, activeNotes as act, archivedNotes as arc } from './data.js';
import { createForm, createNotesTable, createStatisticsTable, getNodeId } from './funcsDOM.js';
import { countStatistics, changeNoteLocation, checkData, extractDates } from './funcs.js';

let activeNotes = act;
let archivedNotes = arc;

const activeNotesTable = document.querySelector('.active-notes');
const archivedNotesTable = document.querySelector('.archived-notes');
const forForm = document.querySelector('.for-form');
const statisticsTable = document.querySelector('.statistics');

function showChanges() {
    const calculatedCategories = countStatistics(categories, activeNotes, archivedNotes);
    const activeNotesTbody = createNotesTable('active-notes', activeNotes, noteHandlers);
    activeNotesTable.replaceChild(activeNotesTbody, activeNotesTable.querySelector('tbody'));
    const statisticsTbody = createStatisticsTable(calculatedCategories, () => {
        const archivedNotesTbody = createNotesTable('archived-notes', archivedNotes, noteHandlers);
        archivedNotesTable.replaceChild(archivedNotesTbody, archivedNotesTable.querySelector('tbody'));
        archivedNotesTable.classList.remove('hidden');
    });
    statisticsTable.replaceChild(statisticsTbody, statisticsTable.querySelector('tbody'));
    if(!archivedNotesTable.classList.contains('hidden')) {
        const archivedNotesTbody = createNotesTable('archived-notes', archivedNotes, noteHandlers);
        archivedNotesTable.replaceChild(archivedNotesTbody, archivedNotesTable.querySelector('tbody'));
    }
}

const noteHandlers = {
    editNote: {
        icon: 'edit',
        handler: (event) => {
            const noteId = getNodeId(event.target);
            const note = activeNotes.find(elem => elem.id === +noteId);
            const form = createForm(categories, changeNote, note);
            forForm.innerText = '';
            forForm.append(form);
        }
    },
    archiveNote: {
        icon: 'archive',
        handler: (event) => {
            const noteId = getNodeId(event.target);
            [activeNotes, archivedNotes] = changeNoteLocation(noteId, activeNotes, archivedNotes);
            showChanges();
            if(document.querySelector('#id')?.value === noteId) {
                document.querySelector('.for-form').innerText = '';
            }
        }
    },
    unarchiveNote: {
        icon: 'unarchive',
        handler: (event) => {
            const noteId = getNodeId(event.target);
            [archivedNotes, activeNotes] = changeNoteLocation(noteId, archivedNotes, activeNotes);
            if(!archivedNotes.length) {
                archivedNotesTable.classList.add('hidden');
            }
            showChanges();
        }
    },
    deleteNote: {
        icon: 'delete',
        handler: (event) => {
            const noteId = getNodeId(event.target);
            activeNotes = activeNotes.filter(elem => elem.id !== +noteId);
            archivedNotes = archivedNotes.filter(elem => elem.id !== +noteId);
            if(!archivedNotes.length) {
                archivedNotesTable.classList.add('hidden');
            }
            showChanges();
            if(document.querySelector('#id')?.value === noteId) {
                document.querySelector('.for-form').innerText = '';
            }
        }
    }
};

function changeNote() {
    try {
        const noteId = document.querySelector('#id').value;
        const note = noteId ? activeNotes.find(elem => elem.id === +noteId) : {};
        const name = document.querySelector('#name').value;
        checkData(name, /^.{1,30}$/, 'name');
        note.name = name;
        note.category = categories[document.querySelector('#category').value];
        const content = document.querySelector('#content').value;
        checkData(content, /^.{2,}$/, 'content');
        note.content = content;
        note.dates = extractDates(content);
        if(!noteId) {
            note.id = activeNotes.length + archivedNotes.length + 1;
            const date = new Date();
            note.created = date.toLocaleString('en-US', dateOptions);
            activeNotes = [...activeNotes, note];
        }
        createNoteBtn.classList.remove('hidden');
        forForm.innerText = '';
        showChanges();
    } catch(err) {
        const field = document.querySelector(`#${err.message}`);
        field.classList.add('error');
        field.addEventListener('input', removeError);
    }
}

const removeError = event => {
    event.target.classList.remove('error');
    event.target.removeEventListener('input', removeError);
};

const createNoteBtn = document.querySelector('#create-note');
createNoteBtn.addEventListener('click', () => {
    createNoteBtn.classList.add('hidden');
    const form = createForm(categories, changeNote);
    forForm.innerText = '';
    forForm.append(form);
});

showChanges();