// Sukuriame masyvą, kuris talpina skaičių tipo reikšmes
const numberArray: number[] = [10, 20, 30, 40, 50];

// Funkcija, kuri grąžina pirmąjį masyvo elementą
function getFirstElement(array: number[]): number | undefined {
    return array[0]; // Grąžiname pirmąjį elementą (jei yra)
}

// Panaudojimas
const firstElement = getFirstElement(numberArray);
console.log(firstElement); // Rezultatas: 10
