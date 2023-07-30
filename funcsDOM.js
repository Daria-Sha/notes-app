function createEditIconTd(innerText, eventHandler) {
    const td = document.createElement('td');
    td.addEventListener('click', eventHandler);
    const span = document.createElement('span');
    span.classList.add('material-icons');
    span.classList.add('edit');
    span.style = 'font-size: 2vw;';
    span.innerText = innerText;
    td.append(span);
    return td;
}

export function createCategoryIconTd(innerText) {
    const td = document.createElement('td');
    const circleDiv = document.createElement('div');
    circleDiv.classList.add('circle');
    const iconDiv = document.createElement('div');
    iconDiv.classList.add('material-icons');
    iconDiv.style = 'font-size: 2vw;';
    iconDiv.innerText = innerText;
    circleDiv.append(iconDiv);
    td.append(circleDiv);
    return td;
}

function createField(id, labelText, element, type) {
    const label = document.createElement('label');
    label.setAttribute('for', id);
    label.innerText = labelText;
    const input = document.createElement(element);
    input.id = id;
    if(type) {
        input.setAttribute('type', type);
    }
    return [label, input];
}

export function createForm(categories, eventHandler, note) {
    const form = document.createElement('form');
    form.classList.add('note');
    const noteId = document.createElement('input');
    noteId.setAttribute('type', 'text');
    noteId.id = 'id';
    noteId.classList.add('hidden');
    const name = createField('name', 'Name', 'input', 'text');
    const [categoryLabel, categorySelect] = createField('category', 'Category', 'select');
    for (const category in categories) {
        const option = document.createElement('option');
        option.setAttribute('value', category);
        if(note && categories[category] === note.category) {
            option.setAttribute('selected', 'selected');
        }
        option.innerText = categories[category]['name'];
        categorySelect.append(option);
    }
    const content = createField('content', 'Content', 'textarea');
    const changeNoteBtn = document.createElement('button');
    changeNoteBtn.setAttribute('type', 'button');
    changeNoteBtn.id = 'change-note';
    changeNoteBtn.addEventListener('click', eventHandler);
    if(note) {
        noteId.value = note.id;
        name[1].value = note.name;
        content[1].value = note.content;
        changeNoteBtn.innerText = 'Save changes';
    } else {
        changeNoteBtn.innerText = 'Add note';
    }
    form.append(noteId, ...name, categoryLabel, categorySelect, ...content, changeNoteBtn);
    return form;
}

export function createNotesTable(tableClass, notes, noteHandlers) {
    const tbody = document.createElement('tbody');
    const { editNote, archiveNote, unarchiveNote, deleteNote } = noteHandlers;
    for (const note of notes) {
        const tr = document.createElement('tr');
        tr.id = note.id;
        const tdNoteIcon = createCategoryIconTd(note.category.icon);
        const tdName = document.createElement('td');
        tdName.innerText = note.name;
        const tdCreated = document.createElement('td');
        tdCreated.innerText = note.created;
        const tdCategory = document.createElement('td');
        tdCategory.innerText = note.category.name;
        const tdContent = document.createElement('td');
        const noteContent = document.createElement('div');
        noteContent.classList.add('note-content');
        noteContent.innerText = note.content;
        tdContent.append(noteContent);
        const tdDates = document.createElement('td');
        tdDates.innerText = note.dates.map(elem => elem.toLocaleDateString('en-US')).join(', ');
        const tdEdit = tableClass === 'active-notes'
            ? createEditIconTd(editNote.icon, editNote.handler)
            : document.createElement('td');
        const tdArchive = tableClass === 'active-notes'
            ? createEditIconTd(archiveNote.icon, archiveNote.handler)
            : createEditIconTd(unarchiveNote.icon, unarchiveNote.handler);
        const tdDelete = createEditIconTd(deleteNote.icon, deleteNote.handler);
        tr.append(tdNoteIcon, tdName, tdCreated, tdCategory, tdContent, tdDates, tdEdit, tdArchive, tdDelete);
        tbody.append(tr);
    }
    return tbody;
}

export function createStatisticsTable(calculatedCategories, eventHandler) {
    const tbody = document.createElement('tbody');
    for (const category in calculatedCategories) {
        const tr = document.createElement('tr');
        const tdNoteIcon = createCategoryIconTd(calculatedCategories[category].icon);
        const tdCategory = document.createElement('td');
        tdCategory.innerText = calculatedCategories[category].name;
        const tdActiveNumber = document.createElement('td');
        tdActiveNumber.innerText = calculatedCategories[category].activeNumber;
        const tdArchivedNumber = document.createElement('td');
        if(calculatedCategories[category].archivedNumber) {
            tdArchivedNumber.style = 'cursor: pointer;';
            tdArchivedNumber.addEventListener('click', eventHandler);
        }
        tdArchivedNumber.innerText = calculatedCategories[category].archivedNumber;
        tr.append(tdNoteIcon, tdCategory, tdActiveNumber, tdArchivedNumber);
        tbody.append(tr);
    }
    return tbody;
}

export function getNodeId(node) {
    let idNode = node;
    while(!idNode.id) {
        idNode = idNode.parentNode;
    }
    return idNode.id;
}