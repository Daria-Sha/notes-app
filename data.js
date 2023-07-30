const categories = {
    task: {
        name: 'Task',
        icon: 'shopping_cart',
        activeNumber: 0,
        archivedNumber: 0
    },
    random_thought: {
        name: 'Random Thought',
        icon: 'psychology',
        activeNumber: 0,
        archivedNumber: 0
    },
    idea: {
        name: 'Idea',
        icon: 'light_mode',
        activeNumber: 0,
        archivedNumber: 0
    }
};

const dateOptions = {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
};

const activeNotes = [
    {
        id: 1,
        name: 'Food',
        created: 'June 14, 2023',
        category: categories.task,
        content: 'Visit a grocery store',
        dates: []
    },
    {
        id: 2,
        name: 'Health',
        created: 'June 23, 2023',
        category: categories.task,
        content: 'Drink more water',
        dates: []
    },
    {
        id: 3,
        name: 'Mood',
        created: 'June 25, 2023',
        category: categories.idea,
        content: 'Start attending painting or clay modeling classes',
        dates: []
    },
    {
        id: 4,
        name: 'New book',
        created: 'June 25, 2023',
        category: categories.random_thought,
        content: 'Ask Ann about the title of this new book',
        dates: []
    },
    {
        id: 5,
        name: 'Self-care',
        created: 'June 27, 2023',
        category: categories.task,
        content: 'Visit cosmetologist on the 8/3/2023',
        dates: [new Date('8/3/2023')]
    },
    {
        id: 6,
        name: 'Shopping',
        created: 'June 28, 2023',
        category: categories.random_thought,
        content: 'Buy a new t-shirt',
        dates: []
    },
    {
        id: 7,
        name: 'Health',
        created: 'June 23, 2023',
        category: categories.task,
        content: 'New bakery makes these pies on Fridays',
        dates: []
    }
];

const archivedNotes = [];

export { categories, dateOptions, activeNotes, archivedNotes };