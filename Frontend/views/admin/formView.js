export default class FormView {
    #list;
    constructor(list, parent) {
        this.#list = list;
        this.parent = parent;
        this.parent.append(
            `<form action="#" method="get" class="row g-3 needs-validation" novalidate></form>`
        );
        this.formElement = this.parent.children("form");
        this.#display();
    }

    #display() {
        for (const key in this.#list) {
            if (Object.hasOwnProperty.call(this.#list, key)) {
                const inputElement = Array.isArray(this.#list[key].value)
                    ? this.#groupInput(this.#list[key], key)
                    : this.#singleInput(this.#list[key], key);

                this.formElement.append(
                    `<div class="col-md-4">${inputElement}</div>`
                );
            }
        }

        this.formElement.append(
            `<div class="col-12"><input class="btn btn-primary" type="submit" value="Send"></div>`
        );
        this.#validation();

        this.formElement.submit((event) => {
            event.preventDefault();
            window.dispatchEvent(new CustomEvent("edit", { detail: this }));
        });
    }

    static #regex(key) {
        let tmp = `${key.attr.required ? " required " : ""}`;

        if (key.type === "text") {
            tmp += `pattern="${key.attr.regex}"`;
        } else if (["number", "date"].includes(key.type)) {
            tmp += `min="${key.attr.min}" max="${key.attr.max}"`;
        }

        return tmp;
    }

    static attrDefiner(key, name) {
        return `type="${key.type}" value="${
            key.ix === undefined ? key.value : key.value[key.ix]
        }" id="${
            name + (key.ix === undefined ? "" : key.ix)
        }" name="${name}" placeholder="${key.placeholder}" title="${
            key.title
        }" ${FormView.#regex(key)}`;
    }

    #groupInput(key, name) {
        let tmp = `<label>${key.name}</label>`;

        key.value.forEach((element, ix) => {
            key["ix"] = ix;
            tmp += `<div class="form-check">
                <input class="form-check-input was-validated" ${FormView.attrDefiner(
                    key,
                    name
                )}>
                <label class="form-check-label" for="${
                    name + ix
                }">${element}</label>
                ${
                    ix === key.value.length - 1
                        ? (key.accept !== undefined
                              ? `<div class="valid-feedback">${key.accept}</div>`
                              : "") +
                          (key.refuse !== undefined
                              ? `<div class="invalid-feedback">${key.refuse}</div>`
                              : "")
                        : ""
                }
            </div>`;
        });

        return tmp;
    }

    #singleInput(key, name) {
        return `<label class="form-label" for="${name}">${key.name}</label>
        <input class="form-control" ${FormView.attrDefiner(key, name)}>
        <div class="valid-feedback">${key.accept}</div>
        <div class="invalid-feedback">${key.refuse}</div>`;
    }

    #validation() {
        (function () {
            "use strict";

            var forms = document.querySelectorAll(".needs-validation");

            Array.prototype.slice.call(forms).forEach(function (form) {
                form.addEventListener(
                    "submit",
                    function (event) {
                        if (!form.checkValidity()) {
                            event.preventDefault();
                            event.stopPropagation();
                        }

                        form.classList.add("was-validated");
                    },
                    false
                );
            });
        })();
    }
}
