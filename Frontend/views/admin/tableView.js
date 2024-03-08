import RowView from "./rowView.js";

export default class TableView {
    constructor(data, parent) {
        const dataList = Array.isArray(data) ? data : data.data;
        const inputList = Array.isArray(data) ? undefined : data.input;
        this.display(dataList, parent, inputList);
    }

    display(list, parent, inputList) {
        parent.html(
            "<table class='table table-bordered'><thead></thead><tbody></tbody></table>"
        );
        this.fejlec(list, parent);
        this.Kiir(list, parent, inputList);
    }

    fejlec(list, parent) {
        const headers = Object.keys(list[0])
            .map((key) => `<th>${key}</th>`)
            .join("");
        const headerRow = `<tr class='table-dark'>${headers}<th>save</th><th>edit</th><th>delete</th></tr>`;
        parent
            .children("table")
            .eq(0)
            .children("thead")
            .eq(0)
            .append(headerRow);
    }

    Kiir(list, parent, inputList) {
        list.forEach((element, ix) => {
            new RowView(
                element,
                parent.children("table").eq(0).children("tbody").eq(0),
                ix,
                inputList
            );
        });
    }
}
