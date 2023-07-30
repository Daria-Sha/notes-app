export function countStatistics(categories, activeNotes, archivedNotes) {
    const calculatedCategories = structuredClone(categories);
    for (const note of activeNotes) {
        for (const category in calculatedCategories) {
            if(note.category.name === calculatedCategories[category]['name']) {
                calculatedCategories[category].activeNumber++;
                break;
            }
        }
    }
    for (const note of archivedNotes) {
        for (const category in calculatedCategories) {
            if(note.category.name === calculatedCategories[category]['name']) {
                calculatedCategories[category].archivedNumber++;
                break;
            }
        }
    }
    return calculatedCategories;
}

export function changeNoteLocation(noteId, deleteFrom, addTo) {
    const note = deleteFrom.find(elem => elem.id === +noteId);
    const increased = [...addTo, note];
    const decreased = deleteFrom.filter(elem => elem.id !== +noteId);
    return [decreased, increased];
}

export function checkData(data, reg, id) {
    if(!data.match(reg)) {
        throw new Error(id);
    }
}

export function extractDates(string) {
    const datesArr = string.match(/(\d{1,2}[./-]{1}){2}\d{4}/g);
    return datesArr ? datesArr.filter(elem => Date.parse(elem)).map(elem => new Date(elem)) : [];
}