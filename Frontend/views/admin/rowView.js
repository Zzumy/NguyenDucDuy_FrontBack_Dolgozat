import FormView from "./formView.js";

export default class RowView {
    static counter = 0;
    static inputList;
    constructor(element, parent, index, inputList) {
        this.$element = element;
        this.$parent = parent;
        this.index = index;
        if (RowView.inputList === undefined) RowView.inputList = inputList;

        this.$parent.append("<tr></tr>");
        this.$rowElement = this.$parent.children("tr:last-child");
        this.#row();
    }

    addEvent() {
        this.$rowElement.children(".send").on("click", () => {
            if (
                this.$rowElement
                    .find("input")
                    .toArray()
                    .findIndex((element) => {
                        return !element.checkValidity();
                    }) == -1
            )
                this.#sendEvent();
        });
        this.$rowElement.children(".edit").on("click", () => {
            this.#editRow();
        });
        this.$rowElement.children(".megse").on("click", () => {
            this.#row();
        });
        this.$rowElement.children(".delete").on("click", () => {
            this.#deleteEvent();
        });
    }

    #row() {
        let tmp = ``;
        for (const key in this.$element) {
            if (Object.hasOwnProperty.call(this.$element, key)) {
                tmp += `<td>${this.$element[key]}</td>`;
            }
        }
        tmp += `<td></td><td class="edit">✏</td><td class="delete">🗑</td></td>`;
        this.$rowElement.html(tmp);
        this.addEvent();
    }

    #editRow() {
        let tmp = ``;
        for (const key in this.$element) {
            console.log("row", !Array.isArray(RowView.inputList["value"]));
            if (Object.hasOwnProperty.call(this.$element, key)) {
                if (
                    !(key == "id" || key == "created_at" || key == "updated_at")
                )
                    if (!Array.isArray(RowView.inputList[key]["value"]))
                        tmp += `<td class="was-validated">${this.#inputDefiner(
                            this.$element,
                            key
                        )}</td>`;
                    else
                        tmp += `<td class="was-validated inputGroup">${this.#inputGroupDefiner(
                            this.$element,
                            key
                        )}</td>`;
                else tmp += `<td>${this.$element[key]}</td>`;
            }
        }
        tmp += `<td class="send">✔</td><td class="megse">❌</td><td class="delete">🗑</td>`;
        this.$rowElement.html(tmp);
        this.addEvent();
    }

    #inputDefiner(element, key) {
        return `<input class="form-control" value="${
            element[key]
        }" ${FormView.attrDefiner(RowView.inputList[key], key)}>`;
    }

    #inputGroupDefiner(component, key) {
        RowView.counter += 1;
        console.log("cnt", RowView.counter);
        let tmp = ``;
        RowView.inputList[key]["value"].forEach((element, ix) => {
            RowView.inputList[key]["ix"] = ix;
            console.log(element, component.id == element);
            tmp += `
                <div class="form-check">
                <input class="form-check-input was-validated" name="${
                    key + "/" + RowView.counter
                }" ${
                component.id == element ? "checked" : ""
            } value="${element}" ${FormView.attrDefiner(
                RowView.inputList[key],
                key
            )}>
                <label>${element}</label>
                </div>`;
        });
        return tmp;
    }

    #deleteEvent() {
        window.dispatchEvent(
            new CustomEvent("delete", {detail: this.$element.id})
        );
    }
    #sendEvent() {
        let tmp = {id: this.$element.id};
        $(this.$rowElement)
            .find("td > input")
            .toArray()
            .forEach((element) => {
                tmp[element.name] = $(element).val();
            });
        $(this.$rowElement)
            .find(".inputGroup")
            .toArray()
            .forEach((element) => {
                let list = [];
                $(element)
                    .find(".form-check > input:checked")
                    .toArray()
                    .forEach((inputok) => {
                        list.push($(inputok).val());
                    });
                tmp[
                    this.$rowElement
                        .find(".inputGroup > .form-check > input:checked")
                        .eq(0)
                        .attr("name")
                        .split("/")[0]
                ] = list.toString();
            });
        window.dispatchEvent(new CustomEvent("send", {detail: tmp}));
    }
    #editEvent() {
        window.dispatchEvent(new CustomEvent("edit", {detail: this.index}));
    }
}
