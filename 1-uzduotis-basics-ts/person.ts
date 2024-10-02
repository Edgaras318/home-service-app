type Person = {
    name: string;
    age: number;
};

export const greet = (person: Person): string => {
    return `Hello, my name is ${person.name} and I am ${person.age} years old.`;
};
