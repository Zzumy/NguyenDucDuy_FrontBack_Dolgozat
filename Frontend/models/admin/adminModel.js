export default class AdminModel {
    static data(inputElements) {
        let tmp = {};

        for (let ix = 0; ix < inputElements.length - 1; ix++) {
            const element = $(inputElements[ix]);
            const formCheckChildren = element.children(".form-check").toArray();

            if (!formCheckChildren.length) {
                tmp[element.find("input").eq(0).attr("name")] = element
                    .find("input")
                    .eq(0)
                    .val();
            } else {
                const checkedInputs = element
                    .find(".form-check > input:checked")
                    .toArray();
                const values = checkedInputs.map((input) => $(input).val());

                tmp[checkedInputs[0].name] = values.toString();
            }
        }

        return tmp;
    }
}
