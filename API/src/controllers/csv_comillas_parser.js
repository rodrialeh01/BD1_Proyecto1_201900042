export function parseCSVcomilla(content) {
    const columnas = [];
    let txtColumn = '';

    let comilla = false;

    for (let i = 0; i < content.length; i++) {
        const char = content[i];

        if (char === '"') {
            comilla = !comilla;
        } else if (char === ',' && !comilla) {
            columnas.push(txtColumn.trim());
            txtColumn = '';
        } else {
            txtColumn += char;
        }
    }

    columnas.push(txtColumn.trim());

    return columnas;
}